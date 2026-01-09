import { Box, Grid2, Typography, useTheme } from "@mui/material";
import React from "react";
import CasesByInspectionType from "./CasesByInspectionType";
import CasesByStatus from "./CasesByStatus";
import CasesBySource from "./CasesBySource";
import { DataGrid } from "@mui/x-data-grid";
import CasesIcon from "../../../assets/total.svg";
import ReopenIcon from "../../../assets/reopen.svg";
import TotalEntityIcon from "../../../assets/total-entities.svg";
import InspectionsByEntity from "./InspectionsByEntity";

const InspectionHistoryReport = ({
    caseCounts,
    inspectionByEntities,
    casesByInspectionType,
    casesByStatus,
    casesBySource,
    cases,
}) => {
    const theme = useTheme();

    const columns = [
        {
            field: "inspectionID",
            headerName: "Case ID",
            flex: 0.5,
        },
        {
            field: "entityid",
            headerName: "Entity Name",
            flex: 0.5,
        },
        {
            field: "inspection_type",
            headerName: "Inspection Type",
            flex: 0.8,
        },
        {
            field: "dateOfInspection",
            headerName: "Inspection Date",
            flex: 0.5,
        },
        {
            field: "inspector_source",
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
                p: 2.5,
                maxHeight: "420px",
                scrollbarWidth: "none",
            }}
        >
            <Grid2 container spacing={2}>
                <Grid2
                    size={4}
                    container
                    alignItems="center"
                    columnGap={2}
                    sx={{
                        background: `#FFFFFF 0% 0% no-repeat padding-box`,
                        boxShadow: "0px 1px 4px #00000029",
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
                        <img src={CasesIcon} alt="Total number of cases" />
                    </Box>
                    <Box>
                        <Typography variant="h1" color={theme.palette.colors[5]}>
                            {caseCounts?.casesCount ? caseCounts?.casesCount : "-"}
                        </Typography>
                        <Typography variant="h6" fontWeight={600}>
                            Total Number of Cases
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
                        boxShadow: "0px 1px 4px #00000029",
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
                            alt="Total number of entities"
                        />
                    </Box>
                    <Box>
                        <Typography variant="h1" color={theme.palette.colors[5]}>
                            {caseCounts?.entitiesCount ? caseCounts?.entitiesCount : "-"}
                        </Typography>
                        <Typography variant="h6" fontWeight={600}>
                            Total Number of Entities
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
                        boxShadow: "0px 1px 4px #00000029",
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
                        <img src={ReopenIcon} alt="Percentage completed (%)" />
                    </Box>
                    <Box>
                        <Typography variant="h1" color={theme.palette.colors[5]}>
                            {caseCounts?.percentageCompleted ? caseCounts?.percentageCompleted : "-"}
                        </Typography>
                        <Typography variant="h6" fontWeight={600}>
                            Percentage Completed (%)
                        </Typography>
                    </Box>
                </Grid2>
            </Grid2>
            <Grid2
                container
                sx={{
                    background: `#FFFFFF 0% 0% no-repeat padding-box`,
                    boxShadow: "0px 1px 4px #00000029",
                    borderRadius: "4px",
                    opacity: 1,
                    p: 2,
                    mt: 2.5,
                }}
            >
                <InspectionsByEntity inspectionByEntities={inspectionByEntities} />
            </Grid2>
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
                    rows={cases}
                    getRowId={(row) => row?.inspectionID}
                    // loading={loading}
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
    );
};

export default InspectionHistoryReport;
