import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import aaseyaLogo from "../assets/Aaseyalogo.svg";
import logoutIcon from "../assets/logout.svg";

// Mock patient data keyed by patientId
const MOCK_PATIENTS = {
  "PD-100301093": {
    name: "Johnathan Doe",
    patientId: "PD-100301093",
    policyNo: "POL-2024-0891",
    icdCode: "G56.01",
    policyStatus: "POLICY ACTIVE",
    existingDocs: [],
  },
};

const DEFAULT_PATIENT = {
  name: "Johnathan Doe",
  patientId: "PD-100301093",
  policyNo: "POL-2024-0891",
  icdCode: "G56.01",
  policyStatus: "POLICY ACTIVE",
  existingDocs: [],
};

const MAX_FILE_SIZE_MB = 10;
const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];

function formatBytes(bytes) {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  return mb.toFixed(1) + " MB";
}

function DocIcon({ type }) {
  if (type === "image") {
    return (
      <Box
        sx={{
          width: 36,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFF3E0",
          borderRadius: 1,
          flexShrink: 0,
        }}
      >
        <ImageIcon sx={{ color: "#F57C00", fontSize: 22 }} />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        width: 36,
        height: 36,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFEBEE",
        borderRadius: 1,
        flexShrink: 0,
      }}
    >
      <PictureAsPdfIcon sx={{ color: "#D32F2F", fontSize: 22 }} />
    </Box>
  );
}

