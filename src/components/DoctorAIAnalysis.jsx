import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from "@mui/icons-material/Check";
import aaseyaLogo from "../assets/Aaseyalogo.svg";
import logoutIcon from "../assets/logout.svg";

// Mock AI analysis results
const AI_RESULT = {
  diagnosis: {
    name: "Carpal Tunnel Syndrome, Right",
    icdCode: "G56.01",
    severity: "MODERATE TO SEVERE",
  },
  findings: [
    "Fracture of the scaphoid bone, displaced (92%)",
    "Significant soft tissue swelling in the wrist region (92%)",
  ],
  recommendations: [
    "Treatment: Open",
    "Urgency Level: Emergency",
  ],
  provider: {
    name: "Dr. Sarah Lawson",
    title: "Orthopedic Surgeon",
    verifiedText: "Verified as per uploaded doc and login",
  },
};

function SignatureSVG() {
  return (
    <svg
      width="100%"
      height="48"
      viewBox="0 0 280 48"
      preserveAspectRatio="xMinYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", marginBottom: 2 }}
    >
      <text
        x="0"
        y="36"
        fontFamily="'Segoe Script', 'Lucida Handwriting', 'Brush Script MT', cursive"
        fontSize="24"
        fill="#222"
        fontStyle="italic"
      >
        Dr. Sarah Lawson MD
      </text>
    </svg>
  );
}

