import { Box, Button, Divider, Grid2, TextField, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { DataGrid } from "@mui/x-data-grid";
import AddActionsOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import "../adminStyles.css";

const AddValueTable = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [tableName, setTableName] = useState("");
    const [isGenerateTable, setIsGenerateTable] = useState(false);

    const columns = [
        {
            field: "columnName",
            headerName: "Column Name",
            flex: 1,
        },
        {
            field: "type",
            headerName: "Type",
            flex: 1,
        },
        {
            field: "action",
            headerName: "Actions",
            flex: 0.3,
        },
    ];

    const dataColumns = [
        {
            field: "columnName",
            headerName: "Column Name",
            flex: 1,
        },
        {
            field: "type",
            headerName: "Type",
            flex: 1,
        },
        {
            field: "action",
            headerName: "Actions",
            flex: 0.3,
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
                <Box sx={{ py: 2, px: 2.5 }}>
                    <Typography variant="h4" fontWeight={600}>
                        Add Value Table
                    </Typography>
                </Box>
                <Divider />
                <Box
                    sx={{
                        py: 2,
                        px: 2.5,
                        "& .MuiTypography-root": {
                            fontSize: "12px",
                            color: theme.palette.colors[21],
                        },
                    }}
                >
                    <Grid2 container spacing={3} className="inputFields">
                        <Grid2 size={4}>
                            <Typography>
                                Table Name<span style={{ color: "red" }}>*</span>
                            </Typography>
                            <TextField size="small" fullWidth value={tableName} onChange={(e) => setTableName(e.target.value)} />
                        </Grid2>
                    </Grid2>
                    <Divider sx={{ my: 2 }} />
                    <Typography sx={{ fontSize: "14px !important", color: theme.palette.colors[21], mb: 1 }}>
                        Table Columns
                    </Typography>
                    <Box
                        className="addButtonContainer"
                        onClick={() => {
                            // navigate(`/checklist-management/category/add`)
                        }}
                    >
                        <AddActionsOutlinedIcon sx={{ mr: 1 }} />
                        <Typography className="typographyFontWeight">Add Columns</Typography>
                    </Box>
                    <Box
                        sx={{
                            pt: 1,
                            pb: 2,
                            height: "300px",
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
                        }}
                    >
                        <DataGrid columns={columns} rows={[]} hideFooter />
                    </Box>
                    {!isGenerateTable && (
                        <Button
                            mt={2}
                            sx={{
                                backgroundColor: theme.palette.colors[11],
                                textTransform: "none",
                                borderRadius: "20px",
                                height: "40px",
                                px: 5,
                                display: "flex",
                                marginLeft: "auto",
                                "&:hover": {
                                    backgroundColor: theme.palette.colors[11],
                                },
                            }}
                            onClick={() => {
                                setIsGenerateTable(true);
                            }}
                        >
                            Generate Table
                        </Button>
                    )}
                    {isGenerateTable && (
                        <>
                            <Divider sx={{ my: 2 }} />
                            <Typography sx={{ fontSize: "14px !important", color: theme.palette.colors[21], mb: 1 }}>
                                Data
                            </Typography>
                            <Box
                                className="addButtonContainer"
                                onClick={() => {
                                    // navigate(`/checklist-management/category/add`)
                                }}
                            >
                                <AddActionsOutlinedIcon sx={{ mr: 1 }} />
                                <Typography className="typographyFontWeight">Add Data</Typography>
                            </Box>
                            <Box
                                sx={{
                                    pt: 1,
                                    pb: 2,
                                    height: "300px",
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
                                }}
                            >
                                <DataGrid columns={dataColumns} rows={[]} hideFooter />
                            </Box>
                            <Button
                                mt={2}
                                sx={{
                                    backgroundColor: theme.palette.colors[11],
                                    textTransform: "none",
                                    borderRadius: "20px",
                                    width: "100px",
                                    height: "40px",
                                    display: "flex",
                                    marginLeft: "auto",
                                    "&:hover": {
                                        backgroundColor: theme.palette.colors[11],
                                    },
                                }}
                                onClick={() => {
                                    setIsGenerateTable(true);
                                }}
                            >
                                Submit
                            </Button>
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default AddValueTable;