function DocCard({ doc, onDownload }) {
  const isImage = doc.type === "image" || (doc.file && doc.file.type.startsWith("image/"));
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        px: 2,
        py: 1.5,
        borderRadius: 2,
        border: "1px solid #F0F0F0",
        backgroundColor: "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <DocIcon type={isImage ? "image" : "pdf"} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          fontSize={13}
          fontWeight={500}
          sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {doc.name}
        </Typography>
        <Typography fontSize={12} color="text.secondary">
          {doc.size}
          {doc.date && ` • ${doc.date}`}
        </Typography>
      </Box>
      <IconButton size="small" onClick={() => onDownload && onDownload(doc)} sx={{ color: "#555" }}>
        <FileDownloadOutlinedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default function DoctorUploadDocuments() {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const patient = MOCK_PATIENTS[patientId] || { ...DEFAULT_PATIENT, patientId };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const validateFile = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return `"${file.name}" is not supported. Please upload PDF or image files (X-Ray, JPG, PNG).`;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return `"${file.name}" exceeds the 10MB size limit.`;
    }
    return null;
  };

  const addFiles = (fileList) => {
    setSubmitError("");
    const newFiles = [];
    for (const file of fileList) {
      const err = validateFile(file);
      if (err) {
        setSubmitError(err);
        return;
      }
      const isDuplicate = uploadedFiles.some((f) => f.name === file.name && f.size === file.size);
      if (!isDuplicate) {
        newFiles.push({
          file,
          name: file.name,
          size: formatBytes(file.size),
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
          type: file.type.startsWith("image/") ? "image" : "pdf",
        });
      }
    }
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files);
  };
  const handleDropZoneClick = () => fileInputRef.current?.click();
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) addFiles(e.target.files);
    e.target.value = "";
  };

  const handleSubmit = () => {
    if (uploadedFiles.length === 0) {
      setSubmitError("Required Documents are missing. Please upload Medical imaging and Physician notes to proceed.");
      return;
    }
    setSubmitError("");
    setSubmitting(true);
    // Simulate API call then navigate to AI Analysis
    setTimeout(() => {
      setSubmitting(false);
      navigate(`/doctor-ai-analysis/${patient.patientId}`);
    }, 1500);
  };

  // ---- MAIN UPLOAD PAGE ----
  const allDocs = uploadedFiles;

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
          px: 5,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 1200,
        }}
      >
        <Box component="img" src={aaseyaLogo} sx={{ height: 30, filter: "brightness(0) invert(1)" }} />
        <Stack direction="row" spacing={1} alignItems="center" sx={{ cursor: "pointer" }} onClick={handleLogout}>
          <Box component="img" src={logoutIcon} sx={{ height: 18 }} />
          <Typography sx={{ color: "#fff", fontSize: 14 }}>Logout</Typography>
        </Stack>
      </Box>

      {/* ---- Content ---- */}
      <Box sx={{ width: "100%", pt: "90px", px: 5 }}>
        {/* Back */}
        <Box
          onClick={() => navigate(-1)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            cursor: "pointer",
            mb: 1,
            mt: 2,
            color: "#333",
            fontSize: 14,
            width: "fit-content",
            "&:hover": { color: "#4C8B92" },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          <Typography fontSize={14}>Back</Typography>
        </Box>

        {/* Page title */}
        <Typography fontSize={26} fontWeight={700} mb={3}>
          Upload Documents - {patient.patientId}
        </Typography>

        {/* ---- Patient Details Card ---- */}
        <Paper
          elevation={0}
          sx={{
            border: "1px solid #E8E8E8",
            borderRadius: 3,
            p: 4,
            mb: 3,
            backgroundColor: "#fff",
            boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.06)",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2} mb={4}>
              <Typography fontSize={28} fontWeight={700} color="#111">
                {patient.name}
              </Typography>
              <Box
                sx={{
                  px: 2,
                  py: 0.5,
                  borderRadius: 4,
                  backgroundColor: "#D1F5DF",
                }}
              >
                <Typography fontSize={10} fontWeight={700} color="#0D7F4B" sx={{ letterSpacing: 0.5, textTransform: "uppercase" }}>
                  {patient.policyStatus}
                </Typography>
              </Box>
            </Stack>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 3, width: "100%" }}>
              <Box>
                <Typography fontSize={14} color="#222" fontWeight={700} mb={0.5}>
                  Patient ID
                </Typography>
                <Typography fontSize={14} color="#666" fontWeight={400}>
                  {patient.patientId}
                </Typography>
              </Box>
              <Box>
                <Typography fontSize={14} color="#222" fontWeight={700} mb={0.5}>
                  Policy No
                </Typography>
                <Typography fontSize={14} color="#666" fontWeight={400}>
                  {patient.policyNo}
                </Typography>
              </Box>
              <Box>
                <Typography fontSize={14} color="#222" fontWeight={700} mb={0.5}>
                  ICD Code
                </Typography>
                <Typography fontSize={14} color="#666" fontWeight={400}>
                  {patient.icdCode}
                </Typography>
              </Box>
              <Box>
                <Typography fontSize={14} color="#222" fontWeight={700} mb={0.5}>
                  ICD Code
                </Typography>
                <Typography fontSize={14} color="#666" fontWeight={400}>
                  {patient.icdCode}
                </Typography>
              </Box>
            </Box>
        </Paper>

        {/* ---- Upload Documents Card ---- */}
        <Paper
          elevation={0}
          sx={{
            border: "1px solid #E8E8E8",
            borderRadius: 3,
            p: 4,
            mb: 3,
            backgroundColor: "#fff",
            boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.06)",
          }}
        >
          <Typography fontSize={18} fontWeight={700} mb={submitError ? 1.5 : 3}>
            Documents
          </Typography>
          
          {/* Validation Error rendered dynamically */}
          {submitError && (
            <Typography fontSize={14} fontWeight={600} color="#D32F2F" mb={3}>
              {submitError}
            </Typography>
          )}
            {/* Drop Zone */}
            <Box
              onClick={handleDropZoneClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              sx={{
                border: `2px dashed ${isDragging ? "#4C8B92" : "#9E9E9E"}`,
                borderRadius: 4,
                backgroundColor: isDragging ? "#EAF4F5" : "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 6,
                px: 4,
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": { borderColor: "#4C8B92", backgroundColor: "#F0F8F9" },
              }}
            >
              {/* Cloud upload icon */}
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  backgroundColor: "#4C8B92",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16V8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M9 11L12 8L15 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7 18C4.79086 18 3 16.2091 3 14C3 12.0137 4.41216 10.3643 6.27851 10.0392C6.09559 9.56003 6 9.04146 6 8.5C6 6.01472 8.01472 4 10.5 4C12.1128 4 13.5421 4.84694 14.3725 6.10535C14.7462 6.03679 15.1292 6 15.5 6C18.0376 6 20.1288 7.93616 20.4621 10.4C21.9192 11.01 23 12.4696 23 14.1818C23 16.2909 21.2909 18 19.1818 18H7Z" fill="white" />
                </svg>
              </Box>
              <Typography fontSize={14} fontWeight={500} color="#333">
                Click to upload or drag and drop
              </Typography>
              <Typography fontSize={13} color="text.secondary" mt={0.5}>
                Supports X-Ray Images, PDF's (Max. 10MB)
              </Typography>
            </Box>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
        </Paper>

        {/* ---- Uploaded Documents Card ---- */}
        {allDocs.length > 0 && (
          <Paper
            elevation={0}
            sx={{
              border: "1px solid #E8E8E8",
              borderRadius: 3,
              p: 4,
              backgroundColor: "#fff",
            }}
          >
            <Typography fontSize={18} fontWeight={600} mb={3}>
              Uploaded Documents
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
              }}
            >
              {allDocs.map((doc, i) => (
                <DocCard key={i} doc={doc} onDownload={() => {}} />
              ))}
            </Box>
          </Paper>
        )}
      </Box>

      {/* ---- Submit Button ---- */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 4,
          mb: 4,
          width: "100%",
          px: 5,
        }}
      >
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting}
          sx={{
            backgroundColor: "#4C8B92",
            color: "#fff",
            borderRadius: "999px",
            px: 4,
            py: 1.5,
            fontSize: 15,
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { backgroundColor: "#3B7D84" },
            "&:disabled": { backgroundColor: "#9FC4C8", color: "#fff" },
          }}
        >
          {submitting ? "Submitting..." : "Submit for AI Analysis"}
        </Button>
      </Box>
    </Box>
  );
}
