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
import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
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
import logoutIcon from "../assets/logout.svg";

export default function ClaimSummary() {
  const navigate = useNavigate();
  const { claimId } = useParams();

  const [decision, setDecision] = useState("");
  const [comments, setComments] = useState("");

  const handleLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("username");

  navigate("/ais/login");
};

  /* ===== MOCK DATA ===== */
  const claimData = {
    fullName: "Johnathan Doe",
    relationship: "Primary Insured",
    contact: "(+1)(555)102-3456",
    email: "johndoe@aaseya.com",
    policyNumber: "IN-656947",
    policyType: "Family Floater",
    coverageType: "Cashless",
    baseSum: "$50,000",
    policyStatus: "Active",
    dateOfService: "Oct 20, 2026",
    providerName: "City General Hospital",
    claimType: "In-Patient Surgery",
    complaint:
      "Acute Appendectomy required after emergency admission. Post-Operative recovery was stable with no immediate complications noted.",
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff" }}>

      {/* ===== HEADER ===== */}
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

      {/* ===== PAGE CONTENT ===== */}
      <Box sx={{ maxWidth: "1366px", mx: "auto", px: 4, py: 3 }}>

        {/* BACK */}
        <Box
          onClick={() => navigate(-1)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            cursor: "pointer",
            mb: 1,
          }}
        >
          <ArrowBackIcon fontSize="small" />
          <Typography fontSize={14}>Back</Typography>
        </Box>

        {/* TITLE */}
        <Typography fontSize={34} fontWeight={600} mb={2.5}>
          Claim Review - {claimId}
        </Typography>

        {/* ===== CLAIM SUMMARY ===== */}
        <Paper
          sx={{
            borderRadius: "12px",
            border: "1px solid #E6DBD3",
            p: 3,
            mb: 2,
          }}
        >
          <Typography fontSize={32} fontWeight={600} mb={2}>
            Claim Summary
          </Typography>

          <Box
            sx={{
              backgroundColor: "#EEF7F8",
              borderRadius: "10px",
              p: 3,
            }}
          >
            {/* CLAIMANT INFO */}
            <Typography fontSize={18} fontWeight={600} color="#2B8A92" mb={2}>
              Claimant Information
            </Typography>

            <Grid container spacing={2.5} mb={2}>
              <Grid item xs={3}>
                <Typography fontSize={18} color="#2E2E2E">Full Name</Typography>
                <Typography fontSize={18} fontWeight={500}>{claimData.fullName}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography fontSize={18}>Relationship</Typography>
                <Typography fontSize={18} fontWeight={500}>{claimData.relationship}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography fontSize={18}>Contact Number</Typography>
                <Typography fontSize={18} fontWeight={500}>{claimData.contact}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography fontSize={18}>Email</Typography>
                <Typography fontSize={18} fontWeight={500}>{claimData.email}</Typography>
              </Grid>
            </Grid>

            <Box sx={{ borderBottom: "1px solid #DDE7E8", my: 2 }} />

            {/* POLICY INFO */}
            <Typography fontSize={18} fontWeight={600} color="#2B8A92" mb={2}>
              Policy Information
            </Typography>

            <Grid container spacing={2.5} mb={2}>
              <Grid item xs={3}>
                <Typography fontSize={18}>Policy Number</Typography>
                <Typography fontSize={18} fontWeight={500}>{claimData.policyNumber}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography fontSize={18}>Policy Type</Typography>
                <Typography fontSize={18} fontWeight={500}>{claimData.policyType}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography fontSize={18}>Coverage Type</Typography>
                <Typography fontSize={18} fontWeight={500}>{claimData.coverageType}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography fontSize={18}>Base Sum Insured</Typography>
                <Typography fontSize={18} fontWeight={500}>{claimData.baseSum}</Typography>
              </Grid>
            </Grid>

            <Typography fontSize={18}>Policy Status</Typography>
            <Typography fontSize={18} fontWeight={500} mb={2}>
              {claimData.policyStatus}
            </Typography>

            <Box sx={{ borderBottom: "1px solid #DDE7E8", my: 2 }} />

            {/* INCIDENT DETAILS */}
            <Typography fontSize={18} fontWeight={600} color="#2B8A92" mb={2}>
              Incident Details
            </Typography>

            <Grid container spacing={2.5} mb={1}>
              <Grid item xs={4}>
                <Typography fontSize={18}>Date of Service</Typography>
                <Typography fontSize={18} fontWeight={500}>{claimData.dateOfService}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography fontSize={18}>Provider Name</Typography>
                <Typography fontSize={18} fontWeight={500}>{claimData.providerName}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography fontSize={18}>Claim Type</Typography>
                <Typography fontSize={18} fontWeight={500}>{claimData.claimType}</Typography>
              </Grid>
            </Grid>

            <Typography fontSize={18}>Chief Complaint/Diagnosis</Typography>
            <Typography fontSize={18} fontWeight={500}>
              {claimData.complaint}
            </Typography>
          </Box>
        </Paper>

        {/* ===== MANAGER DECISION ===== */}
        <Paper
          sx={{
            borderRadius: "12px",
            border: "1px solid #E6DBD3",
            p: 3,
          }}
        >
          <Typography fontSize={18} fontWeight={600} mb={2}>
            Manager Decision
          </Typography>

          <RadioGroup
            row
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
          >
            <FormControlLabel value="approve" control={<Radio />} label="Approve" />
            <FormControlLabel value="reject" control={<Radio />} label="Reject" />
          </RadioGroup>

          <Typography fontSize={14} mb={1}>
            Comments
          </Typography>

          <TextField
            fullWidth
            size="small"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />

          <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              sx={{ borderRadius: "20px", px: 4 }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              sx={{
                borderRadius: "20px",
                px: 4,
                backgroundColor: "#4A8F97",
                "&:hover": { backgroundColor: "#3B7D84" },
              }}
            >
              Submit
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}
