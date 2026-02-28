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

import totalPendingIcon from "../assets/totalpending.svg";
import totalCasesIcon from "../assets/totalcases.svg";
import humanInterventionIcon from "../assets/humanintervention.svg";
import completedIcon from "../assets/completed.svg";
import { TablePagination } from "@mui/material";

export default function Workpool() {
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("userRole");
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const username = localStorage.getItem("username");
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);
const [dashboardData, setDashboardData] = useState(null);

 const roleRoutes = {
  ASSESSOR: "/claim-review/",
  MANAGER: "/claim-summary/",
  FINANCE: "/finance-review/",
};
  const handleLogout = () => {
    localStorage.clear();
navigate("/login");  };

 const fetchDashboard = async () => {
  try {
    let dashboardUrl = "";

    switch (role) {
      case "ASSESSOR":
        dashboardUrl = `${baseUrl}/healthcare/ClaimAssessorDashboard`;
        break;
      case "MANAGER":
        dashboardUrl = `${baseUrl}/healthcare/ClaimManagerDashboard`;
        break;
      case "FINANCE":
        dashboardUrl = `${baseUrl}/healthcare/FinanceDashboard`;
        break;
      default:
        return;
    }

    const response = await fetch(dashboardUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Dashboard failed");

    const data = await response.json();
    console.log("DASHBOARD RESPONSE:", data);
    setDashboardData(data);
  } catch (err) {
    console.error("Dashboard error:", err);
  }
};

useEffect(() => {
  if (!token || !role) return;
  fetchDashboard();
}, [token, role, baseUrl]);
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
  url = `${baseUrl}/healthcare/claims/review`;
  break;
        case "FINANCE":
  url = `${baseUrl}/healthcare/claims/finance-review`;
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
console.log(`${role} WORKPOOL RESPONSE:`, data);

setClaims(Array.isArray(data) ? data : data.cases || []);setError(null);
    } catch (err) {
      console.error("Workpool error:", err);
      setError("Failed to load workpool");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [role, token, baseUrl]);
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
    value: dashboardData?.totalPendingCases ?? 0,
    percent: "+3%",
    icon: totalPendingIcon,
    bg: "#FFF3E8",
  },
  {
    title: "Human Intervention",
    value: dashboardData?.humanIntervention ?? 0,
    percent: "+3%",
    icon: humanInterventionIcon,
    bg: "#FFF9E6",
  },
  {
    title: "Total Cases",
    value: dashboardData?.totalCasesThisWeek ?? 0,
    percent: "+3%",
    icon: totalCasesIcon,
    bg: "#EEF4FF",
  },
  {
    title: "Completed Today",
    value: dashboardData?.completedCases ?? 0,
    percent: "+3%",
    icon: completedIcon,
    bg: "#EAFBF1",
  },
];
  
const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F7F9F9" }}>
      
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
          <Typography sx={{ color: "#fff", fontSize: 14 }}>
            Logout
          </Typography>
        </Stack>
      </Box>

      <Box sx={{ maxWidth: "1280px", mx: "auto", pt: "110px", px: 4 }}>
        
        <Typography fontSize={26} fontWeight={600} mb={4}>
          {pageTitle}
        </Typography>

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

        <Paper sx={{ borderRadius: 3 }}>
          
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
  {loading ? (
    <TableRow>
      <TableCell colSpan={5} align="center">
        Loading cases...
      </TableCell>
    </TableRow>
  ) : error ? (
    <TableRow>
      <TableCell colSpan={5} align="center" sx={{ color: "red" }}>
        {error}
      </TableCell>
    </TableRow>
  ) : filteredClaims.length === 0 ? (
    <TableRow>
      <TableCell colSpan={5} align="center">
        No cases available w
      </TableCell>
    </TableRow>
  ) : (
     filteredClaims
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((claim) => (
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
        <TableCell>{claim.claimant}</TableCell>
        <TableCell>
          {claim.submissionDate
            ? new Date(claim.submissionDate).toLocaleDateString()
            : "-"}
        </TableCell>
        <TableCell>
  {claim.amount ? claim.amount : "-"}
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
        </TableCell>
      </TableRow>
    ))
  )}
</TableBody>
            </Table>
          </TableContainer>
     <Box
  sx={{
    borderTop: "1px solid #E0E0E0",
    display: "flex",
    justifyContent: "flex-end",
    px: 2,
  }}
>
  <TablePagination
    component="div"
    count={filteredClaims.length}
    page={page}
    onPageChange={handleChangePage}
    rowsPerPage={rowsPerPage}
    onRowsPerPageChange={handleChangeRowsPerPage}
    rowsPerPageOptions={[5, 10, 25]}
  />
</Box>
        </Paper>
      </Box>
    </Box>
  );
}