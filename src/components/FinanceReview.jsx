import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import aaseyaLogo from "../assets/Aaseyalogo.svg";
import { useState } from "react";
import logoutIcon from "../assets/logout.svg";

export default function FinanceReview() {
  const navigate = useNavigate();
  const { claimId } = useParams();
  const [decision, setDecision] = useState("");
  const [comments, setComments] = useState("");
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

      {/* ================= MAIN CONTENT ================= */}
      <Box
        sx={{
          maxWidth: "1200px",   // reduced from 1306 (fix zoom feel)
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
          Financial Cost & Policy Review - {claimId}
        </Typography>

        {/* ================= FINANCIAL OVERVIEW ================= */}
        <Paper
          sx={{
            p: 2.5,
            borderRadius: "12px",
            mb: 2.5,
            border: "1px solid #E6DBD3",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.05)",
          }}
        >
          <Typography sx={{ fontSize: 15, fontWeight: 600, mb: 1.5 }}>
            Financial Overview
          </Typography>

          <Stack direction="row" spacing={2.5}>
            {[
              { label: "Estimated Total Cost", value: "$12,450.00" },
              { label: "Policy Sum Insured", value: "$50,000.00" },
              { label: "Available Balance", value: "$37,550.00" },
            ].map((item) => (
              <Paper
                key={item.label}
                sx={{
                  flex: 1,
                  py: 1.5,
                  px: 2,
                  borderRadius: "10px",
                  backgroundColor: "#F2F6F7",
                  textAlign: "center",
                  boxShadow: "none",
                }}
              >
                <Typography sx={{ fontSize: 12, color: "#555" }}>
                  {item.label}
                </Typography>
                <Typography sx={{ fontSize: 16, fontWeight: 700, mt: 0.5 }}>
                  {item.value}
                </Typography>
              </Paper>
            ))}
          </Stack>
        </Paper>

        {/* ================= CLAIM SUMMARY ================= */}
        <Paper
          sx={{
            p: 2.5,
            borderRadius: "12px",
            mb: 2.5,
            border: "1px solid #E6DBD3",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.05)",
          }}
        >
          <Typography sx={{ fontSize: 15, fontWeight: 600, mb: 1.5 }}>
            Claim Summary
          </Typography>

          <Stack direction="row" spacing={5}>
            <Box>
              <Typography sx={{ fontSize: 11, color: "#666" }}>
                Full Name
              </Typography>
              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                Johnathan Doe
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ fontSize: 11, color: "#666" }}>
                Hospital/Provider
              </Typography>
              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                City General Hospital
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ fontSize: 11, color: "#666" }}>
                Treatment Type
              </Typography>
              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                Acute Appendectomy
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ fontSize: 11, color: "#666" }}>
                Admission Date
              </Typography>
              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                Oct 20, 2026
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={5} mt={2}>
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
                Reviewing Manager
              </Typography>
              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                Sarah Jenkins
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* ================= DECISION ================= */}
        <Paper
          sx={{
            p: 2.5,
            borderRadius: "12px",
            border: "1px solid #E6DBD3",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.05)",
          }}
        >
          <Typography sx={{ fontSize: 15, fontWeight: 600, mb: 1.5 }}>
            Finance Officer Decision
          </Typography>

          <RadioGroup
            row
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
          >
            <FormControlLabel
              value="approve"
              control={<Radio size="small" />}
              label={<Typography sx={{ fontSize: 13 }}>Approve</Typography>}
            />
            <FormControlLabel
              value="reject"
              control={<Radio size="small" />}
              label={<Typography sx={{ fontSize: 13 }}>Reject</Typography>}
            />
          </RadioGroup>

          <Typography sx={{ fontSize: 12, mt: 2, mb: 1 }}>
            Comments
          </Typography>

          <TextField
            fullWidth
            size="small"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />

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
        </Paper>
      </Box>
    </Box>
  );
}
