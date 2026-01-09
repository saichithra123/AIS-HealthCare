import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, useTheme, Grid2, TextField, Divider, IconButton, Chip } from "@mui/material";
import { InputAdornment } from "@mui/material";
import AddActionsOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import CustomCheckbox from "../../global/CustomCheckbox";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons } from "@mui/x-data-grid";
import CustomPagination from "../../global/TablePagination";
import "../adminStyles.css";

const PrimaryFields = ({
    inspectionType,
    primarydetails,
    setPrimaryDetails,
    skills,
    setSkills,
    selectedSkills,
    setSelectedSkills,
    skillPage,
    setSkillPage,
    skillPageSize,
    setSkillPageSize,
    totalSkillPages,
    totalSkillRecords,
    loadingSkills,
}) => {
    const theme = useTheme();
    const [rowModesModel, setRowModesModel] = useState({});

    const columns = [
        {
            field: "skill",
            headerName: "Skills",
            flex: 0.5,
            colSpan: (value, row) => (row?.isNew ? 2 : 1),
            editable: true,
            renderEditCell: (params) => <CustomEditSkillComponent {...params} />,
        },
        {
            field: "inspectiontype",
            headerName: "Inspection Type",
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        {params.row?.inspectiontype?.map((value) => (
                            <Chip sx={{ borderRadius: "4px", mr: 1, height: "26px" }} key={value} label={value} />
                        ))}
                    </>
                );
            },
        },
    ];

    const CustomEditSkillComponent = (props) => {
        const { id, field, value, api } = props;
        const handleChange = (event) => {
            api.setEditCellValue({ id, field, value: event.target.value });
        };

        return (
            <Box display="flex" pt={0.5} sx={{ width: "100%" }}>
                <TextField
                    size="small"
                    sx={{ ml: 0.5 }}
                    fullWidth
                    className="tableFields"
                    value={value}
                    onChange={handleChange}
                />
                <GridActionsCellItem
                    icon={<CloseIcon sx={{ color: "#d54b4b", fontWeight: "bold" }} />}
                    label="Cancel"
                    sx={{
                        color: "primary.main",
                    }}
                    onClick={handleCancelClick(id)}
                />
                <GridActionsCellItem
                    icon={<CheckIcon sx={{ color: "#03911a", fontWeight: "bold" }} />}
                    label="Save"
                    className="textPrimary"
                    onClick={handleSaveClick(id)}
                    color="inherit"
                />
            </Box>
        );
    };

    const EditToolbar = React.memo((props) => {
        const { setSkills, setRowModesModel } = props;

        const handleClick = () => {
            const id = skills?.reduce((max, obj) => Math.max(max, obj.skillId), 0);
            setSkills((prev) => [
                {
                    skillId: id + 1,
                    skill: "",
                    inspectiontype: [inspectionType],
                    isNew: true,
                },
                ...prev,
            ]);
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [id + 1]: { mode: GridRowModes.Edit, fieldToFocus: "correctiveAction" },
            }));
        };

        return (
            <GridToolbarContainer>
                <Box className="addButtonContainer" mb={1} onClick={handleClick}>
                    <AddActionsOutlinedIcon sx={{ mr: 1 }} />
                    <Typography className="typographyFontWeight">Add Skills</Typography>
                </Box>
            </GridToolbarContainer>
        );
    });

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setSkills(skills.map((row) => (row.skillId === newRow.skillId ? updatedRow : row)));
        return updatedRow;
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
        setSkills(skills.filter((row) => row?.id !== id));
    };

    const formatTime = (value) => {
        const cleanValue = value.replace(/[^0-9]/g, "");
        const parts = [];
        if (cleanValue.length > 0) parts.push(cleanValue.slice(0, 2));
        if (cleanValue.length > 2) parts.push(cleanValue.slice(2, 4));
        return parts.join(":");
    };

    return (
        <Box
            sx={{
                mt: 3,
                "& .MuiTypography-root": {
                    fontSize: "12px",
                    color: theme.palette.colors[21],
                },
            }}
        >
            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
                    <Typography>Efforts (for small size)</Typography>
                    <TextField
                        value={primarydetails?.smallEffort}
                        onChange={(e) =>
                            setPrimaryDetails((prev) => ({
                                ...prev,
                                smallEffort: formatTime(e.target.value),
                            }))
                        }
                        fullWidth
                        size="small"
                        type="text"
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end" sx={{ color: theme.palette.colors[21] }}>
                                        hh:mm
                                    </InputAdornment>
                                ),
                            },
                        }}
                        className="inputFields"
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
                    <Typography>Efforts (for medium size)</Typography>
                    <TextField
                        value={primarydetails?.mediumEffort}
                        onChange={(e) =>
                            setPrimaryDetails((prev) => ({
                                ...prev,
                                mediumEffort: formatTime(e.target.value),
                            }))
                        }
                        fullWidth
                        size="small"
                        type="text"
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end" sx={{ color: theme.palette.colors[21] }}>
                                        hh:mm
                                    </InputAdornment>
                                ),
                            },
                        }}
                        className="inputFields"
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
                    <Typography>Efforts (for large size)</Typography>
                    <TextField
                        value={primarydetails?.largeEffort}
                        onChange={(e) =>
                            setPrimaryDetails((prev) => ({
                                ...prev,
                                largeEffort: formatTime(e.target.value),
                            }))
                        }
                        fullWidth
                        size="small"
                        type="text"
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end" sx={{ color: theme.palette.colors[21] }}>
                                        hh:mm
                                    </InputAdornment>
                                ),
                            },
                        }}
                        className="inputFields"
                    />
                </Grid2>
            </Grid2>
            <Divider sx={{ my: 3 }} />
            <Typography sx={{ fontSize: "14px", color: theme.palette.colors[21], mb: 1 }}>Skills</Typography>
            <Box
                sx={{
                    pt: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                }}
            >
                <Box
                    sx={{
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
                        rows={skills}
                        loading={loadingSkills}
                        getRowId={(row) => row?.skillId}
                        slots={{
                            baseCheckbox: CustomCheckbox,
                            pagination: () => (
                                <CustomPagination
                                    page={skillPage}
                                    setPage={setSkillPage}
                                    pageSize={skillPageSize}
                                    setPageSize={setSkillPageSize}
                                    totalPages={totalSkillPages}
                                    totalRecords={totalSkillRecords}
                                />
                            ),
                            toolbar: EditToolbar,
                        }}
                        rowSelectionModel={selectedSkills}
                        onRowSelectionModelChange={(selectionModel) => setSelectedSkills(selectionModel)}
                        disableRowSelectionOnClick
                        checkboxSelection
                        slotProps={{
                            toolbar: { setSkills, setRowModesModel },
                        }}
                        editMode="row"
                        rowModesModel={rowModesModel}
                        onRowModesModelChange={handleRowModesModelChange}
                        onRowEditStop={handleRowEditStop}
                        processRowUpdate={processRowUpdate}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default PrimaryFields