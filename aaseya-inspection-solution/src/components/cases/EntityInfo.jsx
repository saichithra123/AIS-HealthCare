import { Box, Button, Divider, Grid2, Typography, CircularProgress, useTheme } from '@mui/material';
import React, { useContext, useState } from 'react'
import './caseInfo.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SnackContext } from '../global/SnackProvider';

const EntityInfo = ({ setOpenEntityInfo, setOpenDrawer, entityInformation, isCasePool = false, isGroupCases = false }) => {
    const theme = useTheme();
    const [isAssignInspection, setisAssignInspection] = useState(false);
    const navigate = useNavigate();
    const { snack, setSnack } = useContext(SnackContext);

    const assignInspection = async () => {
        setisAssignInspection(true);
        const response = await axios({
            method: "post",
            url: `${import.meta.env.VITE_BASE_URL}/assigncasetomyself?claimId=${
                entityInformation?.claimId
            }&poolName=inspectorpool&username=${localStorage.getItem("userEmail")}`,
        });
        setisAssignInspection(false);
        setSnack({ open: true, message: "Inspector assigned successfully", severity: "success" });
        setOpenEntityInfo(false);
        navigate(0);
    };

    const assignInspectiontoApprover = async () => {
        setisAssignInspection(true);
        const response = await axios({
            method: "post",
            url: `${import.meta.env.VITE_BASE_URL}/assigncasetomyself?claimId=${
                entityInformation?.claimId
            }&poolName=approverpool&username=${localStorage.getItem("userEmail")}`,
        });
        setisAssignInspection(false);
        setSnack({ open: true, message: "Inspection assigned to approver successfully", severity: "success" });
        setOpenEntityInfo(false);
        navigate(0);
    };

    const assignInspectiontoReviewer = async () => {
        setisAssignInspection(true);
        const response = await axios({
            method: "post",
            url: `${import.meta.env.VITE_BASE_URL}/assigncasetomyself?claimId=${
                entityInformation?.claimId
            }&poolName=reviewerpool&username=${localStorage.getItem("userEmail")}`,
        });
        setisAssignInspection(false);
        setSnack({ open: true, message: "Inspection assigned to Reviewer successfully", severity: "success" });
        setOpenEntityInfo(false);
        navigate(0);
    };

    return (
        <>
            {isAssignInspection && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 50,
                    }}
                >
                    <Grid2
                        container
                        sx={{
                            "& .MuiCircularProgress-root": {
                                color: "#00000029",
                            },
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <CircularProgress size={160} thickness={2} color="grey" />
                    </Grid2>
                </div>
            )}
            <Box
                sx={{
                    background: `${theme.palette.colors[2]} 0% 0% no-repeat padding-box`,
                    boxShadow: `0px 1px 3px ${theme.palette.colors[3]}`,
                    border: `1px solid ${theme.palette.colors[2]}`,
                    borderRadius: "10px",
                    opacity: 1,
                    p: 2,
                    width: "500px",
                    mr: 2,
                }}
            >
                <Grid2 container spacing={2}>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Claimant Name</Typography>
                        <Typography className="contentBody">
                            {entityInformation.policyDetails?.customerName ? entityInformation.policyDetails?.customerName : "-"}
                        </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">DOB</Typography>
                        <Typography className="contentBody">
                            {new Date(entityInformation?.policyDetails?.dateOfBirth).getDate().toString().padStart(2, "0")}{" "}
                            {new Date(entityInformation?.policyDetails?.dateOfBirth).toLocaleString("default", {
                                month: "short",
                            })}{" "}
                            {new Date(entityInformation?.policyDetails?.dateOfBirth).getFullYear().toString()}
                        </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Gender</Typography>
                        <Typography className="contentBody">
                            {entityInformation.policyDetails?.gender ? entityInformation.policyDetails?.gender : "-"}
                        </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Contact Number</Typography>
                        <Typography className="contentBody">
                            {entityInformation.policyDetails?.phoneNumber ? entityInformation.policyDetails?.phoneNumber : "-"}
                        </Typography>
                    </Grid2>
                    <Grid2>
                        <Typography className="contentHeading">Address</Typography>
                        <Typography className="contentBody">
                            {entityInformation?.policyDetails?.address ? entityInformation?.policyDetails.address : "-"}
                        </Typography>
                    </Grid2>
                </Grid2>
                <Divider sx={{ my: 1.5 }} />
                <Grid2 container spacing={2}>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Insurance Plan Name</Typography>
                        <Typography className="contentBody">
                            {entityInformation.policyDetails?.insurancePlanName
                                ? entityInformation.policyDetails?.insurancePlanName
                                : "-"}
                        </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Policy ID</Typography>
                        <Typography className="contentBody">
                            {entityInformation.policyDetails?.policyId ? entityInformation.policyDetails?.policyId : "-"}
                        </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Coverage Effective</Typography>
                        <Typography className="contentBody">
                            {new Date(entityInformation?.policyDetails?.coverageStartDate).getDate().toString().padStart(2, "0")}{" "}
                            {new Date(entityInformation?.policyDetails?.coverageStartDate).toLocaleString("default", {
                                month: "short",
                            })}{" "}
                            {new Date(entityInformation?.policyDetails?.coverageStartDate).getFullYear().toString()}
                        </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Expiration Date</Typography>
                        <Typography className="contentBody">
                            {new Date(entityInformation?.policyDetails?.coverageEndDate).getDate().toString().padStart(2, "0")}{" "}
                            {new Date(entityInformation?.policyDetails?.coverageEndDate).toLocaleString("default", {
                                month: "short",
                            })}{" "}
                            {new Date(entityInformation?.policyDetails?.coverageEndDate).getFullYear().toString()}
                        </Typography>
                    </Grid2>
                </Grid2>
                <Divider sx={{ my: 1.5 }} />
                <Grid2 container spacing={2}>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Case Status</Typography>
                        <Typography className="contentBody">
                            {entityInformation.status ? entityInformation.status : "-"}
                        </Typography>
                    </Grid2>
                </Grid2>
                <Divider sx={{ my: 1.5 }} />
                <Grid2 container sx={{ justifyContent: "flex-end", pr: 1 }}>
                    {/* {localStorage.getItem("userRole") === "INSPECTOR" && !isCasePool && !isGroupCases && (
                        <Grid2>
                            <Button
                                sx={{
                                    border: `1px solid ${theme.palette.colors[11]}`,
                                    borderRadius: "20px",
                                    height: "40px",
                                    color: theme.palette.colors[11],
                                    px: 4,
                                    mr: 3,
                                }}
                                onClick={() => {
                                    setOpenEntityInfo(false);
                                    navigate(`/cases/pre-inspection`, { state: { caseDetails: entityInformation } });
                                }}
                                disabled={
                                    localStorage.getItem("userRole") === "INSPECTOR" &&
                                    (entityInformation?.is_preinspection === false ||
                                        (entityInformation?.leadId && entityInformation?.groupId))
                                }
                            >
                                Pre Inspection Checklist
                            </Button>
                        </Grid2>
                    )} */}
                    {!isGroupCases && (
                        <Grid2
                            sx={{
                                "& .MuiButtonBase-root:hover": {
                                    backgroundColor: theme.palette.colors[11],
                                },
                            }}
                        >
                            {localStorage.getItem("userRole") === "MANAGER" && (
                                <Button
                                    sx={{
                                        backgroundColor: theme.palette.colors[11],
                                        borderRadius: "20px",
                                        px: 4,
                                        height: "40px",
                                    }}
                                    onClick={() => {
                                        setOpenEntityInfo(false);
                                        setOpenDrawer(true);
                                    }}
                                >
                                    Assign Inspector
                                </Button>
                            )}
                            {localStorage.getItem("userRole") !== "MANAGER" &&
                                localStorage.getItem("userRole") !== "REVIEWER" &&
                                !isCasePool && (
                                    <Button
                                        sx={{
                                            backgroundColor: theme.palette.colors[11],
                                            marginLeft: "20px",
                                            borderRadius: "20px",
                                            px: 4,
                                            height: "40px",
                                            "&:hover": {
                                                backgroundColor: theme.palette.colors[11],
                                                color: "white",
                                            },
                                            "&.Mui-disabled": {
                                                backgroundColor: "lightgray",
                                                color: "white",
                                            },
                                        }}
                                        onClick={() => {
                                            setOpenEntityInfo(false);
                                            navigate(`/cases/inspection`, { state: { caseDetails: entityInformation } });
                                        }}
                                        disabled={
                                            localStorage.getItem("userRole") === "INSPECTOR" &&
                                            entityInformation.is_preinspection &&
                                            !entityInformation.is_preinspection_submitted
                                        }
                                    >
                                        Read Report
                                    </Button>
                                )}
                            {localStorage.getItem("userRole") !== "MANAGER" && isCasePool && (
                                <Button
                                    sx={{
                                        backgroundColor: theme.palette.colors[11],
                                        borderRadius: "20px",
                                        px: 4,
                                        height: "40px",
                                        marginLeft: "20px",
                                    }}
                                    onClick={() => {
                                        if (localStorage.getItem("userRole") === "INSPECTOR") {
                                            assignInspection();
                                        }
                                        if (localStorage.getItem("userRole") === "APPROVER") {
                                            assignInspectiontoApprover();
                                        }
                                        if (localStorage.getItem("userRole") === "REVIEWER") {
                                            assignInspectiontoReviewer();
                                        }
                                    }}
                                >
                                    Assign to Me
                                </Button>
                            )}
                            {localStorage.getItem("userRole") === "REVIEWER" && !isCasePool && (
                                <Button
                                    sx={{
                                        backgroundColor: theme.palette.colors[11],
                                        marginLeft: "20px",
                                        borderRadius: "20px",
                                        px: 4,
                                        height: "40px",
                                        "&:hover": {
                                            backgroundColor: theme.palette.colors[11],
                                            color: "white",
                                        },
                                        "&.Mui-disabled": {
                                            backgroundColor: "lightgray",
                                            color: "white",
                                        },
                                    }}
                                    onClick={() => {
                                        setOpenEntityInfo(false);
                                        navigate(`/cases/inspection`, { state: { caseDetails: entityInformation } });
                                    }}
                                >
                                    Read Report
                                </Button>
                            )}
                        </Grid2>
                    )}
                    {localStorage.getItem("userRole") === "INSPECTOR" && isGroupCases && (
                        <>
                            <Button
                                sx={{
                                    border: `1px solid ${theme.palette.colors[11]}`,
                                    borderRadius: "20px",
                                    height: "40px",
                                    color: theme.palette.colors[11],
                                    px: 4,
                                    mr: 3,
                                }}
                                onClick={() => {
                                    setOpenEntityInfo(false);
                                    navigate(`/cases/inspection`, {
                                        state: { caseDetails: entityInformation, action: "assign" },
                                    });
                                }}
                            >
                                Assign Categories
                            </Button>
                            <Button
                                sx={{
                                    backgroundColor: theme.palette.colors[11],
                                    marginLeft: "20px",
                                    borderRadius: "20px",
                                    px: 4,
                                    height: "40px",
                                    "&:hover": {
                                        backgroundColor: theme.palette.colors[11],
                                        color: "white",
                                    },
                                }}
                                onClick={() => {
                                    setOpenEntityInfo(false);
                                    navigate(`/cases/inspection`, {
                                        state: { caseDetails: entityInformation, action: "review" },
                                    });
                                }}
                            >
                                Review Case
                            </Button>
                        </>
                    )}
                </Grid2>
            </Box>
        </>
    );
};

export default EntityInfo
