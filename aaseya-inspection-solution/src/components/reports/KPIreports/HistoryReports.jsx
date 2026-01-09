import {
    Box,
    Button,
    Chip,
    FormControl,
    Grid2,
    ListItemText,
    MenuItem,
    Popper,
    Select,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import "../reportStyles.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EntityHistoryReport from "./EntityHistoryReport";
import InspectionHistoryReport from "./InspectionHistoryReport";
import axios from "axios";
import CustomCheckbox from "../../global/CustomCheckbox";
import CloseIcon from "@mui/icons-material/Close";
import { SnackContext } from "../../global/SnackProvider";
import dayjs from "dayjs";

const HistoryReports = () => {
    const theme = useTheme();
    const [selectedTab, setSelectedTab] = useState("entity-history");
    const [isShowFilters, setIsShowFilters] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const filterRef = useRef(null);
    const [entityHistoryFilter, setEntityHistoryFilter] = useState({
        entityName: 0,
        inspectionStartDate: null,
        inspectionEndDate: null,
    });
    const [inspectionHistoryFilter, setInspectionHistoryFilter] = useState({
        inspectorName: 0,
        inspectionType: 0,
        inspectionStartDate: null,
        inspectionEndDate: null,
        inspectionSource: 0,
    });
    const [isShowReport, setIsShowReport] = useState(false);
    const [inspectors, setInspectors] = useState([]);
    const [inspectionTypes, setInspectionTypes] = useState([]);
    const [entityNames, setEntityNames] = useState([]);
    const [selectedInspectionTypes, setSelectedInspectionTypes] = useState([]);
    const [selectedInspectionSource, setSelectedInspectionSource] = useState([]);
    const { snack, setSnack } = useContext(SnackContext);
    const [entityDetails, setEntityDetails] = useState({});
    const [casesByInspectionType, setCasesByInspectionType] = useState({});
    const [casesByStatus, setCasesByStatus] = useState({});
    const [casesBySource, setCasesBySource] = useState({});
    const [inspectionByEntities, setInspectionByEntities] = useState({});
    const [caseCounts, setCaseCounts] = useState({});
    const [cases, setCases] = useState([]);
    const [inspectionHistoryChart, setInspectionHistoryChart] = useState({});
    const [inspectionHistoryCases, setInspectionHistoryCases] = useState([]);
    const inspectionSource = ["Adhoc", "Follow Up", "Re Inspection", "Periodic"];

    useEffect(() => {
        if (filterRef.current) {
            setAnchorEl(filterRef.current);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [entityNamesResponse, inspectorsResponse, inspectionTypesResponse] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_BASE_URL}/getEntityNames`),
                    axios.get(`${import.meta.env.VITE_BASE_URL}/getAllInspectorNames?role=Inspector`),
                    axios.get(`${import.meta.env.VITE_BASE_URL}/getAllInspectionTypes`),
                ]);
                setEntityNames(entityNamesResponse?.data);
                setInspectors(inspectorsResponse?.data);
                setInspectionTypes(inspectionTypesResponse?.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData();
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setIsShowFilters(!isShowFilters);
    };

    const fetchEntityHistory = async () => {
        try {
            if (
                !entityHistoryFilter?.entityName ||
                !entityHistoryFilter?.inspectionStartDate ||
                !entityHistoryFilter?.inspectionEndDate
            ) {
                setSnack({ open: true, message: "Please select all the filters", severity: "error" });
                return;
            } else {
                const formattedStartDate = dayjs(entityHistoryFilter.inspectionStartDate).format("YYYY-MM-DD");
                const formattedEndDate = dayjs(entityHistoryFilter.inspectionEndDate).format("YYYY-MM-DD");

                const [entityResponse, reportResponse, caseResponse] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_BASE_URL}/getEntityReportById?entityId=${entityHistoryFilter?.entityName}`),
                    axios.post(`${import.meta.env.VITE_BASE_URL}/getEntityInspectionReport`, {
                        startdate: formattedStartDate,
                        enddate: formattedEndDate,
                        entityId: entityHistoryFilter?.entityName,
                    }),
                    axios.post(`${import.meta.env.VITE_BASE_URL}/getEntityInspectionCasesReport`, {
                        startdate: formattedStartDate,
                        enddate: formattedEndDate,
                        entityId: entityHistoryFilter?.entityName,
                    }),
                ]);
                setEntityDetails(entityResponse?.data);
                setCasesByInspectionType(reportResponse?.data?.casesByInspectionType);
                setCasesByStatus(reportResponse?.data?.casesByStatus);
                setCasesBySource(reportResponse?.data?.casesBySource);
                setCases(caseResponse?.data);
                setIsShowFilters(false);
                setIsShowReport(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchInspectionHistory = async () => {
        try {
            if (
                !inspectionHistoryFilter?.inspectorName ||
                !selectedInspectionTypes?.length > 0 ||
                !selectedInspectionSource?.length > 0 ||
                !inspectionHistoryFilter?.inspectionStartDate ||
                !inspectionHistoryFilter?.inspectionEndDate
            ) {
                setSnack({ open: true, message: "Please select all the filters", severity: "error" });
                return;
            } else {
            const filteredInspectionTypes = inspectionTypes?.filter((inspectionType) =>
                selectedInspectionTypes?.includes(inspectionType?.id)
            );
            const inspectionTypeNames = filteredInspectionTypes?.map((inspectionType) => inspectionType?.name);
            const [inspectionResponse, casesResponse] = await Promise.all([
                axios.post(`${import.meta.env.VITE_BASE_URL}/inspectionHistory`, {
                    inspectorId: inspectionHistoryFilter?.inspectorName,
                    fromDate: dayjs(inspectionHistoryFilter?.inspectionStartDate).format("YYYY-MM-DD"),
                    toDate: dayjs(inspectionHistoryFilter?.inspectionEndDate).format("YYYY-MM-DD"),
                    inspectionTypeIds: inspectionTypeNames,
                    inspectionSource: selectedInspectionSource,
                }),
                axios.post(`${import.meta.env.VITE_BASE_URL}/inspectionHistory/getCases`, {
                    inspectorId: inspectionHistoryFilter?.inspectorName,
                    fromDate: dayjs(inspectionHistoryFilter?.inspectionStartDate).format("YYYY-MM-DD"),
                    toDate: dayjs(inspectionHistoryFilter?.inspectionEndDate).format("YYYY-MM-DD"),
                    inspectionTypeIds: inspectionTypeNames,
                    inspectionSource: selectedInspectionSource,
                }),
            ]);
            setCasesByInspectionType(inspectionResponse?.data?.inspectionByInspectionType);
            setCasesByStatus(inspectionResponse?.data?.inspectionByStatus);
            setCasesBySource(inspectionResponse?.data?.inspectionBySource);
            setInspectionByEntities(inspectionResponse?.data?.inspectionByEntities);
            setCaseCounts({
                casesCount: inspectionResponse?.data?.casesCount,
                entitiesCount: inspectionResponse?.data?.entitiesCount,
                percentageCompleted: inspectionResponse?.data?.percentageCompleted,
            });
            setCases(casesResponse?.data);
            setIsShowFilters(false);
            setIsShowReport(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Grid2 container justifyContent="space-between" sx={{ px: 2.5 }}>
                <Grid2 size={6}>
                    <Button
                        sx={{
                            color: selectedTab === "entity-history" ? "#4C8B92" : "#00060A",
                            textTransform: "none",
                            border: selectedTab === "entity-history" ? "1px solid #4C8B92" : "1px solid #A2A2A2",
                            borderRadius: "20px",
                            width: "200px",
                            height: "40px",
                            fontWeight: 600,
                            fontSize: "14px",
                            backgroundColor: selectedTab === "entity-history" ? "#F1FCFC" : "",
                            mr: 2,
                        }}
                        onClick={() => {
                            setSelectedTab("entity-history");
                            if (filterRef.current) {
                                setAnchorEl(filterRef.current);
                            }
                            setIsShowFilters(true);
                            setIsShowReport(false);
                        }}
                    >
                        Entity Inspection History
                    </Button>
                    <Button
                        sx={{
                            color: selectedTab === "inspection-history" ? "#4C8B92" : "#00060A",
                            textTransform: "none",
                            border: selectedTab === "inspection-history" ? "1px solid #4C8B92" : "1px solid #A2A2A2",
                            borderRadius: "20px",
                            width: "200px",
                            height: "40px",
                            fontWeight: 600,
                            fontSize: "14px",
                            backgroundColor: selectedTab === "inspection-history" ? "#F1FCFC" : "",
                        }}
                        onClick={() => {
                            setSelectedTab("inspection-history");
                            if (filterRef.current) {
                                setAnchorEl(filterRef.current);
                            }
                            setIsShowFilters(true);
                            setIsShowReport(false);
                        }}
                    >
                        Inspection History
                    </Button>
                </Grid2>
                <Grid2 size={6} container justifyContent="flex-end" columnGap={2}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            background: `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                            boxShadow: `0px 1px 4px ${theme.palette.colors[3]}`,
                            borderRadius: "4px",
                            opacity: 1,
                            height: "40px",
                            width: "40px",
                            cursor: "pointer",
                        }}
                    >
                        <FileDownloadOutlinedIcon sx={{ color: `${theme.palette.colors[8]}` }} />
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        ref={filterRef}
                        sx={{
                            background: `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                            boxShadow: `0px 1px 4px ${theme.palette.colors[3]}`,
                            borderRadius: "4px",
                            opacity: 1,
                            height: "40px",
                            width: "40px",
                            cursor: "pointer",
                        }}
                        onClick={handleClick}
                    >
                        <FilterAltOutlinedIcon sx={{ color: `${theme.palette.colors[8]}` }} />
                    </Box>
                </Grid2>

                <Popper
                    sx={{
                        zIndex: 9,
                        background: "#FFFFFF 0% 0% no-repeat padding-box",
                        boxShadow: "0px 3px 15px #00000029",
                        borderRadius: "4px",
                        marginTop: "2px !important",
                        width: "85%",
                    }}
                    open={isShowFilters}
                    anchorEl={anchorEl}
                    placement={"bottom-end"}
                    modifiers={[
                        {
                            name: "flip",
                            enabled: false,
                            options: {
                                altBoundary: true,
                                rootBoundary: "document",
                                padding: 8,
                            },
                        },
                        {
                            name: "preventOverflow",
                            enabled: true,
                            options: {
                                altAxis: false,
                                altBoundary: true,
                                tether: true,
                                rootBoundary: "document",
                                padding: 8,
                            },
                        },
                    ]}
                >
                    <Grid2 container sx={{ p: 3 }} spacing={3} justifyContent="space-between">
                        <Grid2 size={12}>
                            <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>Filter By</Typography>
                        </Grid2>
                        {selectedTab === "entity-history" ? (
                            <>
                                <Grid2 size={6} sx={{ pr: 3 }}>
                                    <Typography sx={{ fontSize: "16px", fontWeight: 500, mb: 2 }}>Entity Details</Typography>
                                    <Typography>Entity Name</Typography>
                                    <FormControl fullWidth className="inputFields">
                                        <Select
                                            value={entityHistoryFilter?.entityName}
                                            onChange={(e) =>
                                                setEntityHistoryFilter({
                                                    ...entityHistoryFilter,
                                                    entityName: e.target.value,
                                                })
                                            }
                                            sx={{
                                                "& .MuiSelect-select": {
                                                    padding: "9px 0 9px 20px",
                                                },
                                                mb: 3,
                                            }}
                                        >
                                            <MenuItem value={0} disabled>
                                                Select
                                            </MenuItem>
                                            {entityNames?.map((entity) => {
                                                return (
                                                    <MenuItem key={entity?.entityid} value={entity?.entityid}>
                                                        {entity?.name}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid2>
                                <Grid2 size={6}>
                                    <Typography sx={{ fontSize: "16px", fontWeight: 500, mb: 2 }}>Inspection Dates</Typography>
                                    <Grid2 container spacing={3} sx={{ mb: 3 }}>
                                        <Grid2 size={6}>
                                            <Typography>From</Typography>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    className="inputFields"
                                                    value={entityHistoryFilter?.inspectionStartDate}
                                                    onChange={(value) =>
                                                        setEntityHistoryFilter({
                                                            ...entityHistoryFilter,
                                                            inspectionStartDate: value,
                                                        })
                                                    }
                                                    minDate={entityHistoryFilter?.inspectionEndDate?.subtract(1, "year")}
                                                    maxDate={entityHistoryFilter?.inspectionEndDate}
                                                    format="DD MMM YYYY"
                                                    sx={{ width: "100%" }}
                                                />
                                            </LocalizationProvider>
                                        </Grid2>
                                        <Grid2 size={6}>
                                            <Typography>To</Typography>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    className="inputFields"
                                                    value={entityHistoryFilter?.inspectionEndDate}
                                                    onChange={(value) => {
                                                        setEntityHistoryFilter({
                                                            ...entityHistoryFilter,
                                                            inspectionEndDate: value,
                                                        });
                                                    }}
                                                    minDate={entityHistoryFilter?.inspectionStartDate}
                                                    maxDate={entityHistoryFilter?.inspectionStartDate?.add(1, "year")}
                                                    format="DD MMM YYYY"
                                                    sx={{ width: "100%" }}
                                                />
                                            </LocalizationProvider>
                                        </Grid2>
                                    </Grid2>
                                </Grid2>
                            </>
                        ) : (
                            <>
                                <Grid2 size={6} sx={{ pr: 6 }}>
                                    <Typography>Inspector Name</Typography>
                                    <FormControl fullWidth className="inputFields">
                                        <Select
                                            value={inspectionHistoryFilter?.inspectorName}
                                            onChange={(e) =>
                                                setInspectionHistoryFilter({
                                                    ...inspectionHistoryFilter,
                                                    inspectorName: e.target.value,
                                                })
                                            }
                                            sx={{
                                                "& .MuiSelect-select": {
                                                    padding: "9px 0 9px 20px",
                                                },
                                                mb: 3,
                                            }}
                                        >
                                            <MenuItem value={0} disabled>
                                                Select
                                            </MenuItem>
                                            {inspectors?.map((inspector) => {
                                                return (
                                                    <MenuItem key={inspector?.userID} value={inspector?.userid}>
                                                        {inspector?.userName}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                    <Typography>Inspection Type</Typography>
                                    <FormControl fullWidth className="inputFields">
                                        <Select
                                            multiple
                                            value={selectedInspectionTypes}
                                            onChange={(e) => {
                                                // setIsShowSelectedInspectionTypes(false);
                                                setSelectedInspectionTypes(
                                                    typeof e.target.value === "string"
                                                        ? e.target.value.split(",")
                                                        : e.target.value
                                                );
                                            }}
                                            endAdornment={
                                                <>
                                                    {selectedInspectionTypes?.length > 0 && (
                                                        <CloseIcon
                                                            sx={{
                                                                color: "#5F6368",
                                                                cursor: "pointer",
                                                                fontSize: "15px",
                                                                mr: 1,
                                                            }}
                                                            onClick={() => setSelectedInspectionTypes([])}
                                                        />
                                                    )}
                                                </>
                                            }
                                            renderValue={(selected) => (
                                                <Box sx={{ display: "flex" }}>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            gap: 0.5,
                                                            overflow: "hidden",
                                                            " .MuiChip-root": {
                                                                height: "26px",
                                                                borderRadius: "4px",
                                                            },
                                                        }}
                                                    >
                                                        {selected?.map((value) => (
                                                            <Chip
                                                                key={value}
                                                                label={
                                                                    inspectionTypes?.find(
                                                                        (inspectionType) => inspectionType?.id === value
                                                                    )?.name
                                                                }
                                                            />
                                                        ))}
                                                    </Box>
                                                    {selected?.length > 2 && (
                                                        <Button
                                                            // ref={inspectionTypeAnchorRef}
                                                            sx={{
                                                                color: `${theme.palette.colors[11]}`,
                                                                size: "small",
                                                                height: "26px",
                                                            }}
                                                            onMouseLeave={() => {
                                                                // setIsShowSelectedInspectionTypes(false);
                                                            }}
                                                            onMouseEnter={(event) => {
                                                                // setIsShowSelectedInspectionTypes(true);
                                                            }}
                                                        >
                                                            +{selected.length - 2} more
                                                        </Button>
                                                    )}
                                                </Box>
                                            )}
                                            sx={{
                                                height: "40px",
                                                width: "100%",
                                            }}
                                        >
                                            {inspectionTypes?.map((inspectionType) => (
                                                <MenuItem key={inspectionType?.id} value={inspectionType?.id}>
                                                    <CustomCheckbox
                                                        checked={selectedInspectionTypes?.includes(inspectionType?.id)}
                                                    />
                                                    <ListItemText primary={inspectionType?.name} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid2>
                                <Grid2 size={6}>
                                    <Typography sx={{ fontWeight: 500 }}>Inspection Dates</Typography>
                                    <Grid2 container spacing={3} sx={{ mb: 3 }}>
                                        <Grid2 size={6}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    className="inputFields"
                                                    slotProps={{ textField: { placeholder: "From" } }}
                                                    value={inspectionHistoryFilter?.inspectionStartDate}
                                                    onChange={(value) =>
                                                        setInspectionHistoryFilter({
                                                            ...inspectionHistoryFilter,
                                                            inspectionStartDate: value,
                                                        })
                                                    }
                                                    minDate={inspectionHistoryFilter?.inspectionEndDate?.subtract(1, "year")}
                                                    maxDate={inspectionHistoryFilter?.inspectionEndDate}
                                                    format="DD MMM YYYY"
                                                    sx={{ width: "100%" }}
                                                />
                                            </LocalizationProvider>
                                        </Grid2>
                                        <Grid2 size={6}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    className="inputFields"
                                                    slotProps={{ textField: { placeholder: "To" } }}
                                                    value={inspectionHistoryFilter?.inspectionEndDate}
                                                    onChange={(value) =>
                                                        setInspectionHistoryFilter({
                                                            ...inspectionHistoryFilter,
                                                            inspectionEndDate: value,
                                                        })
                                                    }
                                                    minDate={inspectionHistoryFilter?.inspectionStartDate}
                                                    maxDate={inspectionHistoryFilter?.inspectionStartDate?.add(1, "year")}
                                                    format="DD MMM YYYY"
                                                    sx={{ width: "100%" }}
                                                />
                                            </LocalizationProvider>
                                        </Grid2>
                                    </Grid2>
                                    <Typography>Inspection Source</Typography>
                                    <FormControl fullWidth className="inputFields">
                                        <Select
                                            multiple
                                            value={selectedInspectionSource}
                                            onChange={(e) => {
                                                setSelectedInspectionSource(
                                                    typeof e.target.value === "string"
                                                        ? e.target.value.split(",")
                                                        : e.target.value
                                                );
                                            }}
                                            endAdornment={
                                                <>
                                                    {selectedInspectionSource?.length > 0 && (
                                                        <CloseIcon
                                                            sx={{
                                                                color: "#5F6368",
                                                                cursor: "pointer",
                                                                fontSize: "15px",
                                                                mr: 1,
                                                            }}
                                                            onClick={() => setSelectedInspectionSource([])}
                                                        />
                                                    )}
                                                </>
                                            }
                                            renderValue={(selected) => (
                                                <Box sx={{ display: "flex" }}>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            gap: 0.5,
                                                            overflow: "hidden",
                                                            " .MuiChip-root": {
                                                                height: "26px",
                                                                borderRadius: "4px",
                                                            },
                                                        }}
                                                    >
                                                        {selected?.map((value) => (
                                                            <Chip key={value} label={value} />
                                                        ))}
                                                    </Box>
                                                </Box>
                                            )}
                                            sx={{
                                                height: "40px",
                                                width: "100%",
                                            }}
                                        >
                                            <MenuItem value="" disabled>
                                                Select
                                            </MenuItem>
                                            {inspectionSource?.map((source) => (
                                                <MenuItem key={source} value={source}>
                                                    <CustomCheckbox checked={selectedInspectionSource?.includes(source)} />
                                                    <ListItemText primary={source} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid2>
                            </>
                        )}
                    </Grid2>
                    <Grid2 container alignItems="flex-end" justifyContent="flex-end" sx={{ pr: 3, pb: 3 }}>
                        <Button
                            sx={{
                                border: "1px solid #4C8B92",
                                textTransform: "none",
                                borderRadius: "20px",
                                color: "#4C8B92",
                                px: 4,
                                height: "40px",
                                mr: 3,
                                ":hover": {
                                    border: "1px solid #4C8B92",
                                },
                            }}
                            onClick={() => {
                                setEntityHistoryFilter({
                                    entityName: 0,
                                    inspectionStartDate: null,
                                    inspectionEndDate: null,
                                });
                                // setIsShowFilters(false);
                                setIsShowReport(false);
                            }}
                        >
                            Reset
                        </Button>
                        <Button
                            sx={{
                                backgroundColor: theme.palette.colors[11],
                                textTransform: "none",
                                borderRadius: "20px",
                                px: 4,
                                height: "40px",
                                ":hover": {
                                    backgroundColor: theme.palette.colors[11],
                                },
                            }}
                            onClick={() => {
                                if (selectedTab === "entity-history") {
                                    fetchEntityHistory();
                                } else {
                                    fetchInspectionHistory();
                                }
                            }}
                        >
                            Apply
                        </Button>
                    </Grid2>
                </Popper>
            </Grid2>
            {selectedTab === "entity-history" && isShowReport && (
                <EntityHistoryReport
                    entityDetails={entityDetails}
                    casesByInspectionType={casesByInspectionType}
                    casesByStatus={casesByStatus}
                    casesBySource={casesBySource}
                    cases={cases}
                />
            )}
            {selectedTab === "inspection-history" && isShowReport && (
                <InspectionHistoryReport
                    caseCounts={caseCounts}
                    inspectionByEntities={inspectionByEntities}
                    casesByInspectionType={casesByInspectionType}
                    casesByStatus={casesByStatus}
                    casesBySource={casesBySource}
                    cases={cases}
                />
            )}
        </>
    );
};

export default HistoryReports;
