import { Box, Button, Divider, Grid2, Link, Step, StepContent, StepLabel, Stepper, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import "../reportStyles.css";
import axios from "axios";

const ReportCaseDetails = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const inspectionID = location.state?.inspectionID;
    const [isShowCaseDetails, setIsShowCaseDetails] = useState(false);
    const [caseDetails, setCaseDetails] = useState({});

    console.log(inspectionID);

    const steps = [
        "Case Creation",
        "Allocation",
        "Pre Inspection",
        "Perform Inspection",
        "Submit Inspection",
        "Review Inspection",
        "Approve Inspection",
        "Inspection Outcome",
    ];

    useEffect(() => {
        const getCaseDetails = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/getCaseDetailsById/${inspectionID}`);
            setCaseDetails(response?.data);
        };
        if (inspectionID) {
            getCaseDetails();
        }
    }, [inspectionID]);

    return (
        <Box
            sx={{
                borderRadius: "20px",
                background: `${theme.palette.colors[2]} 0% 0% no-repeat padding-box`,
                my: 2,
                mr: 2,
                p: 2.5,
                boxShadow: `inset 0px 0px 6px ${theme.palette.colors[3]}`,
                opacity: 1,
            }}
        >
            <Grid2 container alignItems="center">
                <Grid2 container size={6} alignItems="center">
                    <Button
                        sx={{
                            color: theme.palette.colors[21],
                            fontSize: "14px",
                            fontWeight: 600,
                            mr: 2,
                        }}
                        startIcon={<KeyboardBackspaceOutlinedIcon />}
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </Button>
                    <Typography fontSize={18} fontWeight={600}>
                        Case Details
                    </Typography>
                </Grid2>
                {/* <Grid2 size={6} container justifyContent="flex-end">
                    <Link className="linkStyle" onClick={() => setIsShowCaseDetails(!isShowCaseDetails)}>
                        Case Details
                    </Link>
                </Grid2> */}
            </Grid2>
            <Grid2 container spacing={2}>
                <Grid2
                    size={isShowCaseDetails ? 8.5 : 12}
                    sx={{
                        background: `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                        borderRadius: "10px",
                        opacity: 1,
                        p: 3,
                    }}
                >
                    <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 6, md: 6, lg: 4 }}>
                            <Typography className="contentHeading">Case ID</Typography>
                            <Typography className="contentBody">{caseDetails?.caseId ?? "-"}</Typography>
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 6, lg: 4 }}>
                            <Typography className="contentHeading">Inspection Type</Typography>
                            <Typography className="contentBody">{caseDetails?.inspectionType ?? "-"}</Typography>
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 6, lg: 4 }}>
                            <Typography className="contentHeading">Entity ID</Typography>
                            <Typography className="contentBody">{caseDetails?.entityID ?? "-"}</Typography>
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 6, lg: 4 }}>
                            <Typography className="contentHeading">Entity Name</Typography>
                            <Typography className="contentBody">{caseDetails?.entityName ?? "-"}</Typography>
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 6, lg: 4 }}>
                            <Typography className="contentHeading">Size</Typography>
                            <Typography className="contentBody">{caseDetails?.size ?? "-"}</Typography>
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 6, lg: 4 }}>
                            <Typography className="contentHeading">Location</Typography>
                            <Typography className="contentBody">{caseDetails?.location ?? "-"}</Typography>
                        </Grid2>
                    </Grid2>
                    <Divider sx={{ my: 2 }} />
                    <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 6, md: 6, lg: 4 }}>
                            <Typography className="contentHeading">Representative Name</Typography>
                            <Typography className="contentBody">{caseDetails?.representativeName ?? "-"}</Typography>
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 6, lg: 4 }}>
                            <Typography className="contentHeading">Contact Number</Typography>
                            <Typography className="contentBody">{caseDetails?.phoneNumber ?? "-"}</Typography>
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 6, lg: 4 }}>
                            <Typography className="contentHeading">Email ID</Typography>
                            <Typography className="contentBody">{caseDetails?.emailID ?? "-"}</Typography>
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 6, lg: 4 }}>
                            <Typography className="contentHeading">Inspection Source</Typography>
                            <Typography className="contentBody">{caseDetails?.inspectorSource ?? "-"}</Typography>
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 6, lg: 4 }}>
                            <Typography className="contentHeading">Reference Case</Typography>
                            <Typography className="contentBody">-</Typography>
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 6, lg: 4 }}>
                            <Typography className="contentHeading">Efforts</Typography>
                            <Typography className="contentBody">{caseDetails?.efforts ?? "-"}</Typography>
                        </Grid2>
                    </Grid2>
                </Grid2>
                {isShowCaseDetails && (
                    <Grid2
                        size={3.5}
                        sx={{
                            background: `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                            borderRadius: "10px",
                            opacity: 1,
                            p: 3,
                            ".MuiStepIcon-root": {
                                color: "#FFFFFF",
                                border: "1.5px solid #848484",
                                borderRadius: "50%",
                            },
                            ".MuiStepIcon-root.Mui-completed": {
                                color: "#003865",
                                border: "1.5px solid #003865 !important",
                                borderRadius: "50%",
                            },
                            ".MuiStepIcon-root.Mui-active": {
                                border: `1.5px solid #003865`,
                                borderRadius: "50%",
                            },
                            ".MuiStepIcon-root.Mui-active .MuiStepIcon-text": {
                                color: "#003865 !important",
                            },
                            ".MuiStepIcon-text": {
                                fontSize: "12px",
                            },
                            ".MuiStepConnector-root": {
                                display: "none",
                            },
                            ".MuiStep-root": {
                                mb: "12px",
                            },
                            ".MuiStepLabel-label": {
                                fontSize: "14px",
                            },
                            ".MuiStepLabel-label.Mui-completed": {
                                color: "#003865",
                                fontWeight: 600,
                            },
                            ".MuiStepLabel-label.Mui-active": {
                                color: "#003865",
                                fontWeight: 600,
                            },
                        }}
                    >
                        <Typography fontSize={16} fontWeight={600} sx={{ mb: 2 }}>
                            Case Timeline
                        </Typography>
                        <Stepper activeStep={0} orientation="vertical">
                            {steps.map((step, index) => (
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                    {/* <StepContent>
                                        <Typography>{step.description}</Typography>
                                    </StepContent> */}
                                </Step>
                            ))}
                        </Stepper>
                    </Grid2>
                )}
            </Grid2>
        </Box>
    );
};

export default ReportCaseDetails;
