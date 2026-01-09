import { Box, Grid2, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import HistoryReportIcon from "../../../assets/history-report.svg";
import GroupReportIcon from "../../../assets/group-report.svg";
import TransactionReportIcon from "../../../assets/transaction-report.svg";
import SummaryReportIcon from "../../../assets/summary-report.svg";
import ReportTabs from "./ReportTabs";

const KPIReports = ({ isShowReport, setIsShowReport }) => {
    const theme = useTheme();
    const [selectedReport, setSelectedReport] = useState(0);

    return (
        <Box
            sx={{
                background: `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                borderRadius: `0px 10px 10px 10px`,
                opacity: 1,
                height: "550px",
            }}
        >
            {!isShowReport && (
                <Grid2 container spacing={3} sx={{ p: 3 }}>
                    <Grid2
                        size={{ xs: 12, md: 6, lg: 4 }}
                        container
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                            setIsShowReport(true);
                            setSelectedReport(0);
                        }}
                    >
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                backgroundColor: "#4C8B92",
                                width: "60px",
                                height: "60px",
                                borderRadius: "44px",
                                position: "relative",
                                left: "30px",
                                zIndex: 9,
                            }}
                        >
                            <img
                                src={HistoryReportIcon}
                                alt="History Reports"
                                style={{ width: 24, height: 24 }}
                                sx={{ color: "white" }}
                            />
                        </Box>
                        <Box
                            display="flex"
                            columnGap={2}
                            sx={{
                                background: `#ffffff`,
                                borderRadius: "10px",
                                opacity: 1,
                                p: 3,
                                pt: 6,
                                position: "relative",
                                top: "-50px",
                                border: `1px solid #EBEBEB`,
                                height: "180px",
                                width: "100%",
                            }}
                        >
                            <Box>
                                <Typography variant="h4" fontWeight={600} sx={{ mb: 2 }}>
                                    History Reports
                                </Typography>
                                <Typography>
                                    Helps you to create new users and control their access levels, and allows you to create user
                                    groups.
                                </Typography>
                            </Box>
                        </Box>
                    </Grid2>
                    <Grid2
                        size={{ xs: 12, md: 6, lg: 4 }}
                        container
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                            setIsShowReport(true);
                            setSelectedReport(1);
                        }}
                    >
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                backgroundColor: "#4C8B92",
                                width: "60px",
                                height: "60px",
                                borderRadius: "44px",
                                position: "relative",
                                left: "30px",
                                zIndex: 9,
                            }}
                        >
                            <img
                                src={GroupReportIcon}
                                alt="History Reports"
                                style={{ width: 24, height: 24 }}
                                sx={{ color: "white" }}
                            />
                        </Box>
                        <Box
                            display="flex"
                            columnGap={2}
                            sx={{
                                background: `#ffffff`,
                                borderRadius: "10px",
                                opacity: 1,
                                p: 3,
                                pt: 6,
                                position: "relative",
                                top: "-50px",
                                border: `1px solid #EBEBEB`,
                                height: "180px",
                                width: "100%",
                            }}
                        >
                            <Box>
                                <Typography variant="h4" fontWeight={600} sx={{ mb: 2 }}>
                                    Group Reports
                                </Typography>
                                <Typography>Helps you to create new entities and sort them on the basis of zones.</Typography>
                            </Box>
                        </Box>
                    </Grid2>
                    <Grid2
                        size={{ xs: 12, md: 6, lg: 4 }}
                        container
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                            setIsShowReport(true);
                            setSelectedReport(2);
                        }}
                    >
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                backgroundColor: "#4C8B92",
                                width: "60px",
                                height: "60px",
                                borderRadius: "44px",
                                position: "relative",
                                left: "30px",
                                zIndex: 9,
                            }}
                        >
                            <img
                                src={TransactionReportIcon}
                                alt="History Reports"
                                style={{ width: 24, height: 24 }}
                                sx={{ color: "white" }}
                            />
                        </Box>
                        <Box
                            display="flex"
                            columnGap={2}
                            sx={{
                                background: `#ffffff`,
                                borderRadius: "10px",
                                opacity: 1,
                                p: 3,
                                pt: 6,
                                position: "relative",
                                top: "-50px",
                                border: `1px solid #EBEBEB`,
                                height: "180px",
                                width: "100%",
                            }}
                        >
                            <Box>
                                <Typography variant="h4" fontWeight={600} sx={{ mb: 2 }}>
                                    Transaction Reports
                                </Typography>
                                <Typography>
                                    Helps you to create checklist items, categories, templates and pre inspection checklist items
                                    for multiple inspection types.
                                </Typography>
                            </Box>
                        </Box>
                    </Grid2>
                    <Grid2
                        size={{ xs: 12, md: 6, lg: 4 }}
                        container
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                            setIsShowReport(true);
                            setSelectedReport(3);
                        }}
                    >
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                backgroundColor: "#4C8B92",
                                width: "60px",
                                height: "60px",
                                borderRadius: "44px",
                                position: "relative",
                                left: "30px",
                                zIndex: 9,
                            }}
                        >
                            <img
                                src={SummaryReportIcon}
                                alt="History Reports"
                                style={{ width: 24, height: 24 }}
                                sx={{ color: "white" }}
                            />
                        </Box>
                        <Box
                            display="flex"
                            columnGap={2}
                            sx={{
                                background: `#ffffff`,
                                borderRadius: "10px",
                                opacity: 1,
                                p: 3,
                                pt: 6,
                                position: "relative",
                                top: "-50px",
                                border: `1px solid #EBEBEB`,
                                height: "180px",
                                width: "100%",
                            }}
                        >
                            <Box>
                                <Typography variant="h4" fontWeight={600} sx={{ mb: 2 }}>
                                    Summary Reports
                                </Typography>
                                <Typography>
                                    Helps you to create new users and control their access levels, and allows you to create user
                                    groups.
                                </Typography>
                            </Box>
                        </Box>
                    </Grid2>
                </Grid2>
            )}
            {isShowReport && <ReportTabs selectedTabNumber={selectedReport} />}
        </Box>
    );
};

export default KPIReports;
