import { Box, FormControl, Grid2, MenuItem, Select, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../reportStyles.css";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import CasesBySource from "./CasesBySource";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const SummaryReports = () => {
    const [selectedInspectionType, setSelectedInspectionType] = useState(0);
    const theme = useTheme();
    const [inspectionTypes, setInspectionTypes] = useState([]);
    const [negativeCategories, setNegativeCategories] = useState([]);
    const [negativeItems, setNegativeItems] = useState([]);

    const columns = [
        {
            field: "sno",
            headerName: "S.No.",
            flex: 0.1,
        },
        {
            field: "categoryName",
            headerName: "Category",
            flex: 0.5,
        },
        {
            field: "checklistItemName",
            headerName: "Chechlist Item",
            flex: 1,
        },
        {
            field: "negativeCount",
            headerName: "Count",
            flex: 0.2,
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [inspectionTypesResponse] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_BASE_URL}/getAllInspectionTypes`),
                ]);
                setInspectionTypes(inspectionTypesResponse?.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            let categoryUrl;
            if (selectedInspectionType) {
                categoryUrl = `${import.meta.env.VITE_BASE_URL}/topFive-categories?ins_Type_Id=${selectedInspectionType}`;
            } else {
                categoryUrl = `${import.meta.env.VITE_BASE_URL}/topFive-categories`;
            }
            let itemUrl;
            if (selectedInspectionType) {
                itemUrl = `${import.meta.env.VITE_BASE_URL}/topTen-negative-observations?ins_Type_Id=${selectedInspectionType}`;
            } else {
                itemUrl = `${import.meta.env.VITE_BASE_URL}/topTen-negative-observations`;
            }
            const [categoryResponse, itemsResponse] = await Promise.all([axios.get(categoryUrl), axios.get(itemUrl)]);
            setNegativeItems(itemsResponse?.data);
            setNegativeCategories(categoryResponse?.data);
        };
        fetchData();
    }, [selectedInspectionType]);

    return (
        <Box
            sx={{
                width: "100%",
            }}
        >
            <Grid2 container sx={{ px: 2.5, justifyContent: "flex-end", alignItems: "center" }}>
                <Typography sx={{ mr: 1, fontWeight: 500 }}>Inspection Type</Typography>
                <FormControl className="inputFields">
                    <Select
                        value={selectedInspectionType}
                        onChange={(e) => setSelectedInspectionType(e.target.value)}
                        sx={{
                            "& .MuiSelect-select": {
                                padding: "9px 0 9px 20px",
                            },
                            width: "460px",
                            mr: 4,
                        }}
                    >
                        <MenuItem value={0} disabled>
                            Select
                        </MenuItem>
                        {inspectionTypes?.map((inspectionType) => {
                            return (
                                <MenuItem key={inspectionType?.id} value={inspectionType?.id}>
                                    {inspectionType?.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
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
                <Grid2 container sx={{ justifyContent: "center", alignItems: "center", pt: 3 }}>
                    <Grid2
                        sx={{
                            background: "#FFFFFF 0% 0% no-repeat padding-box",
                            boxShadow: "0px 1px 4px #00000029",
                            borderRadius: "10px",
                            opacity: 1,
                            p: 2,
                        }}
                    >
                        <CasesBySource casesBySource={negativeCategories} isSummary={true} />
                    </Grid2>
                </Grid2>
                <Typography fontWeight={500} sx={{ pt: 4 }}>
                    Top 10 Negative Observations
                </Typography>
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
                    <DataGrid columns={columns} rows={negativeItems} getRowId={(row) => row?.sno} disableRowSelectionOnClick />
                </Box>
            </Box>
        </Box>
    );
};

export default SummaryReports;
