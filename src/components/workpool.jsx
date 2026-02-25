// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import SearchIcon from "@mui/icons-material/Search";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import logoutIcon from "../assets/logout.svg";

// import {
//   Box,
//   Button,
//   InputAdornment,
//   Paper,
//   Stack,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
// } from "@mui/material";

// import aaseyaLogo from "../assets/Aaseyalogo.svg";

// /* ===== CARD ICONS ===== */
// import totalPendingIcon from "../assets/totalpending.svg";
// import totalCasesIcon from "../assets/totalcases.svg";
// import humanInterventionIcon from "../assets/humanintervention.svg";
// import completedIcon from "../assets/completed.svg";

// const paginationBoxStyle = {
//   width: 30,
//   height: 30,
//   border: "1px solid #D6D6D6",
//   borderRadius: "8px",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   cursor: "pointer",
//   fontSize: 12,
//   backgroundColor: "#fff",
// };

// export default function Workpool() {
//   const navigate = useNavigate();
//   const [claims, setClaims] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [page, setPage] = useState(1);

//   const assessorId = "ASSESSOR_101";
//   const baseUrl = import.meta.env.VITE_API_BASE_URL;
//   const token = localStorage.getItem("access_token");
//   const [dashboard, setDashboard] = useState(null);
  

//   const handleLogout = () => {
//   localStorage.removeItem("access_token");
//   localStorage.removeItem("refresh_token");
//   localStorage.removeItem("username");

//   navigate("/ais/login");
// };
// useEffect(() => {
//   const fetchDashboard = async () => {
//     try {
//       if (!token) return;

//       const response = await fetch(
//         `${baseUrl}/healthcare/ClaimAssessorDashboard`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch dashboard");
//       }

//       const data = await response.json();

//       console.log("Dashboard Response:", data);

//       setDashboard(data);

//     } catch (error) {
//       console.error("Dashboard fetch error:", error);
//     }
//   };

//   fetchDashboard();
// }, [baseUrl, token]);
//   /* ================= GET CASES ================= */
// useEffect(() => {
//   const fetchCases = async () => {
//     try {
//       if (!token) {
//         console.error("No token found");
//         return;
//       }

//       const response = await fetch(
//         `${baseUrl}/healthcare/claims/pending/low-confidence`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch cases");
//       }

//       const data = await response.json();

//       console.log("Low Confidence Cases:", data);

//       // Make sure backend returns array
//       setClaims(Array.isArray(data) ? data : data.cases || []);

//     } catch (error) {
//       console.error("Error loading workpool cases:", error);
//     }
//   };

//   fetchCases();
// }, [baseUrl, token]);

//   /* ================= ASSIGN ================= */
// const assignToMe = async (claimId) => {
//   try {
//     const response = await fetch(
//       `${baseUrl}/healthcare/assignToClaimAssessor?claimId=${claimId}&claimAssessorId=${assessorId}`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Assign failed");
//     }

//     console.log("Assigned successfully");

//     // Remove from workpool after assign
//     setClaims((prev) =>
//       prev.filter((claim) => claim.claimId !== claimId)
//     );

//   } catch (error) {
//     console.error("Assign failed:", error);
//   }
// };

//   /* ================= SEARCH ================= */
//   const filteredClaims = claims.filter((claim) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       claim.claimId?.toString().includes(query) ||
//       claim.claimantName?.toLowerCase().includes(query) ||
//       claim.status?.toLowerCase().includes(query)
//     );
//   });

//   /* ================= CARD VALUES ================= */
// const totalCases = dashboard?.totalCases || 0;
// const totalPending = dashboard?.totalPending || 0;
// const humanIntervention = dashboard?.humanIntervention || 0;
// const completedToday = dashboard?.completedToday || 0;

//   const cards = [
//     {
//       title: "Total Pending",
//       value: totalPending,
//       icon: totalPendingIcon,
//       bg: "#FFF3E8",
//     },
//     {
//       title: "Human Intervention",
//       value: humanIntervention,
//       icon: humanInterventionIcon,
//       bg: "#FFF9E6",
//     },
//     {
//       title: "Total Cases",
//       value: totalCases,
//       icon: totalCasesIcon,
//       bg: "#EEF4FF",
//     },
//     {
//       title: "Completed Today",
//       value: completedToday,
//       icon: completedIcon,
//       bg: "#EAFBF1",
//     },
//   ];

//   return (
//     <Box sx={{ minHeight: "100vh", backgroundColor: "#fff" }}>
//       {/* HEADER */}
//      <Box
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

//       <Box sx={{ maxWidth: "1366px", mx: "auto", px: 4, py: 3 }}>
//         {/* BACK */}
//         <Box
//           onClick={() => navigate(-1)}
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 0.5,
//             cursor: "pointer",
//             mb: 2,
//           }}
//         >
//           <ArrowBackIcon fontSize="small" />
//           Back
//         </Box>

