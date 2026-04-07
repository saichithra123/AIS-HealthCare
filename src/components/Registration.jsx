import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  FormControl,
  FormControlLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

import aaseyaLogo from "../assets/Aaseyalogo.svg";
import cloudUploadIcon from "../assets/Icon awesome-cloud-upload-alt.svg";
import logoutIcon from "../assets/logout.svg";

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    height: 48,                     // XD height
    borderRadius: "15px",           // XD radius
    backgroundColor: "#FFFFFF",     // XD white
    boxShadow: "0px 3px 4px #00000029", // XD shadow

    "& fieldset": {
      borderColor: "#D2D2D3",
    },
    "&:hover fieldset": {
      borderColor: "#B5B5B5",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#5A9BA5",
    },

    "& input": {
      padding: "12px 16px",
      fontSize: "14px",
      margin: "70px",
    },

    "& .MuiSelect-select": {
      padding: "12px 16px",
      display: "flex",
      alignItems: "center",
      fontSize: "14px",
    },
  },
};


const Registration = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");

    navigate("/ais/login");
  };

  const [claimantName, setClaimantName] = useState("");
  const [claimantType, setClaimantType] = useState("");
  const [relationship, setRelationship] = useState("");
  const [gender, setGender] = useState("");
  const [ssnNumber, setSsnNumber] = useState("");
  const [errors, setErrors] = useState({});

  const [policyDetails, setPolicyDetails] = useState(null);
  const [loadingPolicy, setLoadingPolicy] = useState(false);
  const [policyError, setPolicyError] = useState("");

  const fetchPolicyDetails = async () => {
    if (ssnNumber.length !== 11) return;

    const token = localStorage.getItem("access_token");
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    setLoadingPolicy(true);
    setPolicyError("");
    setPolicyDetails(null);


    try {
      const response = await fetch(
        `${baseUrl}/healthcare/getPolicydetailsByssn?SSN=${ssnNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error();

      const data = await response.json();
      setPolicyDetails(data);
    } catch {
      setPolicyError("Policy does not exist for this SSN");
    } finally {
      setLoadingPolicy(false);
    }
  };



  useEffect(() => {
    if (ssnNumber.length === 11 && !policyDetails && !loadingPolicy) {
      fetchPolicyDetails();
    }
  }, [ssnNumber]);

  const validateForm = () => {
    let newErrors = {};

    if (!claimantName.trim()) {
      newErrors.claimantName = "Enter claimant name";
    }

    if (!claimantType) {
      newErrors.claimantType = "Select claimant type";
    }

    if (!ssnNumber || ssnNumber.length !== 11) {
      newErrors.ssnNumber = "Enter valid SSN (11 digits)";
    }

    if (!gender) {
      newErrors.gender = "Select gender";
    }

    if (claimantType === "family" && !relationship) {
      newErrors.relationship = "Select relationship";
    }

    if (!policyDetails) {
      newErrors.policy = "Valid policy required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F6F9F8",
        overflowY: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <AppBar
        position="fixed"         
        sx={{
          backgroundColor: "#48868B",
          zIndex: 1200,            
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box component="img" src={aaseyaLogo} alt="aaseya" sx={{ height: 28 }} />

          <Box
            onClick={handleLogout}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
            }}
          >
            <Box
              component="img"
              src={logoutIcon}
              sx={{ height: 18 }}
            />
            <Typography color="#fff" fontSize={14}>
              Logout
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          width: "100%",
          px: 8,
          py: 5,
          pt: "96px",
        }}
      >
        <Box
          onClick={() => navigate("/")}
          sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer", mb: 2 }}
        >
          <ArrowBack fontSize="small" /> Back
        </Box>

        <Typography fontSize={24} fontWeight={700} mb={3}>
          Register Pre-Claim Approval
        </Typography>

        {/* CLAIMANT DETAILS */}
        <Paper sx={{ p: 2.5, mb: 3, borderRadius: 2 }}>
          <Typography fontSize={18} fontWeight={700} mb={3}>
            Claimant Details
          </Typography>

          <Grid container spacing={22}>
            <Grid item xs={12} md={9}>
              <Stack spacing={3}>
                <Box>
                  <Typography fontWeight={600} mb={1}>
                    Claimant Name
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter Full Name"
                    sx={inputStyle}
                    value={claimantName}
                    onChange={(e) => setClaimantName(e.target.value)}
                    error={!!errors.claimantName}
                    helperText={errors.claimantName}
                  />
                </Box>

                <Box>
                  <Typography fontWeight={600} mb={1}>
                    Claimant Type
                  </Typography>
                  <FormControl fullWidth sx={inputStyle} error={!!errors.claimantType}>                    <Select
                    value={claimantType}
                    onChange={(e) => {
                      setClaimantType(e.target.value);
                      setRelationship("");
                    }}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>Select</MenuItem>
                    <MenuItem value="self">Self</MenuItem>
                    <MenuItem value="family">Family Member</MenuItem>
                  </Select>
                  </FormControl>
                  {errors.claimantType && (
                    <Typography color="error" fontSize={12}>
                      {errors.claimantType}
                    </Typography>
                  )}
                </Box>

                <Box>
                  <Typography fontWeight={600} mb={1}>
                    SSN Number
                  </Typography>
                    <TextField fullWidth placeholder="Enter SSN Number" sx={inputStyle} value={ssnNumber} onChange={(e) => setSsnNumber(e.target.value)} />


                  {/* <TextField
                    fullWidth
                    placeholder="XXX-XX-XXXX"
                    sx={inputStyle}
                    value={ssnNumber}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, ""); // remove non-numbers

                      if (value.length > 9) value = value.slice(0, 9);

                      let formatted = value;
                      if (value.length > 5) {
                        formatted = `${value.slice(0, 3)}-${value.slice(3, 5)}-${value.slice(5)}`;
                      } else if (value.length > 3) {
                        formatted = `${value.slice(0, 3)}-${value.slice(3)}`;
                      }

                      setSsnNumber(formatted);
                    }}
                    error={!!errors.ssnNumber}
                    helperText={errors.ssnNumber}
                  /> */}
                </Box>
              </Stack>
            </Grid>

            <Grid container spacing={6}>

              <Grid item xs={12} md={8}>
                <Stack spacing={3}>

                </Stack>
              </Grid>

              <Grid item xs={12} md={4}>
                <Stack spacing={3}>

                  <Box>
                    <Typography fontWeight={600} mb={1}>

                      Gender
                    </Typography>

                    <RadioGroup

                      row

                      value={gender}

                      onChange={(e) => setGender(e.target.value)}

                      sx={{ gap: 6 }}   
                    >
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                    </RadioGroup>
                    {errors.gender && (
                      <Typography color="error" fontSize={12}>
                        {errors.gender}
                      </Typography>
                    )}
                  </Box>


                  {claimantType === "family" && (
                    <Box>
                      <Typography fontWeight={600} mb={1.5}>

                        Relationship to Policy Holder
                      </Typography>

                      <FormControl
                        fullWidth
                        error={!!errors.relationship}
                        sx={{
                          ...inputStyle,
                          minWidth: 340,
                        }}
                      >                       <Select

                        value={relationship}

                        onChange={(e) => setRelationship(e.target.value)}

                        displayEmpty
                      >
                          <MenuItem value="" disabled>

                            Select Relationship
                          </MenuItem>
                          <MenuItem value="spouse">Spouse</MenuItem>
                          <MenuItem value="son">Son</MenuItem>
                          <MenuItem value="daughter">Daughter</MenuItem>
                          <MenuItem value="father">Father</MenuItem>
                          <MenuItem value="mother">Mother</MenuItem>
                        </Select>
                      </FormControl>
                      {errors.relationship && (
                        <Typography color="error" fontSize={12}>
                          {errors.relationship}
                        </Typography>
                      )}
                    </Box>

                  )}

                </Stack>
              </Grid>

            </Grid>







          </Grid>



          {loadingPolicy && <Typography mt={3}>Loading policy details…</Typography>}
          {policyError && <Typography mt={3} color="error">{policyError}</Typography>}

          {policyDetails && (
            <Box
              sx={{
                mt: 4,
                p: 3,
                backgroundColor: "rgba(176,216,231,0.25)",
                borderRadius: 2,
              }}
            >
              <Typography fontWeight={600} color="#48868B" mb={3}>
                Policy Details
              </Typography>

              <Grid container spacing={4}>
                <Grid item xs={12} md={2.4}>
                  <Typography fontSize={12} color="text.secondary">
                    Policy Number
                  </Typography>
                  <Typography fontSize={14}>
                    {policyDetails.policyNumber}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={2.4}>
                  <Typography fontSize={12} color="text.secondary">
                    Policy Type
                  </Typography>
                  <Typography fontSize={14}>
                    {policyDetails.policyType}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={2.4}>
                  <Typography fontSize={12} color="text.secondary">
                    Coverage Type
                  </Typography>
                  <Typography fontSize={14}>
                    {policyDetails.coverageType}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={2.4}>
                  <Typography fontSize={12} color="text.secondary">
                    Base Sum Insured
                  </Typography>
                  <Typography fontSize={14}>
                    ₹{policyDetails.overallSumInsured.toLocaleString()}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={2.4}>
                  <Typography fontSize={12} color="text.secondary">
                    Policy Status
                  </Typography>
                  <Typography fontSize={14}>
                    {policyDetails.policyStatus}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}


        </Paper>

        {/* DOCUMENTS – ALWAYS VISIBLE */}
        <Paper sx={{ p: 2, borderRadius: 2 }}>
          <Typography fontSize={18} fontWeight={700} mb={3}>Documents</Typography>

          <Box
            onClick={() => {
              if (!validateForm()) return;
              navigate("/upload-documents");
            }} sx={{
              border: "1.5px dashed #B0D8E7",
              borderRadius: 2,
              p: 5,
              textAlign: "center",
              cursor: "pointer",
            }}
          >

            <Box component="img" src={cloudUploadIcon} sx={{ width: 40, mb: 2 }} />
            <Typography fontSize={13}>Click to upload or drag and drop</Typography>
            <Typography fontSize={11} color="text.secondary">
              PDF, JPG or PNG (Max. 10MB)
            </Typography>
          </Box>

          {!policyDetails && (
            <Typography mt={2} fontSize={12} color="text.secondary">
              Upload enabled only after valid policy verification
            </Typography>
          )}
        </Paper>
        {errors.policy && (
          <Typography color="error" fontSize={12} mt={1}>
            {errors.policy}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Registration;
