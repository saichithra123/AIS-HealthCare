// import {
//   Box,
//   Paper,
//   Typography,
//   Stack,
//   Button,
//   LinearProgress,
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useState, useEffect } from "react";

// import aaseyaLogo from "../assets/Aaseyalogo.svg";
// import logoutIcon from "../assets/logout.svg";
// import downloadIcon from "../assets/download.svg";

// export default function ClaimReview() {
//   const navigate = useNavigate();
//   const { claimId } = useParams();
//   const { state } = useLocation();

//   const claim = state?.claimData || {};
//   const [aiIntake, setAiIntake] = useState(null);

//   const token = localStorage.getItem("access_token");
//   const baseUrl = import.meta.env.VITE_API_BASE_URL;

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/ais/login");
//   };

//   /* ================= DOWNLOAD ================= */
//   const handleDownload = async (documentId) => {
//     try {
//       const response = await fetch(
//         `${baseUrl}/healthcare/documents/download?claimId=${claimId}&documentId=${documentId}`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) throw new Error("Download failed");

//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `document_${documentId}.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);

//     } catch (error) {
//       console.error("Download error:", error);
//     }
//   };

//   /* ================= AI INTAKE ================= */
//   useEffect(() => {
//     const fetchAiIntake = async () => {
//       try {
//         if (!claimId || !token) return;

//         const response = await fetch(
//           `${baseUrl}/healthcare/claims/${claimId}/ai-intake`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!response.ok) throw new Error("AI intake fetch failed");

//         const data = await response.json();
//         setAiIntake(data);

//       } catch (error) {
//         console.error("AI intake error:", error);
//       }
//     };

//     fetchAiIntake();
//   }, [claimId, token, baseUrl]);

//   return (
//     <Box sx={{ minHeight: "100vh", backgroundColor: "#F5F7F8" }}>

//       {/* ================= HEADER ================= */}
//       <Box
//         sx={{
//           position: "fixed",
//           top: 0,
//           width: "100%",
//           backgroundColor: "#4C8B92",
//           px: 5,
//           py: 2,
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           zIndex: 1200,
//         }}
//       >
//         <Box component="img" src={aaseyaLogo} sx={{ height: 30 }} />

//         <Stack
//           direction="row"
//           spacing={1}
//           alignItems="center"
//           sx={{ cursor: "pointer" }}
//           onClick={handleLogout}
//         >
//           <Box component="img" src={logoutIcon} sx={{ height: 18 }} />
//           <Typography sx={{ color: "#fff", fontSize: 13 }}>
//             Logout
//           </Typography>
//         </Stack>
//       </Box>

//       {/* ================= CONTENT ================= */}
//       <Box
//         sx={{
//           maxWidth: "1200px",
//           mx: "auto",
//           px: 4,
//           pt: "100px",
//           pb: 4,
//         }}
//       >

//         {/* BACK */}
//         <Stack
//           direction="row"
//           spacing={1}
//           alignItems="center"
//           sx={{ cursor: "pointer", mb: 2 }}
//           onClick={() => navigate(-1)}
//         >
//           <ArrowBackIcon fontSize="small" />
//           <Typography fontSize={13}>Back</Typography>
//         </Stack>

//         {/* TITLE */}
//         <Typography fontSize={24} fontWeight={600} mb={3}>
//           Claim Review - {claimId}
//         </Typography>

//         {/* ================= CLAIM INFO ================= */}
//         <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
//           <Typography fontSize={22} fontWeight={700} mb={2}>
//             {claim.claimantName || "Johnathan Doe"}
//           </Typography>

