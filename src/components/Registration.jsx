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
  Button,
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

  const [patientName, setPatientName] = useState("");
  const [patientType, setPatientType] = useState("");
  const [patientId, setPatientId] = useState("");
  const [icdCode, setIcdCode] = useState("");
  const [relationship, setRelationship] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState("none"); // none, error, approved

  const [policyDetails, setPolicyDetails] = useState(null);
  const [loadingPolicy, setLoadingPolicy] = useState(false);
  const [policyError, setPolicyError] = useState("");

  const fetchPolicyDetails = async () => {
    // If patientId is provided, we fetch policy (bypassing strict 11 char SSN rule for mock purposes)
    if (!patientId || patientId.length < 5) return;

    const token = localStorage.getItem("access_token");
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    setLoadingPolicy(true);
    setPolicyError("");
    setPolicyDetails(null);


    try {
      const response = await fetch(
        `${baseUrl}/healthcare/getPolicydetailsByssn?SSN=${patientId}`,
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
    if (patientId && patientId.length >= 5 && !policyDetails && !loadingPolicy) {
      fetchPolicyDetails();
    }
  }, [patientId]);

  const validateForm = () => {
    let newErrors = {};

    if (!patientName.trim()) {
      newErrors.patientName = "Enter patient name";
    }

    if (!patientType) {
      newErrors.patientType = "Select patient type";
    }

    if (!patientId) {
      newErrors.patientId = "Enter Patient ID";
    }

    if (!icdCode) {
      newErrors.icdCode = "Enter ICD Code";
    }

    if (!gender) {
      newErrors.gender = "Select gender";
    }

    if (patientType === "family" && !relationship) {
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
          onClick={() => navigate("/login")}
          sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer", mb: 2 }}
        >
          <ArrowBack fontSize="small" /> Back
        </Box>

        <Typography fontSize={24} fontWeight={700} mb={3}>
          Register Pre-Claim Approval
        </Typography>

        {/* PATIENT DETAILS */}
        <Paper sx={{ p: 2.5, mb: 3, borderRadius: 2 }}>
          <Typography fontSize={18} fontWeight={700} mb={3}>
            Patient Details
          </Typography>

          <Grid container spacing={22}>
            <Grid item xs={12} md={9}>
              <Stack spacing={3}>
                <Box>
                  <Typography fontWeight={600} mb={1}>
                    Patient Name
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter Full Name"
                    sx={inputStyle}
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    error={!!errors.patientName}
                    helperText={errors.patientName}
                  />
                </Box>

                <Box>
                  <Typography fontWeight={600} mb={1}>
                    Patient Type
                  </Typography>
                  <FormControl fullWidth sx={inputStyle} error={!!errors.patientType}>
                    <Select
                      value={patientType}
                      onChange={(e) => {
                        setPatientType(e.target.value);
                        setRelationship("");
                      }}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>Select</MenuItem>
                      <MenuItem value="self">Self</MenuItem>
                      <MenuItem value="family">Family Member</MenuItem>
                    </Select>
                  </FormControl>
                  {errors.patientType && (
                    <Typography color="error" fontSize={12}>
                      {errors.patientType}
                    </Typography>
                  )}
                </Box>

                <Box>
                  <Typography fontWeight={600} mb={1}>
                    Patient ID
                  </Typography>
                  <TextField 
                    fullWidth 
                    placeholder="Enter Patient ID" 
                    sx={inputStyle} 
                    value={patientId} 
                    onChange={(e) => setPatientId(e.target.value)} 
                    error={!!errors.patientId}
                    helperText={errors.patientId}
                  />
                </Box>

                <Box>
                  <Typography fontWeight={600} mb={1}>
                    ICD Code
                  </Typography>
                  <TextField 
                    fullWidth 
                    placeholder="Enter ICD Code (e.g. G56.01)" 
                    sx={inputStyle} 
                    value={icdCode} 
                    onChange={(e) => setIcdCode(e.target.value)} 
                    error={!!errors.icdCode}
                    helperText={errors.icdCode}
                  />
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

        {/* AI SUMMARY (MOCK) */}
        {policyDetails && icdCode === "G56.01" && (
          <Box
            sx={{
              mb: 3,
              p: 3,
              backgroundColor: "#E8F5E9",
              borderRadius: 2,
              border: "1px solid #C8E6C9"
            }}
          >
            <Typography fontSize={16} fontWeight={700} color="#2E7D32" mb={1}>
              AI Summary &amp; Findings
            </Typography>
            <Typography fontSize={14} color="#1B5E20">
              <strong>Finding:</strong> Carpal Tunnel Syndrome detected in recent clinical notes.<br/>
              <strong>Proposed Treatment:</strong> Carpal Tunnel Release Surgery.<br/>
              <strong>Validation:</strong> All required radiology and physician notes correspond with the requested limit.
            </Typography>
          </Box>
        )}

        {/* DOCUMENTS – ALWAYS VISIBLE BUT SKIPPED ON AUTO-APPROVE */}
        {submitStatus !== "approved" && (
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
        )}

        {/* WORKFLOW ALERTS */}
        {submitStatus === "error" && (
          <Box mt={3} p={2} sx={{ backgroundColor: "#FFEBEE", border: "1px solid #EF9A9A", borderRadius: 2 }}>
            <Typography color="#C62828" fontWeight={600} fontSize={14}>
              Doctor has not uploaded the required documents please check with him
            </Typography>
          </Box>
        )}

        {submitStatus === "approved" && (
          <Box mt={3} p={3} sx={{ backgroundColor: "#E8F5E9", border: "1px solid #81C784", borderRadius: 2 }}>
            <Typography color="#2E7D32" fontWeight={700} fontSize={16} mb={1}>
              ✅ Claim Auto-Approved
            </Typography>
            <Typography color="#1B5E20" fontSize={14}>
              Claim has been auto-approved based on AI findings and validations. A notification has been sent to the Claimant.
            </Typography>
          </Box>
        )}

        {errors.policy && (
          <Typography color="error" fontSize={12} mt={1}>
            {errors.policy}
          </Typography>
        )}

        {/* SUBMIT BUTTON */}
        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button 
            variant="contained" 
            sx={{ 
              backgroundColor: "#48868B", 
              "&:hover": { backgroundColor: "#3a6c70" },
              px: 4,
              py: 1.5,
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600
            }} 
            onClick={() => {
              if (!validateForm()) return;
              
              if (icdCode === "S82.0") {
                setSubmitStatus("error");
              } else if (icdCode === "G56.01") {
                setSubmitStatus("approved");
              } else {
                navigate("/upload-documents");
              }
            }}
          >
            Submit Pre-Claim
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Registration;
