import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    Grid2,
    Paper,
    TextField,
    Typography,
    useTheme,
    IconButton,
    Menu,
    MenuItem,
    CircularProgress,
    FormControl,
    Select,
    RadioGroup,
} from "@mui/material";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CustomCheckbox from "../global/CustomCheckbox";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined";
import dayjs from "dayjs";
import axios from "axios";
import { SnackContext } from "../global/SnackProvider";
import "./newCase.css";
import GoogleMap from "../map/GoogleMap";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AddActionsOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "../global/Loader";
import CustomRadio from "../global/CustomRadio";

const NewCase = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const controlType = location.state?.controlType;
    const [isCreateEntity, setIsCreateEntity] = useState(false);
    const [inspectionTypes, setInspectionTypes] = useState([]);
    const [inspectionTemplates, setInspectionTemplates] = useState([]);
    const [entityNames, setEntityNames] = useState([]);
    const [templatesList, setTemplatesList] = useState([]);
    const { snack, setSnack } = useContext(SnackContext);
    const [inspectionDetails, setInspectionDetails] = useState({
        inspectionDate: dayjs(Date()),
        controlType: "",
        inspectionType: "",
        inspectionReason: "",
        template: "",
    });
    const [entityDetails, setEntityDetails] = useState({
        entityName: "",
        address: "",
        entityId: "",
    });
    const [newEntityAddress, setNewEntityAddress] = useState(null);
    const [preInspectionChecklist, setPreInspectionChecklist] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isShowMenu, setIsShowMenu] = useState(false);
    const [isSubmitCase, setIsSubmitCase] = useState(false);
    const [displayPreInspection, setDisplayPreInspection] = useState(false);
    const [preInspection, setPreInspection] = useState("");
    const [checkedPreInspections, setCheckedPreInspections] = useState([]);
    const [newPreInspectionChecklists, setNewPreInspectionChecklists] = useState([]);
    const [controlTypes, setControlTypes] = useState([]);
    const [selectedFormId, setSelectedFormId] = useState(null);

    useEffect(() => {
        const getInspectionTypes = async () => {
            const response = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/getAllInspectionTypes/${inspectionDetails?.controlType}`,
            });
            setInspectionTypes(response?.data);
        };
        if (inspectionDetails?.controlType) {
            getInspectionTypes();
        }
    }, [inspectionDetails?.controlType]);

    useEffect(() => {
        const getControlTypes = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/getAllControlTypesForCase`);
            setControlTypes(response?.data);
            setInspectionDetails({
                ...inspectionDetails,
                controlType: controlType,
            });
        };
        getControlTypes();
    }, []);

    useEffect(() => {
        if (newEntityAddress?.name) {
            const existingEntity = entityNames?.find((entityName) => entityName === newEntityAddress?.name);
            if (existingEntity) {
                setSnack({ open: true, message: "Entity already exists in the system.", severity: "error" });
                return;
            }
        }
        setEntityDetails({
            entityName: newEntityAddress?.name ? newEntityAddress?.name : "",
            address: newEntityAddress?.formatted_address ? newEntityAddress?.formatted_address : "",
            buildingName: "",
            entityArea: "",
            entityId: "",
        });
    }, [newEntityAddress]);

    useEffect(() => {
        const fetchData = async () => {
            const [entityResponse, templateResponse, preInspectionResponse] = await Promise.all([
                axios.get(`${import.meta.env.VITE_BASE_URL}/getEntityNames/${inspectionDetails.inspectionType}`),
                axios.get(
                    `${import.meta.env.VITE_BASE_URL}/getTemplate/${
                        inspectionTypes?.find((type) => inspectionDetails.inspectionType === type?.id)?.name
                    }`
                ),
                axios.get(
                    `${import.meta.env.VITE_BASE_URL}/getAllPreInspectionChecklists?name=${
                        inspectionTypes?.find((type) => inspectionDetails.inspectionType === type?.id)?.name
                    }`
                ),
            ]);
            setEntityNames(entityResponse?.data);

            setInspectionTemplates(templateResponse?.data);
            templateResponse?.data?.map((template) => {
                setTemplatesList((prevList) => [...prevList, `${template?.template_name}: ${template?.version}`]);
            });

            setPreInspectionChecklist(preInspectionResponse?.data);
        };
        if (inspectionDetails.inspectionType) {
            fetchData();
        }
    }, [inspectionDetails.inspectionType]);

    const submitInspection = async () => {
        try {
            if (!inspectionDetails?.inspectionType) {
                setSnack({ open: true, message: "Please select an inspection type.", severity: "error" });
                return;
            }
            const templateId = inspectionTemplates.find(
                (inspectionTemplate) =>
                    `${inspectionTemplate.template_name}: ${inspectionTemplate.version}` === inspectionDetails.template
            )?.template_id;

            const selectedInspectionType = inspectionTypes?.find((type) => inspectionDetails.inspectionType === type?.id)?.name;

            const existingPreInspections = [];
            const newPreInspections = [];
            preInspectionChecklist?.map((preInspection) => {
                if (checkedPreInspections.includes(preInspection?.name) && preInspection?.id) {
                    existingPreInspections.push(preInspection);
                }
            });
            newPreInspectionChecklists?.map((preInspection) => {
                if (checkedPreInspections?.includes(preInspection)) {
                    newPreInspections.push(preInspection);
                }
            });
            const isPreInspection = checkedPreInspections.length > 0;
            setIsSubmitCase(true);
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/startAISProcess`, {
                inspectionType: selectedInspectionType,
                reason: inspectionDetails.inspectionReason,
                dateOfInspection: dayjs(inspectionDetails.inspectionDate).format("YYYY-MM-DD"),
                createdBy: localStorage.getItem("userEmail"),
                templateId: templateId,
                entityId: entityDetails.entityId,
                status: "new",
                controlTypeId: inspectionDetails?.controlType,
                inspectionSource: "Adhoc",
                addEntity: isCreateEntity,
                newEntity: {
                    name: entityNames?.find((entity) => entity?.entityid === entityDetails.entityName)?.name,
                    address: entityDetails?.address,
                    location: entityDetails?.address,
                },
                pre_Inspection_Checklists: existingPreInspections,
                custom_pre_inspection_checklist: newPreInspections,
                createdDate: dayjs(new Date()).format("YYYY-MM-DD"),
                is_preinspection: isPreInspection,
                is_preinspection_submitted: false,
                formId: selectedFormId,
            });
            if (response?.data?.status === "Failure") {
                setSnack({ open: true, message: "Something went wrong. Please try again.", severity: "error" });
            } else if (response?.data?.status === "Success") {
                setSnack({ open: true, message: "Inspection Created successfully.", severity: "success" });
            } else {
                setSnack({ open: true, message: "Unexpected response from server.", severity: "warning" });
            }

            setIsSubmitCase(false);
            navigate("/cases");
        } catch (error) {
            console.log(error);
            setSnack({ open: true, message: "Something went wrong.", severity: "error" });
        }
    };

    useEffect(() => {
        const getEntityAddress = async () => {
            const entityAddress = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/getAddressByEntity/${entityDetails.entityName}`,
            });
            setEntityDetails({
                ...entityDetails,
                address: entityAddress?.data?.address,
                entityId: entityAddress?.data?.entityId,
            });
        };
        if (entityDetails.entityName && !isCreateEntity) {
            getEntityAddress();
        }
    }, [entityDetails.entityName]);

    const handleDisplayMenu = (event) => {
        setIsShowMenu(!isShowMenu);
        if (!isShowMenu) {
            setAnchorEl(event.currentTarget);
        } else {
            setAnchorEl(null);
        }
    };

    const updatePreInspection = () => {
        setPreInspectionChecklist((prev) => [
            ...prev,
            {
                name: preInspection,
            },
        ]);
        setCheckedPreInspections((prev) => [...prev, preInspection]);
        setNewPreInspectionChecklists((prev) => [...prev, preInspection]);
    };

    const updateCheckedPreInspection = (event, name) => {
        if (event.target.checked) {
            setCheckedPreInspections((prev) => [...prev, name]);
        } else {
            setCheckedPreInspections(checkedPreInspections?.filter((preInspection) => preInspection !== name));
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
                    px: 2.5,
                    py: 2,
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
                            Create Case
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
                        {isSubmitCase && <Loader />}
                        <Grid2 container spacing={3}>
                            <Grid2
                                size={4}
                                sx={{
                                    "& .MuiInputBase-root": {
                                        height: "37px",
                                    },
                                }}
                            >
                                <Typography>
                                    Inspection Date <span style={{ color: "red" }}>*</span>
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        size="small"
                                        format="DD MMM YYYY"
                                        value={inspectionDetails.inspectionDate}
                                        onChange={(value) => {
                                            setInspectionDetails({
                                                ...inspectionDetails,
                                                inspectionDate: value,
                                            });
                                        }}
                                        className="newCaseFields"
                                        sx={{ width: "100%", height: "40px" }}
                                        fullWidth
                                        required
                                    />
                                </LocalizationProvider>
                            </Grid2>
                            <Grid2 size={4}>
                                <Typography>
                                    Control Type <span style={{ color: "red" }}>*</span>
                                </Typography>
                                <FormControl fullWidth className="newCaseFields">
                                    <Select
                                        value={inspectionDetails.controlType}
                                        onChange={(e) => {
                                            setTemplatesList([]);
                                            setInspectionDetails({
                                                ...inspectionDetails,
                                                controlType: e.target.value,
                                            });
                                        }}
                                        sx={{
                                            "& .MuiSelect-select": {
                                                padding: "9px 0 9px 20px",
                                            },
                                        }}
                                    >
                                        {controlTypes?.map((controlType) => (
                                            <MenuItem key={controlType?.controlTypeId} value={controlType?.controlTypeId}>
                                                {controlType?.controlTypeName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid2>
                            <Grid2 size={4}>
                                <Typography>
                                    Inspection Type <span style={{ color: "red" }}>*</span>
                                </Typography>
                                <FormControl fullWidth className="newCaseFields">
                                    <Select
                                        value={inspectionDetails.inspectionType}
                                        onChange={(e) => {
                                            setTemplatesList([]);
                                            setInspectionDetails({
                                                ...inspectionDetails,
                                                inspectionType: e.target.value,
                                            });
                                        }}
                                        sx={{
                                            "& .MuiSelect-select": {
                                                padding: "9px 0 9px 20px",
                                            },
                                        }}
                                    >
                                        {inspectionTypes?.map((inspectionType) => (
                                            <MenuItem key={inspectionType?.id} value={inspectionType?.id}>
                                                {inspectionType?.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid2>
                            <Grid2 size={4}>
                                <Typography>
                                    Reason for Inspection <span style={{ color: "red" }}>*</span>
                                </Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    value={inspectionDetails.inspectionReason}
                                    className="newCaseFields"
                                    onChange={(e) => {
                                        setInspectionDetails({
                                            ...inspectionDetails,
                                            inspectionReason: e.target.value,
                                        });
                                    }}
                                />
                            </Grid2>
                            <Grid2 size={4}>
                                <Typography>
                                    Choose Template <span style={{ color: "red" }}>*</span>
                                </Typography>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    size="small"
                                    options={templatesList}
                                    fullWidth
                                    value={inspectionDetails.template}
                                    className="newCaseFields"
                                    onChange={(e, value) => {
                                        setInspectionDetails({
                                            ...inspectionDetails,
                                            template: value,
                                        });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Grid2>
                        </Grid2>
                        <Divider sx={{ my: 3 }} />
                        {!isCreateEntity && (
                            <Grid2 container spacing={3}>
                                <Grid2 size={4}>
                                    <Typography>Entity Name</Typography>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        size="small"
                                        className="newCaseFields"
                                        slotProps={{
                                            paper: {
                                                component: ({ children, ...props }) => (
                                                    <Paper {...props}>
                                                        <Button
                                                            fullWidth
                                                            sx={{ justifyContent: "flex-start", pl: 2, color: "black" }}
                                                            onMouseDown={() => {
                                                                setIsCreateEntity(true);
                                                                setEntityDetails({
                                                                    entityArea: "",
                                                                    entityName: "",
                                                                    buildingName: "",
                                                                    address: "",
                                                                });
                                                            }}
                                                            startIcon={<AddOutlinedIcon />}
                                                        >
                                                            Create New
                                                        </Button>
                                                        {children}
                                                    </Paper>
                                                ),
                                            },
                                        }}
                                        value={entityNames?.find((entity) => entity?.entityid === entityDetails.entityName)?.name}
                                        onChange={(e, value) => {
                                            console.log(value);
                                            setEntityDetails({
                                                ...entityDetails,
                                                entityName: value?.entityid,
                                            });
                                        }}
                                        options={entityNames}
                                        getOptionLabel={(option) => (option?.name ? option?.name : "")}
                                        fullWidth
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Grid2>
                                {/* <Grid2 size={4}>
                                    <Typography>Floor Number/ Building Name</Typography>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        value={entityDetails.buildingName}
                                        className="newCaseFields"
                                        onChange={(e) => {
                                            setEntityDetails({
                                                ...entityDetails,
                                                buildingName: e.target.value,
                                            });
                                        }}
                                    />
                                </Grid2>
                                <Grid2 size={4}>
                                    <Typography>Area/ Facility</Typography>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        value={entityDetails.entityArea}
                                        className="newCaseFields"
                                        onChange={(e) => {
                                            setEntityDetails({
                                                ...entityDetails,
                                                entityArea: e.target.value,
                                            });
                                        }}
                                    />
                                </Grid2> */}
                                <Grid2 size={4}>
                                    <Typography>Address</Typography>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        value={entityDetails.address}
                                        className="newCaseFields"
                                        onChange={(e) => {
                                            setEntityDetails({
                                                ...entityDetails,
                                                address: e.target.value,
                                            });
                                        }}
                                    />
                                </Grid2>
                            </Grid2>
                        )}
                        {isCreateEntity && (
                            <Grid2 container spacing={3}>
                                <Grid2 container size={4} rowSpacing={2.5}>
                                    <Grid2 size={12}>
                                        <Typography>Entity Name</Typography>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            className="newCaseFields"
                                            value={entityDetails.entityName}
                                            onChange={(e) => {
                                                setEntityDetails({
                                                    ...entityDetails,
                                                    entityName: e.target.value,
                                                });
                                            }}
                                            slotProps={{
                                                input: {
                                                    endAdornment: (
                                                        <>
                                                            <IconButton onClick={handleDisplayMenu}>
                                                                {isShowMenu ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                                                            </IconButton>
                                                        </>
                                                    ),
                                                },
                                            }}
                                            onClick={handleDisplayMenu}
                                        />
                                    </Grid2>
                                    {/* <Grid2 size={12}>
                                        <Typography>Floor Number/ Building Name</Typography>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            value={entityDetails.buildingName}
                                            className="newCaseFields"
                                            onChange={(e) => {
                                                setEntityDetails({
                                                    ...entityDetails,
                                                    buildingName: e.target.value,
                                                });
                                            }}
                                        />
                                    </Grid2>
                                    <Grid2 size={12}>
                                        <Typography>Area/ Facility</Typography>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            value={entityDetails.entityArea}
                                            className="newCaseFields"
                                            onChange={(e) => {
                                                setEntityDetails({
                                                    ...entityDetails,
                                                    entityArea: e.target.value,
                                                });
                                            }}
                                        />
                                    </Grid2> */}
                                    <Grid2 size={12}>
                                        <Typography>Address</Typography>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            value={entityDetails.address}
                                            className="newCaseFields"
                                            onChange={(e) => {
                                                setEntityDetails({
                                                    ...entityDetails,
                                                    address: e.target.value,
                                                });
                                            }}
                                        />
                                    </Grid2>
                                </Grid2>
                                <Grid2 size={8}>
                                    <GoogleMap setNewEntityAddress={setNewEntityAddress} />
                                </Grid2>
                            </Grid2>
                        )}
                        <Divider sx={{ my: 3 }} />
                        {(localStorage.getItem("userRole") === "MANAGER" || localStorage.getItem("userRole") === "INSPECTOR") && (
                            <>
                                {preInspectionChecklist?.length > 0 && (
                                    <Grid2 container>
                                        <Typography mb={1}>Pre Inspection Checklist </Typography>
                                        {displayPreInspection && (
                                            <>
                                                <Box width="100%">
                                                    <Box className="preInspectionContainer">
                                                        <FormControlLabel control={<CustomCheckbox sx={{ pr: 0 }} />} />
                                                        <TextField
                                                            size="small"
                                                            fullWidth
                                                            className="preInspectionField"
                                                            value={preInspection}
                                                            onChange={(e) => setPreInspection(e.target.value)}
                                                        />
                                                    </Box>
                                                    <Box className="preInspectionIconContainer">
                                                        <IconButton onClick={() => setDisplayPreInspection(false)}>
                                                            <CloseIcon sx={{ color: "#d54b4b", fontWeight: "bold" }} />
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={() => {
                                                                updatePreInspection();
                                                                setDisplayPreInspection(false);
                                                            }}
                                                        >
                                                            <CheckIcon sx={{ color: "#03911a", fontWeight: "bold" }} />
                                                        </IconButton>
                                                    </Box>
                                                </Box>
                                            </>
                                        )}
                                    </Grid2>
                                )}
                                <Divider sx={{ mt: 0.5, mb: 1 }} />
                                <Box
                                    className="addPreInspectionContainer"
                                    onClick={() => {
                                        setPreInspection("");
                                        setDisplayPreInspection(true);
                                    }}
                                >
                                    <AddActionsOutlinedIcon sx={{ mr: 1 }} />
                                    <Typography className="typographyFontWeight">Add Pre Inspection</Typography>
                                </Box>
                            </>
                        )}
                        <Grid2
                            container
                            sx={{
                                "& .MuiButtonBase-root:hover": {
                                    backgroundColor: theme.palette.colors[11],
                                },
                                justifyContent: "flex-end",
                                my: 2,
                            }}
                        >
                            <Button
                                sx={{
                                    backgroundColor: theme.palette.colors[11],
                                    textTransform: "none",
                                    borderRadius: "20px",
                                    width: "100px",
                                    height: "40px",
                                }}
                                onClick={submitInspection}
                            >
                                Submit
                            </Button>
                        </Grid2>
                        <Menu
                            anchorEl={anchorEl}
                            open={isShowMenu}
                            fullWidth
                            width="100%"
                            onClose={handleDisplayMenu}
                            slotProps={{
                                paper: {
                                    style: {
                                        width: anchorEl ? anchorEl.clientWidth : undefined,
                                    },
                                },
                            }}
                        >
                            <MenuItem
                                onClick={() => {
                                    handleDisplayMenu();
                                    setIsCreateEntity(false);
                                }}
                                fullWidth
                                width="100%"
                            >
                                <RotateLeftOutlinedIcon />
                                Select from System
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default NewCase;
