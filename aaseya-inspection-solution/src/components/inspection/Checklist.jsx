import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Box,
    Typography,
    Grid2,
    Button,
    useTheme,
    Divider,
    styled,
    TextField,
    IconButton,
    CircularProgress,
    FormControlLabel,
    RadioGroup,
    Link,
    Checkbox,
    FormControl,
    Select,
    MenuItem,
    Grid,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CustomCheckbox from "../global/CustomCheckbox";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AddActionsOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import AddNotes from "../../assets/add-notes.png";
import DownloadImage from "../../assets/download.png";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import "./checklist.css";
import axios from "axios";
import { SnackContext } from "../global/SnackProvider";
import { useNavigate } from "react-router-dom";
import CustomRadio from "../global/CustomRadio";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import Loader from "../global/Loader";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const Checklist = ({
    inspectionChecklists,
    setInspectionChecklists,
    amountStatus, setAmountStatus,
    inspectionID,
    inspectorReport,
    approverReport,
    action = "",
    groupInspectors = [],
    caseDetails,
}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [inspectionChecklist, setInspectionChecklist] = useState([]);
    const [categoryChecklist, setCategoryChecklist] = useState({});
    const [categoryChecklistItems, setCategoryChecklistItems] = useState([]);
    const [categoryName, setCategoryName] = useState("Summary of the Documents");
    const [correctiveAction, setCorrectiveAction] = useState("");
    const [displayNote, setDisplayNote] = useState("");
    const [displayAddAction, setDisplayAddAction] = useState("");
    const currentChecklistId = useRef(0);
    const [inspectionReport, setInspectionReport] = useState("");
    const [showInspectionReport, setShowInspectionReport] = useState(
        localStorage.getItem("userRole") === "INSPECTOR" ? false : true
    );
    const [showRecommendedActions, setShowRecommendedActions] = useState(false);
    const totalChecklistItems = useRef(0);
    const answeredChecklistItems = useRef(0);
    const checklistContainerRef = useRef(null);
    const { snack, setSnack } = useContext(SnackContext);
    const [isSaveInspection, setIsSaveInspection] = useState(false);
    const [approverCategoryReport, setApproverCategoryReport] = useState("");
    const [reviwerCategoryReport, setReviwerCategoryReport] = useState("");
    const [recommendedAction, setRecommendedAction] = useState(null);
    const [inspectionSummaryReport, setInspectionSummaryReport] = useState("");
    const [inspectionDate, setInspectionDate] = useState(null);
    const [followUpDate, setFollowUpDate] = useState(null);
    const [ReInspectionDate, setReInspectionDate] = useState(null);
    const [selectedchecklistitems, setSelectedChecklistItems] = useState([]);
    const [apiData, setApiData] = useState("");
    const categoryRefs = useRef([]);
    const [isRedo, setIsRedo] = useState(false);
    const [inputs, setInputs] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);
    const [isEditCorrectiveAction, setIsEditCorrectiveAction] = useState(false);
    const [editedCorrectiveAction, setEditedCorrectiveAction] = useState("");
    const answeredChecklistCount = useRef({});
    const [correctiveActionId, setCorrectiveActionId] = useState(null);
    const [categoryInspectorID, setCategoryInspectorID] = useState("");
    const [documentSummary, setDocumentSummary] = useState({});

    useEffect(() => {
        const getDocumentSummary = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/documentssummary/${caseDetails?.claimId}`);
            setDocumentSummary(response?.data);
        };
        if (caseDetails?.claimId) {
            getDocumentSummary();
        }
    }, [caseDetails?.claimId]);

    useEffect(() => {
        if (checklistContainerRef.current) {
            checklistContainerRef.current.scrollTop = 0;
        }
    }, [categoryName]);

    useEffect(() => {
        setInspectionReport(inspectorReport);
    }, [inspectorReport]);

    useEffect(() => {
        setInspectionSummaryReport(approverReport);
    }, [approverReport]);

    useEffect(() => {
        setSelectedChecklistItems([]);
    }, [categoryChecklist]);

    const updateInspectionChecklist = (catName) => {
        setApproverCategoryReport("");
        setShowInspectionReport(false);
        setShowRecommendedActions(false);
        setCategoryName(catName);
    };

    const displayInspectionReport = () => {
        setInspectionChecklist((prevItems) => {
            return prevItems.map((item) => {
                if (item?.categoryName === categoryName) {
                    return {
                        ...item,
                        checklistItem: categoryChecklistItems,
                    };
                }
                return item;
            });
        });
        setCategoryChecklist({});
        setCategoryChecklistItems([]);
        setCategoryName("");
        setCategoryInspectorID("");
        setDisplayNote("");
        setDisplayAddAction("");
        setShowInspectionReport(true);
        setShowRecommendedActions(false);
    };

    const displayRecommendedActions = () => {
        setInspectionChecklist((prevItems) => {
            return prevItems.map((item) => {
                if (item?.categoryName === categoryName) {
                    return {
                        ...item,
                        checklistItem: categoryChecklistItems,
                        approverComment: approverCategoryReport,
                        reviewerComment: reviwerCategoryReport,
                    };
                }
                return item;
            });
        });
        setShowRecommendedActions(true);
        setShowInspectionReport(false);
    };

    const updateChecklistAnswer = (checklist, choice) => {
        setInspectionChecklists((prevItems) => {
            return prevItems.map((item) => {
                if (item.checklistDescription === checklist.checklistDescription) {
                    return {
                        ...item,
                        answer: choice,
                    };
                }
                return item;
            });
        });
    };

    const saveInspection = async () => {
        try {
            setIsSaveInspection(true);
            let submissionData = [];
            inspectionChecklist?.forEach((checklistCategory) => {
                if (checklistCategory?.categoryName === categoryName) {
                    categoryChecklistItems?.forEach((item) => {
                        submissionData.push({
                            id: {
                                inspectionID: inspectionID,
                                categoryID: checklistCategory?.categoryId,
                                checklistID: item?.checklist_id,
                            },
                            answer: item?.answer,
                            attachment: item?.attachmentsBase64 || null,
                            comment: item?.comment?.trim(),
                            corrective_actions: item?.selected_corrective_action || [],
                        });
                    });
                } else {
                    checklistCategory?.checklistItem?.forEach((item) => {
                        submissionData.push({
                            id: {
                                inspectionID: inspectionID,
                                categoryID: checklistCategory?.categoryId,
                                checklistID: item?.checklist_id,
                            },
                            answer: item?.answer,
                            attachment: item?.attachmentsBase64 || null,
                            comment: item?.comment?.trim(),
                            corrective_actions: item?.selected_corrective_action || [],
                        });
                    });
                }
            });
            const response = await axios({
                method: "post",
                url: `${import.meta.env.VITE_BASE_URL}/saveInspection`,
                data: {
                    inspectionChecklistandAnswers: submissionData,
                    inspectorComment: inspectionReport,
                },
            });
            if (response?.data?.status === "Failure") {
                setSnack({ open: true, message: "Something went wrong. Please try again.", severity: "error" });
            } else {
                setSnack({ open: true, message: "Inspection saved successfully.", severity: "success" });
            }
            setIsSaveInspection(false);
        } catch (error) {
            console.log(error);
            setIsSaveInspection(false);
            setSnack({ open: true, message: "An error occurred while saving the inspection.", severity: "error" });
        }
    };

    const submitInspection = async () => {
        try {
            setIsSaveInspection(true);
            const response = await axios({
                method: "post",
                url: `${import.meta.env.VITE_BASE_URL}/completeByClaimIdatinspector?claimId=${caseDetails?.claimId}`,
                data: {
                    checklists: inspectionChecklists,
                    claimReport: inspectionReport,
                },
            });
            if (response?.data?.status === "Failure") {
                setSnack({ open: true, message: "Something went wrong. Please try again later.", severity: "error" });
            } else {
                setSnack({ open: true, message: "Inspection submitted successfully.", severity: "success" });
                navigate("/cases");
            }
            setIsSaveInspection(false);
        } catch (error) {
            console.log(error);
            setIsSaveInspection(false);
        }
    };

    const submitInspectionApproval = async (recommendedAction, dateOfFollowUp, ReInspectionDate) => {
        try {
            setIsSaveInspection(true);
            const response = await axios({
                method: "post",
                url: `${import.meta.env.VITE_BASE_URL}/completeByClaimIdAtApprover?claimId=${caseDetails?.claimId}`,
                data: {
                    approverReport: inspectionSummaryReport,
                    recommendedAction: recommendedAction,
                },
            });
            setSnack({ open: true, message: "Inspection Approved Successfully.", severity: "success" });
            navigate(`/cases`);
            setIsSaveInspection(false);
        } catch (error) {
            setIsSaveInspection(false);
            console.log("Error during review submission:", error);
            setSnack({ open: true, message: "Something went wrong. Please try again later.", severity: "error" });
        }
    };

    const submitInspectionReview = async (recommendedAction, dateOfFollowUp, ReInspectionDate) => {
        try {
            setIsSaveInspection(true);
            const response = await axios({
                method: "post",
                url: `${import.meta.env.VITE_BASE_URL}/completeByClaimIdAtReviewer?claimId=${caseDetails?.claimId}`,
                data: {
                    reviewerReport: inspectionSummaryReport,
                    recommendedAction: recommendedAction,
                    amountStatus: amountStatus,
                },
            });
            setSnack({ open: true, message: "Inspection Approved Successfully.", severity: "success" });
            navigate(`/cases`);
            setIsSaveInspection(false);
        } catch (error) {
            setIsSaveInspection(false);
            console.log("Error during review submission:", error);
            setSnack({ open: true, message: "Something went wrong. Please try again later.", severity: "error" });
        }
    };

    const handleGoBackFromRedo = () => {
        setIsRedo(true);
        categoryRefs.current[currentChecklistId.current].click();
    };

    // Handle checkbox changes
    const handleCheckboxChange = (e, checklistId) => {
        const isChecked = e.target.checked;
        setSelectedItems((prevSelectedItems) => {
            if (isChecked) {
                return [...prevSelectedItems, checklistId];
            } else {
                return prevSelectedItems.filter((id) => id !== checklistId);
            }
        });
    };

    const assignCategoriesToInspectors = async (actionType) => {
        try {
            let categoryInspectorMapping = [];
            inspectionChecklist?.forEach((checklist) => {
                categoryInspectorMapping.push({
                    assignTo: checklist?.inspectorID,
                    checklistCatId: checklist?.categoryId,
                });
            });
            const endpoint =
                actionType === "save"
                    ? `${import.meta.env.VITE_BASE_URL}/assignCategory/${inspectionID}/Save`
                    : `${import.meta.env.VITE_BASE_URL}/assignCategory/${inspectionID}/Submit`;
            const response = await axios.post(endpoint, categoryInspectorMapping);
            console.log(response);
            if (response.status === 200) {
                console.log("Categories assigned successfully:", response.data);
                if (actionType === "submit") {
                    navigate("/cases");
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (event, checklistId) => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            [checklistId]: event.target.value,
        }));
    };

    const handleSubmit = (checklistId) => {
        fetchData(checklistId);
    };

    const fetchData = async (checklistId) => {
        try {
            setIsSaveInspection(true);
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/askCopilot`, {
                prompt: inputs[checklistId] || "",
            });

            if (response.data.status === "SUCCESS") {
                setApiData((prevApiData) => ({
                    ...prevApiData,
                    [checklistId]: response.data.chatGPTResponse,
                }));
            } else {
                setApiData((prevApiData) => ({
                    ...prevApiData,
                    [checklistId]: "Error: Unable to fetch data",
                }));
            }
            setIsSaveInspection(false);
        } catch (error) {
            setIsSaveInspection(false);
            console.error("Error fetching data from API:", error);
            setApiData((prevApiData) => ({
                ...prevApiData,
                [checklistId]: "Error: Unable to fetch data",
            }));
        }
    };

    const handleClear = (checklistId) => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            [checklistId]: "",
        }));
    };

    return (
        <>
            <Grid2 container sx={{ m: 2.5 }} spacing={2.5}>
                {isSaveInspection && <Loader />}
                <Grid2 size={3} className="categoryContainer">
                    {(localStorage.getItem("userRole") === "REVIEWER" || localStorage.getItem("userRole") === "APPROVER") && (
                        <Box
                            className="inspectionReportItem"
                            sx={{
                                backgroundColor: showInspectionReport ? theme.palette.colors[20] : "",
                            }}
                            onClick={displayInspectionReport}
                        >
                            <ArrowRightIcon sx={{ fontSize: 30 }} />
                            <Typography className="typographyFontWeight">Claim Report</Typography>
                        </Box>
                    )}
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <ArrowRightIcon sx={{ fontSize: 30 }} />
                            <Typography className="typographyFontWeight">Categories</Typography>
                        </Box>
                    </Box>
                    <Box>
                        {["Summary of the Documents", "Verification Details"]?.map((category, index) => {
                            return (
                                <Box
                                    className="categoryItems"
                                    key={category}
                                    tabIndex={0}
                                    ref={(el) => (categoryRefs.current[index] = el)}
                                    sx={{
                                        backgroundColor:
                                            !showInspectionReport && !showRecommendedActions && category === categoryName
                                                ? theme.palette.colors[20]
                                                : "",
                                    }}
                                    onClick={() => {
                                        currentChecklistId.current = index;
                                        updateInspectionChecklist(category);
                                    }}
                                >
                                    <Typography className="typographyFontWeight">{category}</Typography>
                                </Box>
                            );
                        })}
                    </Box>
                    {action !== "assign" && localStorage.getItem("userRole") === "INSPECTOR" && (
                        <Box
                            className="inspectionReportItem"
                            sx={{
                                backgroundColor: showInspectionReport ? theme.palette.colors[20] : "",
                            }}
                            onClick={displayInspectionReport}
                        >
                            <ArrowRightIcon sx={{ fontSize: 30 }} />
                            <Typography className="typographyFontWeight">Claim Report</Typography>
                        </Box>
                    )}
                    {(localStorage.getItem("userRole") === "APPROVER" || localStorage.getItem("userRole") === "REVIEWER") && (
                        <Box
                            className="inspectionReportItem"
                            sx={{
                                backgroundColor: showRecommendedActions ? theme.palette.colors[20] : "",
                            }}
                            onClick={displayRecommendedActions}
                        >
                            <ArrowRightIcon sx={{ fontSize: 30 }} />
                            <Typography className="typographyFontWeight">Recommended Actions</Typography>
                        </Box>
                    )}
                </Grid2>
                <Grid2 size={9} container className="checklistContainer" ref={checklistContainerRef}>
                    {!showInspectionReport && !showRecommendedActions && (
                        <>
                            <Grid2 container size={12} className="categoryChecklistContainer">
                                {categoryName === "Verification Details" &&
                                    inspectionChecklists?.map((checklist, index) => {
                                        return (
                                            <>
                                                <Grid2 container rowGap={2} sx={{ mb: 2, mt: 4 }} key={checklist.checklistId}>
                                                    <Grid2 container key={checklist.checklistId} sx={{ alignItems: "center" }}>
                                                        <Grid2 container>
                                                            {isRedo && (
                                                                <CustomCheckbox
                                                                    checked={selectedItems.includes(checklist.checklistId)}
                                                                    onChange={(e) =>
                                                                        handleCheckboxChange(e, checklist.checklistId)
                                                                    }
                                                                />
                                                            )}
                                                        </Grid2>
                                                        <Grid2 container>
                                                            <Typography className="typographyFontWeight">
                                                                {checklist.checklistDescription}
                                                            </Typography>
                                                        </Grid2>
                                                    </Grid2>
                                                    <Grid2 container size={12} sx={{ columnGap: 3 }}>
                                                        {"Yes/No"?.split("/")?.map((choice, index) => {
                                                            return (
                                                                <Button
                                                                    variant="outlined"
                                                                    key={choice + index}
                                                                    className="choiceButton"
                                                                    disabled={localStorage.getItem("userRole") !== "INSPECTOR"}
                                                                    sx={{
                                                                        backgroundColor:
                                                                            checklist?.answer === choice
                                                                                ? theme.palette.colors[20]
                                                                                : "",
                                                                        fontWeight: checklist?.answer === choice ? 700 : "",
                                                                        width: "300px",
                                                                    }}
                                                                    onClick={() => updateChecklistAnswer(checklist, choice)}
                                                                >
                                                                    {choice}
                                                                </Button>
                                                            );
                                                        })}
                                                    </Grid2>
                                                </Grid2>
                                                {localStorage.getItem("userRole") === "INSPECTOR" && (
                                                    <Grid2 container size={12} direction="column">
                                                        {/* CoPilot */}
                                                        <Typography className="typographyFontWeight">Co-Pilot</Typography>
                                                        <TextField
                                                            placeholder="Ask Anything"
                                                            size="small"
                                                            className="multilineInput"
                                                            value={inputs[checklist.checklistId] || ""}
                                                            onChange={(e) => handleInputChange(e, checklist.checklistId)}
                                                            fullWidth
                                                        />
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "flex-end",
                                                                gap: 1,
                                                                ".MuiButtonBase-root": {
                                                                    border: "1px solid #EBEBEB",
                                                                    backgroundColor: "#EBEBEB",
                                                                    borderRadius: "6px",
                                                                    color: "#00060A",
                                                                    px: 3,
                                                                },
                                                            }}
                                                        >
                                                            <Button onClick={() => handleClear(checklist.checklistId)}>
                                                                Clear
                                                            </Button>
                                                            <Button onClick={() => handleSubmit(checklist.checklistId)}>
                                                                Ask Co-Pilot
                                                            </Button>
                                                        </Box>
                                                        <Typography className="typographyFontWeight">Answer</Typography>
                                                        <TextField
                                                            placeholder="Answer"
                                                            size="small"
                                                            className="multilineInput"
                                                            value={apiData[checklist.checklistId] || ""}
                                                            slotProps={{
                                                                input: {
                                                                    readOnly: true,
                                                                },
                                                            }}
                                                            fullWidth
                                                            multiline
                                                            rows={4}
                                                        />
                                                    </Grid2>
                                                )}
                                            </>
                                        );
                                    })}
                                {categoryName === "Summary of the Documents" && (
                                    <Grid2
                                        container
                                        spacing={3}
                                        size={12}
                                        sx={{
                                            "& .MuiTypography-root": {
                                                fontSize: "12px",
                                                color: theme.palette.colors[21],
                                            },
                                            py: 3,
                                        }}
                                    >
                                        <Grid2 size={6}>
                                            <Typography>Claim ID</Typography>
                                            <TextField
                                                size="small"
                                                fullWidth
                                                className="newCaseFields"
                                                value={caseDetails?.claimId}
                                                disabled
                                            />
                                        </Grid2>
                                        <Grid2 size={6}>
                                            <Typography>Claimant Name</Typography>
                                            <TextField
                                                size="small"
                                                fullWidth
                                                className="newCaseFields"
                                                value={caseDetails?.policyDetails?.customerName}
                                                disabled
                                            />
                                        </Grid2>
                                        <Grid2 size={6}>
                                            <Typography>DOB</Typography>
                                            <TextField
                                                size="small"
                                                fullWidth
                                                className="newCaseFields"
                                                value={caseDetails?.policyDetails?.dateOfBirth}
                                                disabled
                                            />
                                        </Grid2>
                                        <Grid2 size={6}>
                                            <Typography>Social Security Number</Typography>
                                            <TextField
                                                size="small"
                                                fullWidth
                                                className="newCaseFields"
                                                value={caseDetails?.policyDetails?.socialSecurityNumber}
                                                disabled
                                            />
                                        </Grid2>
                                        <Grid2 size={6}>
                                            <Typography>Address</Typography>
                                            <TextField
                                                size="small"
                                                fullWidth
                                                className="newCaseFields"
                                                value={caseDetails?.policyDetails?.address}
                                                disabled
                                            />
                                        </Grid2>
                                        <Grid2 size={6}>
                                            <Typography>Billed Amount</Typography>
                                            <TextField
                                                size="small"
                                                fullWidth
                                                className="newCaseFields"
                                                value={documentSummary?.dischargeSummary?.DischargeSummary?.billingAmount}
                                                disabled
                                            />
                                        </Grid2>
                                        <Grid2 size={12}>
                                            <Typography>Admitting Diagnosis</Typography>
                                            <TextField
                                                size="small"
                                                fullWidth
                                                className="newCaseFields"
                                                value={documentSummary?.dischargeSummary?.DischargeSummary?.admittingDiagnosis}
                                                disabled
                                            />
                                        </Grid2>
                                        <Grid2 size={12}>
                                            <Typography>Doctor Prescription Diagnosis</Typography>
                                            <TextField
                                                size="small"
                                                fullWidth
                                                className="newCaseFields"
                                                value={
                                                    documentSummary?.dischargeSummary?.DischargeSummary
                                                        ?.doctorPrescriptionDiagnosis
                                                }
                                                disabled
                                            />
                                        </Grid2>
                                        <Grid2 size={12}>
                                            <Typography>ICD - 10 Code</Typography>
                                            <TextField
                                                size="small"
                                                fullWidth
                                                className="newCaseFields"
                                                value={documentSummary?.dischargeSummary?.DischargeSummary?.diagnosis?.ICD10DiagnosisCodes?.join(
                                                    ", "
                                                )}
                                                disabled
                                            />
                                        </Grid2>
                                        <Grid2 size={12}>
                                            <Typography>Category</Typography>
                                            <TextField
                                                size="small"
                                                fullWidth
                                                className="newCaseFields"
                                                value={
                                                    documentSummary?.dischargeSummary?.category ??
                                                    "Diseases of the digestive system, Diseases of the circulatory system"
                                                }
                                                disabled
                                            />
                                        </Grid2>
                                        <Grid2 size={12}>
                                            <Typography>Discharge Date</Typography>
                                            <TextField
                                                size="small"
                                                fullWidth
                                                className="newCaseFields"
                                                value={
                                                    documentSummary?.dischargeSummary?.DischargeSummary?.patientDetails
                                                        ?.dischargeDate
                                                }
                                                disabled
                                            />
                                        </Grid2>
                                        {documentSummary?.validations &&
                                            Object.keys(documentSummary?.validations)?.map((validation) => {
                                                return (
                                                    <Grid2 size={12}>
                                                        <Typography>{validation}</Typography>
                                                        <TextField
                                                            size="small"
                                                            fullWidth
                                                            className="newCaseFields"
                                                            value={documentSummary?.validations[validation]}
                                                            disabled
                                                        />
                                                    </Grid2>
                                                );
                                            })}
                                        <Grid2 size={12}>
                                            <Typography>Overall Summary</Typography>
                                            <TextField
                                                size="small"
                                                fullWidth
                                                // className="newCaseFields"
                                                value={documentSummary?.dischargeSummary?.DischargeSummary?.summaryOfDischarge?.replace(
                                                    /\\n/g,
                                                    "\n"
                                                )}
                                                disabled
                                                multiline
                                            />
                                        </Grid2>
                                    </Grid2>
                                )}
                            </Grid2>

                            {/* {(localStorage.getItem("userRole") === "REVIEWER" ||
                                localStorage.getItem("userRole") === "APPROVER") && (
                                <Grid2 container size={12} sx={{ mt: 2 }}>
                                    <Typography className="headingFontWeight" variant="h5">
                                        Reviewer's Comments
                                    </Typography>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        rows={3}
                                        disabled={localStorage.getItem("userRole") === "APPROVER"}
                                        className="multilineInput"
                                        multiline
                                        value={reviwerCategoryReport}
                                        onChange={(e) => setReviwerCategoryReport(e.target.value)}
                                    />
                                </Grid2>
                            )}
                            {localStorage.getItem("userRole") === "APPROVER" && (
                                <Grid2 container size={12} sx={{ mt: 2 }}>
                                    <Typography className="headingFontWeight" variant="h5">
                                        Approver's Report
                                    </Typography>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        rows={3}
                                        className="multilineInput"
                                        multiline
                                        value={approverCategoryReport}
                                        onChange={(e) => setApproverCategoryReport(e.target.value)}
                                    />
                                </Grid2>
                            )} */}
                        </>
                    )}
                    {showInspectionReport && (
                        <Grid2 size={12} container direction="column">
                            <Typography className="headingFontWeight" variant="h5">
                                Claim Report
                            </Typography>
                            <TextField
                                size="small"
                                fullWidth
                                disabled={localStorage.getItem("userRole") !== "INSPECTOR"}
                                rows={3}
                                className="multilineInput"
                                multiline
                                value={inspectionReport}
                                onChange={(e) => setInspectionReport(e.target.value)}
                            />
                        </Grid2>
                    )}
                    {showRecommendedActions && localStorage.getItem("userRole") === "APPROVER" && (
                        <Grid2 container size={12} direction={"column"} className="recommendedActionsContainer">
                            <Typography className="headingFontWeight" variant="h5">
                                Recommended Actions
                            </Typography>
                            <Grid2 container size={12}>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                    value={amountStatus}
                                    disabled
                                    onChange={(e) => setAmountStatus(e.target.value)}
                                    sx={{
                                        width: "100%",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            border: `1px solid #CCCCCC`,
                                            borderRadius: "6px",
                                            opacity: 1,
                                            px: 2,
                                            py: 1,
                                            mb: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <FormControlLabel
                                            value="Partial Amount"
                                            disabled
                                            control={<CustomRadio sx={{ mr: 1 }} />}
                                            label="Partial Amount"
                                        />
                                        <FormControlLabel
                                            value="Full Amount"
                                            disabled
                                            control={<CustomRadio sx={{ mr: 1 }} />}
                                            label="Full Amount"
                                        />
                                    </Box>
                                </RadioGroup>
                            </Grid2>
                            <Grid2 container size={12}>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                    value={recommendedAction}
                                    onChange={(e) => setRecommendedAction(e.target.value)}
                                    sx={{
                                        width: "100%",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            border: recommendedAction === "No Action" ? `2px solid #4C8B92` : `1px solid #CCCCCC`,
                                            borderRadius: "6px",
                                            opacity: 1,
                                            px: 2,
                                            py: 1,
                                            mb: 2,
                                        }}
                                    >
                                        <FormControlLabel
                                            value="No Action"
                                            control={<CustomRadio sx={{ mr: 1 }} />}
                                            label={
                                                <>
                                                    <Typography
                                                        variant="h6"
                                                        color={recommendedAction === "No Action" ? "#4C8B92" : "#00060A"}
                                                    >
                                                        No Action Required
                                                    </Typography>
                                                    <Typography fontSize="12px" color="#6A6969">
                                                        No action required, Inspection has been completed successfully.
                                                    </Typography>
                                                </>
                                            }
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            border: recommendedAction === "Follow Up" ? `2px solid #4C8B92` : `1px solid #CCCCCC`,
                                            borderRadius: "6px",
                                            opacity: 1,
                                            px: 2,
                                            py: 1,
                                            mb: 2,
                                        }}
                                    >
                                        <FormControlLabel
                                            value="Follow Up"
                                            control={<CustomRadio sx={{ mr: 1 }} />}
                                            label={
                                                <>
                                                    <Typography
                                                        variant="h6"
                                                        color={recommendedAction === "Follow Up" ? "#4C8B92" : "#00060A"}
                                                    >
                                                        Follow Up Required
                                                    </Typography>
                                                    <Typography fontSize="12px" color="#6A6969">
                                                        Follow up required, please select a date for follow up and complete the
                                                        case.
                                                    </Typography>
                                                </>
                                            }
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            border:
                                                recommendedAction === "Re-Inspection" ? `2px solid #4C8B92` : `1px solid #CCCCCC`,
                                            borderRadius: "6px",
                                            opacity: 1,
                                            px: 2,
                                            py: 1,
                                        }}
                                    >
                                        <FormControlLabel
                                            value="Re-Inspection"
                                            control={<CustomRadio sx={{ mr: 1 }} />}
                                            label={
                                                <>
                                                    <Typography
                                                        variant="h6"
                                                        color={recommendedAction === "Re-Inspection" ? "#4C8B92" : "#00060A"}
                                                    >
                                                        Re-Inspection Required
                                                    </Typography>
                                                    <Typography fontSize="12px" color="#6A6969">
                                                        Re-Inspection required, please select a date for re-inspection and
                                                        complete the case.
                                                    </Typography>
                                                </>
                                            }
                                        />
                                    </Box>
                                </RadioGroup>
                            </Grid2>
                            {(recommendedAction === "Follow Up" || recommendedAction === "Re-Inspection") && (
                                <Grid2 container size={12} spacing={0} direction={"column"} sx={{ mb: 1 }}>
                                    <Typography variant="h6">
                                        {recommendedAction === "Follow Up" ? "Follow Up Date" : "Re Inspection Date"}
                                    </Typography>

                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                        localeText={{
                                            fieldDayPlaceholder: () => "DD",
                                            fieldMonthPlaceholder: () => "MMM",
                                            fieldYearPlaceholder: () => "YYYY",
                                        }}
                                    >
                                        <DatePicker
                                            size="small"
                                            value={inspectionDate}
                                            onChange={(value) =>
                                                recommendedAction === "Follow Up"
                                                    ? setFollowUpDate(dayjs(value).format("YYYY-MM-DD"))
                                                    : recommendedAction === "Re-Inspection"
                                                    ? setReInspectionDate(dayjs(value).format("YYYY-MM-DD"))
                                                    : ""
                                            }
                                            format="DD MMM YYYY"
                                            className="dateField"
                                            sx={{ height: "40px", width: "370px" }}
                                            required
                                            minDate={dayjs()}
                                        />
                                    </LocalizationProvider>
                                </Grid2>
                            )}
                            {recommendedAction && (
                                <>
                                    <Grid2 container size={12} sx={{ marginBottom: "10px" }}>
                                        <Typography className="headingFontWeight" variant="h5">
                                            Claim Summary Report
                                        </Typography>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            rows={3}
                                            className="multilineInput"
                                            multiline
                                            value={inspectionSummaryReport}
                                            onChange={(e) => setInspectionSummaryReport(e.target.value)}
                                        />
                                    </Grid2>
                                </>
                            )}
                        </Grid2>
                    )}
                    {showRecommendedActions && localStorage.getItem("userRole") === "REVIEWER" && (
                        <Grid2 container size={12} direction={"column"} className="recommendedActionsContainer">
                            <Typography className="headingFontWeight" variant="h5">
                                Recommended Actions
                            </Typography>
                            <Grid2 container size={12}>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                    value={amountStatus}
                                    onChange={(e) => setAmountStatus(e.target.value)}
                                    sx={{
                                        width: "100%",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            border: `1px solid #CCCCCC`,
                                            borderRadius: "6px",
                                            opacity: 1,
                                            px: 2,
                                            py: 1,
                                            mb: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <FormControlLabel
                                            value="Partial Amount"
                                            control={<CustomRadio sx={{ mr: 1 }} />}
                                            label="Partial Amount"
                                        />
                                        <FormControlLabel
                                            value="Full Amount"
                                            control={<CustomRadio sx={{ mr: 1 }} />}
                                            label="Full Amount"
                                        />
                                    </Box>
                                </RadioGroup>
                            </Grid2>
                            <Grid2 container size={12}>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                    value={recommendedAction}
                                    onChange={(e) => setRecommendedAction(e.target.value)}
                                    sx={{
                                        width: "100%",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            border: recommendedAction === "Pass" ? `2px solid #4C8B92` : `1px solid #CCCCCC`,
                                            borderRadius: "6px",
                                            opacity: 1,
                                            px: 2,
                                            py: 1,
                                            mb: 2,
                                        }}
                                    >
                                        <FormControlLabel
                                            value="Pass"
                                            control={<CustomRadio sx={{ mr: 1 }} />}
                                            label={
                                                <>
                                                    <Typography
                                                        variant="h6"
                                                        color={recommendedAction === "Pass" ? "#4C8B92" : "#00060A"}
                                                    >
                                                        Pass
                                                    </Typography>
                                                    <Typography fontSize="12px" color="#6A6969">
                                                        Passed at reviewer stage and will be sent to Approver
                                                    </Typography>
                                                </>
                                            }
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            border:
                                                recommendedAction === "Fail" ||
                                                recommendedAction === "Redo" ||
                                                recommendedAction === "Re-Inspection"
                                                    ? `2px solid #4C8B92`
                                                    : `1px solid #CCCCCC`,
                                            borderRadius: "6px",
                                            opacity: 1,
                                            px: 2,
                                            py: 1,
                                            mb: 2,
                                        }}
                                    >
                                        <FormControlLabel
                                            value="Fail"
                                            control={<CustomRadio sx={{ mr: 1 }} />}
                                            label={
                                                <>
                                                    <Typography
                                                        variant="h6"
                                                        color={recommendedAction === "Fail" ? "#4C8B92" : "#00060A"}
                                                    >
                                                        Fail
                                                    </Typography>
                                                    <Typography fontSize="12px" color="#6A6969">
                                                        Please select the next step from following and complete the case
                                                    </Typography>
                                                </>
                                            }
                                        />

                                        {(recommendedAction === "Fail" ||
                                            recommendedAction === "Redo" ||
                                            recommendedAction === "Re-Inspection") && (
                                            <>
                                                <Box
                                                    sx={{
                                                        border:
                                                            recommendedAction === "Redo"
                                                                ? `2px solid #4C8B92`
                                                                : `1px solid #CCCCCC`,
                                                        borderRadius: "6px",
                                                        opacity: 1,
                                                        px: 2,
                                                        py: 1,
                                                        mb: 2,
                                                        mt: 3,
                                                        mx: 2,
                                                    }}
                                                >
                                                    <FormControlLabel
                                                        value="Redo"
                                                        control={<CustomRadio sx={{ mr: 1 }} />}
                                                        label={
                                                            <>
                                                                <Typography
                                                                    variant="h6"
                                                                    color={recommendedAction === "Redo" ? "#4C8B92" : "#00060A"}
                                                                >
                                                                    Redo
                                                                </Typography>
                                                                <Typography fontSize="12px" color="#6A6969">
                                                                    Please select checklist items needed for redo and send the
                                                                    case back to inspector{" "}
                                                                </Typography>
                                                            </>
                                                        }
                                                    />
                                                </Box>
                                                <Box
                                                    sx={{
                                                        border:
                                                            recommendedAction === "Re-Inspection"
                                                                ? `2px solid #4C8B92`
                                                                : `1px solid #CCCCCC`,
                                                        borderRadius: "6px",
                                                        opacity: 1,
                                                        px: 2,
                                                        py: 1,
                                                        mb: 2,
                                                        mx: 2,
                                                    }}
                                                >
                                                    <FormControlLabel
                                                        value="Re-Inspection"
                                                        control={<CustomRadio sx={{ mr: 1 }} />}
                                                        label={
                                                            <>
                                                                <Typography
                                                                    variant="h6"
                                                                    color={
                                                                        recommendedAction === "Re-Inspection"
                                                                            ? "#4C8B92"
                                                                            : "#00060A"
                                                                    }
                                                                >
                                                                    Re-Inspection Required
                                                                </Typography>
                                                                <Typography fontSize="12px" color="#6A6969">
                                                                    Re-Inspection required,please select a date for re-inspection
                                                                    and complete the case{" "}
                                                                </Typography>
                                                            </>
                                                        }
                                                    />
                                                </Box>
                                            </>
                                        )}
                                    </Box>
                                </RadioGroup>
                            </Grid2>
                            {recommendedAction === "Re-Inspection" && (
                                <Grid2 container size={12} direction={"column"} sx={{ mb: 3 }}>
                                    <Typography variant="h6" className="headingFontWeight">
                                        Re Inspection Required{" "}
                                    </Typography>
                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                        localeText={{
                                            fieldDayPlaceholder: () => "Choose date",
                                            fieldMonthPlaceholder: () => "",
                                            fieldYearPlaceholder: () => "",
                                        }}
                                    >
                                        <DatePicker
                                            size="small"
                                            value={inspectionDate}
                                            onChange={(value) =>
                                                recommendedAction === "Follow Up"
                                                    ? setFollowUpDate(dayjs(value).format("YYYY-MM-DD"))
                                                    : recommendedAction === "Re-Inspection"
                                                    ? setReInspectionDate(dayjs(value).format("YYYY-MM-DD"))
                                                    : ""
                                            }
                                            format="DD MMM YYYY"
                                            className="dateField"
                                            sx={{ height: "40px", width: "370px" }}
                                            required
                                            minDate={dayjs()}
                                        />
                                    </LocalizationProvider>
                                </Grid2>
                            )}
                            {recommendedAction === "Redo" && (
                                <Button
                                    sx={{
                                        border: "2px dashed #CCCCCC",
                                        borderRadius: "6px",
                                        padding: "16px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        backgroundColor: "#F8F9FA",
                                        width: "100%",
                                        textAlign: "left",
                                        textTransform: "none",
                                        mb: 2,
                                    }}
                                    onClick={handleGoBackFromRedo}
                                >
                                    <Box sx={{ display: "flex", gap: "15px" }}>
                                        <Box>
                                            <AddIcon fontSize="large" sx={{ color: "grey" }} />
                                        </Box>
                                        <Box>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontSize: "14px",
                                                    color: "#6A6969",
                                                }}
                                            >
                                                Select Checklist for Redo
                                            </Typography>
                                            <Typography sx={{ fontSize: "12px", color: "#6A6969" }}>
                                                Checklist selected will be marked for "Redo" when Inspector reopens the case
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderRadius: "4px",
                                            backgroundColor: "#E1F5F8",
                                            padding: "4px 16px",
                                            fontSize: "16px",
                                            color: "#4C8B92",
                                        }}
                                    >
                                        4/24 Selected
                                    </Box>
                                </Button>
                            )}
                            {(recommendedAction === "Pass" ||
                                recommendedAction === "Redo" ||
                                recommendedAction === "Re-Inspection") && (
                                <>
                                    <Grid2 container size={12} sx={{ marginBottom: "10px" }}>
                                        <Typography className="headingFontWeight" variant="h5">
                                            Claim Summary Report
                                        </Typography>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            rows={3}
                                            className="multilineInput"
                                            multiline
                                            value={inspectionSummaryReport}
                                            onChange={(e) => setInspectionSummaryReport(e.target.value)}
                                        />
                                    </Grid2>
                                </>
                            )}
                        </Grid2>
                    )}
                    <Grid2 container size={12} columnGap={3} sx={{ justifyContent: "flex-end" }}>
                        <Button
                            variant="outlined"
                            className="saveButton"
                            onClick={() => {
                                if (localStorage.getItem("userRole") === "INSPECTOR") {
                                    if (action === "assign") {
                                        assignCategoriesToInspectors("save");
                                    } else {
                                        saveInspection();
                                    }
                                }
                                if (localStorage.getItem("userRole") === "APPROVER") {
                                    saveSubmitReviewerApproval("save", recommendedAction, followUpDate, ReInspectionDate);
                                }
                                if (localStorage.getItem("userRole") === "REVIEWER") {
                                    saveSubmitReviewerApproval("save", recommendedAction, followUpDate, ReInspectionDate);
                                }
                            }}
                        >
                            Save
                        </Button>
                        {((localStorage.getItem("userRole") === "INSPECTOR" && !showInspectionReport) ||
                            (localStorage.getItem("userRole") === "APPROVER" && !showRecommendedActions) ||
                            (localStorage.getItem("userRole") === "REVIEWER" && !showRecommendedActions)) && (
                            <Button
                                className="nextSubmitButton"
                                disabled={action === "assign" && currentChecklistId.current === inspectionChecklist?.length - 1}
                                onClick={() => {
                                    if (currentChecklistId.current < 1) {
                                        if (showInspectionReport) {
                                            currentChecklistId.current = 0;
                                        } else {
                                            currentChecklistId.current = currentChecklistId.current + 1;
                                        }
                                        if (showInspectionReport) {
                                            updateInspectionChecklist("Summary of the Documents");
                                        } else {
                                            updateInspectionChecklist("Verification Details");
                                        }
                                    } else {
                                        if (localStorage.getItem("userRole") === "INSPECTOR") {
                                            if (action === "assign") {
                                                assignCategoriesToInspectors("submit");
                                            } else {
                                                displayInspectionReport();
                                            }
                                        } else if (localStorage.getItem("userRole") === "APPROVER") {
                                            displayRecommendedActions();
                                        } else if (localStorage.getItem("userRole") === "REVIEWER") {
                                            displayRecommendedActions();
                                        }
                                    }
                                }}
                            >
                                Next
                            </Button>
                        )}
                        {((localStorage.getItem("userRole") === "INSPECTOR" && showInspectionReport) ||
                            (localStorage.getItem("userRole") === "APPROVER" && showRecommendedActions) ||
                            (localStorage.getItem("userRole") === "REVIEWER" && showRecommendedActions)) && (
                            <Button
                                className="nextSubmitButton"
                                onClick={() => {
                                    if (localStorage.getItem("userRole") === "INSPECTOR") {
                                        submitInspection();
                                    }
                                    if (localStorage.getItem("userRole") === "APPROVER") {
                                        // saveSubmitReviewerApproval("submit", recommendedAction, followUpDate, ReInspectionDate);
                                        submitInspectionApproval(recommendedAction, followUpDate, ReInspectionDate);
                                    }
                                    if (localStorage.getItem("userRole") === "REVIEWER") {
                                        // saveSubmitReviewerApproval("submit", recommendedAction, followUpDate, ReInspectionDate);
                                        submitInspectionReview(recommendedAction, followUpDate, ReInspectionDate);
                                    }
                                }}
                                sx={{
                                    backgroundColor:
                                        localStorage.getItem("userRole") === "REVIEWER" && !recommendedAction
                                            ? "grey !important"
                                            : "",
                                    color:
                                        localStorage.getItem("userRole") === "REVIEWER" && !recommendedAction
                                            ? "white !important"
                                            : "",
                                }}
                                disabled={localStorage.getItem("userRole") === "REVIEWER" && !recommendedAction}
                            >
                                Submit
                            </Button>
                        )}
                    </Grid2>
                </Grid2>
            </Grid2>
        </>
    );
};

export default Checklist;