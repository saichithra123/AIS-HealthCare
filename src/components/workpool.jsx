import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logoutIcon from "../assets/logout.svg";

import {
  Box,
  Button,
  InputAdornment,
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
} from "@mui/material";

import aaseyaLogo from "../assets/Aaseyalogo.svg";

/* ===== CARD ICONS ===== */
import totalPendingIcon from "../assets/totalpending.svg";
import totalCasesIcon from "../assets/totalcases.svg";
import humanInterventionIcon from "../assets/humanintervention.svg";
import completedIcon from "../assets/completed.svg";

const paginationBoxStyle = {
  width: 30,
  height: 30,
  border: "1px solid #D6D6D6",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: 12,
  backgroundColor: "#fff",
};

export default function Workpool() {
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const assessorId = "ASSESSOR_101";
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("access_token");

  const handleLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("username");

  navigate("/ais/login");
};

  /* ================= GET CASES ================= */
  useEffect(() => {
    const fetchMyCases = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/healthcare/Mycases?claimAssessorId=${assessorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error();

        const data = await response.json();
        setClaims(data || []);
      } catch (error) {
        console.error("Failed to load cases", error);
      }
    };

    fetchMyCases();
  }, []);

  /* ================= ASSIGN ================= */
  const assignToMe = async (claimId) => {
    try {
      const response = await fetch(
        `${baseUrl}/healthcare/Assigntomyself?claimId=${claimId}&claimAssessorId=${assessorId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error();

      setClaims((prev) => prev.filter((c) => c.claimId !== claimId));
    } catch (error) {
      console.error("Assign failed", error);
    }
  };

  /* ================= SEARCH ================= */
  const filteredClaims = claims.filter((claim) => {
    const query = searchQuery.toLowerCase();
    return (
      claim.claimId?.toString().includes(query) ||
      claim.claimantName?.toLowerCase().includes(query) ||
      claim.status?.toLowerCase().includes(query)
    );
  });

  /* ================= CARD VALUES ================= */
  const totalCases = claims.length;
  const totalPending = claims.filter((c) => c.status === "Pending").length;
  const humanIntervention = claims.filter((c) => c.status === "Review").length;
  const completedToday = claims.filter((c) => c.status === "Completed").length;

  const cards = [
    {
      title: "Total Pending",
      value: totalPending,
      icon: totalPendingIcon,
      bg: "#FFF3E8",
    },
    {
      title: "Human Intervention",
      value: humanIntervention,
      icon: humanInterventionIcon,
      bg: "#FFF9E6",
    },
    {
      title: "Total Cases",
      value: totalCases,
      icon: totalCasesIcon,
      bg: "#EEF4FF",
    },
    {
      title: "Completed Today",
      value: completedToday,
      icon: completedIcon,
      bg: "#EAFBF1",
    },
  ];

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
    justifyContent: "space-between", // 👈 important
  }}
>
  {/* LEFT - LOGO */}
  <Box component="img" src={aaseyaLogo} alt="aaseya" sx={{ height: 32 }} />

  {/* RIGHT - LOGOUT */}
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

      <Box sx={{ maxWidth: "1366px", mx: "auto", px: 4, py: 3 }}>
        {/* BACK */}
        <Box
          onClick={() => navigate(-1)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            cursor: "pointer",
            mb: 2,
          }}
        >
          <ArrowBackIcon fontSize="small" />
          Back
        </Box>

        <Typography fontSize={34} fontWeight={700} mb={3}>
          Claim Assessor Workpool
        </Typography>

        {/* ================= SUMMARY CARDS ================= */}
        <Stack direction="row" spacing={2} mb={3}>
          {cards.map((card) => (
            <Paper
              key={card.title}
              sx={{
                flex: 1,
                p: 2,
                borderRadius: "12px",
                border: "1px solid #E6DBD3",
                display: "flex",
                alignItems: "center",
                gap: 2,
                boxShadow: "0px 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  backgroundColor: card.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box component="img" src={card.icon} sx={{ width: 28, height: 28 }} />
              </Box>

              <Box>
                <Typography fontSize={16} fontWeight={600}>
                  {card.title}
                </Typography>

                <Typography fontSize={30} fontWeight={700}>
                  {card.value}
                </Typography>

                <Typography fontSize={14} color="#4CAF50">
                  +3% this week ▲
                </Typography>
              </Box>
            </Paper>
          ))}
        </Stack>

        {/* ================= TABLE ================= */}
        <Paper sx={{ borderRadius: "12px", overflow: "hidden" }}>
          <Box
            sx={{
              px: 2,
              py: 1.5,
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #E6DBD3",
            }}
          >
            <Typography fontSize={18} fontWeight={600}>
              Workpool
            </Typography>

            <TextField
              placeholder="Search By"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 230 }}
            />
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#E6F3F6" }}>
                  {["Claim ID", "Claimant", "Amount", "Status", "Action"].map((h) => (
                    <TableCell key={h} sx={{ fontWeight: 600 }}>
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredClaims.map((claim) => (
                  <TableRow key={claim.claimId}>
                    <TableCell>{claim.claimId}</TableCell>
                    <TableCell>{claim.claimantName}</TableCell>
                    <TableCell>{claim.claimAmount}</TableCell>
                    <TableCell>{claim.status}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => assignToMe(claim.claimId)}
                      >
                        Assign to Me
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* PAGINATION */}
          <Box
            sx={{
              px: 3,
              py: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography fontSize={14}>Showing records</Typography>

            <Stack direction="row" spacing={1}>
              <Box sx={paginationBoxStyle} onClick={() => setPage(page - 1)}>
                <ChevronLeftIcon fontSize="small" />
              </Box>

              <Box sx={{ ...paginationBoxStyle, backgroundColor: "#E6E6E6" }}>
                {page}
              </Box>

              <Box sx={paginationBoxStyle} onClick={() => setPage(page + 1)}>
                <ChevronRightIcon fontSize="small" />
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import SearchIcon from "@mui/icons-material/Search";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
//   const totalPages = 10;

//   const assessorId = "ASSESSOR_101";
//   const baseUrl = import.meta.env.VITE_API_BASE_URL;
//   const token = localStorage.getItem("access_token");

//   /* ================= GET MY CASES ================= */
//   useEffect(() => {
//     const fetchMyCases = async () => {
//       try {
//         const response = await fetch(
//           `${baseUrl}/healthcare/Mycases?claimAssessorId=${assessorId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!response.ok) throw new Error();

//         const data = await response.json();
//         setClaims(data || []);
//       } catch (error) {
//         console.error("Failed to load cases", error);
//       }
//     };

//     fetchMyCases();
//   }, []);

//   /* ================= ASSIGN TO ME ================= */
//   const assignToMe = async (claimId) => {
//     try {
//       const response = await fetch(
//         `${baseUrl}/healthcare/Assigntomyself?claimId=${claimId}&claimAssessorId=${assessorId}`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) throw new Error();

//       // refresh list after assignment
//       setClaims((prev) => prev.filter((c) => c.claimId !== claimId));
//     } catch (error) {
//       console.error("Assign failed", error);
//     }
//   };

//   /* ================= SEARCH ================= */
//   const filteredClaims = claims.filter((claim) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       claim.claimId?.toString().includes(query) ||
//       claim.claimantName?.toLowerCase().includes(query) ||
//       claim.status?.toLowerCase().includes(query)
//     );
//   });

//   return (
//     <Box sx={{ minHeight: "100vh", backgroundColor: "#fff" }}>
//       {/* HEADER */}
//       <Box
//         sx={{
//           position: "sticky",
//           top: 0,
//           zIndex: 1100,
//           backgroundColor: "#4A8F97",
//           px: 4,
//           py: 2,
//         }}
//       >
//         <Box component="img" src={aaseyaLogo} alt="aaseya" sx={{ height: 32 }} />
//       </Box>

//       <Box sx={{ maxWidth: "1366px", mx: "auto", px: 4, py: 3 }}>
//         {/* BACK */}
//         <Box
//           onClick={() => navigate(-1)}
//           sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer", mb: 2 }}
//         >
//           <ArrowBackIcon fontSize="small" /> Back
//         </Box>

//         <Typography fontSize={28} fontWeight={600} mb={1}>
//           Claim Assessor Workpool
//         </Typography>

//         <Paper sx={{ borderRadius: "12px", overflow: "hidden" }}>
//           {/* TOP BAR */}
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
//               placeholder="Search"
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
//               sx={{ width: 200 }}
//             />
//           </Box>

//           {/* TABLE */}
//           <TableContainer>
//             <Table sx={{ borderSpacing: "0 12px", borderCollapse: "separate" }}>
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
