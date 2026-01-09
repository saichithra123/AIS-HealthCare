import { Box, Button, Divider, Grid2, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import AddActionsOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import { DataGrid } from "@mui/x-data-grid";
import CustomPagination from "../../global/TablePagination";
import CustomCheckbox from "../../global/CustomCheckbox";
import "../adminStyles.css";

const AddAnswerOption = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [controlType, setControlType] = useState("");
    const [fieldType, setFieldType] = useState("");

    const columns = [
        {
            field: "tableName",
            headerName: "Table Name",
            flex: 1,
        },
        {
            field: "returnParameter",
            headerName: "Return Parameter",
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
                        Add Answer Option
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
                                Name<span style={{ color: "red" }}>*</span>
                            </Typography>
                            <TextField size="small" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
                        </Grid2>
                        <Grid2 size={4}>
                            <Typography>
                                Control Type<span style={{ color: "red" }}>*</span>
                            </Typography>
                            <Select
                                fullWidth
                                sx={{
                                    height: "37px",
                                }}
                                value={controlType}
                                onChange={(e) => setControlType(e.target.value)}
                            >
                                <MenuItem value="dropdown">Drop Down</MenuItem>
                                <MenuItem value="input">Input Field</MenuItem>
                                <MenuItem value="text">Text Box</MenuItem>
                                <MenuItem value="date">Date Selector</MenuItem>
                                <MenuItem value="range">Range</MenuItem>
                                <MenuItem value="multiselect">Multi Select</MenuItem>
                            </Select>
                        </Grid2>
                        <Grid2 size={4}>
                            <Typography>
                                Field Type<span style={{ color: "red" }}>*</span>
                            </Typography>
                            <Select
                                fullWidth
                                sx={{
                                    height: "37px",
                                }}
                                value={fieldType}
                                onChange={(e) => setFieldType(e.target.value)}
                            >
                                <MenuItem value="integer">Integer</MenuItem>
                                <MenuItem value="text">Text</MenuItem>
                                <MenuItem value="date">Date</MenuItem>
                            </Select>
                        </Grid2>
                    </Grid2>
                    <Divider sx={{ my: 2 }} />
                    <Typography sx={{ fontSize: "14px", color: theme.palette.colors[21], mb: 1 }}>Value Table</Typography>
                    <Box
                        className="addButtonContainer"
                        onClick={() => {
                            navigate(`/configurations/value-table/add`);
                        }}
                    >
                        <AddActionsOutlinedIcon sx={{ mr: 1 }} />
                        <Typography className="typographyFontWeight">Add Table</Typography>
                    </Box>
                    <Box
                        sx={{
                            pt: 1,
                            pb: 2,
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
                            rows={[]}
                            checkboxSelection
                            slots={{
                                baseCheckbox: CustomCheckbox,
                                pagination: () => <CustomPagination pageCount={5} />,
                            }}
                        />
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
                        onClick={() => {}}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default AddAnswerOption;
