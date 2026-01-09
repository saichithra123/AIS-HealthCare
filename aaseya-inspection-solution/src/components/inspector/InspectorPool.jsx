import { Box, Divider, Grid2, Link, Typography, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import CaseInformation from "./CaseInformation";
import axios from "axios";
import CaseInfo from "../cases/CaseInfo";

const InspectorPool = () => {
    const theme = useTheme();
    const todayDate = useRef(new Date());
    const yesterdayDate = useRef(new Date());
    const tomorrowDate = useRef(new Date());
    const [inspectorPoolInspections, setInspectorPoolInspections] = useState([]);
    const [yesterdayCases, setYesterdayCases] = useState([]);
    const [todayCases, setTodayCases] = useState([]);
    const [tomorrowCases, setTomorrowCases] = useState([]);
    const [casesInformation, setCasesInformation] = useState([]);

    useEffect(() => {
        tomorrowDate.current.setDate(todayDate.current.getDate() + 1);
        yesterdayDate.current.setDate(todayDate.current.getDate() - 1);
    }, []);

    useEffect(() => {
        // const getPoolInspections = async () => {
        //     const todayCaseDate = `${new Date(todayDate.current).getFullYear()}-${String(
        //         new Date(todayDate.current).getMonth() + 1
        //     ).padStart(2, "0")}-${String(new Date(todayDate.current).getDate()).padStart(2, "0")}`;
        //     const inspectionResponse = await axios({
        //         method: "get",
        //         url: `${import.meta.env.VITE_BASE_URL}/getInspectorPool/${todayCaseDate}`,
        //     });
        //     setYesterdayCases(inspectionResponse?.data?.Yesterday);
        //     setTodayCases(inspectionResponse?.data?.Today);
        //     setTomorrowCases(inspectionResponse?.data?.Tomorrow);
        // };
        const getPoolInspections = async () => {
            const response = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/Getclaimcasesforpool?poolName=inspectorpool`,
            });
            setCasesInformation(response?.data.sort((a, b) => new Date(b.createdTimestamp) - new Date(a.createdTimestamp)));
        };
        getPoolInspections();
    }, []);
    // dayjs(filterData?.dueDateStart).format("YYYY-MM-DD");
    return (
        <>
            <Box
                sx={{
                    background: `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                    borderRadius: `0px 10px 10px 10px`,
                    opacity: 1,
                    height: "550px",
                    position: "relative",
                    boxSizing: "border-box",
                }}
            >
                <Grid2
                    container
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 1,
                        px: 2,
                    }}
                >
                    <Grid2 container size={6} sx={{ alignItems: "center" }}>
                        <Box
                            sx={{
                                cursor: "pointer",
                                mr: 2,
                            }}
                            display="flex"
                            justifyContent="center"
                        >
                            <KeyboardArrowLeftOutlinedIcon sx={{ fontSize: "30px" }} />
                        </Box>
                        <Box
                            sx={{
                                cursor: "pointer",
                            }}
                            display="flex"
                            justifyContent="center"
                        >
                            <KeyboardArrowRightOutlinedIcon sx={{ fontSize: "30px" }} />
                        </Box>
                    </Grid2>
                </Grid2>
                <Divider sx={{ mb: 2 }} />
                <CaseInfo casesInformation={casesInformation} isCasePool={true} />
            </Box>
        </>
    );
};

export default InspectorPool;
