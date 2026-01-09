import { Box, Divider, Grid2, Link, Typography, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import CaseInformation from "./CaseInformation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CaseInfo from "../cases/CaseInfo";

const InspectorCases = () => {
    const theme = useTheme();
    const todayDate = useRef(new Date());
    const yesterdayDate = useRef(new Date());
    const tomorrowDate = useRef(new Date());
    const [inspectorCases, setInspectorCases] = useState([]);
    const [yesterdayCases, setYesterdayCases] = useState([]);
    const [todayCases, setTodayCases] = useState([]);
    const [tomorrowCases, setTomorrowCases] = useState([]);
    const navigate = useNavigate();
    const [casesInformation, setCasesInformation] = useState([]);

    useEffect(() => {
        tomorrowDate.current.setDate(todayDate.current.getDate() + 1);
        yesterdayDate.current.setDate(todayDate.current.getDate() - 1);
    }, []);

    useEffect(() => {
        // const getInspectorCases = async () => {
        //     const todayCaseDate = `${new Date(todayDate.current).getFullYear()}-${String(
        //         new Date(todayDate.current).getMonth() + 1
        //     ).padStart(2, "0")}-${String(new Date(todayDate.current).getDate()).padStart(2, "0")}`;
        //     const responseCases = await axios({
        //         method: "get",
        //         url: `${import.meta.env.VITE_BASE_URL}/getMycasesForInspectorDate/${localStorage.getItem(
        //             "userEmail"
        //         )}/${todayCaseDate}`,
        //     });
        //     setYesterdayCases(responseCases?.data?.Yesterday);
        //     setTodayCases(responseCases?.data?.Today);
        //     setTomorrowCases(responseCases?.data?.Tomorrow);
        // };
        const getInspectorCases = async () => {
            const response = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/getAssignedcases?emailID=${localStorage.getItem("userEmail")}`,
            });
            setCasesInformation(response?.data.sort((a, b) => new Date(b.createdTimestamp) - new Date(a.createdTimestamp)));
        };
        getInspectorCases();
    }, []);

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
                    <Grid2
                        size={6}
                        container
                        sx={{
                            "& .MuiOutlinedInput-root.Mui-focused": {
                                "& > fieldset": {
                                    border: `1px solid #CCCCCC`,
                                },
                            },
                            justifyContent: "flex-end",
                        }}
                    >
                        <Link
                            href="/route"
                            sx={{
                                color: theme.palette.colors[11],
                                textDecoration: "underline",
                                fontWeight: 600,
                            }}
                        >
                            Prioritize Today's work
                        </Link>
                    </Grid2>
                </Grid2>
                <Divider sx={{ mb: 2 }} />
                {/* <Grid2
                    container
                    spacing={2}
                    position="relative"
                    sx={{ p: 2.5, overflow: "auto", maxHeight: "480px", scrollbarWidth: "none", height: "100%" }}
                >
                    <CaseInfo casesInformation={casesInformation} />
                </Grid2> */}

                <CaseInfo casesInformation={casesInformation} />
            </Box>
        </>
    );
};

export default InspectorCases;
