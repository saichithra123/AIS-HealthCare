import { Box, Button, Divider, Grid2, IconButton, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import CustomPagination from "../../global/TablePagination";
import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons } from "@mui/x-data-grid";
import AddActionsOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CustomCheckbox from "../../global/CustomCheckbox";
import axios from "axios";
import "../adminStyles.css";
import { SnackContext } from "../../global/SnackProvider";
import Loader from "../../global/Loader";
import ReactFormIO from "../formio/ReactFormIO";

const AddPreInspectionChecklist = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const preInspectionChecklistId = location.state?.preInspectionChecklistId;
    const [preInspectionChecklistName, setPreInspectionChecklistName] = useState("");
    const [inspectionTypes, setInspectionTypes] = useState([]);
    const [selectedInspectionType, setSelectedInspectionType] = useState("");
    const [requirements, setRequirements] = useState([]);
    const [selectedRequirements, setSelectedRequirements] = useState([]);
    const requirementsRef = useRef([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [isSubmitPreInspection, setIsSubmitPreInspection] = useState(false);
    const { snack, setSnack } = useContext(SnackContext);
    const [formName, setFormName] = useState("");
    const [schema, setSchema] = useState({
        display: "form",
        components: [],
    });

    const columns = [
        {
            field: "requirement",
            headerName: "Requirements",
            flex: 1,
            editable: true,
            renderEditCell: (params) => <CustomEditRequirementComponent {...params} />,
        },
        {
            field: "action",
            type: "actions",
            headerName: "Actions",
            flex: 0.2,
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<CloseIcon sx={{ color: "#d54b4b", fontWeight: "bold" }} />}
                            label="Cancel"
                            sx={{
                                color: "primary.main",
                            }}
                            onClick={handleCancelClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CheckIcon sx={{ color: "#03911a", fontWeight: "bold" }} />}
                            label="Save"
                            className="textPrimary"
                            onClick={handleSaveClick(id)}
                            color="inherit"
                        />,
                    ];
                }
                return [
                    <Button sx={{ color: `${theme.palette.colors[11]}` }} onClick={() => handleEditClick(id)}>
                        Edit
                    </Button>,
                ];
            },
        },
    ];

    const CustomEditRequirementComponent = (props) => {
        const { id, field, value, api } = props;
        const handleChange = (event) => {
            api.setEditCellValue({ id, field, value: event.target.value });
        };

        return (
            <TextField
                size="small"
                sx={{ mt: 0.5, ml: 0.5 }}
                fullWidth
                className="tableFields"
                value={value}
                onChange={handleChange}
            />
        );
    };

    const EditToolbar = React.memo((props) => {
        const { setRequirements, setRowModesModel } = props;

        const handleClick = () => {
            const id = requirements?.reduce((max, obj) => Math.max(max, obj.id), 0);
            setRequirements((prev) => [
                {
                    id: id + 1,
                    requirement: "",
                    isNew: true,
                },
                ...prev,
            ]);
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [id + 1]: { mode: GridRowModes.Edit, fieldToFocus: "requirement" },
            }));
        };

        return (
            <GridToolbarContainer>
                <Box className="addButtonContainer" mb={1} onClick={handleClick}>
                    <AddActionsOutlinedIcon sx={{ mr: 1 }} />
                    <Typography className="typographyFontWeight">Add Requirement</Typography>
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
        setRequirements(requirements.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleEditClick = (id) => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
        setRequirements(requirements.filter((row) => row?.id !== id));
    };

    useEffect(() => {
        const getInspectionTypes = async () => {
            const response = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/getAllInspectionTypes`,
            });
            setInspectionTypes(response?.data);
        };
        getInspectionTypes();
    }, []);

    useEffect(() => {
        const getPreInspectionDetails = async () => {
            const response = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/api/pre-inspection-checklist/${preInspectionChecklistId}`,
            });
            setPreInspectionChecklistName(response?.data?.name);
            setSelectedInspectionType(response?.data?.inspectionType?.ins_type_id);

            response?.data?.requirements?.map((req) => {
                const obj = {
                    id: req?.id,
                    requirement: req?.name,
                };
                setRequirements((prev) => [...prev, obj]);
            });
            const requiremntIds = response?.data?.requirements?.map((requirement) => requirement?.id);
            setSelectedRequirements(requiremntIds);
            requirementsRef.current = response?.data?.requirements;
        };
        if (preInspectionChecklistId) {
            getPreInspectionDetails();
        }
    }, [preInspectionChecklistId]);

    const savePreInspectionChecklist = async () => {
        setIsSubmitPreInspection(true);
        try {
            const reqRefIds = requirementsRef.current?.map((req) => req?.id);
            let requirementNames = [];
            let existingRequirements = [];
            if (preInspectionChecklistId) {
                existingRequirements = reqRefIds?.filter((id) => selectedRequirements?.includes(id));
                const newIds = selectedRequirements?.filter((id) => !reqRefIds?.includes(id));
                requirements?.map((req) => {
                    if (newIds?.includes(req?.id)) {
                        requirementNames.push(req?.requirement);
                    }
                });
            } else {
                const newRequirements = requirements?.filter((requirement) => selectedRequirements?.includes(requirement?.id));
                requirementNames = newRequirements?.map((requirement) => requirement?.requirement);
            }
            const response = await axios({
                method: "post",
                url: `${import.meta.env.VITE_BASE_URL}/addEditPreInspectionChecklist`,
                data: {
                    checklistId: preInspectionChecklistId,
                    name: preInspectionChecklistName,
                    insTypeId: selectedInspectionType,
                    requirementNames: requirementNames,
                    existingRequirement: existingRequirements,
                    action: preInspectionChecklistId ? "edit" : "add",
                },
            });
            if (response?.data?.status?.toUpperCase() === "SUCCESS") {
                setSnack({ open: true, message: response?.data?.message, severity: "success" });
                navigate(`/checklist-management/pre-inspection-checklist`);
            } else {
                setSnack({ open: true, message: response?.data?.message, severity: "error" });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitPreInspection(false);
        }
    };

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
                        {preInspectionChecklistId ? "Edit" : "Add"} Pre Inspection Checklist
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
                    {isSubmitPreInspection && <Loader />}
                    <Grid2 container spacing={3} className="inputFields">
                        {/* Form name for integrated Form.io form */}
                        <Grid2 size={4}>
                            <Typography>
                                Form Name<span style={{ color: "red" }}>*</span>
                            </Typography>
                            <TextField size="small" fullWidth value={formName} onChange={(e) => setFormName(e.target.value)} />
                        </Grid2>
                    </Grid2>
                    <Grid2 container spacing={3} className="inputFields">
                        <Grid2 size={4}>
                            <Typography>
                                Pre Inspection Checklist Name<span style={{ color: "red" }}>*</span>
                            </Typography>
                            <TextField
                                size="small"
                                fullWidth
                                value={preInspectionChecklistName}
                                onChange={(e) => setPreInspectionChecklistName(e.target.value)}
                            />
                        </Grid2>
                        <Grid2 size={4}>
                            <Typography>
                                Inspection Type<span style={{ color: "red" }}>*</span>
                            </Typography>
                            <Select
                                fullWidth
                                sx={{
                                    height: "37px",
                                }}
                                value={selectedInspectionType}
                                onChange={(e) => setSelectedInspectionType(e.target.value)}
                            >
                                {inspectionTypes?.map((insType) => {
                                    return (
                                        <MenuItem key={insType?.id} value={insType?.id}>
                                            {insType?.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </Grid2>
                    </Grid2>
                    <Divider sx={{ my: 2 }} />
                    <Typography sx={{ fontSize: "14px", color: theme.palette.colors[21], mb: 1 }}>Requirements</Typography>
                    <Box
                        sx={{
                            py: 2,
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
                            rows={requirements}
                            checkboxSelection
                            hideFooter
                            slots={{
                                toolbar: EditToolbar,
                                baseCheckbox: CustomCheckbox,
                                // pagination:() => <CustomPagination pageCount={5} />,
                            }}
                            rowSelectionModel={selectedRequirements}
                            onRowSelectionModelChange={(selectionModel) => setSelectedRequirements(selectionModel)}
                            disableRowSelectionOnClick
                            slotProps={{
                                toolbar: { setRequirements, setRowModesModel },
                            }}
                            editMode="row"
                            rowModesModel={rowModesModel}
                            onRowModesModelChange={handleRowModesModelChange}
                            onRowEditStop={handleRowEditStop}
                            processRowUpdate={processRowUpdate}
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
                        onClick={savePreInspectionChecklist}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default AddPreInspectionChecklist;