//           <Stack direction="row" spacing={6} flexWrap="wrap">
//             {[
//               { label: "Policy Number", value: claim.policyNumber || "IN-656947" },
//               { label: "Coverage Type", value: claim.coverageType || "Platinum Care" },
//               { label: "Sum Insured Covered", value: claim.sumInsured || "$50,000.00" },
//               { label: "Claim Amount", value: claim.claimAmount || "$24,580.00" },
//             ].map((item) => (
//               <Box key={item.label}>
//                 <Typography fontSize={11} color="text.secondary">
//                   {item.label}
//                 </Typography>
//                 <Typography fontSize={14} fontWeight={600}>
//                   {item.value}
//                 </Typography>
//               </Box>
//             ))}
//           </Stack>
//         </Paper>

//         {/* ================= AI FINDINGS ================= */}
//         <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
//           <Typography fontSize={16} fontWeight={600} mb={2}>
//             AI Intake Findings
//           </Typography>

//           <Stack direction="row" spacing={3} flexWrap="wrap">

//             {/* SUMMARY */}
//             <Paper sx={{ flex: 1, p: 2.5, minWidth: 280 }}>
//               <Typography fontSize={14} fontWeight={600}>
//                 Summary Analysis
//               </Typography>
//               <Typography fontSize={13} mt={1.5} color="text.secondary">
//                 {aiIntake?.summary ||
//                   "AI detected consistent medical documentation and valid policy coverage."}
//               </Typography>
//             </Paper>

//             {/* CONFIDENCE */}
//             <Paper sx={{ flex: 1, p: 2.5, minWidth: 280 }}>
//               <Typography fontSize={14} fontWeight={600} mb={1.5}>
//                 Confidence Score
//               </Typography>

//               <LinearProgress
//                 variant="determinate"
//                 value={aiIntake?.confidenceScore ?? 0}
//                 sx={{
//                   height: 6,
//                   borderRadius: 5,
//                   mb: 1,
//                 }}
//               />

//               <Typography fontSize={12}>
//                 {aiIntake?.confidenceScore ?? 0}%
//               </Typography>

//               <Typography fontSize={13} mt={2} fontWeight={600}>
//                 Flags Detected
//               </Typography>

//               <Typography fontSize={12} color="text.secondary">
//                 {aiIntake?.flags || "No flags detected"}
//               </Typography>
//             </Paper>
//           </Stack>
//         </Paper>

//         {/* ================= DOCUMENTS ================= */}
//         <Paper sx={{ p: 3, borderRadius: 3 }}>
//           <Typography fontSize={16} fontWeight={600} mb={2}>
//             Uploaded Documents
//           </Typography>

//           <Stack spacing={2}>
//             {(claim.documents || [
//               "Medical_Form1.pdf",
//               "Policy_Card1.pdf",
//               "Hospital_Bill.pdf",
//             ]).map((doc, index) => (
//               <Paper
//                 key={index}
//                 sx={{
//                   p: 2,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   borderRadius: 2,
//                   boxShadow: "0px 1px 4px rgba(0,0,0,0.06)",
//                 }}
//               >
//                 <Stack direction="row" spacing={1.5} alignItems="center">
//                   <InsertDriveFileIcon
//                     sx={{ fontSize: 20 }}
//                     color="error"
//                   />
//                   <Typography fontSize={13} fontWeight={500}>
//                     {doc}
//                   </Typography>
//                 </Stack>

//                 <Box
//                   onClick={() => handleDownload(index + 1)}
//                   sx={{
//                     cursor: "pointer",
//                     width: 32,
//                     height: 32,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     borderRadius: 1,
//                     "&:hover": { backgroundColor: "#EAF4F5" },
//                   }}
//                 >
//                   <Box component="img" src={downloadIcon} sx={{ width: 16 }} />
//                 </Box>
//               </Paper>
//             ))}
//           </Stack>
//         </Paper>

//         {/* ================= BUTTONS ================= */}
//         <Stack direction="row" justifyContent="flex-end" spacing={2} mt={4}>
//           <Button variant="outlined" size="small" onClick={() => navigate(-1)}>
//             Cancel
//           </Button>

