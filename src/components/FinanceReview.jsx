// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Box,
//   Paper,
//   Typography,
//   Stack,
//   Button,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   TextField,
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import aaseyaLogo from "../assets/Aaseyalogo.svg";
// import logoutIcon from "../assets/logout.svg";
// import { useState, useEffect } from "react";

// export default function FinanceReview() {
//   const navigate = useNavigate();
//   const { claimId } = useParams();

//   const [decision, setDecision] = useState("");
//   const [comments, setComments] = useState("");
//   const [financeData, setFinanceData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const baseUrl = import.meta.env.VITE_API_BASE_URL;
//   const token = localStorage.getItem("access_token");

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/ais/login");
//   };

//   /* ================= FETCH FINANCE OVERVIEW ================= */
//   useEffect(() => {
//     const fetchFinanceOverview = async () => {
//       try {
//         const response = await fetch(
//           `${baseUrl}/healthcare/finance/review/${claimId}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Finance overview fetch failed");
//         }

//         const data = await response.json();
//         console.log("Finance Overview:", data);

//         setFinanceData(data);
//       } catch (error) {
//         console.error("Finance overview error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFinanceOverview();
//   }, [claimId, token, baseUrl]);

//   /* ================= SUBMIT FINANCE DECISION ================= */
//   const handleSubmit = async () => {
//     if (!decision) {
//       alert("Please select approve or reject");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `${baseUrl}/healthcare/claims/${claimId}/finance-decision`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             decision: decision.toUpperCase(),
//             comment: comments,
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Finance decision failed");
//       }

//       console.log("Finance decision submitted");

//       navigate("/ais/workpool");

//     } catch (error) {
//       console.error("Finance decision error:", error);
//       alert("Submission failed");
//     }
//   };

//   if (loading) {
//     return <Typography sx={{ p: 5 }}>Loading...</Typography>;
//   }

//   if (!financeData) {
//     return <Typography sx={{ p: 5 }}>No data found</Typography>;
//   }

//   return (
//     <Box sx={{ minHeight: "100vh", backgroundColor: "#fff" }}>

//       {/* HEADER */}
//       <Box
//         sx={{
//           position: "fixed",
//           width: "100%",
//           zIndex: 1200,
//           backgroundColor: "#4C8B92",
//           px: 4,
//           py: 2,
//           display: "flex",
//           justifyContent: "space-between",
//         }}
//       >
//         <Box component="img" src={aaseyaLogo} sx={{ height: 32 }} />
//         <Box onClick={handleLogout} sx={{ cursor: "pointer", color: "#fff" }}>
//           Logout
//         </Box>
//       </Box>

//       <Box sx={{ maxWidth: "1200px", mx: "auto", px: 4, py: 10 }}>

//         <Box
//           sx={{ display: "flex", alignItems: "center", cursor: "pointer", mb: 2 }}
//           onClick={() => navigate(-1)}
//         >
//           <ArrowBackIcon fontSize="small" />
//           <Typography fontSize={14}>Back</Typography>
//         </Box>

//         <Typography fontSize={22} fontWeight={600} mb={3}>
//           Financial Cost & Policy Review - {claimId}
//         </Typography>

//         {/* FINANCIAL OVERVIEW */}
//         <Paper sx={{ p: 3, mb: 3 }}>
//           <Typography fontWeight={600} mb={2}>
//             Financial Overview
//           </Typography>

//           <Stack direction="row" spacing={3}>
//             <Box>
//               <Typography fontSize={12}>Estimated Total Cost</Typography>
//               <Typography fontWeight={700}>
//                 {financeData.estimatedTotalCost}
//               </Typography>
//             </Box>

//             <Box>
//               <Typography fontSize={12}>Policy Sum Insured</Typography>
//               <Typography fontWeight={700}>
//                 {financeData.policySumInsured}
//               </Typography>
//             </Box>

//             <Box>
//               <Typography fontSize={12}>Available Balance</Typography>
//               <Typography fontWeight={700}>
//                 {financeData.availableBalance}
//               </Typography>
//             </Box>
//           </Stack>
//         </Paper>

//         {/* CLAIM SUMMARY */}
//         <Paper sx={{ p: 3, mb: 3 }}>
//           <Typography fontWeight={600} mb={2}>
//             Claim Summary
//           </Typography>

//           <Typography><strong>Full Name:</strong> {financeData.fullName}</Typography>
//           <Typography><strong>Hospital:</strong> {financeData.hospitalName}</Typography>
//           <Typography><strong>Treatment:</strong> {financeData.treatmentType}</Typography>
//           <Typography><strong>Admission Date:</strong> {financeData.admissionDate}</Typography>
//           <Typography><strong>Policy Number:</strong> {financeData.policyNumber}</Typography>
//           <Typography><strong>Reviewing Manager:</strong> {financeData.reviewingManager}</Typography>
//         </Paper>

//         {/* FINANCE DECISION */}
//         <Paper sx={{ p: 3 }}>
//           <Typography fontWeight={600} mb={2}>
//             Finance Officer Decision
//           </Typography>

//           <RadioGroup
//             row
//             value={decision}
//             onChange={(e) => setDecision(e.target.value)}
//           >
//             <FormControlLabel value="approve" control={<Radio />} label="Approve" />
//             <FormControlLabel value="reject" control={<Radio />} label="Reject" />
//           </RadioGroup>

