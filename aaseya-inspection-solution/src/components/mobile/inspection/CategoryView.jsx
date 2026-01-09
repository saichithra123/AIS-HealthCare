import React, { useContext, useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, Grid2, Typography } from "@mui/material";
import { Box, Button, useTheme, Divider, styled, TextField } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AddActionsOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import AddNotes from "../../../assets/add-notes.png";
import "./checklist.css";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderContext } from "../HeaderContext";

const ChecklistCategoryView = () => {
    const theme = useTheme();
    const [inspectionChecklist, setInspectionChecklist] = useState([]);
    const [inspectionReport, setInspectionReport] = useState("");
    const totalChecklistItems = useRef(0);
    const navigate = useNavigate();
    const location = useLocation();
    const { categoryChecklists, inspectionID } = location.state;
    const { header, setHeader } = useContext(HeaderContext);
    const { isShowCategoryView, setIsShowCategoryView } = useContext(HeaderContext);

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
        setHeader(`Case ID ${inspectionID}`);
    }, []);

    useEffect(() => {
        setInspectionChecklist(categoryChecklists);
    }, [categoryChecklists]);

    return (
        <>
            <Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "#F2F6F6 0% 0% no-repeat padding-box",
                        pt: 3,
                        pr: 3.75,
                        pl: 3.75,
                        pb: "16px",
                        mt: 7,
                        position: "sticky",
                        top: "50px",
                    }}
                >
                    <Typography variant="h4" fontWeight={700}>
                        Case Progress
                    </Typography>
                    <Box display="flex">
                        <Typography variant="h5" fontWeight={500}>
                            2/{totalChecklistItems.current}
                        </Typography>
                    </Box>
                </Box>
                <Grid2
                    container
                    className="FirstContainer"
                    sx={{
                        mx: 2.5,
                        position: "fixed",
                        top: "116px",
                        "&.MuiGrid-root": {
                            margin: 0,
                            height: "89vh",
                        },
                    }}
                >
                    <Grid2
                        size={12}
                        className="categoryContainer"
                        sx={{
                            borderRadius: "0px",
                            boxShadow: "none",
                            display: "flex",
                            height: "100%",
                            pl: 3.75,
                            pr: 1.5,
                            overflowX: "auto",
                            maxWidth: "none",
                        }}
                    >
                        {inspectionChecklist?.map((category, index) => {
                            return (
                                <Grid2
                                    size={12}
                                    container
                                    key={index}
                                    sx={{ backgroundColor: "#F2F6F6", mr: 3 }}
                                    onClick={() => {
                                        setIsShowCategoryView(false);
                                        navigate(`/cases/inspection`, {
                                            state: { categoryIndex: index, inspectionID: inspectionID },
                                        });
                                    }}
                                >
                                    <Card
                                        sx={{
                                            borderRadius: "12px",
                                            border: `1px solid #4C8B92`,
                                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                            width: "83vw",
                                            height: "63.5vh",
                                            overflowY: "hidden", //if scrolling effect not needed
                                            //overflowY:"auto",//if scrolling effect needed
                                            scrollbarWidth: "none",
                                        }}
                                    >
                                        <CardHeader
                                            title={
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        py: 1,
                                                    }}
                                                >
                                                    <Typography variant="h6" sx={{ color: "white" }}>
                                                        {category?.categoryName?.length > 26
                                                            ? `${category?.categoryName?.slice(0, 25)}...`
                                                            : category?.categoryName}
                                                    </Typography>
                                                    <Typography sx={{ color: "#FFFFFF", marginLeft: "auto" }}>
                                                        0/{category?.checklistItem?.length}
                                                    </Typography>
                                                </Box>
                                            }
                                            sx={{
                                                backgroundColor: "#4C8B92",
                                                padding: "10px 20px",
                                                borderTopLeftRadius: "12px",
                                                borderTopRightRadius: "12px",
                                                position: "sticky",
                                                top: 0,
                                                zIndex: 1000,
                                                "&.MuiTypography-root": {
                                                    color: "#FFFFF",
                                                },
                                            }}
                                        ></CardHeader>
                                        <CardContent>
                                            {category?.checklistItem?.map((checklist, index) => {
                                                return (
                                                    <>
                                                        <Grid2 container key={checklist.checklist_id}>
                                                            <Grid2
                                                                size={12}
                                                                sx={{
                                                                    fontSize: "14px",
                                                                    mb: 1,
                                                                    mt: 1,
                                                                }}
                                                            >
                                                                <Typography className="typographyFontWeight">
                                                                    {checklist.checklist_name}
                                                                </Typography>{" "}
                                                            </Grid2>
                                                            <Grid2
                                                                container
                                                                direction={"column"}
                                                                size={12}
                                                                columnGap={3}
                                                                rowGap={1}
                                                                sx={{ justifyContent: "space-between" }}
                                                            >
                                                                {checklist?.answer_type?.split("/")?.map((choice, index) => {
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
                                                                                fontWeight:
                                                                                    checklist?.answer === choice ? 700 : "",
                                                                            }}
                                                                        >
                                                                            {choice}
                                                                        </Button>
                                                                    );
                                                                })}
                                                            </Grid2>
                                                            <Divider sx={{ my: 1, width: "100%" }} />
                                                            {localStorage.getItem("userRole") === "INSPECTOR" && (
                                                                <>
                                                                    <Box
                                                                        className="mobileAttachmentContainer"
                                                                        display="flex"
                                                                        columnGap={3}
                                                                    >
                                                                        <Box className="attchmentsContainer">
                                                                            <Button
                                                                                component="label"
                                                                                role={undefined}
                                                                                tabIndex={-1}
                                                                                sx={{
                                                                                    fontWeight: 500,
                                                                                    color: "black",
                                                                                    fontSize: 14,
                                                                                }}
                                                                                startIcon={
                                                                                    <AttachFileIcon sx={{ fontSize: 12 }} />
                                                                                }
                                                                            >
                                                                                <VisuallyHiddenInput
                                                                                    type="file"
                                                                                    accept="image/*"
                                                                                />
                                                                                Attach Image
                                                                            </Button>
                                                                        </Box>
                                                                        <Box className="attchmentsContainer">
                                                                            <img src={AddNotes} alt="Add notes" />
                                                                            <Typography ml={1} className="typographyFontWeight">
                                                                                Add Notes
                                                                            </Typography>
                                                                        </Box>
                                                                        <Box className="attchmentsContainer">
                                                                            <AddActionsOutlinedIcon sx={{ mr: 1 }} />
                                                                            <Typography className="typographyFontWeight">
                                                                                Add Corrective Actions
                                                                            </Typography>
                                                                        </Box>
                                                                    </Box>
                                                                    <Divider sx={{ my: 1, width: "100%" }} />
                                                                </>
                                                            )}
                                                        </Grid2>
                                                    </>
                                                );
                                            })}
                                        </CardContent>
                                    </Card>
                                </Grid2>
                            );
                        })}
                        <Grid2
                            size={12}
                            container
                            sx={{ backgroundColor: "#F2F6F6", mr: 3 }}
                            onClick={() => {
                                setIsShowCategoryView(false);
                                navigate(`/cases/inspection`, {
                                    state: { isShowInspectionReport: true, inspectionID: inspectionID },
                                });
                            }}
                        >
                            <Card
                                sx={{
                                    borderRadius: "12px",
                                    border: `1px solid #4C8B92`,
                                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                    width: "83vw",
                                    height: "63.5vh",
                                    overflowY: "auto",
                                }}
                            >
                                <CardHeader
                                    title={
                                        <Typography variant="h6" sx={{ color: "white" }}>
                                            Inspection Report
                                        </Typography>
                                    }
                                    sx={{
                                        backgroundColor: "#4C8B92",
                                        color: "#FFFFF",
                                        padding: "19px 20px",
                                        position: "sticky",
                                        top: 0,
                                        zIndex: 1000,
                                        borderTopLeftRadius: "12px",
                                        borderTopRightRadius: "12px",
                                        "&.MuiTypography-root MuiTypography-h5 MuiCardHeader-title css-ywgne-MuiTypography-root":
                                            {
                                                color: "#FFFFF ",
                                            },
                                    }}
                                />
                                <CardContent
                                    sx={{
                                        "&.MuiCardContent-root": {
                                            padding: "0",
                                        },
                                    }}
                                >
                                    <Grid2 size={12} container sx={{ backgroundColor: "white", height: "44vh", p: 2 }}>
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
                                    <Grid2 container sx={{ p: 2, pb: 2 }} rowGap={1}>
                                        <Grid2 size={12}>
                                            <Button variant="outlined" className="saveButton" sx={{ width: "100%" }}>
                                                Save
                                            </Button>
                                        </Grid2>
                                        <Grid2 size={12}>
                                            <Button className="nextSubmitButton" style={{ width: "100%" }}>
                                                Submit
                                            </Button>
                                        </Grid2>
                                    </Grid2>
                                </CardContent>
                            </Card>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Box>
        </>
    );
};
 
export default ChecklistCategoryView;
 