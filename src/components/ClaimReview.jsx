import { useLocation, useNavigate, useParams } from "react-router-dom";
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

import aaseyaLogo from "../assets/Aaseyalogo.svg";
import logoutIcon from "../assets/logout.svg";

export default function ClaimReview() {
  const navigate = useNavigate();
  const { claimId } = useParams();
  const { state } = useLocation();

  const claim = state?.claimData || {};

  const handleLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("username");

  navigate("/ais/login");
};
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff" }}>

      {/* HEADER */}
      <Box
  sx={{
    position: "fixed",
    left: 0,
    width: "100%",
    zIndex: 1200,
    backgroundColor: "#4C8B92",
    px: 4,
    py: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between", // 👈 important
  }}
>
  {/* LEFT - LOGO */}
  <Box component="img" src={aaseyaLogo} alt="aaseya" sx={{ height: 32 }} />

  {/* RIGHT - LOGOUT */}
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
    <Typography
      fontSize={14}
      color="#fff"
      fontWeight={500}
    >
      Logout
    </Typography>
  </Box>
</Box>

      <Box sx={{ maxWidth: "1366px", mx: "auto", px: 4, py: 3 }}>

        {/* BACK */}
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer", mb: 1 }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon fontSize="small" />
          <Typography fontSize={14}>Back</Typography>
        </Box>

        {/* TITLE */}
        <Typography fontSize={28} fontWeight={600} mb={2}>
          Claim Review - {claimId}
        </Typography>

        {/* ================= CLAIM HEADER CARD ================= */}
        <Paper sx={{ p: 3, borderRadius: "12px", mb: 2 }}>
          <Typography fontSize={26} fontWeight={700}>
            {claim.claimantName || "Johnathan Doe"}
          </Typography>

          <Stack direction="row" spacing={6} mt={2}>
            <Box>
              <Typography fontSize={12}>Policy Number</Typography>
              <Typography fontWeight={600}>IN-656947</Typography>
            </Box>

            <Box>
              <Typography fontSize={12}>Coverage Type</Typography>
              <Typography fontWeight={600}>Platinum Care</Typography>
            </Box>

            <Box>
              <Typography fontSize={12}>Sum Insured Covered</Typography>
              <Typography fontWeight={600}>$50,000.00</Typography>
            </Box>

            <Box>
              <Typography fontSize={12}>Claim Amount</Typography>
              <Typography fontWeight={600}>
                {claim.claimAmount || "$24,580.00"}
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* ================= AI FINDINGS ================= */}
        <Paper sx={{ p: 3, borderRadius: "12px", mb: 2 }}>
          <Typography fontSize={18} fontWeight={600} mb={2}>
            AI Intake Findings
          </Typography>

          <Stack direction="row" spacing={2}>
            <Paper sx={{ flex: 1, p: 2 }}>
              <Typography fontWeight={600}>Summary Analysis</Typography>
              <Typography fontSize={13} mt={1}>
                Lorem ipsum is simply dummy text of the printing and
                typesetting industry.
              </Typography>
            </Paper>

            <Paper sx={{ flex: 1, p: 2 }}>
              <Typography fontWeight={600} mb={1}>
                Confidence Score
              </Typography>

              <LinearProgress
                variant="determinate"
                value={90}
                sx={{
                  height: 8,
                  borderRadius: 5,
                  mb: 1,
                }}
              />

              <Typography fontSize={13}>90%</Typography>

              <Typography mt={2} fontWeight={600}>
                Flags Detected
              </Typography>
              <Typography fontSize={13}>• Address verification pending</Typography>
            </Paper>
          </Stack>
        </Paper>

        {/* ================= DOCUMENTS ================= */}
        <Paper sx={{ p: 3, borderRadius: "12px" }}>
          <Typography fontSize={18} fontWeight={600} mb={2}>
            Uploaded Documents
          </Typography>

          <Stack spacing={2}>
            {["Medical_Form1.pdf", "Policy_Card1.pdf", "Hospital_Bill.pdf"].map(
              (doc) => (
                <Paper
                  key={doc}
                  sx={{
                    p: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <InsertDriveFileIcon color="error" />
                    <Box>
                      <Typography fontSize={14}>{doc}</Typography>
                      <Typography fontSize={12} color="gray">
                        2.4 MB • Oct 12, 2026
                      </Typography>
                    </Box>
                  </Stack>

                  <Typography sx={{ cursor: "pointer" }}>⬇</Typography>
                </Paper>
              )
            )}
          </Stack>
        </Paper>

        {/* BUTTONS */}
        <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            sx={{ backgroundColor: "#4A8F97" }}
            onClick={() =>
              navigate(`/claim-summary/${claimId}`, {
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
