import { Box, Grid2, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CasesIcon from "../../../assets/total.svg";
import ReopenIcon from "../../../assets/reopen.svg";
import TotalEntityIcon from "../../../assets/total-entities.svg";
import CasesBySource from "./CasesBySource";
import CasesByStatus from "./CasesByStatus";
import { DataGrid } from "@mui/x-data-grid";
import "../reportStyles.css";
import axios from "axios";
import dayjs from "dayjs";

const TransactionReports = () => {
    const theme = useTheme();
    const [inspectionStartDate, setInspectionStartDate] = useState(null);
    const [inspectionEndDate, setInspectionEndDate] = useState(null);
    const [casesByStatus, setCasesByStatus] = useState({});
    const [casesBySource, setCasesBySource] = useState({});
    const [caseCounts, setCaseCounts] = useState({});
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            field: "month",
            headerName: "Month",
            flex: 0.5,
        },
        {
            field: "pendingCases",
            headerName: "Pending Cases",
            flex: 0.5,
        },
        {
            field: "inProgressCases",
            headerName: "In-Progress Cases",
            flex: 0.8,
        },
        {
            field: "completedCases",
            headerName: "Completed Cases",
            flex: 0.5,
        },
        {
            field: "completionPercentage",
            headerName: "Completion Percentage (%)",
            valueGetter: (value) => `${value}%`,
            flex: 0.5,
        },
    ];

    useEffect(() => {
        const getTransactionReport = async () => {
            setLoading(true);
            let summaryUrl;
            if (inspectionStartDate && inspectionEndDate) {
                summaryUrl = `${import.meta.env.VITE_BASE_URL}/getTransactionsSummaryReport?startDate=${dayjs(
                    inspectionStartDate
                ).format("YYYY-MM-DD")}&endDate=${dayjs(inspectionEndDate).format("YYYY-MM-DD")}`;
            } else if (inspectionStartDate) {
                summaryUrl = `${import.meta.env.VITE_BASE_URL}/getTransactionsSummaryReport?startDate=${dayjs(
                    inspectionStartDate
                ).format("YYYY-MM-DD")}`;
            } else if (inspectionEndDate) {
                summaryUrl = `${import.meta.env.VITE_BASE_URL}/getTransactionsSummaryReport?endDate=${dayjs(
                    inspectionEndDate
                ).format("YYYY-MM-DD")}`;
            } else {
                summaryUrl = `${import.meta.env.VITE_BASE_URL}/getTransactionsSummaryReport`;
            }

            let transactionUrl;
            if (inspectionStartDate && inspectionEndDate) {
                transactionUrl = `${import.meta.env.VITE_BASE_URL}/getTransactions?startDate=${dayjs(inspectionStartDate).format(
                    "YYYY-MM-DD"
                )}&endDate=${dayjs(inspectionEndDate).format("YYYY-MM-DD")}`;
            } else if (inspectionStartDate) {
                transactionUrl = `${import.meta.env.VITE_BASE_URL}/getTransactions?startDate=${dayjs(inspectionStartDate).format(
                    "YYYY-MM-DD"
                )}`;
            } else if (inspectionEndDate) {
                transactionUrl = `${import.meta.env.VITE_BASE_URL}/getTransactions?endDate=${dayjs(inspectionEndDate).format(
                    "YYYY-MM-DD"
                )}`;
            } else {
                transactionUrl = `${import.meta.env.VITE_BASE_URL}/getTransactions`;
            }

            const [summaryResponse, transactionResponse] = await Promise.all([axios.get(summaryUrl), axios.get(transactionUrl)]);

            setCasesByStatus(summaryResponse?.data?.casesByStatus);
            setCasesBySource(summaryResponse?.data?.casesByinspector_source);
            setCaseCounts({
                closedCases: summaryResponse?.data?.closedCases,
                openCases: summaryResponse?.data?.openCases,
                pendingCases: summaryResponse?.data?.pendingCases,
            });
            setTransactionHistory(transactionResponse?.data);
            setLoading(false);
        };
        getTransactionReport();
    }, [inspectionStartDate, inspectionEndDate]);

    return (
        <Box
            sx={{
                width: "100%",
            }}
        >
            <Grid2 container justifyContent="flex-end" alignItems="center" sx={{ px: 2.5 }}>
                <Typography sx={{ mr: 1, fontWeight: 500 }}>From Date</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        className="inputFields"
                        slotProps={{ textField: { placeholder: "DD MMM YYYY" } }}
                        value={inspectionStartDate}
                        onChange={(value) => setInspectionStartDate(value)}
                        format="DD MMM YYYY"
                        sx={{ width: "200px", mr: 2 }}
                    />
                </LocalizationProvider>
                <Typography sx={{ mr: 1, fontWeight: 500 }}>To Date</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        className="inputFields"
                        slotProps={{ textField: { placeholder: "DD MMM YYYY" } }}
                        value={inspectionEndDate}
                        onChange={(value) => setInspectionEndDate(value)}
                        format="DD MMM YYYY"
                        sx={{ width: "200px", mr: 3 }}
                    />
                </LocalizationProvider>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        background: `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                        boxShadow: `0px 1px 4px ${theme.palette.colors[3]}`,
                        borderRadius: "4px",
                        opacity: 1,
                        height: "40px",
                        width: "40px",
                        cursor: "pointer",
                    }}
                >
                    <FileDownloadOutlinedIcon sx={{ color: `${theme.palette.colors[8]}` }} />
                </Box>
            </Grid2>
            <Box
                sx={{
                    overflow: "auto",
                    position: "relative",
                    px: 2.5,
                    maxHeight: "420px",
                    scrollbarWidth: "none",
                }}
            >
                <Grid2 container spacing={2} sx={{ pt: 2.5 }}>
                    <Grid2
                        size={4}
                        container
                        alignItems="center"
                        columnGap={2}
                        sx={{
                            background: `#FFFFFF 0% 0% no-repeat padding-box`,
                            boxShadow: "0px 1px 15px #00000029",
                            borderRadius: "4px",
                            opacity: 1,
                            p: 3,
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: theme.palette.colors[7],
                                p: 1,
                                width: "40px",
                                height: "40px",
                                borderRadius: "44px",
                            }}
                        >
                            <img src={CasesIcon} alt="Open cases" />
                        </Box>
                        <Box>
                            <Typography variant="h1" color={theme.palette.colors[5]}>
                                {caseCounts?.openCases ? caseCounts?.openCases : "-"}
                            </Typography>
                            <Typography variant="h6" fontWeight={600}>
                                Open Cases
                            </Typography>
                        </Box>
                    </Grid2>
                    <Grid2
                        size={4}
                        container
                        alignItems="center"
                        columnGap={2}
                        sx={{
                            background: `#FFFFFF 0% 0% no-repeat padding-box`,
                            boxShadow: "0px 1px 15px #00000029",
                            borderRadius: "4px",
                            opacity: 1,
                            p: 3,
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: theme.palette.colors[7],
                                p: 1,
                                width: "40px",
                                height: "40px",
                                borderRadius: "44px",
                            }}
                        >
                            <img
                                src={TotalEntityIcon}
                                width="24px"
                                height="24px"
                                style={{ padding: "5px" }}
                                alt="Pending Cases"
                            />
                        </Box>
                        <Box>
                            <Typography variant="h1" color={theme.palette.colors[5]}>
                                {caseCounts?.pendingCases ? caseCounts?.pendingCases : "-"}
                            </Typography>
                            <Typography variant="h6" fontWeight={600}>
                                Pending Cases
                            </Typography>
                        </Box>
                    </Grid2>
                    <Grid2
                        size={4}
                        container
                        alignItems="center"
                        columnGap={2}
                        sx={{
                            background: `#FFFFFF 0% 0% no-repeat padding-box`,
                            boxShadow: "0px 1px 15px #00000029",
                            borderRadius: "4px",
                            opacity: 1,
                            p: 3,
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: theme.palette.colors[7],
                                p: 1,
                                width: "40px",
                                height: "40px",
                                borderRadius: "44px",
                            }}
                        >
                            <img src={ReopenIcon} alt="Closed Cases" />
                        </Box>
                        <Box>
                            <Typography variant="h1" color={theme.palette.colors[5]}>
                                {caseCounts?.closedCases ? caseCounts?.closedCases : "-"}
                            </Typography>
                            <Typography variant="h6" fontWeight={600}>
                                Closed Cases
                            </Typography>
                        </Box>
                    </Grid2>
                </Grid2>
                <Grid2 container spacing={2} sx={{ pt: 2.5, justifyContent: "center" }}>
                    {/* <Grid2 size={4} container direction="column" spacing={2}>
                        <Box
                            sx={{
                                background: `#FFFFFF 0% 0% no-repeat padding-box`,
                                boxShadow: "0px 1px 15px #00000029",
                                borderRadius: "4px",
                                opacity: 1,
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                height: "46%",
                                width: "100%",
                                justifyContent: "center",
                            }}
                        >
                            <Typography variant="h1" color={theme.palette.colors[5]}>
                                {"-"}
                            </Typography>
                            <Typography variant="h6" fontWeight={600}>
                                Average Days of Open Cases
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                background: `#FFFFFF 0% 0% no-repeat padding-box`,
                                boxShadow: "0px 1px 15px #00000029",
                                borderRadius: "4px",
                                opacity: 1,
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                height: "46%",
                                width: "100%",
                                justifyContent: "center",
                            }}
                        >
                            <Typography variant="h1" color={theme.palette.colors[5]}>
                                {"-"}
                            </Typography>
                            <Typography variant="h6" fontWeight={600}>
                                Average Days to Close Case
                            </Typography>
                        </Box>
                    </Grid2> */}
                    <Grid2
                        size={6}
                        sx={{
                            background: `#FFFFFF 0% 0% no-repeat padding-box`,
                            boxShadow: "0px 1px 4px #00000029",
                            borderRadius: "10px",
                            opacity: 1,
                            p: 1.5,
                        }}
                    >
                        <CasesByStatus casesByStatus={casesByStatus} />
                    </Grid2>
                    <Grid2
                        size={6}
                        sx={{
                            background: `#FFFFFF 0% 0% no-repeat padding-box`,
                            boxShadow: "0px 1px 4px #00000029",
                            borderRadius: "10px",
                            opacity: 1,
                            p: 1.5,
                        }}
                    >
                        <CasesBySource casesBySource={casesBySource} />
                    </Grid2>
                </Grid2>
                <Box
                    sx={{
                        height: "400px",
                        width: "100%",
                        py: 2,
                        // px: 2.5,
                        ".MuiDataGrid-columnHeader": {
                            backgroundColor: `${theme.palette.colors[18]}`,
                        },
                        ".MuiDataGrid-root": {
                            borderRadius: "10px 10px 0px 0px",
                            border: "0px !important",
                            borderColor: "white !important",
                            "--DataGrid-rowBorderColor": "#ffffff",
                        },
                        ".MuiDataGrid-main": {
                            borderRadius: "10px 10px 0px 0px",
                        },
                        "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
                            borderBottom: "0px !important",
                            borderTop: "0px !important",
                        },
                        " .MuiDataGrid-row": {
                            border: `1px solid ${theme.palette.colors[22]}`,
                            borderRadius: "6px",
                            my: "1px",
                        },
                        " .MuiDataGrid-overlay": {
                            border: `1px solid ${theme.palette.colors[22]}`,
                            borderRadius: "6px",
                            my: "1px",
                        },
                        ".MuiDataGrid-columnHeaders .MuiDataGrid-scrollbarFiller": {
                            backgroundColor: `${theme.palette.colors[18]}`,
                        },
                        " .MuiDataGrid-scrollbar": {
                            display: "none",
                        },
                        ".MuiDataGrid-footerContainer": {
                            borderTop: "0px",
                        },
                        ".MuiDataGrid-selectedRowCount": {
                            display: "none",
                        },
                    }}
                >
                    <DataGrid
                        columns={columns}
                        rows={transactionHistory}
                        loading={loading}
                        getRowId={(row) => row?.month}
                        // slots={{
                        //     pagination: () => (
                        //         <CustomPagination
                        //             page={page}
                        //             setPage={setPage}
                        //             pageSize={pageSize}
                        //             setPageSize={setPageSize}
                        //             totalPages={totalPages}
                        //             totalRecords={totalRecords}
                        //         />
                        //     ),
                        // }}
                        disableRowSelectionOnClick
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default TransactionReports;
