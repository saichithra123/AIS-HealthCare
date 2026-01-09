import { Autocomplete, Box, Button, Checkbox, Divider, FormControlLabel, Grid2, Paper, TextField, Typography, useTheme, IconButton, Menu, MenuItem, CircularProgress } from '@mui/material';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CustomCheckbox from '../../global/CustomCheckbox';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
import dayjs from 'dayjs';
import axios from 'axios';
import { SnackContext } from '../../global/SnackProvider';
import '../../cases/newCase.css';
import GoogleMap from '../../map/GoogleMap';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AddActionsOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Footer from '../footer/Footer';
import { HeaderContext } from '../HeaderContext';

const NewCaseComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const inspectionType = location.state?.inspectionType;
    const [ isCreateEntity, setIsCreateEntity ] = useState(location.state?.isCreateEntity ? location.state?.isCreateEntity : false);
    const [ inspectionTypes, setInspectionTypes ] = useState([]);
    const [ inspectionTemplates, setInspectionTemplates ] = useState([]);
    const [ entityNames, setEntityNames ] = useState([]);
    const [ templatesList, setTemplatesList ] = useState([]);
    const { snack, setSnack } = useContext(SnackContext);
    const [ inspectionDetails, setInspectionDetails ] = useState({
        inspectionDate: dayjs(Date()),
        inspectionType: inspectionType,
        inspectionReason: '',
        template: ''
    });
    const [ entityDetails, setEntityDetails ] = useState({
        entityName: '',
        buildingName: '',
        entityArea: '',
        address: '',
        entityId: ''
    });
    const [ isSubmitCase, setIsSubmitCase ] = useState(false);
    const newEntityAddress = location.state?.newEntityAddress ? JSON.parse(location.state?.newEntityAddress) : null
    const { header, setHeader } = useContext(HeaderContext)
    const [preInspectionChecklist, setPreInspectionChecklist] = useState([])
    const [displayPreInspection, setDisplayPreInspection] = useState(false)
    const [checkedPreInspections, setCheckedPreInspections] = useState([])
    const [newPreInspectionChecklists, setNewPreInspectionChecklists] = useState([])

    useEffect(() => {
        setHeader('Create Case')
    }, [])

    useEffect(() => {
        const getInspectionTypes = async () => {
            const response = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_BASE_URL}/getInspectionTypeNames`
            });
            setInspectionTypes(response?.data);
        };
        getInspectionTypes();
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

            const year = new Date(inspectionDetails.inspectionDate).getFullYear();
            const month = String(new Date(inspectionDetails.inspectionDate).getMonth() + 1).padStart(2, "0");
            const day = String(new Date(inspectionDetails.inspectionDate).getDate()).padStart(2, "0");
            const formattedDate = `${year}-${month}-${day}`;
            const currentYear = new Date().getFullYear();
            const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
            const currentDay = String(new Date().getDate()).padStart(2, "0");
            const currentFormattedDate = `${currentYear}-${currentMonth}-${currentDay}`;

            // if (formattedDate < (`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`)) {
            //     setSnack({ open: true, message: 'Inspection date cannot be less than today\'s date.', severity: 'error' });
            //     return;
            // }

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
                inspectionType: inspectionDetails.inspectionType,
                reason: inspectionDetails.inspectionReason,
                dateOfInspection: formattedDate,
                createdBy: localStorage.getItem("userEmail"),
                templateId: templateId,
                entityId: entityDetails.entityId,
                status: "new",
                inspectionSource: "Adhoc",
                addEntity: isCreateEntity,
                newEntity: {
                    name: entityDetails?.entityName,
                    address: entityDetails?.address,
                    location: entityDetails?.address,
                    facility: entityDetails?.entityArea,
                    floor: "",
                    building: entityDetails?.buildingName,
                },
                pre_Inspection_Checklists: existingPreInspections,
                custom_pre_inspection_checklist: newPreInspections,
                createdDate: currentFormattedDate,
                is_preinspection: isPreInspection,
                is_preinspection_submitted: false,
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
                buildingName: `${entityAddress?.data?.floor}, ${entityAddress?.data?.building}`,
                entityArea: entityAddress?.data?.location,
                address: entityAddress?.data?.address,
                entityId: entityAddress?.data?.entityId,
            });
        };
        if (entityDetails.entityName && !isCreateEntity) {
            getEntityAddress();
        }
    }, [entityDetails.entityName]);

    const createNewEntity = () => {
        setIsCreateEntity(true);
        navigate(`/cases/create-entity`, { state: { isCreateEntity: true, inspectionType: inspectionType } });
    };

    useEffect(() => {
        const fetchData = async () => {
            const [entityResponse, templateResponse, preInspectionResponse] = await Promise.all([
                axios.get(`${import.meta.env.VITE_BASE_URL}/getEntityNames`),
                axios.get(`${import.meta.env.VITE_BASE_URL}/getTemplate/${inspectionDetails.inspectionType}`),
                axios.get(
                    `${import.meta.env.VITE_BASE_URL}/getAllPreInspectionChecklists?name=${inspectionDetails.inspectionType}`
                ),
            ]);
            setEntityNames(entityResponse?.data?.map((entity) => entity?.name));

            setInspectionTemplates(templateResponse?.data);
            templateResponse?.data?.map((template) => {
                setTemplatesList((prevList) => [...prevList, `${template?.template_name}: ${template?.version}`]);
            });

            setPreInspectionChecklist(preInspectionResponse?.data);
        };
        fetchData();
    }, [inspectionDetails.inspectionType]);

    const updateCheckedPreInspection = (event, name) => {
        if (event.target.checked) {
            setCheckedPreInspections((prev) => [...prev, name]);
        } else {
            setCheckedPreInspections(checkedPreInspections?.filter((preInspection) => preInspection !== name));
        }
    };

    return (
        <>
            <Grid2
                container
                sx={{
                    backgroundColor: "#F2F6F6",
                    opacity: 1,
                    height: "92vh",
                }}
            >
                <Box
                    sx={{
                        borderRadius: "11px",
                        border: "1px solid #DFDFDF",
                        background: `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                        my: 11,
                        mx: 2,
                        px: 2,
                        py: 2,
                        boxShadow: `inset 0px 0px 6px ${theme.palette.colors[3]}`,
                        opacity: 1,
                        height: "80vh",
                        overflow: "auto",
                        scrollbarWidth: "none",
                        "& .MuiTypography-root": {
                            fontSize: "12px",
                            color: theme.palette.colors[21],
                        },
                    }}
                >
                    {isSubmitCase && (
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 50,
                            }}
                        >
                            <Grid2
                                container
                                sx={{
                                    "& .MuiCircularProgress-root": {
                                        color: "#00000029",
                                    },
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <CircularProgress size={160} thickness={2} color="grey" />
                            </Grid2>
                        </div>
                    )}
                    <Grid2 container spacing={3}>
                        <Grid2
                            size={14}
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
                        <Grid2 size={12}>
                            <Typography>
                                Inspection Type <span style={{ color: "red" }}>*</span>
                            </Typography>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                size="small"
                                options={inspectionTypes}
                                fullWidth
                                onChange={(e, value) => {
                                    setTemplatesList([]);
                                    setInspectionDetails({
                                        ...inspectionDetails,
                                        inspectionType: value,
                                    });
                                }}
                                className="newCaseFields"
                                value={inspectionDetails.inspectionType}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid2>
                        <Grid2 size={12}>
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
                        <Grid2 size={12}>
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
                    <Grid2 container spacing={3}>
                        <Grid2 size={12}>
                            <Typography>Entity Name</Typography>
                            {newEntityAddress?.name ? (
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
                                />
                            ) : (
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
                                                        onMouseDown={createNewEntity}
                                                        startIcon={<AddOutlinedIcon />}
                                                    >
                                                        Create New
                                                    </Button>
                                                    {children}
                                                </Paper>
                                            ),
                                        },
                                    }}
                                    value={entityDetails.entityName}
                                    onChange={(e, value) => {
                                        setEntityDetails({
                                            ...entityDetails,
                                            entityName: value,
                                        });
                                    }}
                                    options={entityNames}
                                    fullWidth
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            )}
                        </Grid2>
                        <Grid2 size={12}>
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
                        </Grid2>
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
                    <Grid2
                        container
                        sx={{
                            "& .MuiButtonBase-root:hover": {
                                backgroundColor: theme.palette.colors[11],
                            },
                            justifyContent: "flex-end",
                            my: 3,
                        }}
                    >
                        {(localStorage.getItem("userRole") === "MANAGER" || localStorage.getItem("userRole") === "INSPECTOR") && (
                            <>
                                <Grid2 container>
                                    <Typography mb={1}>Pre Inspection Checklist </Typography>
                                    {preInspectionChecklist?.length > 0 &&
                                        preInspectionChecklist?.map((checklist, index) => {
                                            return (
                                                <Box
                                                    key={index}
                                                    sx={{
                                                        border: `1px solid${theme.palette.colors[22]}`,
                                                        borderRadius: "20px",
                                                        opacity: 1,
                                                        width: "100%",
                                                        px: 3,
                                                        mb: 0.6,
                                                        "& .MuiTypography-root": {
                                                            color: theme.palette.colors[6],
                                                        },
                                                    }}
                                                >
                                                    <FormControlLabel
                                                        control={
                                                            <CustomCheckbox
                                                                checked={checkedPreInspections?.includes(checklist?.name)}
                                                            />
                                                        }
                                                        label={checklist?.name}
                                                        onChange={(e) => updateCheckedPreInspection(e, checklist?.name)}
                                                    />
                                                </Box>
                                            );
                                        })}
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
                                <Divider sx={{ mt: 0.5, mb: 1 }} />
                                <Box
                                    className="addPreInspectionContainer"
                                    sx={{ width: "100%" }}
                                    onClick={() => {
                                        setPreInspection("");
                                        setDisplayPreInspection(true);
                                    }}
                                    mt={1}
                                >
                                    <AddActionsOutlinedIcon sx={{ mr: 1 }} />
                                    <Typography className="typographyFontWeight">Add Pre Inspection</Typography>
                                </Box>
                            </>
                        )}
                        <Button
                            sx={{
                                backgroundColor: theme.palette.colors[11],
                                textTransform: "none",
                                borderRadius: "20px",
                                width: "100%",
                                height: "40px",
                                mt: 2,
                            }}
                            onClick={submitInspection}
                        >
                            Create Case
                        </Button>
                    </Grid2>
                </Box>
                <Footer />
            </Grid2>
        </>
    );
};

export default NewCaseComponent;
