import React, { useState } from "react";
import { Typography, Grid2, Link, useTheme, Drawer } from "@mui/material";
import "./caseDetails.css";
import CaseDetails from "./CaseDetails";

const Header = ({ caseDetails }) => {
    const theme = useTheme();
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <Grid2 container className="headerContainer">
            <Grid2 size={1.5}>
                <Typography className="contentHeading">Policy ID</Typography>
                <Typography className="contentBody">
                    {caseDetails?.policyDetails?.policyId ? caseDetails?.policyDetails?.policyId : "-"}
                </Typography>
            </Grid2>
            <Grid2 size={1.5}>
                <Typography className="contentHeading">DOB</Typography>
                <Typography className="contentBody">
                    {new Date(caseDetails?.policyDetails?.dateOfBirth).getDate().toString().padStart(2, "0")}{" "}
                    {new Date(caseDetails?.policyDetails?.dateOfBirth).toLocaleString("default", {
                        month: "short",
                    })}{" "}
                    {new Date(caseDetails?.policyDetails?.dateOfBirth).getFullYear().toString()}
                </Typography>
            </Grid2>
            <Grid2 item xs={2}>
                <Typography className="contentHeading">Claimant Name</Typography>
                <Typography className="contentBody">
                    {caseDetails?.policyDetails?.customerName ? caseDetails?.policyDetails?.customerName : "-"}
                </Typography>
            </Grid2>
            <Grid2 size={1.7}>
                <Typography className="contentHeading">Contact Number</Typography>
                <Typography className="contentBody">
                    {caseDetails?.policyDetails?.phoneNumber ? caseDetails?.policyDetails?.phoneNumber : "-"}
                </Typography>
            </Grid2>
            <Grid2 size={1.5}>
                <Typography className="contentHeading">Coverage Eff. Date</Typography>
                <Typography className="contentBody">
                    {new Date(caseDetails?.policyDetails?.coverageStartDate).getDate().toString().padStart(2, "0")}{" "}
                    {new Date(caseDetails?.policyDetails?.coverageStartDate).toLocaleString("default", {
                        month: "short",
                    })}{" "}
                    {new Date(caseDetails?.policyDetails?.coverageStartDate).getFullYear().toString()}
                </Typography>
            </Grid2>
            <Grid2 size={1.3}>
                <Typography className="contentHeading">Expiration Date</Typography>
                <Typography className="contentBody">
                    {new Date(caseDetails?.policyDetails?.coverageStartDate).getDate().toString().padStart(2, "0")}{" "}
                    {new Date(caseDetails?.policyDetails?.coverageStartDate).toLocaleString("default", {
                        month: "short",
                    })}{" "}
                    {new Date(caseDetails?.policyDetails?.coverageStartDate).getFullYear().toString()}
                </Typography>
            </Grid2>
            <Grid2 size={1}>
                <Link className="linkStyle" onClick={() => setOpenDrawer(true)}>
                    More Details
                </Link>
            </Grid2>
            <Drawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                anchor="right"
                sx={{
                    backdropFilter: blur("50px"),
                }}
            >
                <CaseDetails setOpenDrawer={setOpenDrawer} caseDetails={caseDetails} />
            </Drawer>
        </Grid2>
    );
};

export default Header;
