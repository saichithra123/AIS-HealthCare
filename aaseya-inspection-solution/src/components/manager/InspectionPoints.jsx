import React, { useEffect, useState } from "react";
import { Box, FormControl, Select, Typography, useTheme, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CustomPagination from "../global/TablePagination";
import CustomCheckbox from "../global/CustomCheckbox";
import "../cases/newCase.css";
import axios from "axios";

const InspectionPoints = React.memo(
    ({
        entities,
        setEntities,
        selectedEntities,
        setSelectedEntities,
        entityPage,
        setEntityPage,
        entityPageSize,
        setEntityPageSize,
        totalEntityPages,
        totalEntityRecords,
        loadingEntities,
    }) => {
        const theme = useTheme();
        const [controlTypes, setControlTypes] = useState([]);

        useEffect(() => {
            entities?.map((entity) => {
                if (selectedEntities?.includes(entity?.id)) {
                    if (entity?.selectedControlType && !entity?.inspectionTypesforControlType) {
                        getInspectionType(entity?.selectedControlType, entity.id);
                    }
                    if (entity?.selectedInspectionType && !entity?.templates) {
                        getTemplates(entity?.selectedInspectionType, entity.id);
                    }
                }
            });
        }, [selectedEntities]);

        const columns = [
            {
                field: "entity_type",
                headerName: "Entity Type",
                flex: 0.5,
            },
            {
                field: "name",
                headerName: "Entity Name",
                flex: 0.8,
            },
            {
                field: "controType",
                headerName: "Control Type",
                flex: 1,
                renderCell: (params) => {
                    return (
                        <>
                            <FormControl fullWidth className="newCaseFields" sx={{ mt: 0.5, width: "200px" }}>
                                <Select
                                    value={params.row.selectedControlType ?? ""}
                                    fullWidth
                                    disabled={!selectedEntities?.includes(params.row.id)}
                                    onChange={(e) => {
                                        getInspectionType(e.target.value, params.row.id);
                                        return setEntities((prevRows) =>
                                            prevRows.map((row) =>
                                                row.id === params.row.id ? { ...row, selectedControlType: e.target.value } : row
                                            )
                                        );
                                    }}
                                >
                                    {controlTypes?.map((controlType) => {
                                        return (
                                            <MenuItem key={controlType?.controlTypeId} value={controlType?.controlTypeId}>
                                                {controlType?.controlTypeName}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </>
                    );
                },
            },
            {
                field: "inspectionType",
                headerName: "Inspection Type",
                flex: 1,
                renderCell: (params) => {
                    return (
                        <>
                            <FormControl fullWidth className="newCaseFields" sx={{ mt: 0.5, width: "200px" }}>
                                <Select
                                    value={params.row.selectedInspectionType ?? ""}
                                    fullWidth
                                    disabled={!selectedEntities?.includes(params.row.id)}
                                    onChange={(e) => {
                                        getTemplates(e.target.value, params.row.id);
                                        return setEntities((prevRows) =>
                                            prevRows.map((row) =>
                                                row.id === params.row.id
                                                    ? { ...row, selectedInspectionType: e.target.value }
                                                    : row
                                            )
                                        );
                                    }}
                                >
                                    {params.row?.inspectionTypesforControlType?.map((inspectionType) => {
                                        return (
                                            <MenuItem key={inspectionType?.name} value={inspectionType?.name}>
                                                {inspectionType?.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </>
                    );
                },
            },
            {
                field: "template",
                headerName: "Template",
                flex: 1,
                renderCell: (params) => {
                    return (
                        <>
                            <FormControl fullWidth className="newCaseFields" sx={{ mt: 0.5, width: "200px" }}>
                                <Select
                                    value={params.row.selectedTemplate ?? ""}
                                    fullWidth
                                    disabled={!selectedEntities?.includes(params.row.id)}
                                    onChange={(e) => {
                                        return setEntities((prevRows) =>
                                            prevRows.map((row) =>
                                                row.id === params.row.id ? { ...row, selectedTemplate: e.target.value } : row
                                            )
                                        );
                                    }}
                                >
                                    {params.row?.templates?.map((template) => {
                                        return (
                                            <MenuItem key={template?.template_id} value={template?.template_id}>
                                                {template?.template_name}: {template?.version}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </>
                    );
                },
            },
        ];

        useEffect(() => {
            const getControlTypes = async () => {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/getAllControlTypesForCase`);
                setControlTypes(response?.data);
            };
            getControlTypes();
        }, []);

        const getInspectionType = async (controlType, id) => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/getAllInspectionTypes/${controlType}`);
            setEntities((prevRows) =>
                prevRows.map((row) => (row.id === id ? { ...row, inspectionTypesforControlType: response?.data } : row))
            );
        };

        const getTemplates = async (inspectionType, id) => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/getTemplate/${inspectionType}`);
            setEntities((prevRows) => prevRows.map((row) => (row.id === id ? { ...row, templates: response?.data } : row)));
        };

        return (
            <>
                <Typography sx={{ color: theme.palette.colors[21], fontSize: "14px", mt: 2 }}>
                    Choose Inspection Points
                </Typography>
                <Box
                    sx={{
                        pt: 1,
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
                        rows={entities}
                        loading={loadingEntities}
                        checkboxSelection
                        rowSelectionModel={selectedEntities}
                        onRowSelectionModelChange={(selectionModel) => setSelectedEntities(selectionModel)}
                        disableRowSelectionOnClick
                        slots={{
                            baseCheckbox: CustomCheckbox,
                            pagination: () => (
                                <CustomPagination
                                    page={entityPage}
                                    setPage={setEntityPage}
                                    pageSize={entityPageSize}
                                    setPageSize={setEntityPageSize}
                                    totalPages={totalEntityPages}
                                    totalRecords={totalEntityRecords}
                                />
                            ),
                        }}
                        getRowId={(row) => row.id}
                    />
                </Box>
            </>
        );
    }
);

export default InspectionPoints;
