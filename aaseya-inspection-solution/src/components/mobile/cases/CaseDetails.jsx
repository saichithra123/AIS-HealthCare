import { Box, Button, Divider, Drawer, Grid2, Typography, useTheme } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "../../cases/caseInfo.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { SnackContext } from "../../global/SnackProvider";
import { HeaderContext } from "../HeaderContext";

const CaseDetails = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { snack, setSnack } = useContext(SnackContext);
    const location = useLocation();
    const entityInformation = location.state?.entityInformation;
    const isCasePool = location.state?.isCasePool;
    const { header, setHeader } = useContext(HeaderContext);

    useEffect(() => {
        setHeader(`Case ID ${entityInformation?.inspectionID}`);
    }, []);

    const assignInspection = async () => {
        const response = await axios({
            method: "post",
            url: `${import.meta.env.VITE_BASE_URL}/assignInspection`,
            data: {
                inspectionId: entityInformation?.inspectionID,
                inspectorId: localStorage.getItem("userEmail"),
            },
        });
        setSnack({ open: true, message: "Inspector assigned successfully", severity: "success" });
        navigate(-1);
    };

    const capitalizeWords = (status) => {
        return status
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <Grid2
            container
            sx={{
                height: "900px",
                marginTop: "58px",
                backgroundColor: "#F2F6F6",
                spacing: 0,
                alignItems: "flex-start",
                justifyContent: "flex-start",
            }}
        >
            <Box>
                <Box
                    sx={{
                        background: `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                        boxShadow: `0px 1px 3px ${theme.palette.colors[3]}`,
                        border: `1px solid ${theme.palette.colors[2]}`,
                        borderRadius: "11px",
                        opacity: 1,
                        p: 2,
                        m: 3,
                        // height: '670px',
                        // width: '500px',
                    }}
                >
                    <Grid2 container spacing={2}>
                        <Grid2 size={6}>
                            <Typography className="contentHeading">Entity ID</Typography>
                            <Typography className="contentBody">
                                {entityInformation.entityid ? entityInformation.entityid : "-"}
                            </Typography>
                        </Grid2>
                        <Grid2 size={6}>
                            <Box
                                sx={{
                                    background: `${theme.palette.colors[7]} 0% 0% no-repeat padding-box`,
                                    borderRadius: "4px",
                                    opacity: 1,
                                    height: "44px",
                                    //  width:'100vh'
                                }}
                                display="flex"
                                textAlign="center"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Typography fontWeight={600}>
                                    {entityInformation?.inspection_type?.length > 20
                                        ? entityInformation?.inspection_type?.slice(0, 19) + "..."
                                        : entityInformation?.inspection_type}
                                </Typography>
                            </Box>
                        </Grid2>
                        <Grid2 size={12}>
                            <Typography className="contentHeading">Entity Name</Typography>
                            <Typography className="contentBody">
                                {entityInformation.name ? entityInformation.name : "-"}
                            </Typography>
                        </Grid2>
                        <Grid2>
                            <Typography className="contentHeading">Location</Typography>
                            <Typography className="contentBody">
                                {entityInformation.location ? entityInformation.location : "-"}
                            </Typography>
                        </Grid2>
                    </Grid2>
                    <Divider sx={{ my: 1.5 }} />
                    <Grid2 container spacing={2}>
                        <Grid2 size={6}>
                            <Typography className="contentHeading">Segment</Typography>
                            <Typography className="contentBody">
                                {entityInformation.segment ? entityInformation.segment : "-"}
                            </Typography>
                        </Grid2>
                        <Grid2 size={6}>
                            <Typography className="contentHeading">Sub Segment</Typography>
                            <Typography className="contentBody">
                                {entityInformation.subSegment ? entityInformation.subSegment : "-"}
                            </Typography>
                        </Grid2>
                        <Grid2>
                            <Typography className="contentHeading">Size</Typography>
                            <Typography className="contentBody">
                                {entityInformation.size ? entityInformation.size : "-"}
                            </Typography>
                        </Grid2>
                    </Grid2>
                    <Divider sx={{ my: 1.5 }} />
                    <Grid2 container spacing={2}>
                        <Grid2 size={6}>
                            <Typography className="contentHeading">Representative Name</Typography>
                            <Typography className="contentBody">
                                {entityInformation.representative_name ? entityInformation.representative_name : "-"}
                            </Typography>
                        </Grid2>
                        <Grid2 size={6}>
                            <Typography className="contentHeading">Contact Number</Typography>
                            <Typography className="contentBody">
                                {entityInformation.representative_phoneno ? entityInformation.representative_phoneno : "-"}
                            </Typography>
                        </Grid2>
                        <Grid2>
                            <Typography className="contentHeading">Email ID</Typography>
                            <Typography className="contentBody">
                                {entityInformation.representative_email ? entityInformation.representative_email : "-"}
                            </Typography>
                        </Grid2>
                    </Grid2>
                    <Divider sx={{ my: 1.5 }} />
                    <Grid2 container spacing={2}>
                        <Grid2 size={6}>
                            <Typography className="contentHeading">Inspection Source</Typography>
                            <Typography className="contentBody">
                                {entityInformation.inspector_source ? entityInformation.inspector_source : "-"}
                            </Typography>
                        </Grid2>
                        <Grid2 size={6}>
                            <Typography className="contentHeading">Reference Case</Typography>
                            <Typography className="contentBody">
                                {entityInformation.reference_case ? entityInformation.reference_case : "-"}
                            </Typography>
                        </Grid2>
                        <Grid2>
                            <Typography className="contentHeading">Efforts</Typography>
                            <Typography className="contentBody">
                                {entityInformation.efforts ? entityInformation.efforts : "-"}
                            </Typography>
                        </Grid2>
                    </Grid2>
                    <Divider sx={{ my: 1.5 }} />
                    <Grid2 container spacing={2}>
                        <Grid2 size={6}>
                            <Typography className="contentHeading">Due Date</Typography>
                            <Typography className="contentBody">
                                {new Date(entityInformation.due_date).getDate().toString().padStart(2, "0")} &nbsp;
                                {new Date(entityInformation.due_date).toLocaleString("default", { month: "short" })}{" "}
                            </Typography>
                        </Grid2>
                        <Grid2 size={6}>
                            <Typography className="contentHeading">Case Status</Typography>
                            <Typography className="contentBody">
                                {entityInformation.status ? capitalizeWords(entityInformation.status) : "-"}
                            </Typography>
                        </Grid2>
                    </Grid2>
                </Box>
                <Grid2 container sx={{ px: 3 }} direction="column">
                    {localStorage.getItem("userRole") === "INSPECTOR" && !isCasePool && (
                        <Grid2>
                            <Button
                                sx={{
                                    border: `1px solid ${theme.palette.colors[11]}`,
                                    borderRadius: "20px",
                                    height: "40px",
                                    width: "100%",
                                    color: theme.palette.colors[11],
                                    px: 4,
                                    mb: 1,
                                    paddingInline: "20px",
                                }}
                                onClick={() => {
                                    // setOpenEntityInfo(false);
                                    navigate(`/cases/pre-inspection`, { state: { caseDetails: entityInformation } });
                                }}
                            >
                                Pre Inspection Checklist
                            </Button>
                        </Grid2>
                    )}
                    <Grid2
                        sx={{
                            "& .MuiButtonBase-root:hover": {
                                backgroundColor: theme.palette.colors[11],
                            },
                        }}
                    >
                        <Button
                            sx={{
                                backgroundColor: theme.palette.colors[11],
                                borderRadius: "20px",
                                px: 4,
                                mb: 1,
                                height: "40px",
                                "&:hover": {
                                    backgroundColor: theme.palette.colors[11],
                                    color: "white",
                                },
                                "&.Mui-disabled": {
                                    backgroundColor: "lightgray",
                                    color: "white",
                                },
                                width: "100%",
                            }}
                            onClick={() => {
                                navigate(`/cases/inspection`, { state: { caseDetails: entityInformation } });
                            }}
                            disabled={
                                localStorage.getItem("userRole") === "INSPECTOR" &&
                                entityInformation.is_preinspection &&
                                !entityInformation.is_preinspection_submitted
                            }
                        >
                            Start Inspection
                        </Button>
                        {localStorage.getItem("userRole") !== "MANAGER" && isCasePool && (
                            <Button
                                sx={{
                                    backgroundColor: theme.palette.colors[11],
                                    borderRadius: "20px",
                                    width: "100%",
                                    height: "40px",
                                }}
                                onClick={() => {
                                    assignInspection();
                                }}
                            >
                                Assign to Me
                            </Button>
                        )}
                    </Grid2>
                </Grid2>
            </Box>
        </Grid2>
    );
};

export default CaseDetails;