//           <Button
//             variant="contained"
//             size="small"
//             sx={{ backgroundColor: "#4A8F97" }}
//             onClick={() =>
//               navigate(`/ais/claim-checklist/${claimId}`, {
//                 state: { claimData: claim },
//               })
//             }
//           >
//             Continue
//           </Button>
//         </Stack>
//       </Box>
//     </Box>
//   );
// }
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

  /* ================= FETCH CLAIM + AI INTAKE ================= */
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

  /* ================= DOWNLOAD DOCUMENT ================= */
  const handleDownload = async (documentId) => {
    try {
      const response = await fetch(
        `${baseUrl}/healthcare/documents/download?claimId=${claimId}&documentId=${documentId}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `document_${documentId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error("Download error:", err);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 20 }}>
        <Typography>Loading claim details...</Typography>
      </Box>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 20 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F5F7F8" }}>

      {/* ================= HEADER ================= */}
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

      {/* ================= CONTENT ================= */}
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 4, pt: "100px", pb: 4 }}>

        {/* BACK */}
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

        {/* TITLE */}
        <Typography fontSize={22} fontWeight={600} mb={3}>
          Claim Review - {claim?.claimId}
        </Typography>

        {/* ================= CLAIM INFO ================= */}
        <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
          <Typography fontSize={18} fontWeight={700} mb={2}>
            {claim?.claimantName || "N/A"}
          </Typography>

          <Stack direction="row" spacing={6} flexWrap="wrap">
            <Info label="Policy Number" value={claim?.policyNumber} />
            <Info label="Coverage Type" value={claim?.coverageType} />
            <Info label="Sum Insured" value={claim?.sumInsured} />
            <Info label="Claim Amount" value={claim?.claimAmount} />
          </Stack>
        </Paper>

        {/* ================= AI INTAKE ================= */}
        <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
          <Typography fontSize={15} fontWeight={600} mb={2}>
            AI Intake Findings
          </Typography>

          <Stack direction="row" spacing={3} flexWrap="wrap">
            <Paper sx={{ flex: 1, p: 2 }}>
              <Typography fontSize={13} fontWeight={600}>
                Summary
              </Typography>
              <Typography fontSize={12} mt={1} color="text.secondary">
                {aiIntake?.summary || "No AI summary available"}
              </Typography>
            </Paper>

            <Paper sx={{ flex: 1, p: 2 }}>
              <Typography fontSize={13} fontWeight={600}>
                Confidence Score
              </Typography>

              <LinearProgress
                variant="determinate"
                value={aiIntake?.confidenceScore ?? 0}
                sx={{ height: 6, borderRadius: 5, my: 1 }}
              />

              <Typography fontSize={12}>
                {aiIntake?.confidenceScore ?? 0}%
              </Typography>
            </Paper>
          </Stack>
        </Paper>

        {/* ================= DOCUMENTS ================= */}
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography fontSize={15} fontWeight={600} mb={2}>
            Uploaded Documents
          </Typography>

          {Array.isArray(claim?.documents) && claim.documents.length > 0 ? (
            <Stack spacing={2}>
              {claim.documents.map((doc) => (
                <Paper
                  key={doc.documentId}
                  sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <InsertDriveFileIcon sx={{ fontSize: 20 }} color="error" />
                    <Typography fontSize={13}>
                      {doc.fileName}
                    </Typography>
                  </Stack>

                  <Box
                    onClick={() => handleDownload(doc.documentId)}
                    sx={{
                      cursor: "pointer",
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "6px",
                      "&:hover": { backgroundColor: "#EAF4F5" },
                    }}
                  >
                    <Box component="img" src={downloadIcon} sx={{ width: 16 }} />
                  </Box>
                </Paper>
              ))}
            </Stack>
          ) : (
            <Typography fontSize={13} color="text.secondary">
              No documents uploaded
            </Typography>
          )}
        </Paper>

        {/* ================= BUTTONS ================= */}
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
            }}
            onClick={() => navigate(`/ais/claim-checklist/${claimId}`)}
          >
            Continue
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

/* ================= SMALL REUSABLE INFO BLOCK ================= */
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