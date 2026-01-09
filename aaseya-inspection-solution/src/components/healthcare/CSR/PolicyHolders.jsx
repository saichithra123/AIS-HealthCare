import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  TextField,
  InputAdornment,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../global/TablePagination";
import CustomCheckbox from "../../global/CustomCheckbox";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axios from "axios";

const PolicyHolders = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [policyHolders, setPolicyHolders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // const res = await fetch(`${import.meta.env.VITE_BASE_URL}/GetAllPolicyDetails?page=${page - 1}&size=${pageSize}`);
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/GetAllPolicyDetails?page=${page - 1}&size=${pageSize}`
                );
                // const data = await res.json();

                setPolicyHolders(response?.data?.content || []);
                setPage(response?.data?.number + 1);
                setPageSize(response?.data?.size);
                setTotalPages(response?.data?.totalPages);
                setTotalRecords(response?.data?.totalElements);
            } catch (err) {
                console.error("Error fetching policy details:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, pageSize]);

    const columns = [
        { field: "customerName", headerName: "Claimant Name", flex: 1 },
        { field: "policyId", headerName: "Policy ID", flex: 1 },
        { field: "phoneNumber", headerName: "Contact Number", flex: 1 },
        { field: "coverageStartDate", headerName: "Coverage Eff. Date", flex: 1 },
        { field: "coverageEndDate", headerName: "Coverage Exp. Date", flex: 1 },
        {
            field: "actions",
            headerName: "Actions",
            flex: 0.5,
            renderCell: (params) => (
                <Button
                    sx={{ color: `${theme.palette.colors[11]}` }}
                    onClick={() =>
                        navigate("/addeditpolicy", {
                            state: { policyId: params.row?.policyId },
                        })
                    }
                >
                    Edit
                </Button>
            ),
        },
    ];

    return (
        <Box
            sx={{
                borderRadius: "20px",
                background: `${theme.palette.colors[2]} 0% 0% no-repeat padding-box`,
                my: 2,
                mr: 2,
                p: 2.5,
                boxShadow: `inset 0px 0px 6px ${theme.palette.colors[3]}`,
            }}
        >
            <Box sx={{ background: theme.palette.colors[1], borderRadius: "10px" }}>
                <Box
                    sx={{
                        py: 2,
                        px: 2.5,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                        "& .MuiInputBase-root": {
                            boxShadow: `0px 1px 6px ${theme.palette.colors[3]}`,
                            borderRadius: "20px",
                            opacity: 1,
                            background: `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                            color: theme.palette.colors[8],
                        },
                    }}
                >
                    <Typography variant="h4" fontWeight={600}>
                        Policy Holders
                    </Typography>
                    <TextField
                        placeholder="Search by Customer Name, Policy ID"
                        variant="outlined"
                        size="small"
                        width="260px"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchOutlinedIcon
                                            sx={{
                                                color: theme.palette.colors[8],
                                            }}
                                        />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </Box>
                <Divider />
                <Box
                    sx={{
                        py: 2,
                        px: 2.5,
                        height: "400px",
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
                        rows={policyHolders}
                        columns={columns}
                        getRowId={(row) => row.policyId}
                        disableRowSelectionOnClick
                        loading={loading}
                        slots={{
                            pagination: () => (
                                <CustomPagination
                                    page={page}
                                    setPage={setPage}
                                    pageSize={pageSize}
                                    setPageSize={setPageSize}
                                    totalPages={totalPages}
                                    totalRecords={totalRecords}
                                />
                            ),
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default PolicyHolders;
