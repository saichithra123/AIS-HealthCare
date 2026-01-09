import { Box, Grid2, Typography, useTheme } from "@mui/material";
import React from "react";
import "../reportStyles.css";
import { DataGrid } from "@mui/x-data-grid";
import CasesByInspectionType from "./CasesByInspectionType";
import CasesByStatus from "./CasesByStatus";
import CasesBySource from "./CasesBySource";

const EntityHistoryReport = ({ entityDetails, casesByInspectionType, casesByStatus, casesBySource, cases }) => {
    const theme = useTheme();

    const columns = [
        {
            field: "caseId",
            headerName: "Case ID",
            flex: 0.5,
        },
        {
            field: "inspectionType",
            headerName: "Inspection Type",
            flex: 0.8,
        },
        {
            field: "inspectionDate",
            headerName: "Inspection Date",
            flex: 0.5,
        },
        {
            field: "inspectionSource",
            headerName: "Inspection Source",
            flex: 0.5,
        },
        {
            field: "status",
            headerName: "Status",
            valueGetter: (value) => capitalizeWords(value),
            flex: 0.5,
        },
    ];

    const capitalizeWords = (status) => {
        const words = status?.split(/[\s_]+/);
        return words?.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    };

    return (
        <Box
            sx={{
                overflow: "auto",
                position: "relative",
                px: 2.5,
                maxHeight: "420px",
                scrollbarWidth: "none",
            }}
        >
            <Box
                sx={{
                    background: `#FFFFFF 0% 0% no-repeat padding-box`,
                    boxShadow: "0px 1px 4px #00000029",
                    borderRadius: "10px",
                    opacity: 1,
                    width: "100%",
                    mt: 2,
                }}
            >
                <Typography sx={{ background: "#D4E9EB", borderRadius: "10px 10px 0px 0px", px: 2, py: 1.5, fontWeight: 600 }}>
                    {entityDetails?.name}
                </Typography>
                <Grid2 container spacing={1.5} p={2}>
                    <Grid2 size={12}>
                        <Typography fontSize={16} fontWeight={500}>
                            Entity Details
                        </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Size</Typography>
                        <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>{entityDetails?.size ?? "-"}</Typography>
                    </Grid2>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Address</Typography>
                        <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>{entityDetails?.address ?? "-"}</Typography>
                    </Grid2>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Zone</Typography>
                        <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>{entityDetails?.zonename ?? "-"}</Typography>
                    </Grid2>
                </Grid2>
                <Grid2 container spacing={1.5} p={2}>
                    <Grid2 size={12}>
                        <Typography fontSize={16} fontWeight={500}>
                            Representative Details
                        </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Representative Name</Typography>
                        <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
                            {entityDetails?.representative_name ?? "-"}
                        </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Phone Number</Typography>
                        <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
                            {entityDetails?.representative_phoneno}
                        </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Email ID</Typography>
                        <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>{entityDetails?.representative_email}</Typography>
                    </Grid2>
                </Grid2>
            </Box>
            <Grid2 container spacing={2} sx={{ pt: 2.5 }}>
                <Grid2
                    size={4}
                    sx={{
                        background: `#FFFFFF 0% 0% no-repeat padding-box`,
                        boxShadow: "0px 1px 4px #00000029",
                        borderRadius: "10px",
                        opacity: 1,
                        p: 1.5,
                    }}
                >
                    <CasesByInspectionType casesByInspectionType={casesByInspectionType} />
                </Grid2>
                <Grid2
                    size={4}
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
                    size={4}
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
                <DataGrid columns={columns} rows={cases} getRowId={(row) => row?.caseId} hideFooter />
            </Box>
        </Box>
    );
};

export default EntityHistoryReport;
