import React, { useEffect, useState } from "react";
import { Tooltip, useTheme, Box, Typography, IconButton, Button, Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { DataGrid } from "@mui/x-data-grid";
import CustomPagination from "../global/TablePagination";
import axios from "axios";

const InspectionPlan = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [inspectionPlans, setInspectionPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    const columns = [
        {
            field: "inspectionPlanId",
            headerName: "Inspection Plan ID",
            flex: 0.3,
        },
        {
            field: "inspectionPlanName",
            headerName: "Inspection Plan Name",
            flex: 0.5,
        },
        {
            field: "reason",
            headerName: "Reason",
            flex: 0.5,
        },
        {
            field: "status",
            headerName: "Status",
            flex: 0.3,
            renderCell: (params) => (
                <>
                    <Box>{params.row.status}</Box>
                    {/* {params.row?.isActive ? (
                        <>
                            <Box
                                sx={{
                                    display: "inline-block",
                                    width: "8px",
                                    height: "8px",
                                    borderRadius: "50%",
                                    background: "#03911A",
                                    mr: 1,
                                }}
                            ></Box>
                            Active
                        </>
                    ) : (
                        <>
                            <Box
                                sx={{
                                    display: "inline-block",
                                    width: "8px",
                                    height: "8px",
                                    borderRadius: "50%",
                                    background: "#D54B4B",
                                    mr: 1,
                                }}
                            ></Box>
                            Inactive
                        </>
                    )} */}
                </>
            ),
        },
        {
            field: "action",
            headerName: "Actions",
            flex: 0.3,
            renderCell: (params) => {
                return (
                    <Button
                        sx={{ color: `${theme.palette.colors[11]}` }}
                        onClick={() => {
                            navigate(`/inspection-plan/add`, { state: { inspectionPlanId: params.row?.inspectionPlanId } });
                        }}
                    >
                        Edit
                    </Button>
                );
            },
        },
    ];

    useEffect(() => {
        const getInspectionPlans = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/getAllInspectionPlanDetails?page=${page - 1}&size=${pageSize}`
                );
                setInspectionPlans(response?.data?.content);
                setPage(response?.data?.number + 1);
                setPageSize(response?.data?.size);
                setTotalPages(response?.data?.totalPages);
                setTotalRecords(response?.data?.totalElements);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getInspectionPlans();
    }, [page, pageSize]);

    return (
        <Box
            sx={{
                borderRadius: "20px",
                background: `${theme.palette.colors[2]} 0% 0% no-repeat padding-box`,
                my: 2,
                mr: 2,
                p: 2.5,
                boxShadow: `inset 0px 0px 6px ${theme.palette.colors[3]}`,
                opacity: 1,
            }}
        >
            <Button
                sx={{
                    color: theme.palette.colors[21],
                    fontSize: "14px",
                    fontWeight: 600,
                }}
                startIcon={<KeyboardBackspaceOutlinedIcon />}
                onClick={() => navigate(-1)}
            >
                Back
            </Button>
            <Box
                sx={{
                    background: `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                    borderRadius: "10px",
                    opacity: 1,
                }}
            >
                <Box
                    sx={{
                        py: 2,
                        px: 2.5,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h4" fontWeight={600}>
                        Inspection Plan
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 3,
                        }}
                    >
                        <IconButton
                            sx={{
                                boxShadow: `0px 1px 6px ${theme.palette.colors[3]}`,
                                borderRadius: "50%",
                                opacity: 1,
                                width: "40px",
                                height: "40px",
                            }}
                        >
                            <SearchIcon sx={{ color: `${theme.palette.colors[8]}` }} />
                        </IconButton>
                        <Box
                            sx={{
                                boxShadow: `0px 1px 6px ${theme.palette.colors[3]}`,
                                borderRadius: "20px",
                                opacity: 1,
                                display: "flex",
                                alignItems: "center",
                                px: 1,
                            }}
                        >
                            <Tooltip title="Upload data as excel">
                                <IconButton>
                                    <ArrowUpwardOutlinedIcon sx={{ color: `${theme.palette.colors[8]}` }} />
                                </IconButton>
                            </Tooltip>
                            <Divider orientation="vertical" sx={{ height: "25px" }} />
                            <Tooltip title="Download data as excel">
                                <IconButton>
                                    <ArrowDownwardOutlinedIcon sx={{ color: `${theme.palette.colors[8]}` }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box
                            sx={{
                                "& .MuiButtonBase-root:hover": {
                                    backgroundColor: theme.palette.colors[11],
                                },
                            }}
                        >
                            <Button
                                onClick={() => navigate("/inspection-plan/add")}
                                variant="contained"
                                startIcon={<AddIcon />}
                                sx={{
                                    backgroundColor: `${theme.palette.colors[11]}`,
                                    color: "#ffffff",
                                    borderRadius: "20px",
                                    width: "150px",
                                    height: "40px",
                                }}
                            >
                                Add New
                            </Button>
                        </Box>
                    </Box>
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
                        columns={columns}
                        rows={inspectionPlans}
                        getRowId={(row) => row.inspectionPlanId}
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
                        disableRowSelectionOnClick
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default InspectionPlan;
