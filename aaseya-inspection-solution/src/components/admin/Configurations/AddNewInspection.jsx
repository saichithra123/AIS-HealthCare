import React, { useEffect, useState, useRef, useContext } from "react";
import { Box, Typography, useTheme, Button, Grid2, TextField, Divider, FormControl, MenuItem, Select } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { Tabs, Tab } from "@mui/material";
import EntityTable from "./EntityTab";
import Periodicity from "./ManagePeriodicity";
import SLATabs from "./SLATabs";
import axios from "axios";
import PrimaryFields from "./PrimaryFields";
import "../adminStyles.css";
import { SnackContext } from "../../global/SnackProvider";
import Loader from "../../global/Loader";
import dayjs from "dayjs";

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

const AddNewInspection = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const inspectionTypeId = location.state?.inspectionTypeId;
    const [inspectionType, setInspectionType] = useState("");
    const [threshold, setThreshold] = useState("");
    const [tabNumber, setTabNumber] = useState(0);
    const [skills, setSkills] = useState([]);
    const skillDetails = useRef([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [primarydetails, setPrimaryDetails] = useState({
        smallEffort: "",
        mediumEffort: "",
        largeEffort: "",
    });
    const [SLAData, setSLAData] = useState({
        Small: { inspector: "", reviewer: "", approver: "" },
        Medium: { inspector: "", reviewer: "", approver: "" },
        Large: { inspector: "", reviewer: "", approver: "" },
    });
    const [entities, setEntities] = useState([]);
    const [selectedEntities, setSelectedEntities] = useState([]);
    const [skillPage, setSkillPage] = useState(1);
    const [skillPageSize, setSkillPageSize] = useState(10);
    const [totalSkillPages, setTotalSkillPages] = useState(0);
    const [totalSkillRecords, setTotalSkillRecords] = useState(0);
    const [loadingSkills, setLoadingSkills] = useState(false);
    const [entityPage, setEntityPage] = useState(1);
    const [entityPageSize, setEntityPageSize] = useState(10);
    const [totalEntityPages, setTotalEntityPages] = useState(0);
    const [totalEntityRecords, setTotalEntityRecords] = useState(0);
    const [loadingEntities, setLoadingEntities] = useState(false);
    const { snack, setSnack } = useContext(SnackContext);
    const [isSubmitInspectionType, setIsSubmitInspectionType] = useState(false);
    const [selectedControlType, setSelectedControlType] = useState("");
    const [controlTypes, setControlTypes] = useState([]);
    const [periodicity, setPeriodicity] = useState({
        occurence: "NOREPEAT",
    });

    const handleTabChange = (event, newValue) => {
        setTabNumber(newValue);
    };

    useEffect(() => {
        const getControlTypes = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/getAllControlTypesForCase`);
            setControlTypes(response?.data);
        };
        getControlTypes();
    }, []);

    useEffect(() => {
        try {
            setLoadingSkills(true);
            const getSkills = async () => {
                const response = await axios({
                    method: "get",
                    url: `${import.meta.env.VITE_BASE_URL}/getSkills?page=${skillPage - 1}&size=${skillPageSize}`,
                });
                setSkills(response?.data?.content);
                skillDetails.current = response?.data?.content;
                setSkillPage(response?.data?.number + 1);
                setSkillPageSize(response?.data?.size);
                setTotalSkillPages(response?.data?.totalPages);
                setTotalSkillRecords(response?.data?.totalElements);
                setLoadingSkills(false);
            };
            getSkills();
        } catch (error) {
            console.log(error);
        }
    }, [skillPage, skillPageSize]);

    useEffect(() => {
        try {
            setLoadingEntities(true);
            const getEntities = async () => {
                const response = await axios({
                    method: "get",
                    url: `${import.meta.env.VITE_BASE_URL}/getAlltheEntitiesDetails?page=${
                        entityPage - 1
                    }&size=${entityPageSize}`,
                });
                setEntities(response?.data?.content);
                setEntityPage(response?.data?.number + 1);
                setEntityPageSize(response?.data?.size);
                setTotalEntityPages(response?.data?.totalPages);
                setTotalEntityRecords(response?.data?.totalElements);
                setLoadingEntities(false);
            };
            getEntities();
        } catch (error) {
            console.log(error);
        }
    }, [entityPage, entityPageSize]);

    useEffect(() => {
        const getInspectionTypeDetails = async () => {
            const response = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/getInspectionTypeById/${inspectionTypeId}`,
            });
            const inspectionTypeData = response?.data;
            setInspectionType(inspectionTypeData?.inspectionTypePrimaryDetails?.name);
            setSelectedControlType(inspectionTypeData?.inspectionTypePrimaryDetails?.controlTypeId);
            setThreshold(inspectionTypeData?.inspectionTypePrimaryDetails?.threshold);
            setPrimaryDetails({
                smallEffort: inspectionTypeData?.inspectionTypePrimaryDetails?.low,
                mediumEffort: inspectionTypeData?.inspectionTypePrimaryDetails?.medium,
                largeEffort: inspectionTypeData?.inspectionTypePrimaryDetails?.high,
            });
            setSelectedSkills(inspectionTypeData?.inspectionTypePrimaryDetails?.skills?.map((skill) => skill?.skillId));
            setSelectedEntities(inspectionTypeData?.entityDetailsDTOs?.map((entity) => entity?.entityId));
            inspectionTypeData?.inspectionSLA?.map((sla) => {
                if (sla?.entitySize === "Small") {
                    setSLAData((prev) => ({
                        ...prev,
                        Small: {
                            inspector: {
                                goal: sla?.inspectorGoal,
                                deadline: sla?.inspectorDeadline,
                            },
                            reviewer: {
                                goal: sla?.reviewerGoal,
                                deadline: sla?.reviewerDeadline,
                            },
                            approver: {
                                goal: sla?.approverGoal,
                                deadline: sla?.approverDeadline,
                            },
                        },
                    }));
                }
                if (sla?.entitySize === "Medium") {
                    setSLAData((prev) => ({
                        ...prev,
                        Medium: {
                            inspector: {
                                goal: sla?.inspectorGoal,
                                deadline: sla?.inspectorDeadline,
                            },
                            reviewer: {
                                goal: sla?.reviewerGoal,
                                deadline: sla?.reviewerDeadline,
                            },
                            approver: {
                                goal: sla?.approverGoal,
                                deadline: sla?.approverDeadline,
                            },
                        },
                    }));
                }
                if (sla?.entitySize === "Large") {
                    setSLAData((prev) => ({
                        ...prev,
                        Large: {
                            inspector: {
                                goal: sla?.inspectorGoal,
                                deadline: sla?.inspectorDeadline,
                            },
                            reviewer: {
                                goal: sla?.reviewerGoal,
                                deadline: sla?.reviewerDeadline,
                            },
                            approver: {
                                goal: sla?.approverGoal,
                                deadline: sla?.approverDeadline,
                            },
                        },
                    }));
                }
            });
        };
        if (inspectionTypeId) {
            getInspectionTypeDetails();
        }
    }, [inspectionTypeId]);

    const submitInspectionType = async () => {
        setIsSubmitInspectionType(true);
        try {
            let existingSelectedSkills = [];
            let newSelectedSkills = [];
            skillDetails.current?.map((skill) => {
                if (selectedSkills?.includes(skill?.skillId)) {
                    existingSelectedSkills.push(skill?.skillId);
                }
            });
            const skillIds = skillDetails.current?.map((skill) => skill?.skillId);
            const newIds = selectedSkills?.filter((skillId) => !skillIds.includes(skillId));
            skills?.map((skill) => {
                if (newIds?.includes(skill.skillId)) {
                    newSelectedSkills.push(skill?.skill);
                }
            });

            const periodicityDetails =
                periodicity?.occurence === "WEEKLY"
                    ? {
                          scheduleType: periodicity?.occurence,
                          startDate: dayjs(periodicity?.inspectionStartDate).format("YYYY-MM-DD"),
                          endDate: dayjs(periodicity?.inspectionEndDate).format("YYYY-MM-DD"),
                          interval: periodicity?.everyWeek,
                          daysOfWeek: [periodicity?.selectedDay.toUpperCase()],
                      }
                    : periodicity?.occurence === "MONTHLY"
                    ? {
                          scheduleType: periodicity?.occurence,
                          startDate: dayjs(periodicity?.inspectionStartDate).format("YYYY-MM-DD"),
                          endDate: dayjs(periodicity?.inspectionEndDate).format("YYYY-MM-DD"),
                          interval: periodicity?.everyMonth,
                          daysOfMonth: periodicity?.selectedOption === "onDay" ? periodicity?.onDay : "",
                          weekPosition:
                              periodicity?.selectedOption === "onEvery"
                                  ? `${periodicity?.week?.toUpperCase()}_${periodicity?.weekday?.toUpperCase()}`
                                  : "",
                      }
                    : periodicity?.occurence === "CUSTOM"
                    ? {
                          scheduleType: periodicity?.occurence,
                          startDate: dayjs(periodicity?.inspectionStartDate).format("YYYY-MM-DD"),
                          endDate: dayjs(periodicity?.inspectionEndDate).format("YYYY-MM-DD"),
                          customDays: periodicity?.specificDay,
                      }
                    : {
                          scheduleType: periodicity?.occurence,
                      };
            const response = await axios({
                method: "post",
                url: `${import.meta.env.VITE_BASE_URL}/addEditInspectionType?action=${inspectionTypeId ? "edit" : "save"}`,
                data: {
                    inspectionTypePrimaryDetails: {
                        name: inspectionType,
                        ins_type_id: inspectionTypeId,
                        controlTypeId: selectedControlType,
                        threshold: threshold,
                        isActive: true,
                        high: `${primarydetails?.largeEffort}:00`,
                        medium: `${primarydetails?.mediumEffort}:00`,
                        low: `${primarydetails?.smallEffort}:00`,
                        entitySize: "",
                        newSkills: newSelectedSkills,
                        existingSkills: existingSelectedSkills,
                    },
                    inspectionTypeSLA: {
                        entitySizes: {
                            Small: {
                                inspectorGoal: SLAData?.Small?.inspector?.goal,
                                inspectorDeadline: SLAData?.Small?.inspector?.deadline,
                                reviewerGoal: SLAData?.Small?.reviewer?.goal,
                                reviewerDeadline: SLAData?.Small?.reviewer?.deadline,
                                approverGoal: SLAData?.Small?.approver?.goal,
                                approverDeadline: SLAData?.Small?.approver?.deadline,
                            },
                            Large: {
                                inspectorGoal: SLAData?.Large?.inspector?.goal,
                                inspectorDeadline: SLAData?.Large?.inspector?.deadline,
                                reviewerGoal: SLAData?.Large?.reviewer?.goal,
                                reviewerDeadline: SLAData?.Large?.reviewer?.deadline,
                                approverGoal: SLAData?.Large?.approver?.goal,
                                approverDeadline: SLAData?.Large?.approver?.deadline,
                            },
                            Medium: {
                                inspectorGoal: SLAData?.Medium?.inspector?.goal,
                                inspectorDeadline: SLAData?.Medium?.inspector?.deadline,
                                reviewerGoal: SLAData?.Medium?.reviewer?.goal,
                                reviewerDeadline: SLAData?.Medium?.reviewer?.deadline,
                                approverGoal: SLAData?.Medium?.approver?.goal,
                                approverDeadline: SLAData?.Medium?.approver?.deadline,
                            },
                        },
                    },
                    inspectionTypeEntity: {
                        entityIds: selectedEntities,
                    },
                    periodicity: periodicityDetails,
                },
            });
            if (response?.data?.status?.toUpperCase() === "SUCCESS") {
                setSnack({ open: true, message: response?.data?.message, severity: "success" });
                navigate(`/configurations/inspection-type`);
            } else {
                setSnack({ open: true, message: response?.data?.message, severity: "error" });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitInspectionType(false);
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
                            {inspectionTypeId ? "Edit" : "Add"} Inspection Type
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
                        }}
                    >
                        {isSubmitInspectionType && <Loader />}
                        <Grid2 container spacing={3}>
                            <Grid2 size={4}>
                                <Typography>
                                    Inspection Type<span style={{ color: "red" }}>*</span>
                                </Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    className="inputFields"
                                    value={inspectionType}
                                    onChange={(e) => setInspectionType(e.target.value)}
                                />
                            </Grid2>
                            <Grid2 size={4}>
                                <Typography>
                                    Control Types<span style={{ color: "red" }}>*</span>
                                </Typography>
                                <FormControl className="inputFields" fullWidth>
                                    <Select
                                        value={selectedControlType}
                                        onChange={(e) => setSelectedControlType(e.target.value)}
                                        fullWidth
                                    >
                                        {controlTypes?.map((controlType) => {
                                            return (
                                                <MenuItem value={controlType?.controlTypeId}>
                                                    {controlType?.controlTypeName}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid2>
                            <Grid2 size={4}>
                                <Typography>
                                    Threshold<span style={{ color: "red" }}>*</span>
                                </Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    className="inputFields"
                                    value={threshold}
                                    onChange={(e) => setThreshold(e.target.value)}
                                />
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
                                "& .MuiTabs-scroller": {
                                    height: "40px",
                                },
                            }}
                        >
                            <Tab label="Primary Details" {...a11yProps(0)} />
                            <Tab label="SLAs (in days)" {...a11yProps(1)} />
                            <Tab label="Entity Mapping" {...a11yProps(2)} />
                            <Tab label="Manage Periodicity" {...a11yProps(3)} />
                        </Tabs>
                        <TabPanel value={tabNumber} index={0}>
                            <PrimaryFields
                                inspectionType={inspectionType}
                                primarydetails={primarydetails}
                                setPrimaryDetails={setPrimaryDetails}
                                skills={skills}
                                setSkills={setSkills}
                                selectedSkills={selectedSkills}
                                setSelectedSkills={setSelectedSkills}
                                skillPage={skillPage}
                                setSkillPage={setSkillPage}
                                skillPageSize={skillPageSize}
                                setSkillPageSize={setSkillPageSize}
                                totalSkillPages={totalSkillPages}
                                totalSkillRecords={totalSkillRecords}
                                loadingSkills={loadingSkills}
                            />
                        </TabPanel>
                        <TabPanel value={tabNumber} index={1}>
                            <SLATabs SLAData={SLAData} setSLAData={setSLAData} />
                        </TabPanel>
                        <TabPanel value={tabNumber} index={2}>
                            <EntityTable
                                entities={entities}
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
                        <TabPanel value={tabNumber} index={3}>
                            <Periodicity periodicity={periodicity} setPeriodicity={setPeriodicity} />
                        </TabPanel>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                            <Button
                                sx={{
                                    backgroundColor: theme.palette.colors[11],
                                    textTransform: "none",
                                    borderRadius: "20px",
                                    width: "100px",
                                    height: "40px",
                                    "&:hover": {
                                        backgroundColor: theme.palette.colors?.[11],
                                    },
                                }}
                                onClick={submitInspectionType}
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

export default AddNewInspection