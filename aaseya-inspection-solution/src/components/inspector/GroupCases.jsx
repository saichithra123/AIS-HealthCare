import { Box, Divider, Grid2, Link, Typography, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import CaseInformation from "./CaseInformation";
import axios from "axios";
import dayjs from "dayjs";

const GroupCases = () => {
    const theme = useTheme();
    const todayDate = useRef(new Date());
    const yesterdayDate = useRef(new Date());
    const tomorrowDate = useRef(new Date());
    const [inspectorPoolInspections, setInspectorPoolInspections] = useState([]);
    const [yesterdayCases, setYesterdayCases] = useState([]);
    const [todayCases, setTodayCases] = useState([]);
    const [tomorrowCases, setTomorrowCases] = useState([]);

    useEffect(() => {
        tomorrowDate.current.setDate(todayDate.current.getDate() + 1);
        yesterdayDate.current.setDate(todayDate.current.getDate() - 1);
    }, []);

    useEffect(() => {
        const getGroupInspections = async () => {
            const inspectionResponse = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/getGroupcasesForLeadInspector/${localStorage.getItem("userID")}`,
            });
            inspectionResponse?.data?.map((response) => {
                if (response?.due_date === dayjs(new Date()).format("YYYY-MM-DD")) {
                    setTodayCases((prev) => [...prev, response]);
                }
                if (response?.due_date === dayjs(yesterdayDate.current).format("YYYY-MM-DD")) {
                    setYesterdayCases((prev) => [...prev, response]);
                }
                if (response?.due_date === dayjs(tomorrowDate.current).format("YYYY-MM-DD")) {
                    setTomorrowCases((prev) => [...prev, response]);
                }
            });
        };
        getGroupInspections();
    }, []);

    return (
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
            <Divider />
            <Grid2
                container
                spacing={2}
                position="relative"
                sx={{ p: 2.5, overflow: "auto", maxHeight: "480px", scrollbarWidth: "none", height: "100%" }}
            >
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <Typography variant="h5" fontWeight={600} mb={2}>
                        {new Date(yesterdayDate.current).getDate().toString().padStart(2, "0")} &nbsp;
                        {new Date(yesterdayDate.current).toLocaleString("default", { month: "short" })}
                        &nbsp; | &nbsp; Yesterday
                    </Typography>
                    {yesterdayCases?.length > 0 ? (
                        <CaseInformation inspectorCases={yesterdayCases} isGroupCases={true} />
                    ) : (
                        <Typography fontWeight={500}>No cases available</Typography>
                    )}
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <Typography variant="h5" fontWeight={600} color={theme.palette.colors[11]} mb={2}>
                        {new Date(todayDate.current).getDate().toString().padStart(2, "0")} &nbsp;
                        {new Date(todayDate.current).toLocaleString("default", { month: "short" })}
                        &nbsp; | &nbsp; Today
                    </Typography>
                    {todayCases?.length > 0 ? (
                        <CaseInformation inspectorCases={todayCases} isGroupCases={true} />
                    ) : (
                        <Typography fontWeight={500}>No cases available</Typography>
                    )}
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <Typography variant="h5" fontWeight={600} mb={2}>
                        {new Date(tomorrowDate.current).getDate().toString().padStart(2, "0")} &nbsp;
                        {new Date(tomorrowDate.current).toLocaleString("default", { month: "short" })}
                        &nbsp; | &nbsp; Tomorrow
                    </Typography>
                    {tomorrowCases?.length > 0 ? (
                        <CaseInformation inspectorCases={tomorrowCases} isGroupCases={true} />
                    ) : (
                        <Typography fontWeight={500}>No cases available</Typography>
                    )}
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default GroupCases;
