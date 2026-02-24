// import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  LinearProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import aaseyaLogo from "../assets/Aaseyalogo.svg";
import logoutIcon from "../assets/logout.svg";

export default function ClaimReview() {
  const navigate = useNavigate();
  const { claimId } = useParams();
  const { state } = useLocation();

  const claim = state?.claimData || {};

  const handleLogout = () => {
    localStorage.clear();
    navigate("/ais/login");
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F5F7F8" }}>

      {/* ================= HEADER ================= */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1200,
          backgroundColor: "#4C8B92",
          px: 4,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box component="img" src={aaseyaLogo} alt="aaseya" sx={{ height: 32 }} />

        <Box
          onClick={handleLogout}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
        >
          <Box component="img" src={logoutIcon} sx={{ height: 18 }} />
          <Typography fontSize={14} color="#fff" fontWeight={500}>
            Logout
          </Typography>
        </Box>
      </Box>

      {/* ================= PAGE CONTENT ================= */}
      <Box
        sx={{
          maxWidth: "1366px",
          mx: "auto",
          px: 4,
          pt: 12, // 🔥 IMPORTANT FIX (space for fixed header)
          pb: 4,
        }}
      >

        {/* BACK */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ cursor: "pointer", mb: 2 }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon fontSize="small" />
          <Typography fontSize={14}>Back</Typography>
        </Stack>

        {/* TITLE */}
        <Typography fontSize={28} fontWeight={600} mb={3}>
          Claim Review - {claimId}
        </Typography>

        {/* ================= CLAIM HEADER CARD ================= */}
        <Paper sx={{ p: 4, borderRadius: 3, mb: 3 }}>
          <Typography fontSize={26} fontWeight={700}>
            {claim.claimantName || "Johnathan Doe"}
          </Typography>

          <Stack
            direction="row"
            spacing={8}
            mt={3}
            flexWrap="wrap"
          >
            <Box>
              <Typography fontSize={12} color="text.secondary">
                Policy Number
              </Typography>
              <Typography fontWeight={600}>
                {claim.policyNumber || "IN-656947"}
              </Typography>
            </Box>

            <Box>
              <Typography fontSize={12} color="text.secondary">
                Coverage Type
              </Typography>
              <Typography fontWeight={600}>
                {claim.coverageType || "Platinum Care"}
              </Typography>
            </Box>

            <Box>
              <Typography fontSize={12} color="text.secondary">
                Sum Insured Covered
              </Typography>
              <Typography fontWeight={600}>
                {claim.sumInsured || "$50,000.00"}
              </Typography>
            </Box>

            <Box>
              <Typography fontSize={12} color="text.secondary">
                Claim Amount
              </Typography>
              <Typography fontWeight={600}>
                {claim.claimAmount || "$24,580.00"}
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* ================= AI FINDINGS ================= */}
        <Paper sx={{ p: 4, borderRadius: 3, mb: 3 }}>
          <Typography fontSize={18} fontWeight={600} mb={3}>
            AI Intake Findings
          </Typography>

          <Stack direction="row" spacing={3} flexWrap="wrap">
            <Paper sx={{ flex: 1, p: 3, minWidth: 300 }}>
              <Typography fontWeight={600}>Summary Analysis</Typography>
              <Typography fontSize={14} mt={2} color="text.secondary">
                {claim.summary ||
                  "AI detected consistent medical documentation and valid policy coverage."}
              </Typography>
            </Paper>

            <Paper sx={{ flex: 1, p: 3, minWidth: 300 }}>
              <Typography fontWeight={600} mb={2}>
                Confidence Score
              </Typography>

              <LinearProgress
                variant="determinate"
                value={claim.confidenceScore || 90}
                sx={{ height: 8, borderRadius: 5, mb: 1 }}
              />

              <Typography fontSize={14}>
                {claim.confidenceScore || 90}%
              </Typography>

              <Typography mt={3} fontWeight={600}>
                Flags Detected
              </Typography>

              <Typography fontSize={14} color="text.secondary">
                {claim.flags || "Address verification pending"}
              </Typography>
            </Paper>
          </Stack>
        </Paper>

        {/* ================= DOCUMENTS ================= */}
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography fontSize={18} fontWeight={600} mb={3}>
            Uploaded Documents
          </Typography>

          <Stack spacing={2}>
            {(claim.documents || [
              "Medical_Form1.pdf",
              "Policy_Card1.pdf",
              "Hospital_Bill.pdf",
            ]).map((doc, index) => (
              <Paper
                key={index}
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <InsertDriveFileIcon color="error" />
                  <Typography fontSize={14}>{doc}</Typography>
                </Stack>

                <Typography sx={{ cursor: "pointer" }}>⬇</Typography>
              </Paper>
            ))}
          </Stack>
        </Paper>

        {/* BUTTONS */}
        <Stack direction="row" justifyContent="flex-end" spacing={2} mt={4}>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            sx={{ backgroundColor: "#4A8F97" }}
            onClick={() =>
              navigate(`/ais/claim-summary/${claimId}`, {
                state: { claimData: claim },
              })
            }
          >
            Continue
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}