//         <Typography fontSize={34} fontWeight={700} mb={3}>
//           Claim Assessor Workpool
//         </Typography>

//         {/* ================= SUMMARY CARDS ================= */}
//         <Stack direction="row" spacing={2} mb={3}>
//           {cards.map((card) => (
//             <Paper
//               key={card.title}
//               sx={{
//                 flex: 1,
//                 p: 2,
//                 borderRadius: "12px",
//                 border: "1px solid #E6DBD3",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 2,
//                 boxShadow: "0px 2px 8px rgba(0,0,0,0.06)",
//               }}
//             >
//               <Box
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: "50%",
//                   backgroundColor: card.bg,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <Box component="img" src={card.icon} sx={{ width: 28, height: 28 }} />
//               </Box>

//               <Box>
//                 <Typography fontSize={16} fontWeight={600}>
//                   {card.title}
//                 </Typography>

//                 <Typography fontSize={30} fontWeight={700}>
//                   {card.value}
//                 </Typography>

//                 <Typography fontSize={14} color="#4CAF50">
//                   +3% this week ▲
//                 </Typography>
//               </Box>
//             </Paper>
//           ))}
//         </Stack>

//         {/* ================= TABLE ================= */}
//         <Paper sx={{ borderRadius: "12px", overflow: "hidden" }}>
//           <Box
//             sx={{
//               px: 2,
//               py: 1.5,
//               display: "flex",
//               justifyContent: "space-between",
//               borderBottom: "1px solid #E6DBD3",
//             }}
//           >
//             <Typography fontSize={18} fontWeight={600}>
//               Workpool
//             </Typography>

//             <TextField
//               placeholder="Search By"
//               size="small"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon fontSize="small" />
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{ width: 230 }}
//             />
//           </Box>

//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#E6F3F6" }}>
//                   {["Claim ID", "Claimant", "Amount", "Status", "Action"].map((h) => (
//                     <TableCell key={h} sx={{ fontWeight: 600 }}>
//                       {h}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {filteredClaims.map((claim) => (
//                   <TableRow key={claim.claimId}>
//                     <TableCell>{claim.claimId}</TableCell>
//                     <TableCell>{claim.claimantName}</TableCell>
//                     <TableCell>{claim.claimAmount}</TableCell>
//                     <TableCell>{claim.status}</TableCell>
//                     <TableCell>
//                       <Button
//                         size="small"
//                         variant="contained"
//                         onClick={() => assignToMe(claim.claimId)}
//                       >
//                         Assign to Me
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* PAGINATION */}
//           <Box
//             sx={{
//               px: 3,
//               py: 2,
//               display: "flex",
//               justifyContent: "space-between",
//             }}
//           >
//             <Typography fontSize={14}>Showing records</Typography>

//             <Stack direction="row" spacing={1}>
//               <Box sx={paginationBoxStyle} onClick={() => setPage(page - 1)}>
//                 <ChevronLeftIcon fontSize="small" />
//               </Box>

//               <Box sx={{ ...paginationBoxStyle, backgroundColor: "#E6E6E6" }}>
//                 {page}
//               </Box>

//               <Box sx={paginationBoxStyle} onClick={() => setPage(page + 1)}>
//                 <ChevronRightIcon fontSize="small" />
//               </Box>
//             </Stack>
//           </Box>
//         </Paper>
//       </Box>
//     </Box>
//   );
// }
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";

import aaseyaLogo from "../assets/Aaseyalogo.svg";
import logoutIcon from "../assets/logout.svg";

/* CARD ICONS */
import totalPendingIcon from "../assets/totalpending.svg";
import totalCasesIcon from "../assets/totalcases.svg";
import humanInterventionIcon from "../assets/humanintervention.svg";
import completedIcon from "../assets/completed.svg";

