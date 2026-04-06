import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
  Button,
} from "@mui/material";

import aaseyaLogo from "../assets/Aaseyalogo.svg";
import logoutIcon from "../assets/logout.svg";

import totalPendingIcon from "../assets/totalpending.svg";
import totalCasesIcon from "../assets/totalcases.svg";
import humanInterventionIcon from "../assets/humanintervention.svg";
import completedIcon from "../assets/completed.svg";
import downloadIcon from "../assets/download.svg";
import { Pagination } from "@mui/material";

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
    navigate("/login");
  };

  const fetchDashboard = async () => {
    try {
      let dashboardUrl = "";
      
      if (role === "DOCTOR") {
        setDashboardData({
          avgConsultation: "18m",
          humanIntervention: 32,
          totalPatients: "1,284",
          activeCases: 84
        });
        return;
      }

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

        if (role === "DOCTOR") {
          setLoading(false);
          setClaims([
            { patientId: "PD-100301093", patientName: "Priya", icdCode: "G56.01", policyNo: "POL-2024-0891", policyType: "Individual" },
            { patientId: "PD-100301093", patientName: "Sai", icdCode: "G56.01", policyNo: "POL-2024-0891", policyType: "Floating" },
            { patientId: "PD-100301093", patientName: "Herbert", icdCode: "G56.01", policyNo: "POL-2024-0891", policyType: "Individual" },
            { patientId: "PD-100301093", patientName: "Roy", icdCode: "G56.01", policyNo: "POL-2024-0891", policyType: "Individual" },
            { patientId: "PD-100301093", patientName: "John", icdCode: "G56.01", policyNo: "POL-2024-0891", policyType: "Floating" },
          ]);
          return;
        }

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

        const raw = Array.isArray(data) ? data : data.cases || [];
        const sorted = [...raw].sort((a, b) => {
          const dateA = a.submissionDate ? new Date(a.submissionDate).getTime() : 0;
          const dateB = b.submissionDate ? new Date(b.submissionDate).getTime() : 0;
          return dateB - dateA;
        });
        setClaims(sorted); setError(null);
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
    if (role === "DOCTOR") {
      return (
        claim.patientId?.toLowerCase().includes(query) ||
        claim.patientName?.toLowerCase().includes(query) ||
        claim.icdCode?.toLowerCase().includes(query) ||
        claim.policyNo?.toLowerCase().includes(query)
      );
    }
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
    role === "DOCTOR"
      ? "Doctor Workpool"
      : role === "ASSESSOR"
      ? "Claim Assessor Workpool"
      : role === "MANAGER"
        ? "Claim Manager Workpool"
        : role === "FINANCE"
          ? "Finance Officer Workpool"
          : "Workpool";

  const cards = role === "DOCTOR" ? [
    {
      title: "Avg. Consultation",
      value: dashboardData?.avgConsultation ?? "18m",
      percent: "+3%",
      icon: totalPendingIcon,
      bg: "#FFF3E8",
    },
    {
      title: "Human Intervention",
      value: dashboardData?.humanIntervention ?? 32,
      percent: "+3%",
      icon: humanInterventionIcon,
      bg: "#FFF9E6",
    },
    {
      title: "Total Patients",
      value: dashboardData?.totalPatients ?? "1,284",
      percent: "+5%",
      icon: totalCasesIcon,
      bg: "#EEF4FF",
    },
    {
      title: "Active Cases",
      value: dashboardData?.activeCases ?? 84,
      percent: "+3%",
      icon: completedIcon,
      bg: "#EAFBF1",
    },
  ] : [
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
        <Box component="img" src={aaseyaLogo} sx={{ height: 30, filter: role === "DOCTOR" ? "brightness(0) invert(1)" : "none" }} />

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

      <Box sx={{ width: "100%", pt: "90px", px: 5 }}>

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
              <Stack direction="row" spacing={3} alignItems="center">
                <Box 
                  component="img" 
                  src={card.icon} 
                  sx={{ width: 85, height: "auto", objectFit: "contain" }} 
                />

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

        <Paper sx={{ borderRadius: 3, border: "1px solid #E8E8E8", boxShadow: "none" }}>

          <Box
            sx={{
              p: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontSize={20} fontWeight={600}>
              Workpool
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                size="small"
                placeholder="Search By"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ 
                  width: 260,
                  backgroundColor: "#fff",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.12)",
                    "& fieldset": { borderColor: "#D6D6D6" },
                    "&:hover fieldset": { borderColor: "#BDBDBD" },
                    "&.Mui-focused fieldset": { borderColor: "#4C8B92", borderWidth: "1px" }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" sx={{ color: "#888" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button 
                variant="outlined" 
                startIcon={<Box component="img" src={downloadIcon} sx={{ width: 14, filter: "opacity(0.6)" }} />}
                sx={{ 
                  textTransform: "none", 
                  backgroundColor: "#fff",
                  borderColor: "#D6D6D6",
                  color: "#555",
                  fontWeight: 500,
                  borderRadius: "8px",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.12)",
                  "&:hover": { backgroundColor: "#F9F9F9", borderColor: "#BDBDBD", boxShadow: "0px 6px 16px rgba(0,0,0,0.16)" },
                  px: 3
                }}
              >
                Export
              </Button>
            </Box>
          </Box>

          <TableContainer sx={{ px: 3, pb: 1 }}>

            <Table sx={{ borderCollapse: "separate", borderSpacing: "0 12px" }}>
              <TableHead>
                <TableRow sx={{ "& th": { borderBottom: "none", backgroundColor: "#AACECF" }, "& th:first-of-type": { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }, "& th:last-of-type": { borderTopRightRadius: 8, borderBottomRightRadius: 8 } }}>
                  {role === "DOCTOR" ? (
                    <>
                      <TableCell sx={{ fontWeight: 600 }}>Patient ID</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Patient Name</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>ICD Code</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Policy No</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Policy Type</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell sx={{ fontWeight: 600 }}>Claim ID</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Claimant</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Submission Date</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    </>
                  )}
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
                      No cases available
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClaims
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((claim, index) => (
                      <TableRow
                        key={claim.claimId || index}
                        hover
                        sx={{
                          cursor: "pointer",
                          backgroundColor: "#fff",
                          "& td": { borderTop: "1px solid #EAEAEA", borderBottom: "1px solid #EAEAEA" },
                          "& td:first-of-type": { borderLeft: "1px solid #EAEAEA", borderTopLeftRadius: 8, borderBottomLeftRadius: 8 },
                          "& td:last-of-type": { borderRight: "1px solid #EAEAEA", borderTopRightRadius: 8, borderBottomRightRadius: 8 },
                        }}
                        onClick={() => {
                          if (role === "DOCTOR") {
                            navigate(`/doctor-upload/${claim.patientId}`);
                          } else {
                            const basePath = roleRoutes[role];
                            if (basePath && claim.claimId) {
                              navigate(`${basePath}${claim.claimId}`);
                            }
                          }
                        }}
                      >
                        {role === "DOCTOR" ? (
                          <>
                            <TableCell sx={{ color: "#4C8B92", fontWeight: 500 }}>{claim.patientId}</TableCell>
                            <TableCell>{claim.patientName}</TableCell>
                            <TableCell>{claim.icdCode}</TableCell>
                            <TableCell>{claim.policyNo}</TableCell>
                            <TableCell>{claim.policyType}</TableCell>
                          </>
                        ) : (
                          <>
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
                          </>
                        )}
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Custom Pagination Footer */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 4,
              py: 2,
            }}
          >
            <Typography fontSize={14} color="text.secondary">
              {filteredClaims.length === 0 
                ? "0 records" 
                : `${page * rowsPerPage + 1}-${Math.min((page + 1) * rowsPerPage, filteredClaims.length)} of ${filteredClaims.length} records`}
            </Typography>

            <Pagination
              count={Math.ceil(filteredClaims.length / rowsPerPage) || 1}
              page={page + 1}
              onChange={(e, value) => setPage(value - 1)}
              shape="rounded"
              variant="outlined"
              sx={{
                "& .MuiPaginationItem-root": {
                  borderColor: "#E0E0E0",
                  color: "#555",
                },
                "& .Mui-selected": {
                  backgroundColor: "#EAF4F5 !important",
                  borderColor: "#4C8B92",
                  color: "#4C8B92",
                  fontWeight: 600,
                }
              }}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}