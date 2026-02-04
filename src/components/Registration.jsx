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

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    height: 64,                    // ⬅ BIGGER HEIGHT
    borderRadius: "14px",
    backgroundColor: "#EEF5FF",
    fontSize: "16px",              // ⬅ BIGGER TEXT
    paddingRight: "8px",

    "& input": {
      padding: "18px 14px",        // ⬅ MORE INNER SPACE
    },

    "& .MuiSelect-select": {
      padding: "18px 14px",        // ⬅ FOR SELECT DROPDOWN
      display: "flex",
      alignItems: "center",
    },

    "& fieldset": {
      borderColor: "#C5C9CE",
    },
    "&:hover fieldset": {
      borderColor: "#5A9BA5",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#5A9BA5",
    },
  },
};

const Registration = () => {
  const navigate = useNavigate();

  const [claimantName, setClaimantName] = useState("");
  const [claimantType, setClaimantType] = useState("");
  const [relationship, setRelationship] = useState("");
  const [gender, setGender] = useState("");
  const [ssnNumber, setSsnNumber] = useState("");

  const [policyDetails, setPolicyDetails] = useState(null);
  const [loadingPolicy, setLoadingPolicy] = useState(false);
  const [policyError, setPolicyError] = useState("");

  const fetchPolicyDetails = async () => {
    if (!ssnNumber) return;

    setLoadingPolicy(true);
    setPolicyError("");

    try {
      const response = await fetch(
  `${import.meta.env.VITE_API_BASE_URL}/getPolicydetailsByssn?SSN=${ssnNumber}`,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  }
);


      if (!response.ok) throw new Error();

      const data = await response.json();
      setPolicyDetails(data);
    } catch {
      setPolicyDetails(null);
      setPolicyError("Policy is not existed");
    } finally {
      setLoadingPolicy(false);
    }
  };

  return (
<Box
  sx={{
    minHeight: "100vh",
    backgroundColor: "#F6F9F8",
    overflowY: "auto",
    scrollbarWidth: "none",          // Firefox
    "&::-webkit-scrollbar": {
      display: "none",               // Chrome, Edge, Safari
    },
  }}
>
      {/* HEADER */}
      <AppBar position="static" sx={{ backgroundColor: "#48868B" }}>
        <Toolbar>
          <Box component="img" src={aaseyaLogo} alt="aaseya" sx={{ height: 28 }} />
        </Toolbar>
      </AppBar>

<Box sx={{ maxWidth: 1400, mx: "auto", p: 5 }}>
        {/* BACK */}
        <Box
          onClick={() => navigate("/login")}
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

       <Grid container spacing={4}>
  {/* LEFT COLUMN – WIDER */}
  <Grid item xs={12} md={7}>
    <Stack spacing={3}>
      {/* Claimant Name */}
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
        />
      </Box>

      {/* Claimant Type */}
      <Box>
        <Typography fontWeight={600} mb={1}>
          Claimant Type
        </Typography>
        <FormControl fullWidth sx={inputStyle}>
          <Select
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
      </Box>

      {/* SSN */}
      <Box>
        <Typography fontWeight={600} mb={1}>
          SSN Number
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter SSN Number"
          sx={inputStyle}
          value={ssnNumber}
          onChange={(e) => setSsnNumber(e.target.value)}
          onBlur={fetchPolicyDetails}
        />
      </Box>
    </Stack>
  </Grid>

  {/* RIGHT COLUMN – NARROWER */}
  <Grid item xs={12} md={5}>
    <Stack spacing={3}>
      {/* Gender */}
      <Box>
        <Typography fontWeight={600} mb={1}>
          Gender
        </Typography>
        <RadioGroup
          row
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          sx={{
            height: 56,
            px: 2,
            borderRadius: "12px",
            backgroundColor: "#EEF5FF",
            border: "1px solid #C5C9CE",
            alignItems: "center",
          }}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
      </Box>

      {/* Relationship */}
      {claimantType === "family" && (
        <Box>
          <Typography fontWeight={600} mb={1}>
            Relationship to Policy Holder
          </Typography>
          <FormControl fullWidth sx={inputStyle}>
            <Select
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>Select Relationship</MenuItem>
              <MenuItem value="spouse">Spouse</MenuItem>
              <MenuItem value="son">Son</MenuItem>
              <MenuItem value="daughter">Daughter</MenuItem>
              <MenuItem value="father">Father</MenuItem>
              <MenuItem value="mother">Mother</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}
    </Stack>
  </Grid>
</Grid>



          {loadingPolicy && <Typography mt={3}>Loading policy details…</Typography>}
          {policyError && <Typography mt={3} color="error">{policyError}</Typography>}

          {policyDetails && (
            <Box sx={{ mt: 4, p: 3, backgroundColor: "rgba(176,216,231,0.25)", borderRadius: 2 }}>
              <Typography fontWeight={600} color="#48868B" mb={2}>
                Policy Details
              </Typography>
              <Typography><b>Policy Number:</b> {policyDetails.policyNumber}</Typography>
              <Typography><b>Policy Type:</b> {policyDetails.policyType}</Typography>
              <Typography><b>Coverage Type:</b> {policyDetails.coverageType}</Typography>
              <Typography><b>Base Sum Insured:</b> {policyDetails.baseSumInsured}</Typography>
              <Typography><b>Policy Status:</b> {policyDetails.policyStatus}</Typography>
            </Box>
          )}
        </Paper>

        {/* DOCUMENTS – ALWAYS VISIBLE */}
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography fontSize={18} fontWeight={700} mb={3}>Documents</Typography>

          <Box
  onClick={() => navigate("/upload-documents")}
  sx={{
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
      </Box>
    </Box>
  );
};

export default Registration;
