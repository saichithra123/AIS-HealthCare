import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Typography, Grid2, Button, useTheme, Divider, styled, TextField, CircularProgress } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AddNotes from "../../assets/add-notes.png";
import DownloadImage from "../../assets/download.png";
import "../inspection/checklist.css";
import axios from "axios";
import { SnackContext } from "../global/SnackProvider";
import { useNavigate } from "react-router-dom";
import Loader from "../global/Loader";
import FormRenderer from "../admin/formio/FormRenderer";

const CheckList = ({ preInspectionChecklists, inspectionID }) => {
    const theme = useTheme();
    const [preInspectionChecklist, setPreInspectionChecklist] = useState({});
    const [displayNote, setDisplayNote] = useState("");
    const answeredChecklistItems = useRef(0);
    const { snack, setSnack } = useContext(SnackContext);
    const navigate = useNavigate();
    const [isSaveInspection, setIsSaveInspection] = useState(false);
    const answeredChecklistCount = useRef([]);
    const [formSubmission, setFormSubmission] = useState({});

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
        if (preInspectionChecklists?.schema) setPreInspectionChecklist(JSON.parse(preInspectionChecklists?.schema));
    }, [preInspectionChecklists]);

    const attchImage = (e, checklist) => {
        setPreInspectionChecklist((prevItems) => {
            return prevItems?.map((item) => {
                if (item.name === checklist.name) {
                    return {
                        ...item,
                        attachments:
                            item.attachments?.length > 0 ? [...item.attachments, e.target.files[0]] : [e.target.files[0]],
                    };
                }
                return item;
            });
        });
    };

    const updateChecklistNote = (e, checklist) => {
        setPreInspectionChecklist((prevItems) => {
            return prevItems?.map((item) => {
                if (item.name === checklist.name) {
                    return {
                        ...item,
                        comment: e.target.value,
                    };
                }
                return item;
            });
        });
    };

    const updateChecklistAnswer = (checklist, choice) => {
        setPreInspectionChecklist((prevItems) => {
            return prevItems?.map((item) => {
                if (item.name === checklist.name) {
                    return {
                        ...item,
                        selected_answers: choice,
                    };
                }
                return item;
            });
        });
        if (!answeredChecklistCount.current?.includes(checklist?.id)) {
            answeredChecklistCount.current.push(checklist?.id);
            answeredChecklistItems.current = parseInt(answeredChecklistItems.current) + 1;
        }
    };

    const getImageThumbnail = (attachment) => {
        const imageUrl = URL.createObjectURL(attachment);
        return imageUrl;
    };

    const submitInspection = async (action) => {
        try {
            setIsSaveInspection(true);
            let submissionData = [];
            preInspectionChecklist?.forEach((item) => {
                submissionData.push({
                    id: {
                        inspectionid: inspectionID,
                        preinspectionchecklistid: item?.id,
                    },
                    name: item?.name,
                    selected_answers: item?.selected_answers,
                    comment: item?.comment || "",
                });
            });
            if (!submissionData.length) {
                console.error("No checklist data to submit");
                setSnack({ open: true, message: "No checklist data available for submission.", severity: "error" });
                setIsSaveInspection(false);
                return;
            }
            const response = await axios({
                method: "post",
                url: `${import.meta.env.VITE_BASE_URL}/saveSubmitPreInspection`,
                data: {
                    saveSubmitPreInspectionChecklist: submissionData,
                    inspectionID: inspectionID,
                    action: action,
                },
            });
            if (response?.data?.status === "Failure") {
                setSnack({ open: true, message: "Something went wrong. Please try again later.", severity: "error" });
            } else {
                if (action === "save") {
                    setSnack({ open: true, message: "Pre Inspection Saved successfully.", severity: "success" });
                }
                if (action === "submit") {
                    setSnack({ open: true, message: "Pre Inspection submitted successfully.", severity: "success" });
                    navigate(`/cases`);
                }
            }
            setIsSaveInspection(false);
        } catch (error) {
            console.log(error);
            setIsSaveInspection(false);
        }
    };

    return (
        <>
            <Grid2 container spacing={2.5} sx={{ m: 2.5 }}>
                {isSaveInspection && <Loader />}
                <Grid2 size={3} className="categoryContainer">
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                            backgroundColor: theme.palette.colors[20],
                        }}
                    >
                        <Box display="flex" alignItems="center">
                            <ArrowRightIcon sx={{ fontSize: 30 }} />
                            <Typography className="typographyFontWeight">Pre Inspection Checklist</Typography>
                        </Box>
                        <Box display="flex" pr={2}>
                            <Typography className="typographyFontWeight">
                                {answeredChecklistItems.current}/{preInspectionChecklist?.length}
                            </Typography>
                        </Box>
                    </Box>
                </Grid2>
                <Grid2 size={9} className="checklistContainer">
                    <Grid2 container className="categoryChecklistContainer">
                        {preInspectionChecklist?.map((checklist, index) => {
                            return (
                                <>
                                    <Grid2 container spacing={2} size={12} sx={{ mb: 2, mt: 4 }} key={checklist?.id}>
                                        <Grid2 container size={12}>
                                            <Typography className="typographyFontWeight">{checklist.name}</Typography>
                                        </Grid2>
                                        <Grid2 container size={12} columnGap={3} sx={{ justifyContent: "space-between" }}>
                                            {checklist.answerType?.split("/").map((choice, index) => {
                                                return (
                                                    <Button
                                                        variant="outlined"
                                                        key={choice + index}
                                                        className="choiceButton"
                                                        sx={{
                                                            backgroundColor:
                                                                checklist?.selected_answers === choice
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
                                    </Grid2>
                                    <Divider sx={{ my: 1, width: "100%" }} />
                                    <Box display="flex" columnGap={3}>
                                        <Box className="attchmentsContainer">
                                            <Button
                                                component="label"
                                                role={undefined}
                                                tabIndex={-1}
                                                sx={{ fontWeight: 500, color: "black", fontSize: 14, height: "25px" }}
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
                                            onClick={() => setDisplayNote(`note${checklist.id}`)}
                                        >
                                            <img src={AddNotes} alt="Add notes" />
                                            <Typography ml={1} className="typographyFontWeight">
                                                Add Notes
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Divider sx={{ my: 1, width: "100%" }} />
                                    {checklist?.attachments?.length > 0 && (
                                        <>
                                            <Box>
                                                <Typography className="headingFontWeight">Documents</Typography>
                                                <Box className="attachmentContainer">
                                                    {checklist?.attachments?.map((attachment, index) => {
                                                        return (
                                                            <Box className="attachmentItem" key={index}>
                                                                <Box className="imageContainer">
                                                                    <img
                                                                        src={getImageThumbnail(attachment)}
                                                                        alt={attachment.name}
                                                                        className="attchmentImage"
                                                                    />
                                                                    <Typography className="attachmentTextStyle">
                                                                        {attachment.name?.length > 10
                                                                            ? attachment.name?.slice(0, 9) + "..."
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
                                    {(checklist?.comment || displayNote === `note${checklist.id}`) && (
                                        <>
                                            <Box width="95%" mx={2}>
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
                                            <Divider sx={{ my: 1, mx: 2, width: "95%" }} />
                                        </>
                                    )}
                                </>
                            );
                        })}
                    </Grid2>
                    <Grid2 container sx={{ justifyContent: "flex-end", my: 3 }} columnGap={3}>
                        <Button
                            variant="outlined"
                            className="saveButton"
                            onClick={() => {
                                submitInspection("save");
                            }}
                        >
                            Save
                        </Button>
                        <Button
                            className="nextSubmitButton"
                            onClick={() => {
                                submitInspection("submit");
                            }}
                        >
                            Submit
                        </Button>
                    </Grid2>
                </Grid2>
            </Grid2>
        </>
    );
};

export default CheckList
