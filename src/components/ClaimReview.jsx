import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  LinearProgress,
  CircularProgress,   
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import aaseyaLogo from "../assets/Aaseyalogo.svg";
import logoutIcon from "../assets/logout.svg";
import downloadIcon from "../assets/download.svg";

export default function ClaimReview() {
  const navigate = useNavigate();
  const { claimId } = useParams();

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("access_token");

  const [claim, setClaim] = useState(null);
  const [aiIntake, setAiIntake] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/ais/login");
  };

  
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        if (!claimId || !token) return;

        setLoading(true);

        const [claimRes, aiRes] = await Promise.all([
          fetch(`${baseUrl}/healthcare/claims/${claimId}/summary`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${baseUrl}/healthcare/claims/${claimId}/ai-intake`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (claimRes.status === 401) {
          handleLogout();
          return;
        }

        if (!claimRes.ok) {
          throw new Error("Failed to fetch claim details");
        }

        const claimData = await claimRes.json();
        setClaim(claimData);

        if (aiRes.ok) {
          const aiData = await aiRes.json();
          setAiIntake(aiData);
        } else {
          setAiIntake(null);
        }

      } catch (err) {
        console.error(err);
        setError("Unable to load claim details");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [claimId, token, baseUrl]);

  
  const handleDownload = (fileUrl, fileName) => {
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

 

  
  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 20 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F5F7F8" }}>

      <Box
        sx={{
          position: "fixed",
          width: "100%",
          backgroundColor: "#4C8B92",
          px: 5,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 1200,
        }}
      >
        <Box component="img" src={aaseyaLogo} sx={{ height: 30 }} />

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ cursor: "pointer" }}
          onClick={handleLogout}
        >
          <Box component="img" src={logoutIcon} sx={{ height: 18 }} />
          <Typography sx={{ color: "#fff", fontSize: 13 }}>
            Logout
          </Typography>
        </Stack>
      </Box>

      
     <Box sx={{ maxWidth: "1200px", mx: "auto", px: 4, pt: "100px", pb: 4, position: "relative" }}>

  {loading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <CircularProgress size={50} />
    </Box>
  ) : error ? (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <Typography color="error">{error}</Typography>
    </Box>
  ) : (
    <>
     
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ cursor: "pointer", mb: 2 }}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon fontSize="small" />
        <Typography fontSize={13}>Back</Typography>
      </Stack>

      
      <Typography fontSize={22} fontWeight={600} mb={3}>
        Claim Review - {claim?.claimId}
      </Typography>

      
      <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
        <Typography fontSize={18} fontWeight={700} mb={2}>
          {claim?.claimantName || "N/A"}
        </Typography>

        <Stack direction="row" spacing={6} flexWrap="wrap">
          <Info label="Policy Number" value={claim?.policyNumber} />
          <Info label="Coverage Type" value={claim?.policyCoverageType} />
          <Info label="Sum Insured" value={claim?.sumInsured} />
          <Info label="Claim Amount" value={claim?.claimAmount} />
        </Stack>
      </Paper>

     
      <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
        <Typography fontSize={15} fontWeight={600} mb={2}>
          AI Intake Findings
        </Typography>

        <Stack direction="row" spacing={3} flexWrap="wrap">
          <Paper sx={{ flex: 1, p: 2 }}>
            <Typography fontSize={13} fontWeight={600}>
              Summary Analysis
            </Typography>
            <Typography fontSize={12} mt={1} color="text.secondary">
              {aiIntake?.summaryAnalysis || "No AI summary available"}
            </Typography>
          </Paper>

          <Paper sx={{ flex: 1, p: 2 }}>
            <Typography fontSize={13} fontWeight={600}>
              Confidence Score
            </Typography>

            <LinearProgress
              variant="determinate"
              value={aiIntake?.confidenceValue ?? 0}
              sx={{ height: 6, borderRadius: 5, my: 1 }}
            />

            <Typography fontSize={12} mb={2}>
              {aiIntake?.confidenceValue ?? 0}%
            </Typography>

            <Typography fontSize={13} fontWeight={600} mb={1}>
              Flags Detected
            </Typography>

            {aiIntake?.flags?.length > 0 ? (
              aiIntake.flags.map((flag, index) => (
                <Typography key={index} fontSize={12} color="text.secondary">
                  • {flag}
                </Typography>
              ))
            ) : (
              <Typography fontSize={12} color="text.secondary">
                No flags detected
              </Typography>
            )}
          </Paper>
        </Stack>
      </Paper>

      
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography fontSize={15} fontWeight={600} mb={2}>
          Uploaded Documents
          
        </Typography>

        <Stack spacing={2}>
          {(claim?.documents?.length > 0 ? claim.documents : []).map((doc) => (
            <Paper
              key={doc.documentId}
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 2,
                boxShadow: "0px 1px 4px rgba(0,0,0,0.06)",
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <InsertDriveFileIcon sx={{ fontSize: 20 }} color="error" />
                <Typography fontSize={13} fontWeight={500}>
                  {doc.fileName}
                </Typography>
              </Stack>

              <Box
                onClick={() => handleDownload(doc.fileUrl, doc.fileName)}
                sx={{
                  cursor: "pointer",
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 1,
                  "&:hover": { backgroundColor: "#EAF4F5" },
                }}
              >
                <Box component="img" src={downloadIcon} sx={{ width: 16 }} />
              </Box>
            </Paper>
          ))}
        </Stack>
      </Paper>

      
      <Stack direction="row" justifyContent="flex-end" spacing={2} mt={4}>
        <Button
          variant="outlined"
          sx={{ borderRadius: "999px", px: 4, textTransform: "none" }}
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          sx={{
            borderRadius: "999px",
            px: 4,
            textTransform: "none",
            backgroundColor: "#4C8B92",
            color: "#fff",
          }}
          onClick={() => navigate(`/claim-checklist/${claimId}`)}
        >
          Continue
        </Button>
      </Stack>
    </>
  )}
</Box>
    </Box>
  );
}

function Info({ label, value }) {
  return (
    <Box>
      <Typography fontSize={11} color="text.secondary">
        {label}
      </Typography>
      <Typography fontSize={14} fontWeight={600}>
        {value || "N/A"}
      </Typography>
    </Box>
  );
}