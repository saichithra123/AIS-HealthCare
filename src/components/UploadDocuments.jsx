import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import aaseyaLogo from "../assets/Aaseyalogo.svg";
import cloudUploadIcon from "../assets/Icon awesome-cloud-upload-alt.svg";
import { CircularProgress } from "@mui/material";
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
  { id: "diagnostic", label: "Diagnostic Report" },
  { id: "insurance", label: "Insurance Card" },
  { id: "medical", label: "Medical Form" },
];

export default function UploadDocuments() {
  const navigate = useNavigate();

  const [files, setFiles] = useState({
    diagnostic: null,
    insurance: null,
    medical: null,
  });
const [submitting, setSubmitting] = useState(false);
const [error, setError] = useState("");
const [success, setSuccess] = useState(false);
const [docMessage, setDocMessage] = useState("");
const [docError, setDocError] = useState(false);
const [caseMessage, setCaseMessage] = useState("");

  const handleFileSelect = (sectionId, file) => {
  setError("");
  setDocMessage("");
  setFiles((prev) => ({ ...prev, [sectionId]: file }));
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
  const allDocumentsUploaded = Object.values(files).every(
  (file) => file !== null
);


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

    const claimId = result.processInstanceKey;

if (result.status === "success") {
  setDocMessage("Documents got verified successfully");
  setDocError(false);

  setCaseMessage(result.caseMessage);
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



  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#FFFF" }}>
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
    justifyContent: "space-between",   }}
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
              </Box>
              {docMessage && (
  <Box sx={{ maxWidth: 1200, mx: "auto", mt: 2 }}>
    <Typography
      textAlign="center"
      fontWeight={600}
      color={docError ? "error" : "success.main"}
    >
      {docMessage}
    </Typography>
  </Box>
)}

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
          }}
        >
          <CircularProgress size={60} sx={{ color: "#fff" }} />
      
        </Box>
      )}
<Snackbar
  open={success}
  autoHideDuration={8000}
  onClose={() => setSuccess(false)}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
   disableWindowBlurListener
>
<Alert severity="success" sx={{ minWidth: 420 }}>{caseMessage} 
</Alert>
</Snackbar>
    </Box>
  );
}
