// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Box,
//   Paper,
//   Typography,
//   Stack,
//   Button,
//   Checkbox,
//   FormControlLabel,
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import aaseyaLogo from "../assets/Aaseyalogo.svg";
// import logoutIcon from "../assets/logout.svg";
// const baseUrl = import.meta.env.VITE_API_BASE_URL;
// const token = localStorage.getItem("access_token");

// export default function ClaimChecklist() {
//   const navigate = useNavigate();
//   const { claimId } = useParams();
// const { state } = useLocation();

// const claim = state?.claimData || {};
  
//  const checklistConfig = [
//   { key: "policyActive", label: "Policy active status verified" },
//   { key: "memberCovered", label: "Member covered under policy confirmed" },
//   { key: "diagnosisProcedure", label: "Diagnosis - procedure combinations" },
//   { key: "icd10Mapping", label: "ICD-10 mapped to allowed procedures" },
// ];
//  const [checkedItems, setCheckedItems] = useState({
//   policyActive: false,
//   memberCovered: false,
//   diagnosisProcedure: false,
//   icd10Mapping: false,
// });
// const handleLogout = () => {
//   localStorage.removeItem("access_token");
//   localStorage.removeItem("refresh_token");
//   localStorage.removeItem("username");

//   navigate("/ais/login");
// };
// const handleDownload = async (documentId) => {
//   try {
//     const response = await fetch(
//       `${baseUrl}/healthcare/documents/download?claimId=${claimId}&documentId=${documentId}`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Download failed");
//     }

//     const blob = await response.blob();

//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `document_${documentId}.pdf`;
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
//     window.URL.revokeObjectURL(url);

//   } catch (error) {
//     console.error("Download error:", error);
//   }
// };
//   return (
//     <Box sx={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      
//       {/* ================= FIXED HEADER ================= */}
//       <Box
//   sx={{
//     position: "fixed",
//     left: 0,
//     width: "100%",
//     zIndex: 1200,
//     backgroundColor: "#4C8B92",
//     px: 4,
//     py: 2,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between", // 👈 important
//   }}
// >
//   {/* LEFT - LOGO */}
//   <Box component="img" src={aaseyaLogo} alt="aaseya" sx={{ height: 32 }} />

//   {/* RIGHT - LOGOUT */}
//   <Box
//     onClick={handleLogout}
//     sx={{
//       display: "flex",
//       alignItems: "center",
//       gap: 1,
//       cursor: "pointer",
//     }}
//   >
//     <Box
//       component="img"
//       src={logoutIcon}
//       sx={{ height: 18 }}
//     />
//     <Typography
//       fontSize={14}
//       color="#fff"
//       fontWeight={500}
//     >
//       Logout
//     </Typography>
//   </Box>
// </Box>

//       {/* ================= MAIN CONTAINER ================= */}
//       <Box
//         sx={{
//           maxWidth: "1200px",   // reduced width (fix zoom feel)
//           mx: "auto",
//           px: "30px",
//           pt: "85px",
//           pb: "40px",
//         }}
//       >
//         {/* BACK */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             cursor: "pointer",
//             mb: 1,
//           }}
//           onClick={() => navigate(-1)}
//         >
//           <ArrowBackIcon sx={{ fontSize: 18 }} />
//           <Typography sx={{ fontSize: 13, ml: 0.5 }}>
//             Back
//           </Typography>
//         </Box>

//         {/* TITLE */}
//         <Typography sx={{ fontSize: 22, fontWeight: 600, mb: 2.5 }}>
//           Checklist - {claimId}
//         </Typography>

//         {/* ================= CLAIM HEADER CARD ================= */}
//         <Paper
//           sx={{
//             p: 2.5,
//             borderRadius: "12px",
//             mb: 2.5,
//             border: "1px solid #E6DBD3",
//             boxShadow: "0px 2px 5px rgba(0,0,0,0.05)",
//           }}
//         >
//           <Stack direction="row" justifyContent="space-between">
//             <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
//               Johnathan Doe
//             </Typography>

//             <Box
//               sx={{
//                 px: 2,
//                 py: 0.4,
//                 borderRadius: "12px",
//                 backgroundColor: "#DDF7E6",
//                 fontSize: 11,
//                 fontWeight: 600,
//                 color: "#2E9D65",
//                 height: "fit-content",
//               }}
//             >
//               POLICY ACTIVE
//             </Box>
//           </Stack>

//           <Stack direction="row" spacing={5} mt={2.5}>
//             <Box>
//               <Typography sx={{ fontSize: 11, color: "#666" }}>
//                 Policy Number
//               </Typography>
//               <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
//                 IN-656947
//               </Typography>
//             </Box>

//             <Box>
//               <Typography sx={{ fontSize: 11, color: "#666" }}>
//                 Coverage Type
//               </Typography>
//               <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
//                 Platinum Care
//               </Typography>
//             </Box>

//             <Box>
//               <Typography sx={{ fontSize: 11, color: "#666" }}>
//                 Sum Insured Covered
//               </Typography>
//               <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
//                 $50,000.00
//               </Typography>
//             </Box>

//             <Box>
//               <Typography sx={{ fontSize: 11, color: "#666" }}>
//                 Policy Start Date
//               </Typography>
//               <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
//                 Oct 20, 2026
//               </Typography>
//             </Box>

