import React, { useContext, useEffect, useState } from "react";
import { Box, Grid2, useTheme } from "@mui/material";
import CaseOverview from "./CaseOverview";
import axios from "axios";
import Create from "../../cases/Create";
import { HeaderContext } from "../HeaderContext";

const MobileDashboard = () => {
    const theme = useTheme();
    const [insights, setInsights] = useState([]);
    const [caseOverview, setCaseOverview] = useState({});
    const { header, setHeader } = useContext(HeaderContext);

    useEffect(() => {
        setHeader("Dashboard");
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
            setCaseOverview(statusOverview?.data);
        };
        if (localStorage.getItem("userRole") === "MANAGER") {
            getManagerInspectionStatistics();
        }
        if (localStorage.getItem("userRole") === "INSPECTOR") {
            getInspectorInspectionStatistics();
        }
    }, []);

    return (
        <>
            <Box
                sx={{
                    background: `${theme.palette.colors[2]} 0% 0% no-repeat padding-box`,
                    px: 2.5,
                    py: 11.25,
                    overflow: "auto",
                    opacity: 1,
                    height: "92vh",
                    width: "100%",
                }}
            >
                <Grid2 container sx={{ width: "100%" }}>
                    <CaseOverview caseOverview={caseOverview} />
                    {(localStorage.getItem("userRole") === "MANAGER" || localStorage.getItem("userRole") === "INSPECTOR") && (
                        <Grid2
                            container
                            size={12}
                            sx={{
                                background: `${theme.palette.colors[7]} 0% 0% no-repeat padding-box`,
                                boxShadow: `0px 3px 8px ${theme.palette.colors[3]}`,
                                borderRadius: "10px",
                                opacity: 1,
                                p: 1.5,
                            }}
                        >
                            <Create />
                        </Grid2>
                    )}
                </Grid2>
            </Box>
        </>
    );
};

export default MobileDashboard;
