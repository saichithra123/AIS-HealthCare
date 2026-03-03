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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/ais/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!claimId || !token) return;

        setLoading(true);

        const res = await fetch(
          `${baseUrl}/healthcare/claims/${claimId}/summary`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.status === 401) {
          handleLogout();
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to fetch claim details");
        }

        const data = await res.json();
        console.log("SUMMARY DATA:", data);
        setClaim(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load claim details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [claimId, token, baseUrl]);

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

      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: 4,
          pt: "100px",
          pb: 4,
        }}
      >
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

            {/* Claim Info */}
            <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
              <Typography fontSize={18} fontWeight={700} mb={2}>
                {claim?.memberName || "N/A"}
              </Typography>

              <Stack direction="row" spacing={6} flexWrap="wrap">
                <Info label="Policy Number" value={claim?.policyNumber} />
                <Info label="Coverage Type" value={claim?.policyCoverageType} />
                <Info label="Sum Insured" value={claim?.sumInsured} />
                <Info label="Claim Amount" value={claim?.claimAmount} />
              </Stack>
            </Paper>

            {/* AI Intake */}
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
                    {claim?.aiIntakeFindings?.summaryAnalysis ||
                      "No AI summary available"}
                  </Typography>
                </Paper>

                <Paper sx={{ flex: 1, p: 2 }}>
                  <Typography fontSize={13} fontWeight={600}>
                    Confidence Score
                  </Typography>

                  <LinearProgress
                    variant="determinate"
                    value={
                      claim?.aiIntakeFindings?.claimConfidenceValue ?? 0
                    }
                    sx={{ height: 6, borderRadius: 5, my: 1 }}
                  />

                  <Typography fontSize={12} mb={2}>
                    {claim?.aiIntakeFindings?.claimConfidenceValue ?? 0}%
                  </Typography>

                  <Typography fontSize={13} fontWeight={600} mb={1}>
                    Flags Detected
                  </Typography>

                  <Typography fontSize={12} color="text.secondary">
                    {claim?.aiIntakeFindings?.flagsDetected ||
                      "No flags detected"}
                  </Typography>
                </Paper>
              </Stack>
            </Paper>

       <Paper sx={{ p: 3, borderRadius: 3 }}>
  <Typography fontSize={15} fontWeight={600} mb={3}>
    Uploaded Documents
  </Typography>

  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 3,
    }}
  >
    {(claim?.uploadedDocuments || []).map((doc) => (
      <Paper
        key={doc.documentId}
        sx={{
          p: 2,
          borderRadius: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#F7F7F7",
          boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
        }}
      >
        {/* LEFT SIDE */}
        <Stack direction="row" spacing={2} alignItems="center">
          <InsertDriveFileIcon
            sx={{
              color: "#E53935",
              fontSize: 30,
            }}
          />

          <Typography fontSize={14} fontWeight={500}>
            {doc.filePath}
          </Typography>
        </Stack>

        {/* RIGHT SIDE DOWNLOAD ICON */}
        <Box
          component="img"
          src={downloadIcon}
          sx={{
            width: 22,
            cursor: "pointer",
          }}
          onClick={() => {
            if (!doc.fileDetails) return;

            const link = document.createElement("a");
            link.href = `data:application/pdf;base64,${doc.fileDetails}`;
            link.download = doc.filePath;
            link.click();
          }}
        />
      </Paper>
    ))}
  </Box>
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