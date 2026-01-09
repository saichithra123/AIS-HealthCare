import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Box,
    Typography,
    useTheme,
    Button,
    Grid2,
    TextField,
    Divider,
    IconButton,
    MenuItem,
    Select,
    FormControl,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import AddActionsOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons } from "@mui/x-data-grid";
import CustomPagination from "../../global/TablePagination";
import "../adminStyles.css";
import { SnackContext } from "../../global/SnackProvider";
import Loader from "../../global/Loader";

const AddChecklist = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const checklistItemId = location.state?.checklistItemId;
    const [checklistItem, setChecklistItem] = useState({
        checklistName: "",
        severity: "",
        weightage: "",
        answerType: "",
        predefinedAnswerType: "",
    });
    const [correctiveActions, setCorrectiveActions] = useState([]);
    const correctiveActionsRef = useRef([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [isSubmitChecklistItem, setIsSubmitChecklistItem] = useState(false);
    const { snack, setSnack } = useContext(SnackContext);

    const columns = [
        {
            field: "option",
            headerName: "Answer Options",
            flex: 1,
        },
        {
            field: "table",
            headerName: "Table",
            flex: 1,
        },
    ];

    const actionColumns = [
        {
            field: "correctiveAction",
            headerName: "Corrective Actions",
            flex: 1,
            editable: true,
            renderEditCell: (params) => <CustomEditActionComponent {...params} />,
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

    const CustomEditActionComponent = (props) => {
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
        const { setCorrectiveActions, setRowModesModel } = props;

        const handleClick = () => {
            const id = correctiveActions?.reduce((max, obj) => Math.max(max, obj.id), 0);
            setCorrectiveActions((prev) => [
                {
                    id: id + 1,
                    correctiveAction: "",
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
                    <Typography className="typographyFontWeight">Add Corrective Actions</Typography>
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
        setCorrectiveActions(correctiveActions.map((row) => (row.id === newRow.id ? updatedRow : row)));
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
        setCorrectiveActions(correctiveActions.filter((row) => row?.id !== id));
    };

    useEffect(() => {
        const getChecklistDetails = async () => {
            const response = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/checklistItemsBy/${checklistItemId}`,
            });
            setChecklistItem({
                checklistName: response?.data?.checklist_name,
                severity: response?.data?.severity,
                weightage: response?.data?.weightage,
                answerType: response?.data?.answer_type,
                predefinedAnswerType: response?.data?.pre_defined_answer_type,
            });
            response?.data?.correctiveactions?.map((correctiveAction) => {
                const obj = {
                    id: correctiveAction?.corrective_action_id,
                    correctiveAction: correctiveAction?.corrective_action_name,
                };
                setCorrectiveActions((prev) => [obj, ...prev]);
            });
            correctiveActionsRef.current = response?.data?.correctiveactions;
        };
        if (checklistItemId) {
            getChecklistDetails();
        }
    }, [checklistItemId]);

    const saveChecklistItem = async () => {
        setIsSubmitChecklistItem(true);
        try {
            const correctiveActionsList = correctiveActions?.map((action) => action?.correctiveAction);
            const response = await axios({
                method: "post",
                url: `${import.meta.env.VITE_BASE_URL}/addCheckListItems`,
                data: {
                    checklist_name: checklistItem?.checklistName,
                    severity: checklistItem?.severity,
                    weightage: checklistItem?.weightage,
                    answer_type: checklistItem?.answerType,
                    pre_defined_answer_type: checklistItem?.predefinedAnswerType,
                    isActive: true,
                    selected_answer: "",
                    selected_corrective_action: correctiveActionsList,
                },
            });
            if (response?.data?.status?.toUpperCase() === "SUCCESS") {
                setSnack({ open: true, message: response?.data?.message, severity: "success" });
                navigate(`/checklist-management/items`);
            } else {
                setSnack({ open: true, message: response?.data?.message, severity: "error" });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitChecklistItem(false);
        }
    };

    const updateChecklistItem = async () => {
        setIsSubmitChecklistItem(true);
        const correctiveActionIds = correctiveActions?.map((correctiveAction) => correctiveAction?.id);
        const existingCorrectiveActions = correctiveActionsRef.current?.filter((correctiveAction) =>
            correctiveActionIds?.includes(correctiveAction?.corrective_action_id)
        );
        const existingCorrectiveActionIds = existingCorrectiveActions?.map((action) => action?.corrective_action_id);

        const ids = correctiveActionsRef.current?.map((action) => action?.corrective_action_id);
        const newCorrectiveActionsIds = correctiveActionIds?.filter((id) => !ids?.includes(id));
        let newCorrectiveActions = [];
        correctiveActions?.map((action) => {
            if (newCorrectiveActionsIds?.includes(action?.id)) {
                newCorrectiveActions.push(action?.correctiveAction);
            }
        });

        try {
            const response = await axios({
                method: "post",
                url: `${import.meta.env.VITE_BASE_URL}/updateChecklistItem/${checklistItemId}`,
                data: {
                    checklistName: checklistItem?.checklistName,
                    severity: checklistItem?.severity,
                    weightage: checklistItem?.weightage,
                    answerType: checklistItem?.answerType,
                    predefinedAnswerTypes: checklistItem?.predefinedAnswerType,
                    correctiveActions: existingCorrectiveActionIds,
                    newCorrectiveActions: newCorrectiveActions,
                },
            });
            if (response?.data?.status?.toUpperCase() === "SUCCESS") {
                setSnack({ open: true, message: response?.data?.message, severity: "success" });
                navigate(`/checklist-management/items`);
            } else {
                setSnack({ open: true, message: response?.data?.message, severity: "error" });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitChecklistItem(false);
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
                    <Box sx={{ py: 2, px: 2.5 }}>
                        <Typography variant="h4" fontWeight={600}>
                            {checklistItemId ? "Edit" : "Add"} Checklist Item
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
                        {isSubmitChecklistItem && <Loader />}
                        <Grid2 container spacing={3}>
                            <Grid2 size={4}>
                                <Typography>
                                    Checklist Name<span style={{ color: "red" }}>*</span>
                                </Typography>
                                <TextField
                                    size="small"
                                    className="inputFields"
                                    fullWidth
                                    value={checklistItem?.checklistName}
                                    onChange={(e) =>
                                        setChecklistItem({
                                            ...checklistItem,
                                            checklistName: e.target.value,
                                        })
                                    }
                                />
                            </Grid2>
                            <Grid2 size={4}>
                                <Typography>
                                    Severity<span style={{ color: "red" }}>*</span>
                                </Typography>
                                <FormControl fullWidth className="inputFields">
                                    <Select
                                        value={checklistItem?.severity}
                                        onChange={(e) =>
                                            setChecklistItem({
                                                ...checklistItem,
                                                severity: e.target.value,
                                            })
                                        }
                                        sx={{
                                            "& .MuiSelect-select": {
                                                padding: "9px 0 9px 20px",
                                            },
                                        }}
                                    >
                                        <MenuItem value="High">High</MenuItem>
                                        <MenuItem value="Medium">Medium</MenuItem>
                                        <MenuItem value="Low">Low</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid2>
                            <Grid2 size={4}>
                                <Typography>
                                    Weightage<span style={{ color: "red" }}>*</span>
                                </Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    className="inputFields"
                                    value={checklistItem?.weightage}
                                    onChange={(e) =>
                                        setChecklistItem({
                                            ...checklistItem,
                                            weightage: e.target.value,
                                        })
                                    }
                                    sx={{ height: "38px" }}
                                />
                            </Grid2>
                            <Grid2 size={4}>
                                <Typography>
                                    Answer Type<span style={{ color: "red" }}>*</span>
                                </Typography>
                                <FormControl fullWidth className="inputFields">
                                    <Select
                                        labelId="selection-type-label"
                                        value={checklistItem?.answerType}
                                        onChange={(e) =>
                                            setChecklistItem({
                                                ...checklistItem,
                                                answerType: e.target.value,
                                            })
                                        }
                                        sx={{
                                            "& .MuiSelect-select": {
                                                padding: "9px 0 9px 20px",
                                            },
                                        }}
                                    >
                                        <MenuItem value="Predefined">Predefined</MenuItem>
                                        <MenuItem value="Custom">Custom</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid2>
                            {checklistItem?.answerType === "Predefined" && (
                                <Grid2 size={4}>
                                    <Typography variant="body2" ml={1}>
                                        Pre-defined Answer Types
                                    </Typography>
                                    <FormControl fullWidth className="inputFields">
                                        <Select
                                            labelId="predefined-value-label"
                                            value={checklistItem?.predefinedAnswerType}
                                            onChange={(e) =>
                                                setChecklistItem({
                                                    ...checklistItem,
                                                    predefinedAnswerType: e.target.value,
                                                })
                                            }
                                            sx={{
                                                "& .MuiSelect-select": {
                                                    padding: "9px 0 9px 20px",
                                                },
                                            }}
                                        >
                                            <MenuItem value="Yes/No/NA">Yes/ No/ NA</MenuItem>
                                            <MenuItem value="Compliant/Non-Compliant/NA">Compliant/ Non-Compliant/ NA</MenuItem>
                                            <MenuItem value="Good/Fair/Poor/NA">Good/ Fair/ Poor/ NA</MenuItem>
                                            <MenuItem value="Range 1-5">Range 1-5</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid2>
                            )}
                        </Grid2>
                        <Divider sx={{ my: 2 }} />
                        {checklistItem?.answerType === "Custom" && (
                            <>
                                <Box>
                                    <Typography sx={{ fontSize: "14px", color: theme.palette.colors[21], mb: 1 }}>
                                        Answer Options
                                    </Typography>
                                    <Box
                                        sx={{
                                            py: 2,
                                            // px: 2.5,
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 1,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                maxHeight: "400px",
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
                                                ".MuiDataGrid-selectedRowCount": {
                                                    display: "none",
                                                },
                                            }}
                                        >
                                            <DataGrid
                                                columns={columns}
                                                rows={[]}
                                                checkboxSelection
                                                hideFooter
                                                autoHeight
                                                disableRowSelectionOnClick
                                            />
                                        </Box>
                                        <CustomPagination pageCount={5} />
                                    </Box>
                                </Box>
                                <Divider sx={{ my: 2 }} />
                            </>
                        )}
                        <Typography sx={{ fontSize: "14px", color: theme.palette.colors[21], mb: 1 }}>
                            Corrective Actions
                        </Typography>
                        <Box
                            sx={{
                                py: 2,
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
                                }}
                            >
                                <DataGrid
                                    columns={actionColumns}
                                    rows={correctiveActions}
                                    getRowId={(row) => row?.id}
                                    hideFooter
                                    slots={{ toolbar: EditToolbar }}
                                    slotProps={{
                                        toolbar: { setCorrectiveActions, setRowModesModel },
                                    }}
                                    editMode="row"
                                    rowModesModel={rowModesModel}
                                    onRowModesModelChange={handleRowModesModelChange}
                                    onRowEditStop={handleRowEditStop}
                                    processRowUpdate={processRowUpdate}
                                />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                "& .MuiButtonBase-root:hover": {
                                    backgroundColor: theme.palette.colors[11],
                                },
                            }}
                        >
                            <Button
                                mt={3}
                                sx={{
                                    backgroundColor: theme.palette.colors[11],
                                    textTransform: "none",
                                    borderRadius: "20px",
                                    width: "100px",
                                    height: "40px",
                                    display: "flex",
                                    marginLeft: "auto",
                                }}
                                onClick={() => (checklistItemId ? updateChecklistItem() : saveChecklistItem())}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};



export default AddChecklist;