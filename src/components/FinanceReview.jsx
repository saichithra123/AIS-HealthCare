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
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import aaseyaLogo from "../assets/Aaseyalogo.svg";
import { useState, useEffect } from "react";
import LogoutIcon from "@mui/icons-material/Logout";

export default function FinanceReview() {
  const navigate = useNavigate();
  const { claimId } = useParams();

  const [decision, setDecision] = useState("");
  const [comments, setComments] = useState("");
  const [financeData, setFinanceData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("access_token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/ais/login");
  };

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/healthcare/finance/review/${claimId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error();

        const data = await response.json();
        setFinanceData(data);
      } catch (err) {
        console.error("Finance fetch failed");
        setFinanceData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [claimId]);

  
  const handleSubmit = async () => {
    if (!decision) {
      alert("Please select Approve or Reject");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        `${baseUrl}/healthcare/claims/${claimId}/finance-decision?decision=${decision}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error();

      navigate("/ais/workpool");
    } catch (err) {
      alert("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  const financial = financeData?.financialOverview;
  const claim = financeData?.claimSummary;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F6F9F8" }}>
      
      <Box
  sx={{
    bgcolor: "#4C8B92",
    px: 4,
    py: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <Box component="img" src={aaseyaLogo} sx={{ height: 32 }} />

  <Box
    onClick={handleLogout}
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1,
      cursor: "pointer",
      color: "#fff",
    }}
  >
    <LogoutIcon fontSize="small" />
    <Typography fontSize={14}>Logout</Typography>
  </Box>
</Box>

      <Box sx={{ maxWidth: "1100px", mx: "auto", px: 4, py: 6 }}>
        {/* BACK */}
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer", mb: 2 }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon fontSize="small" />
          <Typography fontSize={14}>Back</Typography>
        </Box>

        <Typography fontSize={24} fontWeight={600} mb={4}>
          Financial Cost & Policy Review - {claimId}
        </Typography>

       
        <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Typography fontWeight={600} mb={3}>
            Financial Overview
          </Typography>

          {loading ? (
            <Box sx={{ textAlign: "center", py: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Stack direction="row" spacing={3}>
              {[
                {
                  label: "Estimated Total Cost",
                  value: financial?.estimatedTotalCost,
                },
                {
                  label: "Policy Sum Insured",
                  value: financial?.policySumInsured,
                },
                {
                  label: "Available Balance",
                  value: financial?.availableBalance,
                },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    flex: 1,
                    bgcolor: "#EEF3F4",
                    p: 3,
                    borderRadius: 3,
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={13} mb={1}>
                    {item.label}
                  </Typography>
                  <Typography fontWeight={700} fontSize={18}>
                    ₹ {item.value ?? "--"}
                  </Typography>
                </Box>
              ))}
            </Stack>
          )}
        </Paper>

       
        <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Typography fontWeight={600} mb={3}>
            Claim Summary
          </Typography>

          {loading ? (
            <Box sx={{ textAlign: "center", py: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Stack direction="row" spacing={6} flexWrap="wrap">
              <Box minWidth="250px">
                <Typography><strong>Full Name:</strong> {claim?.fullName ?? "--"}</Typography>
                <Typography><strong>Policy Number:</strong> {claim?.policyNumber ?? "--"}</Typography>
                <Typography><strong>Reviewing Manager:</strong> {claim?.reviewingManager ?? "--"}</Typography>
              </Box>

              <Box minWidth="250px">
                <Typography><strong>Hospital:</strong> {claim?.hospitalName ?? "--"}</Typography>
                <Typography><strong>Treatment:</strong> {claim?.treatmentType ?? "--"}</Typography>
                <Typography><strong>Admission Date:</strong> {claim?.admissionDate ?? "--"}</Typography>
              </Box>
            </Stack>
          )}
        </Paper>

        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography fontWeight={600} mb={2}>
            Finance Officer Decision
          </Typography>

          <RadioGroup
            row
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
          >
            <FormControlLabel value="Approved" control={<Radio />} label="Approve" />
            <FormControlLabel value="Rejected" control={<Radio />} label="Reject" />
          </RadioGroup>

          <TextField
            fullWidth
            placeholder="Comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            sx={{ mt: 2 }}
          />

          <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              sx={{
                borderRadius: "999px",
                px: 4,
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              disabled={submitting}
              onClick={handleSubmit}
              sx={{
                borderRadius: "999px",
                px: 4,
                bgcolor: "#4C8B92",
                color:"#fff",
                "&:hover": { bgcolor: "#3B7D84" },
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