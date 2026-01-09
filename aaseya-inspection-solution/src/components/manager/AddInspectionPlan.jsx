import React, { useContext, useEffect, useRef, useState } from "react";
import {
    useTheme,
    Grid2,
    TextField,
    Box,
    Typography,
    Button,
    Divider,
    Select,
    MenuItem,
    Tabs,
    Tab,
    FormControl,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import "../cases/newCase.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { SnackContext } from "../global/SnackProvider";
import Loader from "../global/Loader";
import InspectionPoints from "./InspectionPoints";
import InspectorSelection from "./InspectorSelection";
import InspectorMapping from "./InspectorMapping";

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const AddInspectionPlan = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [tabNumber, setTabNumber] = useState(0);
    const [inspectionPlan, setInspectionPlan] = useState({
        inspectionPlanID: "",
        inspectionPlanName: "",
        reason: "",
        inspectionDate: null,
        inspectorCategory: "group",
    });
    const inspectionPlanId = location.state?.inspectionPlanId;
    const [isSubmitUser, setIsSubmitUser] = useState(false);
    const { snack, setSnack } = useContext(SnackContext);
    const [entities, setEntities] = useState([]);
    const [entityPage, setEntityPage] = useState(1);
    const [entityPageSize, setEntityPageSize] = useState(10);
    const [totalEntityPages, setTotalEntityPages] = useState(0);
    const [totalEntityRecords, setTotalEntityRecords] = useState(0);
    const [loadingEntities, setLoadingEntities] = useState(false);
    const [selectedEntities, setSelectedEntities] = useState([]);
    const [userGroup, setUserGroup] = useState([]);
    const [userGroupPage, setUserGroupPage] = useState(1);
    const [userGroupPageSize, setUserGroupPageSize] = useState(10);
    const [totalUserGroupPages, setTotalUserGroupPages] = useState(0);
    const [totalUserGroupRecords, setTotalUserGroupRecords] = useState(0);
    const [loadingUserGroups, setLoadingUserGroups] = useState(false);
    const [selectedUserGroups, setSelectedUserGroups] = useState([]);
    const [selectedEntityDetails, setSelectedEntityDetails] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const selectedEntitytRef = useRef([]);

    const handleTabChange = (event, newValue) => {
        setTabNumber(newValue);
    };

    useEffect(() => {
        const getEntities = async () => {
            setLoadingEntities(true);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/getAlltheEntitiesDetails?page=${entityPage - 1}&size=${entityPageSize}`
                );
                setEntities(response?.data?.content);
                setEntityPage(response?.data?.number + 1);
                setEntityPageSize(response?.data?.size);
                setTotalEntityPages(response?.data?.totalPages);
                setTotalEntityRecords(response?.data?.totalElements);
                setLoadingEntities(false);
            } catch (error) {
                console.log(error);
            }
        };
        getEntities();
    }, [entityPage, entityPageSize]);

    useEffect(() => {
        const fetchUserGroups = async () => {
            setLoadingUserGroups(true);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/getAllUserGroups?page=${userGroupPage - 1}&size=${userGroupPageSize}`
                );

                if (response.data) {
                    setUserGroupPageSize(response?.data?.size);
                    setUserGroupPage(response?.data?.number + 1);
                    setTotalUserGroupPages(response?.data?.totalPages);
                    setTotalUserGroupRecords(response?.data?.totalElements);
                    setUserGroup(response?.data?.content);
                    setLoadingUserGroups(false);
                }
            } catch (error) {
                console.error("Error fetching user groups:", error);
                setSnack({ open: true, message: "Failed to fetch user groups", severity: "error" });
            } finally {
                setLoadingUserGroups(false);
            }
        };

        const getUsers = async () => {
            setLoadingUserGroups(true);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/getAllUsersWithSkills?page=${userGroupPage - 1}&size=${userGroupPageSize}`
                );
                setUserGroup(response?.data?.content);
                setUserGroupPage(response?.data?.number + 1);
                setUserGroupPageSize(response?.data?.size);
                setTotalUserGroupPages(response?.data?.totalPages);
                setTotalUserGroupRecords(response?.data?.totalElements);
                setLoadingUserGroups(false);
            } catch (error) {
                console.log(error);
            }
        };
        if (inspectionPlan?.inspectorCategory === "individual") {
            getUsers();
        } else {
            fetchUserGroups();
        }
    }, [userGroupPage, userGroupPageSize, inspectionPlan?.inspectorCategory]);

    useEffect(() => {
        let entitySelection = [];
        let userGroupSelection = [];
        entities?.map((entity) => {
            if (selectedEntities?.includes(entity?.id)) {
                entitySelection.push(entity);
            }
        });
        setSelectedEntityDetails(entitySelection);
        if (inspectionPlan?.inspectorCategory === "individual") {
            userGroup?.map((group) => {
                if (selectedUserGroups?.includes(group?.emailId)) {
                    userGroupSelection.push(group);
                }
            });
            setSelectedGroups(userGroupSelection);
        } else {
            userGroup?.map((group) => {
                if (selectedUserGroups?.includes(group?.groupId)) {
                    userGroupSelection.push(group);
                }
            });
            setSelectedGroups(userGroupSelection);
        }
    }, [selectedEntities, selectedUserGroups]);

    useEffect(() => {
        const getInspectionPlanDetail = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/getInspectionplan/${inspectionPlanId}`);
            setInspectionPlan({
                inspectionPlanID: inspectionPlanId,
                inspectionPlanName: response?.data?.inspectionPlanName,
                reason: response?.data?.reasonForInspectionPlan,
                inspectionDate: dayjs(response?.data?.dateOfInspection),
                inspectorCategory: response?.data?.inspectorType,
            });
            selectedEntitytRef.current = response?.data?.selectedEntities;
        };
        if (inspectionPlanId) {
            getInspectionPlanDetail();
        }
    }, [inspectionPlanId]);

    useEffect(() => {
        if (
            selectedEntitytRef.current?.length > 0 &&
            entities?.length > 0 &&
            userGroup?.length > 0 &&
            selectedEntities?.length === 0 &&
            selectedUserGroups?.length === 0
        )
            selectedEntitytRef.current?.map((selectedEntity) => {
                setSelectedEntities((prev) => [...prev, selectedEntity?.entityId]);
                if (inspectionPlan?.inspectorCategory === "group") {
                    setSelectedUserGroups((prev) => [...prev, selectedEntity?.groupId]);
                } else {
                    setSelectedUserGroups((prev) => [...prev, selectedEntity?.inspectorId]);
                }
                setEntities((prev) => {
                    return prev?.map((item) => {
                        if (item?.id === selectedEntity?.entityId) {
                            return {
                                ...item,
                                selectedControlType: selectedEntity?.controlTypeId,
                                selectedInspectionType: selectedEntity?.inspectionTypeName,
                                selectedTemplate: selectedEntity?.templateId,
                                selectedGroupId: selectedEntity?.groupId ?? selectedEntity?.inspectorId,
                            };
                        }
                        return item;
                    });
                });
                setUserGroup((prev) => {
                    return prev?.map((item) => {
                        if (item?.groupId === selectedEntity?.groupId) {
                            return {
                                ...item,
                                selectedGroupLead: selectedEntity?.leadId,
                            };
                        }
                        return item;
                    });
                });
            });
    }, [selectedEntitytRef.current, entities, userGroup]);

    const createInspectionPlan = async () => {
        try {
            if (!inspectionPlan?.inspectionPlanName) {
                setSnack({ open: true, message: "Enter inspection plan name", severity: "error" });
                return;
            }
            if (!inspectionPlan?.inspectionDate) {
                setSnack({ open: true, message: "Select inspection plan date", severity: "error" });
                return;
            }
            if (selectedEntities?.length === 0) {
                setSnack({ open: true, message: "Please select the entities", severity: "error" });
                return;
            }
            if (selectedUserGroups?.length === 0) {
                setSnack({ open: true, message: "Please select the user group/s", severity: "error" });
                return;
            }
            let entityGroupMapping = [];
            selectedEntities?.map((entityId) => {
                const filteredEntity = entities?.find((entity) => entity?.id === entityId);
                const mappedEntity = selectedEntityDetails?.find((entity) => entity?.id === entityId);
                let filteredUSerGroup;
                if (inspectionPlan?.inspectorCategory === "individual") {
                    filteredUSerGroup = userGroup?.find((group) => group?.emailId === mappedEntity?.selectedGroupId);
                } else {
                    filteredUSerGroup = userGroup?.find((group) => group?.groupId === mappedEntity?.selectedGroupId);
                }
                if (
                    !filteredEntity?.selectedControlType ||
                    !filteredEntity?.selectedInspectionType ||
                    !filteredEntity?.selectedTemplate
                ) {
                    setSnack({
                        open: true,
                        message: `Please select control type/ inspection type/ template for ${filteredEntity?.name}`,
                        severity: "error",
                    });
                    return;
                }
                if (!mappedEntity?.selectedGroupId) {
                    setSnack({
                        open: true,
                        message: `Select the inspector group for ${mappedEntity?.name}`,
                        severity: "error",
                    });
                    return;
                }
                if (inspectionPlan?.inspectorCategory === "group" && !filteredUSerGroup?.selectedGroupLead) {
                    setSnack({
                        open: true,
                        message: `Select the group lead for ${filteredUSerGroup?.groupName}`,
                        severity: "error",
                    });
                    return;
                }
                const obj = {
                    entityId: filteredEntity?.id,
                    entityName: filteredEntity?.name,
                    controlTypeId: filteredEntity?.selectedControlType,
                    inspectionTypeName: filteredEntity?.selectedInspectionType,
                    templateId: filteredEntity?.selectedTemplate,
                };
                if (inspectionPlan?.inspectorCategory === "individual") {
                    obj.inspectorId = filteredUSerGroup?.emailId;
                }
                if (inspectionPlan?.inspectorCategory === "group") {
                    obj.groupId = filteredUSerGroup?.groupId;
                    obj.leadId = filteredUSerGroup?.selectedGroupLead;
                }
                entityGroupMapping.push(obj);
            });
            const response = await axios({
                method: "post",
                url: `${import.meta.env.VITE_BASE_URL}/createInspectionPlan`,
                data: {
                    action: inspectionPlanId ? "edit" : "add",
                    inspectionPlanId: inspectionPlanId ? inspectionPlanId : "",
                    inspectionPlanName: inspectionPlan?.inspectionPlanName,
                    reasonForInspectionPlan: inspectionPlan?.reason,
                    inspectorType: inspectionPlan?.inspectorCategory,
                    createdBy: localStorage.getItem("userEmail"),
                    dateOfInspection: dayjs(inspectionPlan?.inspectionDate).format("YYYY-MM-DD"),
                    selectedEntities: entityGroupMapping,
                },
            });
            if (response?.data?.status?.toUpperCase() === "SUCCESS") {
                setSnack({ open: true, message: response?.data?.message, severity: "success" });
                navigate("/inspection-plan");
            } else {
                setSnack({ open: true, message: response?.data?.message, severity: "error" });
            }
        } catch (error) {
            console.log(error);
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
                height: "100%",
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
                    }}
                >
                    <Typography variant="h4" fontWeight={600}>
                        {inspectionPlanId ? "Edit" : "Create"} Inspection Plan
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
                        ".MuiTabs-root .MuiButtonBase-root": {
                            fontSize: "14px",
                            fontWeight: 400,
                            mr: "2px",
                        },
                        ".MuiTabs-scroller": {
                            borderBottom: `1px solid ${theme.palette.colors[22]}`,
                        },
                        ".MuiTabs-root .MuiButtonBase-root.Mui-selected": {
                            color: "#ffffff",
                        },
                    }}
                >
                    {isSubmitUser && <Loader />}
                    <Grid2 container spacing={3} className="newCaseFields">
                        <Grid2 size={4}>
                            <Typography>Inspection Plan ID</Typography>
                            <TextField
                                size="small"
                                fullWidth
                                disabled
                                value={inspectionPlan?.inspectionPlanID}
                                onChange={(e) =>
                                    setInspectionPlan({
                                        ...inspectionPlan,
                                        inspectionPlanID: e.target.value,
                                    })
                                }
                            />
                        </Grid2>
                        <Grid2 size={4}>
                            <Typography>
                                Inspection Plan Name<span style={{ color: "red" }}>*</span>
                            </Typography>
                            <TextField
                                size="small"
                                fullWidth
                                value={inspectionPlan?.inspectionPlanName}
                                onChange={(e) =>
                                    setInspectionPlan({
                                        ...inspectionPlan,
                                        inspectionPlanName: e.target.value,
                                    })
                                }
                            />
                        </Grid2>
                        <Grid2 size={4}>
                            <Typography>Reason for Inspection Plan</Typography>
                            <TextField
                                size="small"
                                fullWidth
                                value={inspectionPlan?.reason}
                                onChange={(e) =>
                                    setInspectionPlan({
                                        ...inspectionPlan,
                                        reason: e.target.value,
                                    })
                                }
                            />
                        </Grid2>
                        <Grid2 size={4}>
                            <Typography>
                                Inspection Date<span style={{ color: "red" }}>*</span>
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    size="small"
                                    format="DD MMM YYYY"
                                    value={inspectionPlan?.inspectionDate}
                                    onChange={(value) => {
                                        setInspectionPlan({
                                            ...inspectionPlan,
                                            inspectionDate: value,
                                        });
                                    }}
                                    sx={{ width: "100%", height: "40px" }}
                                    fullWidth
                                    required
                                />
                            </LocalizationProvider>
                        </Grid2>
                        <Grid2 size={4}>
                            <Typography>
                                Inspector Category<span style={{ color: "red" }}>*</span>
                            </Typography>
                            <FormControl fullWidth>
                                <Select
                                    value={inspectionPlan?.inspectorCategory}
                                    onChange={(e) =>
                                        setInspectionPlan({
                                            ...inspectionPlan,
                                            inspectorCategory: e.target.value,
                                        })
                                    }
                                    fullWidth
                                >
                                    <MenuItem value={"group"}>Group</MenuItem>
                                    <MenuItem value={"individual"}>Individual</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid2>
                    </Grid2>
                    <Tabs
                        value={tabNumber}
                        onChange={handleTabChange}
                        aria-label="List of cases"
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: "#4C8B92",
                            },
                        }}
                        sx={{
                            mt: 3,
                        }}
                    >
                        <Tab label="Inspection Points" {...a11yProps(0)} />
                        <Tab label="Inspector Selection" {...a11yProps(1)} />
                        <Tab label="Inspector Mapping" {...a11yProps(2)} />
                    </Tabs>
                    <TabPanel value={tabNumber} index={0}>
                        <InspectionPoints
                            entities={entities}
                            setEntities={setEntities}
                            selectedEntities={selectedEntities}
                            setSelectedEntities={setSelectedEntities}
                            entityPage={entityPage}
                            setEntityPage={setEntityPage}
                            entityPageSize={entityPageSize}
                            setEntityPageSize={setEntityPageSize}
                            totalEntityPages={totalEntityPages}
                            totalEntityRecords={totalEntityRecords}
                            loadingEntities={loadingEntities}
                        />
                    </TabPanel>
                    <TabPanel value={tabNumber} index={1}>
                        <InspectorSelection
                            userGroup={userGroup}
                            setUserGroup={setUserGroup}
                            selectedUserGroups={selectedUserGroups}
                            setSelectedUserGroups={setSelectedUserGroups}
                            userGroupPage={userGroupPage}
                            setUserGroupPage={setUserGroupPage}
                            userGroupPageSize={userGroupPageSize}
                            setUserGroupPageSize={setUserGroupPageSize}
                            totalUserGroupPages={totalUserGroupPages}
                            totalUserGroupRecords={totalUserGroupRecords}
                            loadingUserGroups={loadingUserGroups}
                            inspectorCategory={inspectionPlan?.inspectorCategory}
                        />
                    </TabPanel>
                    <TabPanel value={tabNumber} index={2}>
                        <InspectorMapping
                            selectedEntityDetails={selectedEntityDetails}
                            setSelectedEntityDetails={setSelectedEntityDetails}
                            selectedGroups={selectedGroups}
                            inspectorCategory={inspectionPlan?.inspectorCategory}
                        />
                    </TabPanel>
                    <Box
                        sx={{
                            "& .MuiButtonBase-root:hover": {
                                backgroundColor: theme.palette.colors[11],
                            },
                            display: "flex",
                            justifyContent: "flex-end",
                            mt: 2,
                        }}
                    >
                        <Button
                            // onClick={() => (userEmail ? updateUserDetails() : addUserDetails())}
                            onClick={createInspectionPlan}
                            variant="contained"
                            sx={{
                                backgroundColor: `${theme.palette.colors[11]}`,
                                color: "#ffffff",
                                borderRadius: "20px",
                                px: 5,
                                height: "40px",
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AddInspectionPlan;
