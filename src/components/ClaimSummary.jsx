// import { useState } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   Grid,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   TextField,
//   Button,
//   Stack,
// } from "@mui/material";
// import { useParams, useNavigate } from "react-router-dom";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// import aaseyaLogo from "../assets/Aaseyalogo.svg";

// export default function ClaimSummary() {
//   const navigate = useNavigate();
//   const { claimId } = useParams();

//   const [decision, setDecision] = useState("");
//   const [comments, setComments] = useState("");

//   const claimData = {
//     fullName: "Johnathan Doe",
//     relationship: "Primary Insured",
//     contact: "(+1)(555)102-3456",
//     email: "johndoe@aaseya.com",
//     policyNumber: "IN-656947",
//     policyType: "Family Floater",
//     coverageType: "Cashless",
//     baseSum: "$50,000",
//     policyStatus: "Active",
//     dateOfService: "Oct 20, 2026",
//     providerName: "City General Hospital",
//     claimType: "In-Patient Surgery",
//     complaint:
//       "Acute Appendectomy required after emergency admission. Post-Operative recovery was stable with no immediate complications noted.",
//   };

//   return (
//     <Box sx={{ minHeight: "100vh", backgroundColor: "#fff" }}>

//       {/* ===== HEADER ===== */}
//       <Box
//         sx={{
//           backgroundColor: "#4A8F97",
//           px: 4,
//           py: 2,
//         }}
//       >
//         <Box component="img" src={aaseyaLogo} sx={{ height: 32 }} />
//       </Box>

//       {/* ===== MAIN CONTENT ===== */}
//       <Box sx={{ maxWidth: "1366px", mx: "auto", px: 4, py: 3 }}>

//         {/* BACK */}
//         <Box
//           onClick={() => navigate(-1)}
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 0.5,
//             cursor: "pointer",
//             mb: 1.5,
//           }}
//         >
//           <ArrowBackIcon fontSize="small" />
//           <Typography fontSize={14}>Back</Typography>
//         </Box>

//         {/* TITLE */}
//         <Typography fontSize={28} fontWeight={700} mb={2.5}>
//           Claim Review - {claimId}
//         </Typography>

//         {/* ===== CLAIM SUMMARY ===== */}
//         <Paper
//           sx={{
//             p: 2.5,
//             borderRadius: "12px",
//             border: "1px solid #E6DBD3",
//             mb: 2,
//           }}
//         >
//           <Typography fontSize={18} fontWeight={700} mb={2}>
//             Claim Summary
//           </Typography>

//           <Box
//             sx={{
//               backgroundColor: "#EDF3F4",
//               borderRadius: "10px",
//               p: 2,
//             }}
//           >
//             <Typography fontSize={14} fontWeight={700} color="#3A8C95" mb={1}>
//               Claimant Information
//             </Typography>

//             <Grid container spacing={2} mb={2}>
//               <Grid item xs={3}><Typography fontSize={12}>Full Name</Typography><Typography fontWeight={600}>{claimData.fullName}</Typography></Grid>
//               <Grid item xs={3}><Typography fontSize={12}>Relationship</Typography><Typography fontWeight={600}>{claimData.relationship}</Typography></Grid>
//               <Grid item xs={3}><Typography fontSize={12}>Contact Number</Typography><Typography fontWeight={600}>{claimData.contact}</Typography></Grid>
//               <Grid item xs={3}><Typography fontSize={12}>Email</Typography><Typography fontWeight={600}>{claimData.email}</Typography></Grid>
//             </Grid>

//             <Box sx={{ borderBottom: "1px solid #DDE7E8", mb: 2 }} />

//             <Typography fontSize={14} fontWeight={700} color="#3A8C95" mb={1}>
//               Policy Information
//             </Typography>

//             <Grid container spacing={2} mb={2}>
//               <Grid item xs={3}><Typography fontSize={13}>Policy Number</Typography><Typography fontWeight={500}>{claimData.policyNumber}</Typography></Grid>
//               <Grid item xs={3}><Typography fontSize={12}>Policy Type</Typography><Typography fontWeight={600}>{claimData.policyType}</Typography></Grid>
//               <Grid item xs={3}><Typography fontSize={12}>Coverage Type</Typography><Typography fontWeight={600}>{claimData.coverageType}</Typography></Grid>
//               <Grid item xs={3}><Typography fontSize={12}>Base Sum Insured</Typography><Typography fontWeight={600}>{claimData.baseSum}</Typography></Grid>
//             </Grid>

//             <Typography fontSize={12}>Policy Status</Typography>
//             <Typography fontWeight={600} mb={2}>{claimData.policyStatus}</Typography>

//             <Box sx={{ borderBottom: "1px solid #DDE7E8", mb: 2 }} />

//             <Typography fontSize={14} fontWeight={700} color="#3A8C95" mb={1}>
//               Incident Details
//             </Typography>