//           <TextField
//             fullWidth
//             size="small"
//             placeholder="Comments"
//             value={comments}
//             onChange={(e) => setComments(e.target.value)}
//             sx={{ mt: 2 }}
//           />

//           <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
//             <Button variant="outlined" onClick={() => navigate(-1)}>
//               Cancel
//             </Button>

//             <Button
//               variant="contained"
//               onClick={handleSubmit}
//               sx={{
//                 backgroundColor: "#4A8F97",
//                 "&:hover": { backgroundColor: "#3B7D84" },
//               }}
//             >
//               Submit
//             </Button>
//           </Stack>
//         </Paper>

//       </Box>
//     </Box>
//   );
// }
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import aaseyaLogo from "../assets/Aaseyalogo.svg";
import { useState, useEffect } from "react";

export default function FinanceReview() {
  const navigate = useNavigate();
  const { claimId } = useParams();

  const [decision, setDecision] = useState("");
  const [comments, setComments] = useState("");
  const [financeData, setFinanceData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("access_token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/ais/login");
  };

  /* ================= FETCH FINANCE OVERVIEW ================= */
  useEffect(() => {
    if (!token) {
      handleLogout();
      return;
    }

    const fetchFinanceOverview = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${baseUrl}/healthcare/finance/review/${claimId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          handleLogout();
          return;
        }

        if (!response.ok) {
          throw new Error("Finance overview fetch failed");
        }

        const data = await response.json();
        setFinanceData(data);
      } catch (err) {
        console.error("Finance overview error:", err);
        setError("Failed to load finance review");
      } finally {
        setLoading(false);
      }
    };

    fetchFinanceOverview();
  }, [claimId, token, baseUrl]);

  /* ================= SUBMIT FINANCE DECISION ================= */
  const handleSubmit = async () => {
    if (!decision) {
      alert("Please select approve or reject");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        `${baseUrl}/healthcare/claims/${claimId}/finance-decision`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            decision,        // APPROVE or REJECT
            comment: comments,
          }),
        }
      );

      if (response.status === 401) {
        handleLogout();
        return;
      }

      if (!response.ok) {
        throw new Error("Finance decision failed");
      }

      navigate("/ais/workpool");
    } catch (err) {
      console.error("Finance decision error:", err);
      alert("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= RENDER STATES ================= */

  if (loading) {
    return <Typography sx={{ p: 5 }}>Loading...</Typography>;
  }

  if (error) {
    return (
      <Typography sx={{ p: 5, color: "red" }}>
        {error}
      </Typography>
    );
  }

  if (!financeData) {
    return <Typography sx={{ p: 5 }}>No data found</Typography>;
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      {/* HEADER */}
      <Box
        sx={{
          position: "fixed",
          width: "100%",
          zIndex: 1200,
          backgroundColor: "#4C8B92",
          px: 4,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box component="img" src={aaseyaLogo} sx={{ height: 32 }} />
        <Box
          onClick={handleLogout}
          sx={{ cursor: "pointer", color: "#fff" }}
        >
          Logout
        </Box>
      </Box>

      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 4, py: 10 }}>
        {/* BACK */}
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer", mb: 2 }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon fontSize="small" />
          <Typography fontSize={14}>Back</Typography>
        </Box>

        <Typography fontSize={22} fontWeight={600} mb={3}>
          Financial Cost & Policy Review - {claimId}
        </Typography>

        {/* FINANCIAL OVERVIEW */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography fontWeight={600} mb={2}>
            Financial Overview
          </Typography>

          <Stack direction="row" spacing={4}>
            <Box>
              <Typography fontSize={12}>Estimated Total Cost</Typography>
              <Typography fontWeight={700}>
                {financeData.estimatedTotalCost}
              </Typography>
            </Box>

            <Box>
              <Typography fontSize={12}>Policy Sum Insured</Typography>
              <Typography fontWeight={700}>
                {financeData.policySumInsured}
              </Typography>
            </Box>

            <Box>
              <Typography fontSize={12}>Available Balance</Typography>
              <Typography fontWeight={700}>
                {financeData.availableBalance}
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* CLAIM SUMMARY */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography fontWeight={600} mb={2}>
            Claim Summary
          </Typography>

          <Typography><strong>Full Name:</strong> {financeData.fullName}</Typography>
          <Typography><strong>Hospital:</strong> {financeData.hospitalName}</Typography>
          <Typography><strong>Treatment:</strong> {financeData.treatmentType}</Typography>
          <Typography><strong>Admission Date:</strong> {financeData.admissionDate}</Typography>
          <Typography><strong>Policy Number:</strong> {financeData.policyNumber}</Typography>
          <Typography><strong>Reviewing Manager:</strong> {financeData.reviewingManager}</Typography>
        </Paper>

        {/* FINANCE DECISION */}
        <Paper sx={{ p: 3 }}>
          <Typography fontWeight={600} mb={2}>
            Finance Officer Decision
          </Typography>

          <RadioGroup
            row
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
          >
            <FormControlLabel
              value="APPROVE"
              control={<Radio />}
              label="Approve"
            />
            <FormControlLabel
              value="REJECT"
              control={<Radio />}
              label="Reject"
            />
          </RadioGroup>

          <TextField
            fullWidth
            size="small"
            placeholder="Comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            sx={{ mt: 2 }}
          />

          <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              disabled={submitting}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={submitting}
              sx={{
                backgroundColor: "#4A8F97",
                "&:hover": { backgroundColor: "#3B7D84" },
              }}
            >
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}