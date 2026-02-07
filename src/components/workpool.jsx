// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
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

// const claimsData = [
//   {
//     id: "INS-100301093",
//     claimant: "Priya",
//     submissionDate: "24/12/2025",
//     claimAmount: "$ 5,200",
//     status: "In Progress",
//     statusColor: "#FFA500",
//   },
//   {
//     id: "INS-100301094",
//     claimant: "Sai",
//     submissionDate: "24/12/2025",
//     claimAmount: "$ 5,200",
//     status: "Approved",
//     statusColor: "#00C853",
//   },
//   {
//     id: "INS-100301095",
//     claimant: "Herbert",
//     submissionDate: "24/12/2025",
//     claimAmount: "$ 1,200",
//     status: "Rejected",
//     statusColor: "#FF0000",
//   },
// ];

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
//   const [page, setPage] = useState(3);
//   const totalPages = 15;
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredClaims = claimsData.filter((claim) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       claim.id.toLowerCase().includes(query) ||
//       claim.claimant.toLowerCase().includes(query) ||
//       claim.status.toLowerCase().includes(query)
//     );
//   });

//   return (
//     <Box sx={{ minHeight: "100vh", backgroundColor: "#FFFF" }}>
//       {/* HEADER */}
//       <Box
//         sx={{
//           position: "sticky",
//           top: 0,
//           zIndex: 1100,
//           backgroundColor: "#4A8F97",
//           px: 4,
//           py: 2,
//           display: "flex",
//           alignItems: "center",
//         }}
//       >
//         <Box component="img" src={aaseyaLogo} alt="aaseya" sx={{ height: 32 }} />
//       </Box>

//       {/* CONTENT */}
//       <Box
//         sx={{
//           maxWidth: "1366px",
//           mx: "auto",
//           px: { xs: 2, sm: 3, md: 4 },
//           py: 3,
//         }}
//       >
//         {/* BACK */}
//         <Box
//           onClick={() => navigate(-1)}
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 0.5,
//             cursor: "pointer",
//             mb: 2,
//             fontSize: 14,
//           }}
//         >
//           <ArrowBackIcon fontSize="small" />
//           Back
//         </Box>

//         <Typography fontSize={28} fontWeight={600} mb={1}>
//           Claim Assessor Workpool
//         </Typography>

//         {/* WORKPOOL CARD */}
//         <Paper
//           elevation={0}
//           sx={{
//             border: "1px solid #E6DBD3",
//             borderRadius: "12px",
//             backgroundColor: "#fff",
//             overflow: "hidden",
//           }}
//         >
//           {/* TOP BAR (REDUCED) */}
//           <Box
//             sx={{
//               px: 2,
//               py: 1.5,
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               borderBottom: "1px solid #E6DBD3",
//             }}
//           >
//             <Typography fontSize={18} fontWeight={600}>
//               Workpool
//             </Typography>

//             <Stack direction="row" spacing={1}>
//               <TextField
//                 placeholder="Search"
//                 size="small"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon fontSize="small" />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   width: 180,
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "8px",
//                   },
//                 }}
//               />

//               <Button
//                 variant="outlined"
//                 startIcon={<FileDownloadIcon fontSize="small" />}
//                 sx={{
//                   borderRadius: "8px",
//                   textTransform: "none",
//                   px: 1.5,
//                   py: 0.5,
//                   fontSize: 13,
//                 }}
//               >
//                 Export
//               </Button>
//             </Stack>
//           </Box>

//           {/* TABLE */}
//           <TableContainer sx={{ overflowX: "auto" }}>
//             <Table
//               sx={{
//                 borderCollapse: "separate",
//                 borderSpacing: "0 12px",
//                 px: 1,
//               }}
//             >
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#E6F3F6" }}>
//                   {[
//                     "Claim ID",
//                     "Claimant",
//                     "Submission Date",
//                     "Claim Amount",
//                     "Status",
//                   ].map((head) => (
//                     <TableCell
//                       key={head}
//                       sx={{
//                         fontSize: 14,
//                         fontWeight: 600,
//                         color: "#2E2C28",
//                         px: 3,
//                         py: 1.5,
//                       }}
//                     >
//                       {head}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {filteredClaims.map((claim, index) => (
//                   <TableRow
//                     key={index}
//                     sx={{
//                       backgroundColor: "#fff",
//                       boxShadow: "0px 1px 4px rgba(0,0,0,0.08)",
//                       borderRadius: "10px",
//                       cursor: "pointer",
//                       "& td": { borderBottom: "none" },
//                       "&:hover": {
//                         backgroundColor: "#d1d9db",
//                         outline: "1px solid #a7c3c6",
//                       },
//                     }}
//                   >
//                     <TableCell sx={{ px: 3, color: "#4A8F97" }}>
//                       {claim.id}
//                     </TableCell>
//                     <TableCell sx={{ px: 3 }}>
//                       {claim.claimant}
//                     </TableCell>
//                     <TableCell sx={{ px: 3 }}>
//                       {claim.submissionDate}
//                     </TableCell>
//                     <TableCell sx={{ px: 3 }}>
//                       {claim.claimAmount}
//                     </TableCell>
//                     <TableCell sx={{ px: 3 }}>
//                       <Stack direction="row" spacing={0} alignItems="center">
//                         <Box
//                           sx={{
//                             width: 8,
//                             height: 8,
//                             borderRadius: "80%",
//                             backgroundColor: claim.statusColor,
//                           }}
//                         />
//                         <Typography fontSize={14}>
//                           {claim.status}
//                         </Typography>
//                       </Stack>
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
//               alignItems: "center",
//               borderTop: "1px solid #E6DBD3",
//             }}
//           >
//             <Typography fontSize={14} color="#706E68">
//               1–10 of 150 records
//             </Typography>

//             <Stack direction="row" spacing={1} alignItems="center">
//               <Box
//                 sx={paginationBoxStyle}
//                 onClick={() => page > 1 && setPage(page - 1)}
//               >
//                 <ChevronLeftIcon fontSize="small" />
//               </Box>

//               {[1, 2, 3, 4, 5].map((num) => (
//                 <Box
//                   key={num}
//                   sx={{
//                     ...paginationBoxStyle,
//                     backgroundColor: num === page ? "#E6E6E6" : "#fff",
//                     borderColor: num === page ? "#E6E6E6" : "#D6D6D6",
//                     fontWeight: num === page ? 600 : 400,
//                   }}
//                   onClick={() => setPage(num)}
//                 >
//                   {num}
//                 </Box>
//               ))}

//               <Typography fontSize={14}>…</Typography>

//               <Box sx={paginationBoxStyle} onClick={() => setPage(totalPages)}>
//                 {totalPages}
//               </Box>

//               <Box
//                 sx={paginationBoxStyle}
//                 onClick={() => page < totalPages && setPage(page + 1)}
//               >
//                 <ChevronRightIcon fontSize="small" />
//               </Box>
//             </Stack>
//           </Box>
//         </Paper>
//       </Box>
//     </Box>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
  const totalPages = 10;

  const assessorId = "ASSESSOR_101";
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("access_token");

  /* ================= GET MY CASES ================= */
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

  /* ================= ASSIGN TO ME ================= */
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

      // refresh list after assignment
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

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      {/* HEADER */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1100,
          backgroundColor: "#4A8F97",
          px: 4,
          py: 2,
        }}
      >
        <Box component="img" src={aaseyaLogo} alt="aaseya" sx={{ height: 32 }} />
      </Box>

      <Box sx={{ maxWidth: "1366px", mx: "auto", px: 4, py: 3 }}>
        {/* BACK */}
        <Box
          onClick={() => navigate(-1)}
          sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer", mb: 2 }}
        >
          <ArrowBackIcon fontSize="small" /> Back
        </Box>

        <Typography fontSize={28} fontWeight={600} mb={1}>
          Claim Assessor Workpool
        </Typography>

        <Paper sx={{ borderRadius: "12px", overflow: "hidden" }}>
          {/* TOP BAR */}
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
              placeholder="Search"
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
              sx={{ width: 200 }}
            />
          </Box>

          {/* TABLE */}
          <TableContainer>
            <Table sx={{ borderSpacing: "0 12px", borderCollapse: "separate" }}>
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