//             <Box>
//               <Typography sx={{ fontSize: 11, color: "#666" }}>
//                 Claim Amount
//               </Typography>
//               <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
//                 $24,580.00
//               </Typography>
//             </Box>
//           </Stack>
//         </Paper>

//         {/* ================= CHECKLIST SECTION ================= */}
//         <Paper
//           sx={{
//             p: 2.5,
//             borderRadius: "12px",
//             border: "1px solid #E6DBD3",
//             boxShadow: "0px 2px 5px rgba(0,0,0,0.05)",
//           }}
//         >
//           <Typography sx={{ fontSize: 15, fontWeight: 600, mb: 1.5 }}>
//             Verification Checklist
//           </Typography>

//           <Stack spacing={1.8}>
//             {checklistItems.map((item) => (
//               <Paper
//                 key={item}
//                 sx={{
//                   px: 2,
//                   py: 1.2,
//                   borderRadius: "10px",
//                   border: "1px solid #E6DBD3",
//                   boxShadow: "none",
//                 }}
//               >
//                 <FormControlLabel
//                   control={<Checkbox size="small" />}
//                   label={
//                     <Typography sx={{ fontSize: 13 }}>
//                       {item}
//                     </Typography>
//                   }
//                 />
//               </Paper>
//             ))}
//           </Stack>
//         </Paper>

//         {/* ================= BUTTONS ================= */}
//         <Stack
//           direction="row"
//           justifyContent="flex-end"
//           spacing={2}
//           mt={2.5}
//         >
//           <Button
//             variant="outlined"
//             sx={{
//               borderRadius: "18px",
//               px: 3,
//               fontSize: 13,
//               textTransform: "none",
//             }}
//             onClick={() => navigate(-1)}
//           >
//             Cancel
//           </Button>

//           <Button
//             variant="contained"
//             sx={{
//               borderRadius: "18px",
//               px: 3,
//               fontSize: 13,
//               backgroundColor: "#4A8F97",
//               textTransform: "none",
//               "&:hover": { backgroundColor: "#3B7D84" },
//             }}
//           >
//             Submit
//           </Button>
//         </Stack>
//       </Box>
//     </Box>
//   );
// }
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
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
  const { state } = useLocation();

  const claim = state?.claimData || {};

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("access_token");

  // ✅ Checklist Configuration
  const checklistConfig = [
    { key: "policyActive", label: "Policy active status verified" },
    { key: "memberCovered", label: "Member covered under policy confirmed" },
    { key: "diagnosisProcedure", label: "Diagnosis - procedure combinations" },
    { key: "icd10Mapping", label: "ICD-10 mapped to allowed procedures" },
  ];

  // ✅ Checkbox State
  const [checkedItems, setCheckedItems] = useState({
    policyActive: false,
    memberCovered: false,
    diagnosisProcedure: false,
    icd10Mapping: false,
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/ais/login");
  };

  // ✅ Submit Checklist API
  const handleSubmitChecklist = async () => {
    try {
      const queryParams = new URLSearchParams({
        policyActive: checkedItems.policyActive,
        memberCovered: checkedItems.memberCovered,
        diagnosisProcedure: checkedItems.diagnosisProcedure,
        icd10Mapping: checkedItems.icd10Mapping,
      }).toString();

      const response = await fetch(
        `${baseUrl}/healthcare/checklist/${claimId}/submit?${queryParams}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Checklist submission failed");
      }

      console.log("Checklist submitted successfully");

      // After success → go back to workpool
      navigate("/ais/workpool");

    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff" }}>

      {/* HEADER */}
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
          sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}
        >
          <Box component="img" src={logoutIcon} sx={{ height: 18 }} />
          <Typography fontSize={14} color="#fff" fontWeight={500}>
            Logout
          </Typography>
        </Box>
      </Box>

      {/* MAIN */}
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: "30px",
          pt: "85px",
          pb: "40px",
        }}
      >
        {/* BACK */}
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer", mb: 1 }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon sx={{ fontSize: 18 }} />
          <Typography sx={{ fontSize: 13, ml: 0.5 }}>Back</Typography>
        </Box>

        <Typography sx={{ fontSize: 22, fontWeight: 600, mb: 2.5 }}>
          Checklist - {claimId}
        </Typography>

        {/* CHECKLIST SECTION */}
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
            {checklistConfig.map((item) => (
              <Paper
                key={item.key}
                sx={{
                  px: 2,
                  py: 1.2,
                  borderRadius: "10px",
                  border: "1px solid #E6DBD3",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={checkedItems[item.key]}
                      onChange={(e) =>
                        setCheckedItems((prev) => ({
                          ...prev,
                          [item.key]: e.target.checked,
                        }))
                      }
                    />
                  }
                  label={<Typography sx={{ fontSize: 13 }}>{item.label}</Typography>}
                />
              </Paper>
            ))}
          </Stack>
        </Paper>

        {/* BUTTONS */}
        <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2.5}>
          <Button
            variant="outlined"
            sx={{ borderRadius: "18px", px: 3, fontSize: 13, textTransform: "none" }}
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
            onClick={handleSubmitChecklist}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
