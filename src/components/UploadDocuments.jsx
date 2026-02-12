import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import aaseyaLogo from "../assets/Aaseyalogo.svg";
import cloudUploadIcon from "../assets/Icon awesome-cloud-upload-alt.svg";

import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const uploadSections = [
  { id: "diagnostic", label: "Diagnostic Report" },
  { id: "policy", label: "Policy Card" },
  { id: "medical", label: "Medical Form" },
];

export default function UploadDocuments() {
  const navigate = useNavigate();

  const [files, setFiles] = useState({
    diagnostic: null,
    policy: null,
    medical: null,
  });

  const handleFileSelect = (sectionId, file) => {
    setFiles((prev) => ({ ...prev, [sectionId]: file }));
  };

  const handleBrowseClick = (sectionId) => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      const file = e.target.files[0];
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
    if (file) handleFileSelect(sectionId, file);
  };

  const handleCancel = () => {
    setFiles({
      diagnostic: null,
      policy: null,
      medical: null,
    });
  };

const handleSubmit = async () => {
  const token = localStorage.getItem("access_token");
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  try {
    const formData = new FormData();

    formData.append("files", files.diagnostic);
    formData.append("files", files.policy);
    formData.append("files", files.medical);

    const payload = {
      processInstanceKey: 6755399443491595,
      detectedLanguages: ["en"],
      documentsUploaded: 3,
      isMultiLanguage: false,
      primaryLanguage: "en",
      status: "success",
      documentLanguages: [
        { language: "en", documentName: files.diagnostic.name },
        { language: "en", documentName: files.medical.name },
        { language: "en", documentName: files.policy.name },
      ],
    };

    formData.append(
      "payload",
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    );

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
    console.log("Process Started:", result);

    navigate("/workpool");
  } catch (err) {
    console.error(err);
    alert("Failed to start healthcare process");
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
    px: 3,
    py: 2,
    display: "flex",
    alignItems: "center",
  }}
>
  <Box component="img" src={aaseyaLogo} alt="aaseya" sx={{ height: 32 }} />
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
            p: 3, // 🔽 reduced
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
                    p: 2, // 🔽 reduced
                    borderRadius: "12px",
                    backgroundColor: "#fff",
                    boxShadow: "0px 1px 6px rgba(0,0,0,0.08)",
                  }}
                >
                  {/* DROP AREA */}
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
                      py: 1.5, // 🔽 reduced
                      backgroundColor: "#F2F2F2",
                      borderRadius: "8px",
                      cursor: "pointer",
                          border: "1px dashed #BDBDBD", // ✅ UX hint
    "&:hover": {
      backgroundColor: "#EAF4F5",
    },

                    }}
                  >
                    <Box
                      component="img"
                      src={cloudUploadIcon}
                      sx={{ width: 20 }} // 🔽 reduced
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
                      px: 3, // 🔽 reduced
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
          </Stack>

          {/* ACTION BUTTONS */}
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
              //  disabled={!allDocumentsUploaded}
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
    </Box>
  );
}
