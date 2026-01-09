import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, useTheme, Button, Divider, Tooltip, IconButton } from "@mui/material";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import CustomPagination from "../../global/TablePagination";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CustomCheckbox from "../../global/CustomCheckbox";
import axios from "axios";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import { SnackContext } from "../../global/SnackProvider";

const ChecklistItems = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [checklistItems, setChecklistItems] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    const { snack, setSnack } = useContext(SnackContext);
    const [selectedRows, setSelectedRows] = useState([]);

    const columns = [
        {
            field: "checklist_name",
            headerName: "Checklist Item",
            flex: 1,
        },
        {
            field: "answer_type",
            headerName: "Answer Type",
            flex: 0.4,
        },
        {
            field: "isActive",
            headerName: "Status",
            flex: 0.2,
            renderCell: (params) => (
                <>
                    {params.row?.isActive ? (
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
                    )}
                </>
            ),
        },
        {
            field: "action",
            headerName: "Actions",
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <Button
                        sx={{ color: `${theme.palette.colors[11]}` }}
                        onClick={() => {
                            navigate(`/checklist-management/items/add`, { state: { checklistItemId: params.row?.checklist_id } });
                        }}
                    >
                        Edit
                    </Button>
                );
            },
        },
    ];

    const getChecklistItem = async () => {
        const response = await axios({
            method: "get",
            url: `${import.meta.env.VITE_BASE_URL}/getAllCheckListitems?page=${page - 1}&size=${pageSize}`,
        });
        setChecklistItems(response?.data?.content);
        setPage(response?.data?.number + 1);
        setPageSize(response?.data?.size);
        setTotalPages(response?.data?.totalPages);
        setTotalRecords(response?.data?.totalElements);
        setLoading(false);
    };

    useEffect(() => {
        try {
            setLoading(true);
            getChecklistItem();
        } catch (error) {
            console.log(error);
        }
    }, [page, pageSize]);

    const activateDeactivate = async (action) => {
        try {
            if (selectedRows?.length === 0) {
                setSnack({ open: true, message: "No rows selected", severity: "error" });
                return;
            }
            setLoading(true);
            const response = await axios({
                method: "post",
                url: `${import.meta.env.VITE_BASE_URL}/updateIsActive`,
                data: {
                    inputType: "Checklist_Item",
                    action: action,
                    ids: selectedRows,
                },
            });
            if (response?.data?.status?.toUpperCase() === "SUCCESS") {
                setSnack({ open: true, message: response?.data?.message, severity: "success" });
            } else {
                setSnack({ open: true, message: response?.data?.message, severity: "error" });
            }
            getChecklistItem();
            setSelectedRows([]);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
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
                            Checklist Item
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
                                    onClick={() => navigate("/checklist-management/items/add")}
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
                    {selectedRows.length > 0 && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                gap: 2,
                                px: 2,
                                py: 1.7,
                                mt: 2,
                                mx: 2.5,
                                borderRadius: "10px 10px 0px 0px",
                                backgroundColor: `${theme.palette.colors[18]}`,
                                ".MuiButtonBase-root": {
                                    backgroundColor: "#EBEBEB",
                                    borderRadius: "6px",
                                    color: "#00060A",
                                    px: 3,
                                },
                            }}
                        >
                            <Button
                                size="small"
                                startIcon={<CheckCircleOutlinedIcon sx={{ color: "#03911A" }} />}
                                onClick={() => activateDeactivate("activate")}
                            >
                                Activate
                            </Button>
                            <Button
                                size="small"
                                startIcon={<BlockOutlinedIcon sx={{ color: "#D54B4B" }} />}
                                onClick={() => activateDeactivate("deactivate")}
                            >
                                Deactivate
                            </Button>
                        </Box>
                    )}
                    <Box
                        sx={{
                            height: "400px",
                            pb: 2,
                            pt: selectedRows.length > 0 ? 0 : 2,
                            px: 2.5,
                            ".MuiDataGrid-columnHeader": {
                                backgroundColor: `${theme.palette.colors[18]}`,
                                display: selectedRows.length > 0 ? "none" : "block",
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
                            rows={checklistItems}
                            loading={loading}
                            checkboxSelection
                            getRowId={(row) => row?.checklist_id}
                            rowSelectionModel={selectedRows}
                            onRowSelectionModelChange={(selectionModel) => setSelectedRows(selectionModel)}
                            slots={{
                                baseCheckbox: CustomCheckbox,
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
        </>
    );
};

export default ChecklistItems;