/* ---- Radiology image with zoom controls overlay ---- */
function RadiologyViewer() {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.2, 2.5));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.5));
  const handleReset = () => setZoom(1);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "8px",
        backgroundColor: "#000",
        flexGrow: 1,
        height: "100%",
        minHeight: 400,
        cursor: "zoom-in",
      }}
    >
      {/* X-Ray image */}
      <Box
        component="img"
        src={`${import.meta.env.BASE_URL}xray_annotated.png`}
        alt="Radiology X-Ray with AI annotations"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          transform: `scale(${zoom})`,
          transformOrigin: "center center",
          transition: "transform 0.25s ease",
        }}
      />

      {/* Zoom controls */}
      <Box
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        {[
          { label: "+", action: handleZoomIn, title: "Zoom In" },
          { label: "−", action: handleZoomOut, title: "Zoom Out" },
          { label: "↺", action: handleReset, title: "Reset" },
          { label: "⤢", action: () => {}, title: "Fullscreen" },
        ].map(({ label, action, title }) => (
          <Box
            key={title}
            title={title}
            onClick={action}
            sx={{
              width: 32,
              height: 32,
              backgroundColor: "rgba(255,255,255,0.85)",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: 16,
              fontWeight: 700,
              color: "#333",
              "&:hover": { backgroundColor: "#fff" },
              boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
            }}
          >
            {label}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function DoctorAIAnalysis() {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [submitted, setSubmitted] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      navigate("/workpool");
    }, 2000);
  };

  if (submitted) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#F7F9F9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            maxWidth: 480,
            width: "100%",
            borderRadius: 4,
            border: "1px solid #E0EEF0",
            p: 6,
            textAlign: "center",
            backgroundColor: "#fff",
            boxShadow: "0px 8px 32px rgba(76,139,146,0.12)",
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "#E8F5E9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 48, color: "#2E7D32" }} />
          </Box>
          <Typography fontSize={22} fontWeight={700} mb={1} color="#1A3C3E">
            Claim Submitted Successfully!
          </Typography>
          <Typography fontSize={14} color="text.secondary" mb={2}>
            The pre-approval claim for patient <strong>{patientId}</strong> has been submitted. Redirecting to Workpool…
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F7F9F9", pb: 12 }}>
      {/* ---- Navbar ---- */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#4C8B92",
          px: { xs: 2.5, md: 5 },
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 1200,
        }}
      >
        <Box component="img" src={aaseyaLogo} sx={{ height: 30, filter: "brightness(0) invert(1)" }} />
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ cursor: "pointer" }}
          onClick={handleLogout}
        >
          <Box component="img" src={logoutIcon} sx={{ height: 18 }} />
          <Typography sx={{ color: "#fff", fontSize: 14 }}>Logout</Typography>
        </Stack>
      </Box>

      {/* ---- Content ---- */}
      <Box sx={{ width: "100%", pt: "90px", px: { xs: 2.5, md: 5 } }}>
        {/* Back */}
        <Box
          onClick={() => navigate(-1)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            cursor: "pointer",
            mt: 2,
            mb: 1,
            color: "#333",
            width: "fit-content",
            "&:hover": { color: "#4C8B92" },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          <Typography fontSize={14}>Back</Typography>
        </Box>

        {/* Page title */}
        <Typography fontSize={{ xs: 20, md: 26 }} fontWeight={700} mb={3}>
          AI Diagnosis &amp; Recommendation - {patientId || "PD-100301093"}
        </Typography>

        {/* ---- Two-column layout ---- */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
          {/* LEFT: Radiology View */}
          <Paper
            elevation={0}
            sx={{
              border: "1px solid #E8E8E8",
              borderRadius: 3,
              overflow: "hidden",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ px: 3, pt: 3, pb: 1 }}>
              <Typography fontSize={18} fontWeight={700} mb={2}>
                Radiology View
              </Typography>
            </Box>
            <Box sx={{ px: 3, pb: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
              <RadiologyViewer />
            </Box>
          </Paper>

          {/* RIGHT: AI Insights */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* AI Insights & Extraction header */}
            <Paper
              elevation={0}
              sx={{
                border: "1px solid #E8E8E8",
                borderRadius: 3,
                overflow: "hidden",
                backgroundColor: "#fff",
              }}
            >
              <Box sx={{ px: 3, pt: 3, pb: 1 }}>
                <Typography fontSize={18} fontWeight={700} mb={2}>
                  AI Insights &amp; Extraction
                </Typography>
              </Box>

              {/* Diagnosis */}
              <Box sx={{ px: 3, pb: 2 }}>
                <Paper
                  elevation={0}
                  sx={{
                    border: "1px solid #EAEAEA",
                    borderRadius: "8px",
                    p: 2.5,
                    backgroundColor: "#fff",
                    boxShadow: "0px 2px 14px rgba(0,0,0,0.03)",
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography fontSize={16} fontWeight={700} color="#111">
                      Diagnosis
                    </Typography>
                    <Chip
                      label={AI_RESULT.diagnosis.severity}
                      size="small"
                      sx={{
                        backgroundColor: "#FFEDD5",
                        color: "#EA580C",
                        fontWeight: 700,
                        fontSize: 10,
                        letterSpacing: 0.5,
                        height: 22,
                        border: "1px solid #FDBA74",
                      }}
                    />
                  </Stack>
                  <Typography fontSize={18} fontWeight={700} color="#111" mb={0.5}>
                    {AI_RESULT.diagnosis.name}
                  </Typography>
                  <Typography fontSize={14} color="#555">
                    ICD Code : {AI_RESULT.diagnosis.icdCode}
                  </Typography>
                </Paper>
              </Box>

              {/* Extracted Findings */}
              <Box sx={{ px: 3, pb: 2 }}>
                <Paper
                  elevation={0}
                  sx={{
                    border: "1px solid #EAEAEA",
                    borderRadius: "8px",
                    p: 2.5,
                    backgroundColor: "#fff",
                    boxShadow: "0px 2px 14px rgba(0,0,0,0.03)",
                  }}
                >
                  <Typography fontSize={16} fontWeight={700} color="#111" mb={2}>
                    Extracted Findings
                  </Typography>
                  {AI_RESULT.findings.map((f, i) => (
                    <Stack key={i} direction="row" spacing={1.5} alignItems="center" mb={1.25}>
                      <Box
                        sx={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          backgroundColor: "#4C8B92",
                          flexShrink: 0,
                        }}
                      />
                      <Typography fontSize={15} color="#333">
                        {f}
                      </Typography>
                    </Stack>
                  ))}
                </Paper>
              </Box>

              {/* Recommendations */}
              <Box sx={{ px: 3, pb: 3 }}>
                <Paper
                  elevation={0}
                  sx={{
                    border: "1px solid #EAEAEA",
                    borderRadius: "8px",
                    p: 2.5,
                    backgroundColor: "#fff",
                    boxShadow: "0px 2px 14px rgba(0,0,0,0.03)",
                  }}
                >
                  <Typography fontSize={16} fontWeight={700} color="#111" mb={2}>
                    Recommendations
                  </Typography>
                  {AI_RESULT.recommendations.map((r, i) => (
                    <Stack key={i} direction="row" spacing={1.5} alignItems="center" mb={1.25}>
                      <Box
                        sx={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          backgroundColor: "#4C8B92",
                          flexShrink: 0,
                        }}
                      />
                      <Typography fontSize={15} color="#333">
                        {r}
                      </Typography>
                    </Stack>
                  ))}
                </Paper>
              </Box>
            </Paper>

            {/* Provider Verification */}
            <Paper
              elevation={0}
              sx={{
                border: "1px solid #EAEAEA",
                borderRadius: 3,
                p: 3,
                backgroundColor: "#fff",
                boxShadow: "0px 2px 14px rgba(0,0,0,0.04)",
              }}
            >
              <Typography fontSize={16} fontWeight={700} mb={2} color="#111">
                Provider Verification
              </Typography>
              <Typography fontSize={13} color="#222" mb={1.5}>
                Extracted Provider :{" "}
                <Box component="span" sx={{ fontWeight: 700, color: "#111" }}>
                  {AI_RESULT.provider.name}
                </Box>
              </Typography>

              {/* Verified badge */}
              <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
                <CheckCircleIcon sx={{ color: "#4CAF50", fontSize: 18 }} />
                <Typography fontSize={12} color="#333">
                  {AI_RESULT.provider.verifiedText}
                </Typography>
              </Stack>

              {/* Signature */}
              <Box>
                <SignatureSVG />
                <Divider sx={{ mb: 1, mt: 0.5, borderColor: "#E8E8E8", width: "160px" }} />
                <Typography fontSize={11} fontWeight={600} color="#333" mb={0.25}>
                  {AI_RESULT.provider.name}
                </Typography>
                <Typography fontSize={10} color="text.secondary">
                  {AI_RESULT.provider.title}
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>

        {/* ---- Inline Action Bar ---- */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 2,
            mt: 4,
            mb: 4,
          }}
        >
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{
            borderRadius: "999px",
            px: 4,
            py: 1.2,
            fontSize: 14,
            fontWeight: 600,
            textTransform: "none",
            borderColor: "#4C8B92",
            color: "#4C8B92",
            backgroundColor: "#fff",
            "&:hover": { backgroundColor: "#EAF4F5" },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#4C8B92",
            color: "#fff",
            borderRadius: "999px",
            px: 4,
            py: 1.2,
            fontSize: 14,
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0 4px 16px rgba(76,139,146,0.35)",
            "&:hover": { backgroundColor: "#3B7D84" },
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  </Box>
  );
}
