import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import aaseyaLogo from "../assets/Aaseyalogo.svg";
import cloudUploadIcon from "../assets/Icon awesome-cloud-upload-alt.svg";
import { CircularProgress, Tooltip, IconButton } from "@mui/material";
import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import logoutIcon from "../assets/logout.svg";
import { Snackbar, Alert } from "@mui/material";

const uploadSections = [
  { id: "diagnostic", label: "Diagnostic Report", keyword: "Diagnostic Report" },
  { id: "insurance", label: "Insurance Card", keyword: "Insurance card" },
  { id: "medical", label: "Medical Form", keyword: "Medical form" },
];

// Map of sectionId -> expected keyword in the filename
const expectedKeywords = {
  diagnostic: "Diagnostic Report",
  insurance: "Insurance card",
  medical: "Medical form",
};

export default function UploadDocuments() {
  const navigate = useNavigate();

  const [files, setFiles] = useState({
    diagnostic: null,
    insurance: null,
    medical: null,
  });
  const [mismatchErrors, setMismatchErrors] = useState({
    diagnostic: "",
    insurance: "",
    medical: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [docMessage, setDocMessage] = useState("");
  const [docError, setDocError] = useState(false);
  const [caseMessage, setCaseMessage] = useState("");
  const [claimId, setClaimId] = useState("");
  const [copied, setCopied] = useState(false);

  const validateFile = (sectionId, file) => {
    const keyword = expectedKeywords[sectionId];
    const fileName = file.name;
    // Case-insensitive check: filename must contain the expected keyword
    if (!fileName.toLowerCase().includes(keyword.toLowerCase())) {
      return `Document mismatch! Please upload the correct document .`;
    }
    return "";
  };

  const handleFileSelect = (sectionId, file) => {
    setError("");
    setDocMessage("");
    const validationError = validateFile(sectionId, file);
    setMismatchErrors((prev) => ({ ...prev, [sectionId]: validationError }));
    if (!validationError) {
      setFiles((prev) => ({ ...prev, [sectionId]: file }));
    } else {
      // Clear any previously accepted file for this section on mismatch
      setFiles((prev) => ({ ...prev, [sectionId]: null }));
    }
  };

  const handleBrowseClick = (sectionId) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/pdf";

    input.onchange = (e) => {
      const file = e.target.files[0];

      if (file && file.type !== "application/pdf") {
        setError("Only PDF files are allowed");
        return;
      }

      if (file) handleFileSelect(sectionId, file);
    };

    input.click();
  };

  const handleDragOver = (e) => e.preventDefault();
  const allDocumentsUploaded =
    Object.values(files).every((file) => file !== null) &&
    Object.values(mismatchErrors).every((err) => err === "");


  const handleDrop = (e, sectionId) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file && file.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return;
    }

    if (file) handleFileSelect(sectionId, file);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");

    navigate("/ais/login");
  };

  const handleCancel = () => {
    setFiles({
      diagnostic: null,
      insurance: null,
      medical: null,
    });
    setMismatchErrors({
      diagnostic: "",
      insurance: "",
      medical: "",
    });
    setError("");
    setDocMessage("");
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("access_token");
    const username = localStorage.getItem("username");
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    try {
      setSubmitting(true);
      setError("");

      const formData = new FormData();
      formData.append("files", files.diagnostic);
      formData.append("files", files.insurance);
      formData.append("files", files.medical);

      const response = await fetch(
        `${baseUrl}/healthcare/startHealthCareProcess`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Process start failed");

      const result = await response.json();
      console.log("PROCESS RESPONSE:", result);

      const receivedClaimId = result.processInstanceKey;

      if (result.status === "success") {
        setDocMessage("Documents got verified successfully");
        setDocError(false);
        setClaimId(receivedClaimId || "");
        setCaseMessage(result.caseMessage || "Your case has been created successfully.");
        setSuccess(true);
      } else {
        setDocMessage("Kindly upload proper documents");
        setDocError(true);
      }
      // setSuccess(true);

    } catch (err) {
      console.error(err);
      setError("Failed to start healthcare process");
    } finally {
      setSubmitting(false);
    }
  };



  const handleCopyClaimId = () => {
    if (claimId) {
      navigator.clipboard.writeText(String(claimId));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F7F9F9" }}>
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


      {/* ===== SUCCESS SCREEN ===== */}
      {success ? (
        <Box
          sx={{
            pt: "100px",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              maxWidth: 560,
              width: "100%",
              borderRadius: 4,
              border: "1px solid #E0EEF0",
              p: { xs: 4, md: 6 },
              textAlign: "center",
              backgroundColor: "#fff",
              boxShadow: "0px 8px 32px rgba(76,139,146,0.12)",
            }}
          >
            {/* Icon */}
            <Box
              sx={{
                width: 90,
                height: 90,
                borderRadius: "50%",
                backgroundColor: "#E8F5E9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
              }}
            >
              <CheckCircleOutlineIcon sx={{ fontSize: 54, color: "#2E7D32" }} />
            </Box>

            <Typography fontSize={24} fontWeight={700} mb={1} color="#1A3C3E">
              Case Created Successfully!
            </Typography>

            <Typography fontSize={14} color="text.secondary" mb={4}>
              {caseMessage ||
                "Your pre-claim authorization case has been created and is under review."}
            </Typography>

            {/* Claim ID card */}
            <Box
              sx={{
                backgroundColor: "#EAF4F5",
                borderRadius: 3,
                px: 4,
                py: 3,
                mb: 4,
                border: "1px dashed #4C8B92",
                position: "relative",
              }}
            >
              <Typography
                fontSize={12}
                color="text.secondary"
                fontWeight={500}
                mb={0.5}
                textTransform="uppercase"
                letterSpacing={1}
              >
                Your Claim ID
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={1}
              >
                <Typography
                  fontSize={22}
                  fontWeight={700}
                  color="#4C8B92"
                  sx={{ letterSpacing: 1.5 }}
                >
                  {claimId || "—"}
                </Typography>
                <Tooltip title={copied ? "Copied!" : "Copy Claim ID"}>
                  <IconButton
                    size="small"
                    onClick={handleCopyClaimId}
                    sx={{ color: "#4C8B92" }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Typography fontSize={12} color="text.secondary" mt={1}>
                Please save this ID for future reference
              </Typography>
            </Box>

            {/* What happens next */}
            <Box
              sx={{
                backgroundColor: "#F7F9F9",
                borderRadius: 2,
                p: 2,
                mb: 4,
                textAlign: "left",
              }}
            >
              <Typography fontSize={13} fontWeight={600} mb={1} color="#1A3C3E">
                What happens next?
              </Typography>
              {[
                "Our team will review your submitted documents.",
                "You will be notified once the review is complete.",
                "You can track your claim status using the Claim ID above.",
              ].map((text, i) => (
                <Stack key={i} direction="row" spacing={1} alignItems="flex-start" mb={0.5}>
                  <Typography fontSize={13} color="#4C8B92" fontWeight={700}>
                    {i + 1}.
                  </Typography>
                  <Typography fontSize={13} color="text.secondary">
                    {text}
                  </Typography>
                </Stack>
              ))}
            </Box>

            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/")}
              sx={{
                backgroundColor: "#4C8B92",
                color: "#fff",
                borderRadius: "999px",
                py: 1.5,
                textTransform: "none",
                fontSize: 15,
                fontWeight: 600,
                "&:hover": { backgroundColor: "#3B7D84" },
              }}
            >
              Back to Home
            </Button>
          </Paper>
        </Box>
      ) : (
        /* ===== UPLOAD FORM ===== */
        <Box
          sx={{
            px: 4,
            py: 3,
            pt: "96px",
            maxWidth: 1200,
            mx: "auto",
          }}
        >
          <Box
            onClick={() => navigate(-1)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              cursor: "pointer",
              mb: 2,
              fontSize: 14,
            }}
          >
            <ArrowBackIcon fontSize="small" />
            Back
          </Box>

          <Typography fontSize={28} fontWeight={700} mb={3}>
            Pre-Claim Approval Documents
          </Typography>

          <Paper
            elevation={0}
            sx={{
              border: "1px solid #E0E0E0",
              borderRadius: 2,
              p: 3,
            }}
          >
            <Typography fontSize={18} fontWeight={600} mb={1}>
              Upload Documents
            </Typography>

            <Typography fontSize={14} color="text.secondary" mb={3}>
              Please upload the required documents to proceed with your cashless
              pre-authorization request
            </Typography>

            <Stack spacing={2.5}>
              {uploadSections.map((section) => (
                <Box key={section.id}>
                  <Typography fontSize={14} fontWeight={600} mb={1}>
                    {section.label}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{
                      p: 2,
                      borderRadius: "12px",
                      backgroundColor: "#fff",
                      boxShadow: "0px 1px 6px rgba(0,0,0,0.08)",
                    }}
                  >

                    <Box
                      onClick={() => handleBrowseClick(section.id)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, section.id)}
                      sx={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        px: 2,
                        py: 1.5,
                        backgroundColor: "#F2F2F2",
                        borderRadius: "8px",
                        cursor: "pointer",
                        border: "1px dashed #BDBDBD",
                        "&:hover": {
                          backgroundColor: "#EAF4F5",
                        },

                      }}
                    >
                      <Box
                        component="img"
                        src={cloudUploadIcon}
                        sx={{ width: 20 }}
                      />
                      <Typography
                        fontSize={14}
                        color={files[section.id] ? "#2E7D32" : "text.secondary"}
                      >  {files[section.id]
                        ? files[section.id].name
                        : "Drop your files here"}
                      </Typography>

                    </Box>

                    <Typography fontSize={13} color="text.secondary">
                      OR
                    </Typography>

                    <Button
                      variant="outlined"
                      onClick={() => handleBrowseClick(section.id)}
                      sx={{
                        borderRadius: "20px",
                        px: 3,
                        py: 0.75,
                        textTransform: "none",
                        borderColor: "#9E9E9E",
                        color: "#424242",
                      }}
                    >
                      Browse
                    </Button>
                  </Stack>
                </Box>
              ))}
              {/* Per-section mismatch errors */}
              {uploadSections.map((section) =>
                mismatchErrors[section.id] ? (
                  <Typography key={section.id} color="error" fontSize={13} mt={-1}>
                    ⚠️ {section.label}: {mismatchErrors[section.id]}
                  </Typography>
                ) : null
              )}
              {error && (
                <Typography color="error" mt={2}>
                  {error}
                </Typography>
              )}
            </Stack>

            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{
                  borderRadius: 8,
                  px: 3,
                  textTransform: "none",
                  color: "#4C8B92",
                }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!allDocumentsUploaded || submitting}
                sx={{
                  borderRadius: 8,
                  px: 3,
                  textTransform: "none",
                  backgroundColor: "#4C8B92",
                  color: "#fff",
                }}
              >
                Submit
              </Button>
            </Stack>
          </Paper>

          {docMessage && !success && (
            <Box sx={{ mt: 2 }}>
              <Typography
                textAlign="center"
                fontWeight={600}
                color={docError ? "error" : "success.main"}
              >
                {docMessage}
              </Typography>
            </Box>
          )}
        </Box>
      )}

      {/* Loading overlay */}
      {submitting && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <CircularProgress size={60} sx={{ color: "#fff" }} />
          <Typography color="#fff" fontSize={16} fontWeight={500}>
            Processing your documents...
          </Typography>
        </Box>
      )}
    </Box>
  );
}
