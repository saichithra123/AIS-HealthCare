import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Typography, Grid2, Button, useTheme, Divider, styled, TextField, CircularProgress } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AddNotes from "../../../assets/add-notes.png";
import DownloadImage from "../../../assets/download.png";
import "./Checklist.css";
import axios from "axios";
import { SnackContext } from "../../global/SnackProvider";
import { useNavigate } from "react-router-dom";

const CheckList = ({ preInspectionChecklists, inspectionID }) => {
    const theme = useTheme();
    const [preInspectionChecklist, setPreInspectionChecklist] = useState([]);
    const [displayNote, setDisplayNote] = useState("");
    const answeredChecklistItems = useRef(0);
    const { snack, setSnack } = useContext(SnackContext);
    const navigate = useNavigate();
    const [isSaveInspection, setIsSaveInspection] = useState(false);
    const answeredChecklistCount = useRef([]);

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
        setPreInspectionChecklist(preInspectionChecklists?.preInspectionChecklist);
    }, [preInspectionChecklists]);

    const attchImage = (e, checklist) => {
        setPreInspectionChecklist((prevItems) => {
            return prevItems.map((item) => {
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
            preInspectionChecklist?.preInspectionChecklist?.forEach((item) => {
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
                <Grid2
                    container
                    sx={{
                        marginTop: "48px",
                        backgroundColor: "#F2F6F6",
                        height: "95vh",
                    }}
                >
                    <Grid2 container size={12} direction="column" sx={{ marginLeft: "24px", width: "100%", pt: 4 }}>
                        <Typography fontWeight={700}>Pre Inspection Checklist</Typography>
                        <Typography fontWeight={500}>
                            {answeredChecklistItems.current}/{preInspectionChecklist?.length} Completed
                        </Typography>
                    </Grid2>
                    <Grid2 container className="categoryChecklistContainer" sx={{ border: "none" }}>
                        {preInspectionChecklist?.map((checklist, index) => {
                            return (
                                <>
                                    <Grid2 container key={checklist?.id}>
                                        <Grid2 container sx={{ fontSize: "14px", textAlign: "justify", mb: 2, mt: 3 }}>
                                            <Typography className="typographyFontWeight">{checklist.name}</Typography>
                                        </Grid2>
                                        <Grid2
                                            container
                                            direction="column"
                                            rowGap={1}
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                mb: 2,
                                            }}
                                        >
                                            {checklist.answerType?.split("/").map((choice, index) => {
                                                return (
                                                    <Button
                                                        variant="outlined"
                                                        key={choice + index}
                                                        className="choiceButton"
                                                        fullWidth
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
                                    <Box display="flex" className="mobileAttachmentContainer ">
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
                                </>
                            );
                        })}
                        <Grid2 container size={12} rowGap={1} sx={{ padding: "16px 0", alignItems: "flex-end", p: 2, pb: 5 }}>
                            <Button
                                variant="outlined"
                                className="saveButton"
                                fullWidth
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
                                fullWidth
                            >
                                Submit
                            </Button>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Grid2>
        </>
    );
};

export default CheckList
