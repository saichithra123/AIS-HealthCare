
import React, { useEffect, useState } from 'react';
import { Box, Grid2, useTheme } from "@mui/material";
import CaseOverview from "./CaseOverview";
import Insights from "./Insights";
import LatestResults from "./LatestResults";
import Create from "../cases/Create";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const theme = useTheme();
    const [insights, setInsights] = useState([]);
    const [caseOverview, setCaseOverview] = useState({});

    useEffect(() => {
        const getManagerInspectionStatistics = async () => {
            const inspectionInsights = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/getInspectorSourceCountForManager/${localStorage.getItem("userEmail")}`,
            });
            setInsights(inspectionInsights?.data);
            const statusOverview = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/getStatusCountForManager/${localStorage.getItem("userEmail").trim()}`,
            });
            // const statusOverview = await axios({
            //     method: "get",
            //     url: `${import.meta.env.VITE_BASE_URL}/dashboard?email=${localStorage.getItem("userEmail").trim()}`,
            // });
            // console.log(statusOverview?.data);
            setCaseOverview(statusOverview?.data);
        };
        const getInspectorInspectionStatistics = async () => {
            const inspectionInsights = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/getInspectorSourceCountForInspector/${localStorage.getItem("userEmail")}`,
            });
            setInsights(inspectionInsights?.data);
            const statusOverview = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/getStatusCountForInspector/${localStorage.getItem("userEmail").trim()}`,
            });
            // const statusOverview = await axios({
            //     method: "get",
            //     url: `${import.meta.env.VITE_BASE_URL}/dashboard?email=${localStorage.getItem("userEmail").trim()}`,
            // });
            // console.log(statusOverview?.data);
            setCaseOverview(statusOverview?.data);
        };
        const getApproverInspectionStatistics = async () => {
            const inspectionInsights = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/approver-source-count?approverID=${localStorage.getItem("userEmail")}`,
            });
            setInsights(inspectionInsights?.data);
            const statusOverview = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/statusCountsByApproverID?approverID=${localStorage
                    .getItem("userEmail")
                    .trim()}`,
            });
            setCaseOverview(statusOverview?.data);
        };
        const getReviewerInspectionStatistics = async () => {
            const inspectionInsights = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/getSourceCountForReviewer?approverID=${localStorage
                    .getItem("userEmail")
                    .trim()}`,
            });
            setInsights(inspectionInsights?.data);
            const statusOverview = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/getStatusCountsForReviewer?reviewerId=${localStorage
                    .getItem("userEmail")
                    .trim()}`,
            });
            setCaseOverview(statusOverview?.data);
        };
        if (localStorage.getItem("userRole") === "MANAGER") {
            getManagerInspectionStatistics();
        }
        if (localStorage.getItem("userRole") === "INSPECTOR") {
            getInspectorInspectionStatistics();
        }
        if (localStorage.getItem("userRole") === "APPROVER") {
            getApproverInspectionStatistics();
        }
        if (localStorage.getItem("userRole") === "REVIEWER") {
            getReviewerInspectionStatistics();
        }
    }, []);

    return (
        <>
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
                <>
                    <Grid2 container spacing={2.5}>
                        <Grid2
                            size={{ xs: 12, md: 3.5 }}
                            sx={{
                                background: `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                                border: `1px solid ${theme.palette.colors[4]}`,
                                borderRadius: "10px",
                                opacity: 1,
                                p: 2.5,
                            }}
                        >
                            <CaseOverview caseOverview={caseOverview} />
                        </Grid2>
                        <Grid2 container size={{ xs: 12, md: 8.5 }} spacing={2.5} sx={{ justifyContent: "space-between" }}>
                            <Grid2
                                container
                                size={{
                                    xs: 12,
                                    md:
                                        localStorage.getItem("userRole") === "MANAGER"
                                            // ||
                                            // localStorage.getItem("userRole") === "INSPECTOR"
                                            ? 7
                                            : 12,
                                }}
                                sx={{
                                    background: `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                                    boxShadow: `0px 1px 4px ${theme.palette.colors[3]}`,
                                    borderRadius: "10px",
                                    opacity: 1,
                                    p: 2.5,
                                }}
                            >
                                <LatestResults insights={insights} />
                            </Grid2>
                            {(localStorage.getItem("userRole") === "MANAGER"
                                // ||
                                // localStorage.getItem("userRole") === "INSPECTOR"
                            )
                                && (
                                    <Grid2
                                        container
                                        size={{ xs: 12, md: 5 }}
                                        xs={12}
                                        md={5}
                                        sx={{
                                            background: `${theme.palette.colors[7]} 0% 0% no-repeat padding-box`,
                                            boxShadow: `0px 3px 8px ${theme.palette.colors[3]}`,
                                            borderRadius: "10px",
                                            opacity: 1,
                                            p: 2,
                                        }}
                                    >
                                        <Create />
                                    </Grid2>
                                )}
                            <Grid2
                                container
                                size={12}
                                sx={{
                                    background: `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                                    boxShadow: `0px 1px 4px ${theme.palette.colors[3]}`,
                                    borderRadius: "10px",
                                    opacity: 1,
                                    p: 2.5,
                                }}
                            >
                                <Insights insights={insights} />
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </>
            </Box>
        </>
    );
};

export default Dashboard;