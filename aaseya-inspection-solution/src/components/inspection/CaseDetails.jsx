import { Avatar, Box, Button, Divider, Grid2, Typography, useTheme } from "@mui/material";
import React from "react";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import "./caseDetails.css";

const CaseDetails = ({ setOpenDrawer, caseDetails }) => {
    const theme = useTheme();
    return (
        <>
            <Box className="caseDetailsContainer">
                <Button className="backButton" startIcon={<KeyboardBackspaceOutlinedIcon />} onClick={() => setOpenDrawer(false)}>
                    Back
                </Button>
                <Typography variant="h4" fontWeight={600} py={2}>
                    Case Details
                </Typography>
                <Grid2 container spacing={2}>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Case ID</Typography>
                        <Typography className="contentBody">
                            {caseDetails?.inspectionID ? caseDetails?.inspectionID : "-"}
                        </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Inspection Type</Typography>
                        <Typography className="contentBody">
                            {caseDetails?.inspection_type ? caseDetails?.inspection_type : "-"}
                        </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Entity ID</Typography>
                        <Typography className="contentBody">{caseDetails?.entityid ? caseDetails?.entityid : "-"}</Typography>
                    </Grid2>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Entity Name</Typography>
                        <Typography className="contentBody">{caseDetails?.name ? caseDetails?.name : "-"}</Typography>
                    </Grid2>
                    <Grid2>
                        <Typography className="contentHeading">Location</Typography>
                        <Typography className="contentBody">{caseDetails?.location ? caseDetails?.location : "-"}</Typography>
                    </Grid2>
                </Grid2>
                <Divider sx={{ my: 2 }} />
                <Grid2 container spacing={2}>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Segment</Typography>
                        <Typography className="contentBody">{caseDetails?.segment ? caseDetails?.segment : "-"}</Typography>
                    </Grid2>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Sub Segment</Typography>
                        <Typography className="contentBody">{caseDetails?.subSegment ? caseDetails?.subSegment : "-"}</Typography>
                    </Grid2>
                    <Grid2>
                        <Typography className="contentHeading">Size</Typography>
                        <Typography className="contentBody">{caseDetails?.size ? caseDetails?.size : "-"}</Typography>
                    </Grid2>
                </Grid2>
                <Divider sx={{ my: 1.5 }} />
                <Grid2 container spacing={2}>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Representative Name</Typography>
                        <Typography className="contentBody">
                            {caseDetails?.representative_name ? caseDetails?.representative_name : "-"}
                        </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Contact Number</Typography>
                        <Typography className="contentBody">
                            {caseDetails?.representative_phoneno ? caseDetails?.representative_phoneno : "-"}
                        </Typography>
                    </Grid2>
                    <Grid2>
                        <Typography className="contentHeading">Email ID</Typography>
                        <Typography className="contentBody">
                            {caseDetails?.representative_email ? caseDetails?.representative_email : "-"}
                        </Typography>
                    </Grid2>
                </Grid2>
                <Divider sx={{ my: 1.5 }} />
                <Grid2 container spacing={2}>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Inspection Source</Typography>
                        <Typography className="contentBody">
                            {caseDetails?.inspector_source ? caseDetails?.inspector_source : "-"}
                        </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Reference Case</Typography>
                        <Typography className="contentBody">
                            {caseDetails?.reference_case ? caseDetails?.reference_case : "-"}
                        </Typography>
                    </Grid2>
                    <Grid2>
                        <Typography className="contentHeading">Efforts</Typography>
                        <Typography className="contentBody">{caseDetails?.efforts ? caseDetails?.efforts : "-"}</Typography>
                    </Grid2>
                </Grid2>
                <Divider sx={{ my: 2 }} />
            </Box>
        </>
    );
};

export default CaseDetails;
