import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Box,
    Typography,
    Stack,
    Grid2,
    Button,
    useTheme,
    Divider,
    styled,
    TextField,
    IconButton,
    CircularProgress,
    Link,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AddActionsOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import AddNotes from "../../../assets/add-notes.png";
import DownloadImage from "../../../assets/download.png";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import "./checklist.css";
import axios from "axios";
import { SnackContext } from "../../../components/global/SnackProvider";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { HeaderContext } from "../HeaderContext";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const Checklist = ({ inspectionChecklists, inspectionID, categoryIndex, isShowInspectionReport }) => {
    const theme = useTheme();
    const [inspectionChecklist, setInspectionChecklist] = useState([]);
    const [categoryChecklist, setCategoryChecklist] = useState({});
    const [categoryChecklistItems, setCategoryChecklistItems] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [correctiveAction, setCorrectiveAction] = useState("");
    const [displayNote, setDisplayNote] = useState("");
    const [displayAddAction, setDisplayAddAction] = useState("");
    const currentChecklistId = useRef(0);
    const [inspectionReport, setInspectionReport] = useState("");
    const [showInspectionReport, setShowInspectionReport] = useState(false);
    const [showRecommendedActions, setShowRecommendedActions] = useState(false);
    const totalChecklistItems = useRef(0);
    const answeredChecklistItems = useRef(0);
    const { snack, setSnack } = useContext(SnackContext);
    const navigate = useNavigate();
    const [isSaveInspection, setIsSaveInspection] = useState(false);
    const { isShowCategoryView, setIsShowCategoryView } = useContext(HeaderContext);
    const [apiData, setApiData] = useState("");
    const [copilotComments, setCopilotComments] = useState({});
    const [isEditCorrectiveAction, setIsEditCorrectiveAction] = useState(false);
    const [editedCorrectiveAction, setEditedCorrectiveAction] = useState("");
    const answeredChecklistCount = useRef({});
    const [correctiveActionId, setCorrectiveActionId] = useState(null);

    const VisuallyHiddenInput = styled("input")`
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        bottom: 0;
        left: 0;
        white-space: nowrap;
        width: 1px;
    `;

    useEffect(() => {
        if (categoryIndex) {
            currentChecklistId.current = categoryIndex;
        }
        if (isShowInspectionReport) {
            setShowInspectionReport(isShowInspectionReport);
        }
    }, [categoryIndex, isShowInspectionReport]);

    useEffect(() => {
        setInspectionChecklist(inspectionChecklists);
    }, [inspectionChecklists]);

    useEffect(() => {
        inspectionChecklists?.map((checklist) => {
            totalChecklistItems.current += checklist?.checklistItem?.length;
        });
        setCategoryChecklist(inspectionChecklists[currentChecklistId.current]);
        setCategoryChecklistItems(inspectionChecklists[currentChecklistId.current]?.checklistItem);
        setCategoryName(inspectionChecklists[currentChecklistId.current]?.categoryName);
    }, [inspectionChecklists]);

    useEffect(() => {
        if (isShowCategoryView) {
            navigate(`/cases/categories`, { state: { categoryChecklists: inspectionChecklists, inspectionID: inspectionID } });
        }
    }, [isShowCategoryView]);

    const updateInspectionChecklist = () => {
        setCategoryChecklist(inspectionChecklist[currentChecklistId.current]);
        setCategoryChecklistItems(inspectionChecklist[currentChecklistId.current]?.checklistItem);
        setCategoryName(inspectionChecklist[currentChecklistId.current]?.categoryName);
        if (categoryChecklistItems.length > 0) {
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
        }
        setShowInspectionReport(false);
        setCategoryChecklist(inspectionChecklist[currentChecklistId.current]);
        setCategoryChecklistItems(inspectionChecklist[currentChecklistId.current]?.checklistItem);
        setCategoryName(inspectionChecklist[currentChecklistId.current]?.categoryName);
        setDisplayNote("");
        setDisplayAddAction("");
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
        setDisplayNote("");
        setDisplayAddAction("");
        setShowInspectionReport(true);
    };

    const displayRecommendedActions = () => {
        setShowRecommendedActions(true);
    };

    const attchImage = async (e, checklist) => {
        const response = await getBase64(e);
        setCategoryChecklistItems((prevItems) => {
            return prevItems.map((item) => {
                if (item.checklist_name === checklist.checklist_name) {
                    return {
                        ...item,
                        attachments:
                            item.attachments?.length > 0 ? [...item.attachments, e.target.files[0]] : [e.target.files[0]],
                        attachmentsBase64:
                            item.attachmentsBase64?.length > 0 ? [...item.attachmentsBase64, response] : [response],
                    };
                }
                return item;
            });
        });
    };

    const getBase64 = async (e) => {
        return new Promise((resolve, reject) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
                    resolve(base64String);
                };
                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(file);
            } else {
                reject("No file selected");
            }
        });
    };

    const updateChecklistNote = (e, checklist) => {
        setCategoryChecklistItems((prevItems) => {
            return prevItems.map((item) => {
                if (item.checklist_name === checklist.checklist_name) {
                    return {
                        ...item,
                        comment: e.target.value,
                    };
                }
                return item;
            });
        });
    };

    const updateCorrectiveActions = (checklist) => {
        setCategoryChecklistItems((prevItems) => {
            return prevItems.map((item) => {
                if (item.checklist_name === checklist.checklist_name) {
                    return {
                        ...item,
                        selected_corrective_action:
                            item.selected_corrective_action?.length > 0
                                ? [...item.selected_corrective_action, correctiveAction]
                                : [correctiveAction],
                    };
                }
                return item;
            });
        });
        setDisplayAddAction("");
        setCorrectiveAction("");
    };

    const editCorrectiveAction = (checklist, action) => {
        setCategoryChecklistItems((prevItems) => {
            return prevItems.map((item) => {
                if (item.checklist_name === checklist.checklist_name) {
                    return {
                        ...item,
                        selected_corrective_action: item.selected_corrective_action?.map((correctiveAction) =>
                            correctiveAction === action ? editedCorrectiveAction : correctiveAction
                        ),
                    };
                }
                return item;
            });
        });
        setIsEditCorrectiveAction(false);
        setEditedCorrectiveAction("");
    };

    const deleteCorrectiveAction = (checklist, action) => {
        setCategoryChecklistItems((prevItems) => {
            return prevItems.map((item) => {
                if (item.checklist_name === checklist.checklist_name) {
                    return {
                        ...item,
                        selected_corrective_action: item.selected_corrective_action?.filter(
                            (corrctiveAction) => corrctiveAction !== action
                        ),
                    };
                }
                return item;
            });
        });
    };

    const updateChecklistAnswer = (checklist, choice) => {
        setCategoryChecklistItems((prevItems) => {
            return prevItems.map((item) => {
                if (item.checklist_name === checklist.checklist_name) {
                    return {
                        ...item,
                        selected_answer: choice,
                    };
                }
                return item;
            });
        });
        if (!answeredChecklistCount.current[categoryName]) {
            answeredChecklistCount.current[categoryName] = [checklist?.checklist_id];
            answeredChecklistItems.current = parseInt(answeredChecklistItems.current) + 1;
        } else {
            if (!answeredChecklistCount.current[categoryName].includes(checklist?.checklist_id)) {
                answeredChecklistCount.current[categoryName].push(checklist?.checklist_id);
                answeredChecklistItems.current = parseInt(answeredChecklistItems.current) + 1;
            }
        }
    };

    const getImageThumbnail = (attachment) => {
        if (typeof attachment === "string") {
            // Extract MIME type if present, otherwise default to 'image/png'
            const mimeTypeMatch = attachment.match(/^data:image\/(png|jpeg|jpg|gif|webp|bmp|svg\+xml);base64,/);
            const mimeType = mimeTypeMatch ? `image/${mimeTypeMatch[1]}` : "image/png";

            // Remove base64 prefix if it exists
            const base64Data = attachment.replace(/^data:image\/(png|jpeg|jpg|gif|webp|bmp|svg\+xml);base64,/, "");

            // Convert base64 to a Blob
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Uint8Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const blob = new Blob([byteNumbers], { type: mimeType });

            return URL.createObjectURL(blob);
        }
        const imageUrl = URL.createObjectURL(attachment);
        return imageUrl;
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
                            selected_answer: item?.selected_answer,
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
                            selected_answer: item?.selected_answer,
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
        }
    };

    const submitInspection = async () => {
        try {
            setIsSaveInspection(true);
            let submissionData = [];
            inspectionChecklist?.map((checklistCategory) => {
                checklistCategory?.checklistItem?.map((item) => {
                    submissionData.push({
                        id: {
                            inspectionID: inspectionID,
                            categoryID: checklistCategory?.categoryId,
                            checklistID: item?.checklist_id,
                        },
                        selected_answer: item?.selected_answer,
                        attachment: item?.attachmentsBase64 || null,
                        comment: item?.comment?.trim(),
                        corrective_actions: item?.selected_corrective_action?.filter((action) => action !== "") || [],
                    });
                });
            });
            const response = await axios({
                method: "post",
                url: `${import.meta.env.VITE_BASE_URL}/submitInspection/${inspectionID}`,
                data: {
                    inspectionChecklistandAnswers: submissionData,
                    inspectorComment: inspectionReport,
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

    const [inputs, setInputs] = useState({});

    const fetchData = async (checklistId) => {
        try {
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
        } catch (error) {
            console.error("Error fetching data from API:", error);
            setApiData((prevApiData) => ({
                ...prevApiData,
                [checklistId]: "Error: Unable to fetch data",
            }));
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

    const handleClear = (checklistId) => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            [checklistId]: "",
        }));
    };

    const handleAddToNotes = (event, checklist) => {
        event.preventDefault();
        setCategoryChecklistItems((prevItems) => {
            return prevItems.map((item) => {
                if (item.checklist_name === checklist.checklist_name) {
                    return {
                        ...item,
                        comment: apiData[checklist.checklist_id],
                    };
                }
                return item;
            });
        });
        // setNotes((prevNotes) => ({
        //     ...prevNotes,
        //     [checklistId]: apiData[checklistId],
        // }));
        // setCopilotComments((prevComments) => ({
        //     ...prevComments,
        //     [checklistId]: apiData[checklistId],
        // }));
    };

    return (
        <>
            <Grid2 container>
                {isSaveInspection && (
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
                                justifyContent: "center",
                                alignItems: "center",
                                "& .MuiCircularProgress-root": {
                                    color: "#00000029",
                                },
                            }}
                        >
                            <CircularProgress size={160} thickness={2} color="grey" />
                        </Grid2>
                    </div>
                )}
                <Grid2
                    container
                    sx={{
                        marginTop: "48px",
                        backgroundColor: "#F2F6F6",
                        height: "95vh",
                    }}
                >
                    <Grid2 container sx={{ alignItems: "center", justifyContent: "center", marginLeft: "24px", width: "100%" }}>
                        {!showInspectionReport ? (
                            <Grid2 size={8.5}>
                                <Typography fontWeight={700}>
                                    {categoryName?.length > 25 ? categoryName?.slice(0, 24) + "..." : categoryName}
                                </Typography>
                                <Typography className="typographyFontWeight">
                                    {answeredChecklistCount.current[categoryName]?.length}/{categoryChecklistItems?.length}{" "}
                                    Completed
                                </Typography>
                            </Grid2>
                        ) : (
                            <Grid2 size={8.5}>
                                <Typography fontWeight={700}>Inspection Report</Typography>
                                <Typography fontWeight={500}>
                                    Case Progress: {answeredChecklistItems.current}/{totalChecklistItems.current}
                                </Typography>
                            </Grid2>
                        )}
                        <Grid2 size={3.5} container direction="row" sx={{ alignItems: "center", justifyContent: "center" }}>
                            <IconButton
                                onClick={() => {
                                    if (currentChecklistId.current > 0) {
                                        if (showInspectionReport) {
                                            currentChecklistId.current = currentChecklistId.current;
                                        } else {
                                            currentChecklistId.current = currentChecklistId.current - 1;
                                        }
                                        updateInspectionChecklist();
                                    }
                                }}
                            >
                                <KeyboardArrowLeftIcon
                                    sx={{ fontSize: "30px", color: currentChecklistId.current > 0 ? "#4C8B92" : "#B5B5B5" }}
                                />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    if (currentChecklistId.current < inspectionChecklist?.length - 1) {
                                        currentChecklistId.current = currentChecklistId.current + 1;
                                        updateInspectionChecklist();
                                    } else {
                                        displayInspectionReport();
                                    }
                                }}
                            >
                                <KeyboardArrowRightIcon
                                    sx={{ fontSize: "30px", color: !showInspectionReport ? "#4C8B92" : "#B5B5B5" }}
                                />
                            </IconButton>
                        </Grid2>
                    </Grid2>
                    <Grid2 container className="mobileCategoryChecklistContainer" sx={{ paddingBottom: "30px" }}>
                        {categoryChecklistItems?.map((checklist, index) => {
                            return (
                                <>
                                    <Grid2 container key={checklist.checklist_id}>
                                        <Grid2 size={12} sx={{ fontSize: "14px" }} mb={1} mt={1}>
                                            <Typography className="typographyFontWeight">{checklist.checklist_name}</Typography>
                                        </Grid2>
                                        <Grid2
                                            container
                                            size={12}
                                            direction="column"
                                            rowGap={1}
                                            sx={{ justifyContent: "space-between" }}
                                        >
                                            {checklist?.pre_defined_answer_type?.split("/")?.map((choice, index) => {
                                                return (
                                                    <Button
                                                        variant="outlined"
                                                        key={choice + index}
                                                        className="mobileChoiceButton"
                                                        sx={{
                                                            backgroundColor:
                                                                checklist?.selected_answer === choice
                                                                    ? theme.palette.colors[20]
                                                                    : "",
                                                            fontWeight: checklist?.answer === choice ? 700 : "",
                                                        }}
                                                        onClick={() => updateChecklistAnswer(checklist, choice)}
                                                    >
                                                        {choice}
                                                    </Button>
                                                );
                                            })}
                                        </Grid2>
                                        {(localStorage.getItem("userRole") === "INSPECTOR" ||
                                            localStorage.getItem("userRole") === "REVIEWER") && (
                                            <Grid2 container size={12} sx={{ pt: 2 }} direction="column">
                                                {/* CoPilot */}
                                                <Typography className="typographyFontWeight">Co-Pilot</Typography>
                                                <TextField
                                                    placeholder="Ask Anything"
                                                    size="small"
                                                    className="multilineInput"
                                                    value={inputs[checklist.checklist_id] || ""}
                                                    onChange={(e) => handleInputChange(e, checklist.checklist_id)}
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
                                                    <Button onClick={() => handleClear(checklist.checklist_id)}>Clear</Button>
                                                    <Button onClick={() => handleSubmit(checklist.checklist_id)}>
                                                        Ask Co-Pilot
                                                    </Button>
                                                </Box>
                                                <Typography className="typographyFontWeight">Answer</Typography>
                                                <TextField
                                                    placeholder="Answer"
                                                    size="small"
                                                    className="multilineInput"
                                                    value={apiData[checklist.checklist_id] || ""}
                                                    slotProps={{
                                                        input: {
                                                            readOnly: true,
                                                        },
                                                    }}
                                                    fullWidth
                                                    multiline
                                                    rows={4}
                                                />
                                                {apiData[checklist.checklist_id] && (
                                                    <Box
                                                        sx={{
                                                            textAlign: "right",
                                                            marginTop: "-10px",
                                                            padding: "8px 0",
                                                            position: "relative",
                                                            top: "0",
                                                            right: "14px",
                                                        }}
                                                    >
                                                        <Link
                                                            href="#"
                                                            onClick={(e) => {
                                                                setDisplayNote(`note${checklist.checklist_id}`);
                                                                handleAddToNotes(e, checklist);
                                                            }}
                                                            sx={{ color: "blue" }}
                                                        >
                                                            Add to Notes
                                                        </Link>
                                                    </Box>
                                                )}
                                            </Grid2>
                                        )}
                                        <Divider sx={{ my: 1, width: "100%" }} />
                                        {localStorage.getItem("userRole") === "INSPECTOR" && (
                                            <>
                                                <Box className="mobileAttachmentContainer" display="flex">
                                                    <Box className="attchmentsContainer">
                                                        <Button
                                                            component="label"
                                                            role={undefined}
                                                            tabIndex={-1}
                                                            sx={{ fontWeight: 500, color: "black", fontSize: 14 }}
                                                            startIcon={<AttachFileIcon sx={{ fontSize: 12 }} />}
                                                        >
                                                            <VisuallyHiddenInput
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => {
                                                                    attchImage(e, checklist);
                                                                }}
                                                            />
                                                            Attach Image
                                                        </Button>
                                                    </Box>
                                                    <Box
                                                        className="attchmentsContainer"
                                                        onClick={() => {
                                                            setDisplayNote(`note${checklist.checklist_id}`);
                                                        }}
                                                    >
                                                        <img src={AddNotes} alt="Add notes" />
                                                        <Typography ml={1} className="typographyFontWeight">
                                                            Add Notes
                                                        </Typography>
                                                    </Box>
                                                    <Box
                                                        className="attchmentsContainer"
                                                        onClick={() => {
                                                            setDisplayAddAction(`correctiveAction${checklist.checklist_id}`);
                                                        }}
                                                    >
                                                        <AddActionsOutlinedIcon sx={{ mr: 1 }} />
                                                        <Typography className="typographyFontWeight">
                                                            Add Corrective Actions
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Divider sx={{ my: 1, width: "100%" }} />
                                            </>
                                        )}
                                        {checklist?.attachments?.length > 0 && (
                                            <>
                                                <Box>
                                                    <Typography className="headingFontWeight">Documents</Typography>
                                                    <Box className="mobileAttachmentContainer">
                                                        {checklist?.attachments?.map((attachment, index) => {
                                                            return (
                                                                <Box className="attachmentItems" key={index} columnGap={6}>
                                                                    <Box className="imageContainer">
                                                                        <img
                                                                            src={getImageThumbnail(attachment)}
                                                                            alt={attachment.name}
                                                                            className="attchmentImage"
                                                                        />
                                                                        <Typography className="attachmentTextStyle">
                                                                            {attachment.name?.length > 15
                                                                                ? attachment.name?.slice(0, 14) + "..."
                                                                                : attachment.name}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box className="imageDownload">
                                                                        <img src={DownloadImage} alt="Download" />
                                                                    </Box>
                                                                </Box>
                                                            );
                                                        })}
                                                    </Box>
                                                </Box>
                                                <Divider sx={{ my: 1, width: "100%" }} />
                                            </>
                                        )}
                                        {(checklist?.comment || displayNote === `note${checklist.checklist_id}`) && (
                                            <>
                                                <Box width="100%">
                                                    <Typography className="headingFontWeight">Note</Typography>
                                                    <TextField
                                                        size="small"
                                                        fullWidth
                                                        disabled={localStorage.getItem("userRole") !== "INSPECTOR"}
                                                        rows={2}
                                                        className="multilineInput"
                                                        multiline
                                                        value={checklist?.comment}
                                                        onChange={(e) => updateChecklistNote(e, checklist)}
                                                    />
                                                </Box>
                                                <Divider sx={{ my: 1, width: "100%" }} />
                                            </>
                                        )}
                                        {displayAddAction === `correctiveAction${checklist.checklist_id}` && (
                                            <>
                                                <Box width="100%">
                                                    <Typography className="headingFontWeight">Corrective Actions</Typography>
                                                    <Box className="correctiveActionContainer">
                                                        <TextField
                                                            size="small"
                                                            fullWidth
                                                            className="correctiveActionField"
                                                            value={correctiveAction}
                                                            onChange={(e) => setCorrectiveAction(e.target.value)}
                                                        />
                                                    </Box>
                                                    <Box className="iconContainer">
                                                        <IconButton onClick={() => setDisplayAddAction("")}>
                                                            <CloseIcon sx={{ color: "#d54b4b", fontWeight: "bold" }} />
                                                        </IconButton>
                                                        <IconButton onClick={() => updateCorrectiveActions(checklist)}>
                                                            <CheckIcon sx={{ color: "#03911a", fontWeight: "bold" }} />
                                                        </IconButton>
                                                    </Box>
                                                </Box>
                                                <Divider sx={{ mt: 1, mb: 3, width: "100%" }} />
                                            </>
                                        )}
                                        {checklist?.selected_corrective_action?.filter((item) => item !== "")?.length > 0 && (
                                            <>
                                                <Box width="100%">
                                                    <Typography className="headingFontWeight">Corrective Actions</Typography>
                                                    {checklist?.selected_corrective_action
                                                        ?.filter((item) => item !== "")
                                                        ?.map((action, index) => {
                                                            return (
                                                                <Box key={index} className="correctiveActions">
                                                                    {isEditCorrectiveAction && index === correctiveActionId ? (
                                                                        <Box
                                                                            sx={{
                                                                                display: "flex",
                                                                                flexDirection: "column",
                                                                                width: "100%",
                                                                            }}
                                                                        >
                                                                            <TextField
                                                                                size="small"
                                                                                fullWidth
                                                                                className="correctiveActionField"
                                                                                value={editedCorrectiveAction}
                                                                                onChange={(e) =>
                                                                                    setEditedCorrectiveAction(e.target.value)
                                                                                }
                                                                            />
                                                                            <Box className="iconContainer">
                                                                                <IconButton
                                                                                    onClick={() =>
                                                                                        setIsEditCorrectiveAction(false)
                                                                                    }
                                                                                >
                                                                                    <CloseIcon
                                                                                        sx={{
                                                                                            color: "#d54b4b",
                                                                                            fontWeight: "bold",
                                                                                        }}
                                                                                    />
                                                                                </IconButton>
                                                                                <IconButton
                                                                                    onClick={() => {
                                                                                        editCorrectiveAction(checklist, action);
                                                                                    }}
                                                                                >
                                                                                    <CheckIcon
                                                                                        sx={{
                                                                                            color: "#03911a",
                                                                                            fontWeight: "bold",
                                                                                        }}
                                                                                    />
                                                                                </IconButton>
                                                                            </Box>
                                                                        </Box>
                                                                    ) : (
                                                                        <Box
                                                                            sx={{
                                                                                display: "flex",
                                                                                width: "100%",
                                                                                justifyContent: "space-between",
                                                                                alignItems: "center",
                                                                            }}
                                                                        >
                                                                            <Typography className="typographyFontWeight">
                                                                                {action}
                                                                            </Typography>
                                                                            <Box>
                                                                                <IconButton
                                                                                    onClick={() => {
                                                                                        if (!isEditCorrectiveAction) {
                                                                                            setCorrectiveActionId(index);
                                                                                            setIsEditCorrectiveAction(true);
                                                                                            setEditedCorrectiveAction(action);
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    <EditOutlinedIcon
                                                                                        sx={{
                                                                                            color: "#03911a",
                                                                                            fontWeight: "bold",
                                                                                        }}
                                                                                    />
                                                                                </IconButton>
                                                                                <IconButton
                                                                                    onClick={() =>
                                                                                        deleteCorrectiveAction(checklist, action)
                                                                                    }
                                                                                >
                                                                                    <DeleteOutlinedIcon
                                                                                        sx={{
                                                                                            color: "#d54b4b",
                                                                                            fontWeight: "bold",
                                                                                        }}
                                                                                    />
                                                                                </IconButton>
                                                                            </Box>
                                                                        </Box>
                                                                    )}
                                                                </Box>
                                                            );
                                                        })}
                                                </Box>
                                                <Divider sx={{ mt: 1, mb: 3, width: "100%" }} />
                                            </>
                                        )}
                                    </Grid2>
                                </>
                            );
                        })}
                        {showInspectionReport && (
                            <Grid2 size={12} sx={{ py: 2, height: "65vh" }} container>
                                <Grid2 container size={12}>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        disabled={localStorage.getItem("userRole") !== "INSPECTOR"}
                                        rows={5}
                                        className="multilineInput"
                                        multiline
                                        value={inspectionReport}
                                        onChange={(e) => setInspectionReport(e.target.value)}
                                    />
                                </Grid2>
                            </Grid2>
                        )}
                        <Grid2
                            container
                            size={12}
                            direction={"row"}
                            sx={{ padding: "16px 0", alignItems: "flex-end", p: 2, pb: 5 }}
                        >
                            <Grid2 size={12} sx={{ mt: 1 }}>
                                <Button variant="outlined" className="mobileSaveButton" onClick={saveInspection}>
                                    Save
                                </Button>
                            </Grid2>
                            {!showInspectionReport && (
                                <Grid2 size={12} sx={{ mt: 1, width: "100%" }}>
                                    <Button
                                        className="mobileNextSubmitButton"
                                        onClick={() => {
                                            if (currentChecklistId.current < inspectionChecklist?.length - 1) {
                                                currentChecklistId.current = currentChecklistId.current + 1;
                                                updateInspectionChecklist();
                                            } else {
                                                if (localStorage.getItem("userRole") === "INSPECTOR") {
                                                    displayInspectionReport();
                                                } else if (localStorage.getItem("userRole") === "APPROVER") {
                                                    displayRecommendedActions();
                                                }
                                            }
                                        }}
                                    >
                                        Next
                                    </Button>
                                </Grid2>
                            )}
                            {showInspectionReport && (
                                <Grid2 size={12} sx={{ mt: 1, width: "100%" }}>
                                    {" "}
                                    <Button
                                        className="mobileNextSubmitButton"
                                        onClick={() => {
                                            submitInspection();
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </Grid2>
                            )}
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Grid2>
        </>
    );
};

export default Checklist;