//             <Grid container spacing={2} mb={1}>
//               <Grid item xs={4}><Typography fontSize={12}>Date of Service</Typography><Typography fontWeight={600}>{claimData.dateOfService}</Typography></Grid>
//               <Grid item xs={4}><Typography fontSize={12}>Provider Name</Typography><Typography fontWeight={600}>{claimData.providerName}</Typography></Grid>
//               <Grid item xs={4}><Typography fontSize={12}>Claim Type</Typography><Typography fontWeight={600}>{claimData.claimType}</Typography></Grid>
//             </Grid>

//             <Typography fontSize={12}>Chief Complaint/Diagnosis</Typography>
//             <Typography fontWeight={600}>{claimData.complaint}</Typography>
//           </Box>
//         </Paper>

//         {/* ===== MANAGER DECISION ===== */}
//         <Paper
//           sx={{
//             p: 2.5,
//             borderRadius: "12px",
//             border: "1px solid #E6DBD3",
//           }}
//         >
//           <Typography fontSize={18} fontWeight={700} mb={2}>
//             Manager Decision
//           </Typography>

//           <RadioGroup
//             row
//             value={decision}
//             onChange={(e) => setDecision(e.target.value)}
//           >
//             <FormControlLabel value="approve" control={<Radio />} label="Approve" />
//             <FormControlLabel value="reject" control={<Radio />} label="Reject" />
//           </RadioGroup>

//           <Typography fontSize={13} mb={1}>Comments</Typography>

//           <TextField
//             fullWidth
//             size="small"
//             value={comments}
//             onChange={(e) => setComments(e.target.value)}
//           />

//           <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
//             <Button
//               variant="outlined"
//               onClick={() => navigate(-1)}
//               sx={{ borderRadius: "20px", px: 4 }}
//             >
//               Cancel
//             </Button>

//             <Button
//               variant="contained"
//               sx={{
//                 borderRadius: "20px",
//                 px: 4,
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
import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import aaseyaLogo from "../assets/Aaseyalogo.svg";

export default function ClaimSummary() {
  const navigate = useNavigate();
  const { claimId } = useParams();

  const [decision, setDecision] = useState("");
  const [comments, setComments] = useState("");
  const [claimData, setClaimData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("access_token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/ais/login");
  };

  /* ================= FETCH CLAIM SUMMARY ================= */
  useEffect(() => {
    if (!token) {
      handleLogout();
      return;
    }

    const fetchSummary = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${baseUrl}/healthcare/claims/${claimId}/summary`,
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
          throw new Error("Failed to fetch summary");
        }

        const data = await response.json();
        setClaimData(data);
      } catch (err) {
        console.error("Summary error:", err);
        setError("Failed to load claim summary");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [claimId, token, baseUrl]);

  /* ================= SUBMIT DECISION ================= */
  const handleSubmitDecision = async () => {
    if (!decision) {
      alert("Please select approve or reject");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        `${baseUrl}/healthcare/claims/${claimId}/review`,
        {
          method: "POST", // Correct REST method
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            decision,
            comments,
          }),
        }
      );

      if (response.status === 401) {
        handleLogout();
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to move case to finance");
      }

      navigate("/ais/workpool");
    } catch (err) {
      console.error("Finance routing error:", err);
      alert("Failed to submit decision");
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

  if (!claimData) {
    return <Typography sx={{ p: 5 }}>No data found</Typography>;
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      {/* HEADER */}
      <Box
        sx={{
          position: "fixed",
          width: "100%",
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

      <Box sx={{ maxWidth: "1366px", mx: "auto", px: 4, py: 10 }}>
        {/* BACK */}
        <Box
          onClick={() => navigate(-1)}
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            mb: 2,
          }}
        >
          <ArrowBackIcon fontSize="small" />
          <Typography fontSize={14}>Back</Typography>
        </Box>

        <Typography fontSize={34} fontWeight={600} mb={3}>
          Claim Review - {claimId}
        </Typography>

        {/* SUMMARY */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography fontSize={26} fontWeight={600} mb={2}>
            Claim Summary
          </Typography>

          <Typography>
            <strong>Full Name:</strong> {claimData.fullName}
          </Typography>
          <Typography>
            <strong>Policy Number:</strong> {claimData.policyNumber}
          </Typography>
          <Typography>
            <strong>Provider:</strong> {claimData.providerName}
          </Typography>
          <Typography>
            <strong>Claim Type:</strong> {claimData.claimType}
          </Typography>
        </Paper>

        {/* DECISION */}
        <Paper sx={{ p: 3 }}>
          <Typography fontWeight={600} mb={2}>
            Manager Decision
          </Typography>

          <RadioGroup
            row
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
          >
            <FormControlLabel
              value="APPROVED"
              control={<Radio />}
              label="Approve"
            />
            <FormControlLabel
              value="REJECTED"
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

          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            mt={3}
          >
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              disabled={submitting}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmitDecision}
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