export default function Workpool() {
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("userRole");
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
  const roleRoutes = {
    ASSESSOR: "/ais/claim-review/",
    MANAGER: "/ais/claim-summary/",
    FINANCE: "/ais/finance-review/",
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/ais/login");
  };

  /* ================= FETCH WORKPOOL ================= */
 useEffect(() => {
  if (!token || !role) return;

  const fetchData = async () => {
    try {
      setLoading(true);

      let url = "";

 switch (role) {
  case "ASSESSOR":
    url = `${baseUrl}/healthcare/claims/pending/low-confidence`;
    break;
        case "MANAGER":
          url = `${baseUrl}/healthcare/claim-manager/workpool`;
          break;
        case "FINANCE":
          url = `${baseUrl}/healthcare/finance/workpool`;
          break;
        default:
          return;
      }

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }

      if (!response.ok) throw new Error("Workpool failed");

      const data = await response.json();
      setClaims(Array.isArray(data) ? data : data.cases || []);
      setError(null);
    } catch (err) {
      console.error("Workpool error:", err);
      setError("Failed to load workpool");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [role, token, baseUrl]);
  /* ================= FILTER ================= */
const query = searchQuery.toLowerCase();

const filteredClaims = claims.filter((claim) => {
  const formattedDate = claim.submissionDate
    ? new Date(claim.submissionDate).toLocaleDateString()
    : "";

  return (
    claim.claimId?.toString().includes(query) ||
    claim.claimantName?.toLowerCase().includes(query) ||
    claim.status?.toLowerCase().includes(query) ||
    formattedDate.includes(query)
  );
});
  const pageTitle =
    role === "ASSESSOR"
      ? "Claim Assessor Workpool"
      : role === "MANAGER"
      ? "Claim Manager Workpool"
      : role === "FINANCE"
      ? "Finance Officer Workpool"
      : "Workpool";

  const cards = [
    {
      title: "Total Pending",
      value: 0,
      percent: "+3%",
      icon: totalPendingIcon,
      bg: "#FFF3E8",
    },
    {
      title: "Human Intervention",
      value: 0,
      percent: "+3%",
      icon: humanInterventionIcon,
      bg: "#FFF9E6",
    },
    {
      title: "Total Cases",
      value: 0,
      percent: "+3%",
      icon: totalCasesIcon,
      bg: "#EEF4FF",
    },
    {
      title: "Completed Today",
      value: 0,
      percent: "+3%",
      icon: completedIcon,
      bg: "#EAFBF1",
    },
  ];
  

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F7F9F9" }}>
      
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
        {/* LEFT LOGO */}
        <Box component="img" src={aaseyaLogo} sx={{ height: 30 }} />

        {/* RIGHT LOGOUT */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ cursor: "pointer" }}
          onClick={handleLogout}
        >
          <Box component="img" src={logoutIcon} sx={{ height: 18 }} />
          <Typography sx={{ color: "#fff", fontSize: 14 }}>
            Logout
          </Typography>
        </Stack>
      </Box>

      {/* ================= CONTENT ================= */}
      <Box sx={{ maxWidth: "1280px", mx: "auto", pt: "110px", px: 4 }}>
        
        {/* TITLE */}
        <Typography fontSize={26} fontWeight={600} mb={4}>
          {pageTitle}
        </Typography>

        {/* ================= DASHBOARD CARDS ================= */}
        <Stack direction="row" spacing={3} mb={4}>
          {cards.map((card) => (
            <Paper
              key={card.title}
              sx={{
                flex: 1,
                p: 3,
                borderRadius: 3,
                boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                {/* ICON CIRCLE */}
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    backgroundColor: card.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box component="img" src={card.icon} sx={{ width: 24 }} />
                </Box>

                {/* TEXT CONTENT */}
                <Box>
                  <Typography fontSize={14} color="text.secondary">
                    {card.title}
                  </Typography>

                  <Typography fontSize={26} fontWeight={700}>
                    {card.value}
                  </Typography>

                  <Typography
                    fontSize={13}
                    sx={{
                      color: "#2E7D32",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      mt: 0.5,
                    }}
                  >
                    {card.percent} this week ▲
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          ))}
        </Stack>

        {/* ================= TABLE SECTION ================= */}
        <Paper sx={{ borderRadius: 3 }}>
          
          {/* SEARCH BAR */}
          <Box
            sx={{
              p: 3,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <TextField
              size="small"
              placeholder="Search By"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ width: 260 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <TableContainer>
            
            <Table>
              <TableHead sx={{ backgroundColor: "#E9F0F1" }}>
                <TableRow>
                  <TableCell>Claim ID</TableCell>
                  <TableCell>Claimant</TableCell>
                  <TableCell>Submission Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredClaims.map((claim) => (
                  <TableRow
                    key={claim.claimId}
                    hover
                    sx={{ cursor: "pointer" }}
                   onClick={() => {
  const basePath = roleRoutes[role];
  if (basePath) {
    navigate(`${basePath}${claim.claimId}`);
  }
}}
                  >
                    <TableCell>{claim.claimId}</TableCell>
                    <TableCell>{claim.claimantName}</TableCell>
<TableCell>
  {claim.submissionDate
    ? new Date(claim.submissionDate).toLocaleDateString()
    : "-"}
</TableCell>
<TableCell>
  {claim.claimAmount
    ? `₹ ${Number(claim.claimAmount).toLocaleString("en-IN")}`
    : "-"}
</TableCell>
<TableCell>
  <Typography
    sx={{
      fontWeight: 600,
      color:
        claim.status === "PENDING"
          ? "#ED6C02"
          : claim.status === "COMPLETED"
          ? "#2E7D32"
          : "#1976D2",
    }}
  >
    {claim.status}
  </Typography>
</TableCell>                 </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
}