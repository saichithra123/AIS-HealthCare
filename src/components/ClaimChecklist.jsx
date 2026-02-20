import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import aaseyaLogo from "../assets/Aaseyalogo.svg";
import logoutIcon from "../assets/logout.svg";

export default function ClaimChecklist() {
  const navigate = useNavigate();
  const { claimId } = useParams();

  const checklistItems = [
    "Policy active status verified",
    "Member covered under policy confirmed",
    "Diagnosis - procedure combinations",
    "ICD-10 mapped to allowed procedures",
  ];
const handleLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("username");

  navigate("/ais/login");
};
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      
      {/* ================= FIXED HEADER ================= */}
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

      {/* ================= MAIN CONTAINER ================= */}
      <Box
        sx={{
          maxWidth: "1200px",   // reduced width (fix zoom feel)
          mx: "auto",
          px: "30px",
          pt: "85px",
          pb: "40px",
        }}
      >
        {/* BACK */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            mb: 1,
          }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon sx={{ fontSize: 18 }} />
          <Typography sx={{ fontSize: 13, ml: 0.5 }}>
            Back
          </Typography>
        </Box>

        {/* TITLE */}
        <Typography sx={{ fontSize: 22, fontWeight: 600, mb: 2.5 }}>
          Checklist - {claimId}
        </Typography>

        {/* ================= CLAIM HEADER CARD ================= */}
        <Paper
          sx={{
            p: 2.5,
            borderRadius: "12px",
            mb: 2.5,
            border: "1px solid #E6DBD3",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.05)",
          }}
        >
          <Stack direction="row" justifyContent="space-between">
            <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
              Johnathan Doe
            </Typography>

            <Box
              sx={{
                px: 2,
                py: 0.4,
                borderRadius: "12px",
                backgroundColor: "#DDF7E6",
                fontSize: 11,
                fontWeight: 600,
                color: "#2E9D65",
                height: "fit-content",
              }}
            >
              POLICY ACTIVE
            </Box>
          </Stack>

          <Stack direction="row" spacing={5} mt={2.5}>
            <Box>
              <Typography sx={{ fontSize: 11, color: "#666" }}>
                Policy Number
              </Typography>
              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                IN-656947
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ fontSize: 11, color: "#666" }}>
                Coverage Type
              </Typography>
              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                Platinum Care
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ fontSize: 11, color: "#666" }}>
                Sum Insured Covered
              </Typography>
              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                $50,000.00
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ fontSize: 11, color: "#666" }}>
                Policy Start Date
              </Typography>
              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                Oct 20, 2026
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ fontSize: 11, color: "#666" }}>
                Claim Amount
              </Typography>
              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                $24,580.00
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* ================= CHECKLIST SECTION ================= */}
        <Paper
          sx={{
            p: 2.5,
            borderRadius: "12px",
            border: "1px solid #E6DBD3",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.05)",
          }}
        >
          <Typography sx={{ fontSize: 15, fontWeight: 600, mb: 1.5 }}>
            Verification Checklist
          </Typography>

          <Stack spacing={1.8}>
            {checklistItems.map((item) => (
              <Paper
                key={item}
                sx={{
                  px: 2,
                  py: 1.2,
                  borderRadius: "10px",
                  border: "1px solid #E6DBD3",
                  boxShadow: "none",
                }}
              >
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label={
                    <Typography sx={{ fontSize: 13 }}>
                      {item}
                    </Typography>
                  }
                />
              </Paper>
            ))}
          </Stack>
        </Paper>

        {/* ================= BUTTONS ================= */}
        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={2}
          mt={2.5}
        >
          <Button
            variant="outlined"
            sx={{
              borderRadius: "18px",
              px: 3,
              fontSize: 13,
              textTransform: "none",
            }}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            sx={{
              borderRadius: "18px",
              px: 3,
              fontSize: 13,
              backgroundColor: "#4A8F97",
              textTransform: "none",
              "&:hover": { backgroundColor: "#3B7D84" },
            }}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
