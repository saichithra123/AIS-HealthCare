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
  Grid,
  CircularProgress,
  Snackbar,
  Alert

} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import aaseyaLogo from "../assets/Aaseyalogo.svg";
import { Divider } from "@mui/material";


export default function ClaimSummary() {
  const navigate = useNavigate();
  const { claimId } = useParams();

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("access_token");

  const [data, setData] = useState(null);
  const [decision, setDecision] = useState("");
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await fetch(
          `${baseUrl}/healthcare/claims/${claimId}/review`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Fetch failed");

        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [claimId, token]);

  const handleSubmit = async () => {
    if (!decision) {
      alert("Select Approve or Reject");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch(
        `${baseUrl}/healthcare/claims/${claimId}/manager-decision?decision=${decision}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comments }),
        }
      );

      if (!res.ok) throw new Error("Submission failed");

      setSnackOpen(true);

      setTimeout(() => {
        navigate("/ais/workpool");
      }, 1500);
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to submit decision");
    } finally {
      setSubmitting(false);
    }
  };

  const claimSummary = data?.claimSummary;
  const policyInformation = data?.policyInformation;
  const incidentDetails = data?.incidentDetails;

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F5F7F7" }}>
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
        <Typography
          sx={{ color: "#fff", cursor: "pointer", fontWeight: 500 }}
          onClick={handleLogout}
        >
          Logout
        </Typography>
      </Box>

      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 4, pt: "110px" }}>
        {/* BACK */}
        <Stack
          direction="row"
          spacing={1}
          mb={2}
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon fontSize="small" />
          <Typography fontSize={14}>Back</Typography>
        </Stack>

        <Typography
          sx={{
            fontSize: 28,
            fontWeight: 700,
            mb: 4,
          }}
        >
          Claim Review - {claimId}
        </Typography>

        <Paper
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
            mb: 4,
            minHeight: 250,
          }}
        >
          <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 3 }}>
            Claim Summary
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error">
              Failed to load claim data
            </Typography>
          ) : (
            <Box
              sx={{
                backgroundColor: "#EAF3F4",
                borderRadius: 3,
                p: 4,
              }}
            >
              <Typography sx={{ fontWeight: 600, mb: 2 }}>
                Claimant Information
              </Typography>

              <Grid container spacing={4} mb={3}>
                <Grid item xs={3}>
                  <Label title="Full Name" value={claimSummary?.fullName} />
                </Grid>
                <Grid item xs={3}>
                  <Label title="Relationship" value={claimSummary?.insuredType} />
                </Grid>
                <Grid item xs={3}>
                  <Label title="Contact Number" value={claimSummary?.contactNumber} />
                </Grid>
                <Grid item xs={3}>
                  <Label title="Email" value={claimSummary?.email} />
                </Grid>
              </Grid>

              <Box sx={{ borderBottom: "1px solid #D5E2E3", mb: 3 }} />

              <Typography sx={{ fontWeight: 600, mb: 2 }}>
                Policy Information
              </Typography>

              <Grid container spacing={4} mb={3}>
                <Grid item xs={3}>
                  <Label title="Policy Number" value={policyInformation?.policyNumber} />
                </Grid>
                <Grid item xs={3}>
                  <Label title="Policy Type" value={policyInformation?.policyType} />
                </Grid>
                <Grid item xs={3}>
                  <Label title="Coverage Type" value={policyInformation?.coverageType} />
                </Grid>
                <Grid item xs={3}>
                  <Label
                    title="Base Sum Insured"
                    value={
                      policyInformation?.baseSumInsured
                        ? `$${Number(policyInformation.baseSumInsured).toLocaleString()}`
                        : "-"
                    }
                  />
                </Grid>
              </Grid>

              <Box sx={{ borderBottom: "1px solid #D5E2E3", mb: 3 }} />

              <Typography sx={{ fontWeight: 600, mb: 2 }}>
                Incident Details
              </Typography>

              <Grid container spacing={4}>
                <Grid item xs={3}>
                  <Label title="Date of Service" value={incidentDetails?.incidentDate} />
                </Grid>
                <Grid item xs={3}>
                  <Label title="Hospital Name" value={incidentDetails?.hospitalName} />
                </Grid>
                <Grid item xs={3}>
                  <Label title="Doctor Name" value={incidentDetails?.doctorName} />
                </Grid>
                <Grid item xs={3}>
                  <Label title="Medical Condition" value={incidentDetails?.medicalCondition} />
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>

        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography sx={{ fontSize: 16, fontWeight: 600, mb: 2 }}>
            Manager Decision
          </Typography>

          <RadioGroup
            row
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
          >
            <FormControlLabel value="APPROVED" control={<Radio />} label="Approve" />
            <FormControlLabel value="REJECTED" control={<Radio />} label="Reject" />
          </RadioGroup>

          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            sx={{ mt: 2 }}
          />

          <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
            <Button
              variant="outlined"
              disabled={submitting}
              onClick={() => navigate(-1)}
              sx={{
                borderRadius: "50px",
                px: 4,
                textTransform: "none",
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              disabled={submitting}
              onClick={handleSubmit}
              sx={{
                borderRadius: "50px",
                px: 4,
                textTransform: "none",
                backgroundColor: "#4A8F97",
                color: "#fff",
                "&:hover": { backgroundColor: "#3B7D84" },
              }}
            >
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </Stack>
        </Paper>
      </Box>

     <Snackbar
  open={snackOpen}
  autoHideDuration={10000}
  onClose={() => setSnackOpen(false)}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
  disableWindowBlurListener
>
  <Alert severity="success" variant="filled">
    Case assigned to Finance Manager successfully
  </Alert>
</Snackbar>
    </Box>
  );
}

function Label({ title, value }) {
  return (
    <Box>
      <Typography sx={{ fontSize: 13, color: "#6B7280" }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
        {value || "-"}
      </Typography>
    </Box>
  );
}