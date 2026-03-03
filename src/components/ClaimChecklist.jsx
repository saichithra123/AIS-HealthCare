import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
  Chip,
    CircularProgress,   

} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import aaseyaLogo from "../assets/Aaseyalogo.svg";
import logoutIcon from "../assets/logout.svg";

export default function ClaimChecklist() {
  const navigate = useNavigate();
  const { claimId } = useParams();

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("access_token");

  const [claim, setClaim] = useState(null);
  const [checklistItems, setChecklistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSnack, setOpenSnack] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${baseUrl}/healthcare/checklist/${claimId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch checklist");

        const data = await res.json();

      
        setClaim(data);
        setChecklistItems(data.checklist || []);

      } catch (err) {
        console.error("Checklist fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChecklist();
  }, [claimId]);

  const handleCheckboxChange = (id, value) => {
    setChecklistItems((prev) =>
      prev.map((item) =>
        item.checklistId === id
          ? { ...item, checked: value }
          : item
      )
    );
  };

  const handleSubmitChecklist = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/healthcare/checklist/${claimId}/submit`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(checklistItems),
        }
      );

      if (!response.ok) throw new Error("Submission failed");

      setOpenSnack(true);

      setTimeout(() => {
        navigate("/workpool");
      }, 1500);

    } catch (error) {
      console.error("Submit error:", error);
    }
  };

 

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F5F7F8" }}>
 
    
      <Box
        sx={{
          position: "fixed",
          width: "100%",
          backgroundColor: "#4C8B92",
          px: 4,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 1200,
        }}
      >
        <Box component="img" src={aaseyaLogo} sx={{ height: 30 }} />
        <Stack direction="row" spacing={1} alignItems="center" sx={{ cursor: "pointer" }} onClick={handleLogout}>
          <Box component="img" src={logoutIcon} sx={{ height: 18 }} />
          <Typography sx={{ color: "#fff", fontSize: 14 }}>Logout</Typography>
        </Stack>
      </Box>

<Box sx={{ maxWidth: "1200px", mx: "auto", px: 4, pt: "100px", pb: 4 }}>

  {loading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <CircularProgress size={50} />
    </Box>
  ) : (
    <>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ cursor: "pointer", mb: 2 }}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon fontSize="small" />
        <Typography fontSize={13}>Back</Typography>
      </Stack>

      <Typography fontSize={22} fontWeight={600} mb={3}>
        Checklist - {claimId}
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography fontSize={18} fontWeight={700}>
            {claim?.claimantName}
          </Typography>

          {claim?.policyActiveStatus === "Y" && (
            <Chip label="Policy Active" color="success" size="small" />
          )}
        </Stack>

        <Stack direction="row" spacing={6} mt={2} flexWrap="wrap">
          <Info label="Policy Number" value={claim?.policyNumber} />
          <Info label="Coverage Type" value={claim?.coverageType} />
          <Info label="Sum Insured Covered" value={claim?.sumInsuredCovered} />
          <Info label="Policy Start Date" value={claim?.policyStartDate} />
          <Info label="Claim Amount" value={claim?.claimAmount} />
        </Stack>
      </Paper>

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography fontSize={15} fontWeight={600} mb={2}>
          Verification Checklist
        </Typography>

        <Stack spacing={2}>
          {checklistItems.map((item) => (
            <Paper
              key={item.checklistId}
              sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid #E6DBD3",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={item.checked}
                    onChange={(e) =>
                      handleCheckboxChange(
                        item.checklistId,
                        e.target.checked
                      )
                    }
                  />
                }
                label={
                  <Typography fontSize={13}>
                    {item.item}
                  </Typography>
                }
              />
            </Paper>
          ))}
        </Stack>
      </Paper>

      <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
        <Button
          variant="outlined"
          sx={{ borderRadius: "999px", px: 4, textTransform: "none" }}
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          sx={{
            borderRadius: "999px",
            px: 4,
            textTransform: "none",
            backgroundColor: "#4C8B92",
            color: "#fff",
          }}
          onClick={handleSubmitChecklist}
        >
          Submit
        </Button>
      </Stack>
    </>
  )}

</Box>

<Snackbar
  open={openSnack}
  autoHideDuration={3000}
  onClose={() => setOpenSnack(false)}
>
  <Alert severity="success" variant="filled">
    Case assigned to Claim Manager successfully
  </Alert>
</Snackbar>
    </Box>
  );
}

function Info({ label, value }) {
  return (
    <Box>
      <Typography fontSize={11} color="text.secondary">
        {label}
      </Typography>
      <Typography fontSize={14} fontWeight={600}>
        {value || "N/A"}
      </Typography>
    </Box>
  );
}