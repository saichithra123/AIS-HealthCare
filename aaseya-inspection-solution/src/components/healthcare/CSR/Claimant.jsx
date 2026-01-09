import React, { useContext, useState } from "react";
import { Box, Button, MenuItem, Select, Typography, TextField, useTheme, Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import axios from "axios";
import dayjs from "dayjs";
import { SnackContext } from "../../global/SnackProvider";
import "./AddEditPolicy.css";
import Loader from "../../global/Loader";

const Claimant = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const { claimantDetails, policyId, claimType, claimantName } = location.state;
    const { setSnack } = useContext(SnackContext);
    const [loading, setLoading] = useState(false);

    const submitClaimantDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/completeByProcessInstanceKey?processInstanceKey=${claimantDetails?.businessKey}`
            );
            setSnack({
                open: true,
                message: "Claimant details submitted successfully",
                severity: "success",
            });
            setLoading(false);
            navigate("/policy-holders");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box
            sx={{
                borderRadius: "20px",
                background: `${theme.palette.colors[2]} 0% 0% no-repeat padding-box`,
                my: 2,
                mr: 2,
                px: 2.5,
                py: 2,
                boxShadow: `inset 0px 0px 6px ${theme.palette.colors[3]}`,
                opacity: 1,
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                    sx={{
                        color: theme.palette.colors[21],
                        fontSize: "14px",
                        fontWeight: 600,
                    }}
                    startIcon={<KeyboardBackspaceOutlinedIcon />}
                    onClick={() => navigate(-1)}
                >
                    Back
                </Button>
            </Box>
            <Box
                sx={{
                    background: `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                    borderRadius: "10px",
                    opacity: 1,
                    paddingBottom: 0.4,
                    minHeight: "400px",
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                }}
            >
                <Box
                    sx={{
                        py: 2,
                        px: 2.5,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h4" fontWeight={600}>
                        Claimant Details - {policyId}
                    </Typography>
                </Box>
                <Divider />
                <Box sx={{ py: 2, px: 2.5 }}>
                    {loading && <Loader />}
                    <Grid container spacing={2}>
                        <Grid size={4}>
                            <Box sx={{ mb: 0.5 }}>
                                <Typography>Claimant Name</Typography>
                            </Box>
                            <TextField
                                name="claimantName"
                                value={claimantDetails?.DischargeSummary?.patientDetails?.name || claimantName}
                                disabled
                                fullWidth
                                variant="outlined"
                                className="policy-textfield"
                            />
                        </Grid>
                        <Grid size={4}>
                            <Box sx={{ mb: 0.5 }}>
                                <Typography>Claim Type</Typography>
                            </Box>
                            <TextField
                                name="claimantName"
                                value={claimType}
                                disabled
                                fullWidth
                                variant="outlined"
                                className="policy-textfield"
                            />
                        </Grid>
                        <Grid size={4}>
                            <Box sx={{ mb: 0.5 }}>
                                <Typography>Admission Date</Typography>
                            </Box>
                            <TextField
                                type="date"
                                name="AdmissionDate"
                                value={claimantDetails?.DischargeSummary?.patientDetails?.admissionDate}
                                disabled
                                fullWidth
                                variant="outlined"
                                className="policy-textfield"
                            />
                        </Grid>
                        <Grid size={4}>
                            <Box sx={{ mb: 0.5 }}>
                                <Typography>Discharge Date</Typography>
                            </Box>
                            <TextField
                                type="date"
                                name="DischargeDate"
                                value={claimantDetails?.DischargeSummary?.patientDetails?.dischargeDate}
                                fullWidth
                                disabled
                                variant="outlined"
                                className="policy-textfield"
                            />
                        </Grid>

                        <Grid size={4}>
                            <Box sx={{ mb: 0.5 }}>
                                <Typography>Facility Name</Typography>
                            </Box>
                            <TextField
                                name="FacilityName"
                                value={claimantDetails?.DischargeSummary?.facility?.name}
                                disabled
                                fullWidth
                                variant="outlined"
                                className="policy-textfield"
                            />
                        </Grid>

                        <Grid size={4}>
                            <Box sx={{ mb: 0.5 }}>
                                <Typography>Referred Physician</Typography>
                            </Box>
                            <TextField
                                name="ReferringPhysician"
                                value={claimantDetails?.DischargeSummary?.facility?.referringPhysician || "NA"}
                                disabled
                                fullWidth
                                variant="outlined"
                                className="policy-textfield"
                            />
                        </Grid>
                        <Grid size={12}>
                            <Divider sx={{ borderColor: "#e0e0e0" }} />
                        </Grid>
                        <Grid size={10}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: "#000", mb: 0.2 }}>
                                Diagnosis Procedure Entry{" "}
                            </Typography>
                        </Grid>

                        <Grid size={4}>
                            <Box sx={{ mb: 0.5 }}>
                                <Typography>ICD- 10 Diagnosis Codes</Typography>
                            </Box>
                            <TextField
                                name="Icd10diagnosiscodes"
                                value={claimantDetails?.DischargeSummary?.diagnosis?.ICD10DiagnosisCodes?.join(", ") ?? ""}
                                // value={
                                //     claimantDetails?.DischargeSummary?.diagnosis?.ICD10DiagnosisCodes?.map(
                                //         (icdCode) => icdCode?.code
                                //     )?.join(", ") ?? ""
                                // }
                                disabled
                                fullWidth
                                variant="outlined"
                                className="policy-textfield"
                            />
                        </Grid>

                        <Grid size={4}>
                            <Box sx={{ mb: 0.5 }}>
                                <Typography>CPT/HTPCS Procedure codes</Typography>
                            </Box>
                            <TextField
                                name="CPTHTPCSProcedurecode"
                                value={claimantDetails?.DischargeSummary?.procedures?.map((p) => p?.code)?.join(", ") ?? ""}
                                disabled
                                fullWidth
                                variant="outlined"
                                className="policy-textfield"
                            />
                        </Grid>

                        <Grid size={4}>
                            <Box sx={{ mb: 0.5 }}>
                                <Typography>Procedure</Typography>
                            </Box>
                            <TextField
                                name="Procedure"
                                value={claimantDetails?.DischargeSummary?.procedures?.map((p) => p?.name)?.join(", ") ?? ""}
                                disabled
                                fullWidth
                                variant="outlined"
                                className="policy-textfield"
                            />
                        </Grid>
                        <Grid size={12}>
                            <Divider sx={{ borderColor: "#e0e0e0" }} />
                        </Grid>
                        <Grid size={12}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: "#000" }}>
                                Discharge Summary
                            </Typography>
                        </Grid>

                        <Grid size={4}>
                            <Box sx={{ mb: 0.5 }}>
                                <Typography>Billed Amount</Typography>
                            </Box>
                            <TextField
                                name="BilledAmount"
                                value={claimantDetails?.DischargeSummary?.billingAmount}
                                disabled
                                fullWidth
                                variant="outlined"
                                className="policy-textfield"
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ textAlign: "right", mt: 1 }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: theme.palette.colors[11],
                                color: "#fff",
                                borderRadius: "20px",
                                "&:hover": { backgroundColor: theme.palette.colors[11] },
                                px: 3,
                                py: 1,
                            }}
                            onClick={submitClaimantDetails}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Claimant;
