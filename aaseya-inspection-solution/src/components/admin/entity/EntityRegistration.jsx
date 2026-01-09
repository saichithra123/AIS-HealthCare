import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Tabs,
    Tab,
    Divider,
    IconButton,
    Box,
    Button,
    Typography,
    useTheme,
    DialogActions,
    Grid2,
} from "@mui/material";
import "../adminStyles.css";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { SnackContext } from "../../global/SnackProvider";
import CloseIcon from "@mui/icons-material/Close";

const TabPanel = ({ children, value, index }) => {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <Box>{children}</Box>}
        </div>
    );
};

const EntityRegistration = ({
    setDocumentFiles,
    setImageFiles,
    setVideofiles,
    documentFiles,
    imageFiles,
    videoFiles,
    setDeletedAttachmentIds,
}) => {
    const [tabValue, setTabValue] = useState(0);
    const theme = useTheme();
    const [isOpenEntityRegistration, setIsOpenentityRegistration] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const { snack, setSnack } = useContext(SnackContext);
    const [deletedIds, setDeletedIds] = useState([]);

    const columns = [
        { field: "name", headerName: "Name", flex: 1 },
        { field: "reference", headerName: "Reference", flex: 1 },
        { field: "documentType", headerName: "Type", flex: 1 },
        {
            field: "action",
            headerName: "Action",
            renderCell: (params) => {
                return (
                    <IconButton
                        onClick={() => {
                            deleteAttachment(params.row?.id, params.row?.attachmentId);
                        }}
                    >
                        <CloseIcon sx={{ color: "#d54b4b", fontWeight: "bold" }} />
                    </IconButton>
                );
            },
        },
    ];

    useEffect(() => {
        documentFiles?.map((document) => {
            const file = {
                attachmentId: document?.attachmentId,
                id: document?.fileName,
                name: document?.fileName,
                reference: document?.fileName,
                documentType: document?.fileName?.split(".").pop(),
            };
            const isFileExists = documents.filter((document) => document?.name === file?.name);
            if (isFileExists?.length === 0 && file?.id) {
                setDocuments((prevRows) => [...prevRows, file]);
            }
        });
        imageFiles?.map((image) => {
            const file = {
                attachmentId: image?.attachmentId,
                id: image?.fileName,
                name: image?.fileName,
                reference: image?.fileName,
                documentType: image?.fileName?.split(".").pop(),
            };
            const isFileExists = images.filter((image) => image?.name === file?.name);
            if (isFileExists?.length === 0 && file?.id) {
                setImages((prevRows) => [...prevRows, file]);
            }
        });
        videoFiles?.map((video) => {
            const file = {
                attachmentId: video?.attachmentId,
                id: video?.fileName,
                name: video?.fileName,
                reference: video?.fileName,
                documentType: video?.fileName?.split(".").pop(),
            };
            const isFileExists = videos.filter((video) => video?.name === file?.name);
            if (isFileExists?.length === 0 && file?.id) {
                setVideos((prevRows) => [...prevRows, file]);
            }
        });
    }, [documentFiles, imageFiles, videoFiles]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        console.log(file);
        if (file) {
            const newFile = {
                id: file.name,
                name: file.name,
                reference: file.name,
                documentType: file.name?.split(".").pop(),
                file: file,
            };
            if (tabValue === 0) {
                const isFileExists = documents.filter((document) => document?.name === newFile?.name);
                if (isFileExists?.length > 0) {
                    setSnack({ open: true, message: "File already exists", severity: "error" });
                    return;
                }
                setDocuments((prevRows) => [...prevRows, newFile]);
            }
            if (tabValue === 1) {
                const isFileExists = images.filter((image) => image?.name === newFile?.name);
                if (isFileExists?.length > 0) {
                    setSnack({ open: true, message: "File already exists", severity: "error" });
                    return;
                }
                setImages((prevRows) => [...prevRows, newFile]);
            }
            if (tabValue === 2) {
                const isFileExists = videos.filter((video) => video?.name === newFile?.name);
                if (isFileExists?.length > 0) {
                    setSnack({ open: true, message: "File already exists", severity: "error" });
                    return;
                }
                setVideos((prevRows) => [...prevRows, newFile]);
            }
        }
    };

    const handleCancel = () => {
        setIsOpenentityRegistration(false);
    };

    const handleSave = () => {
        setDocumentFiles(documents);
        setImageFiles(images);
        setVideofiles(videos);
        setDeletedAttachmentIds(deletedIds);
        setIsOpenentityRegistration(false);
    };

    const deleteAttachment = (id, attachmentId) => {
        if (tabValue === 0) {
            setDocuments((prevRows) => prevRows?.filter((row) => row?.id !== id));
        }
        if (tabValue === 1) {
            setImages((prevRows) => prevRows?.filter((row) => row?.id !== id));
        }
        if (tabValue === 2) {
            setVideos((prevRows) => prevRows?.filter((row) => row?.id !== id));
        }
        if (attachmentId) setDeletedIds((prev) => [...prev, attachmentId]);
    };

    return (
        <>
            <Button
                variant="outlined"
                sx={{
                    border: `1px solid #4C8B92`,
                    borderRadius: "20px",
                    height: "40px",
                    color: "#4C8B92",
                    px: 4,
                    "&:hover": { backgroundColor: "#EAF3F5" },
                }}
                onClick={() => setIsOpenentityRegistration(true)}
            >
                Entity Registration
            </Button>
            <Dialog
                open={isOpenEntityRegistration}
                onClose={() => setIsOpenentityRegistration(false)}
                fullWidth
                maxWidth="md"
                sx={{
                    borderRadius: "20px !important",
                    ".MuiPaper-root": {
                        borderRadius: "20px !important",
                    },
                    ".MuiDialogContent-root": {
                        scrollbarWidth: "none",
                    },
                }}
            >
                <DialogTitle>
                    <Grid2 container sx={{ justifyContent: "space-between", alignItems: "center" }}>
                        <Typography fontSize="20px" fontWeight={600}>
                            Entity Registartion
                        </Typography>
                        <IconButton aria-label="close" onClick={() => setIsOpenentityRegistration(false)}>
                            <CancelOutlinedIcon />
                        </IconButton>
                    </Grid2>
                </DialogTitle>
                <Divider />
                <DialogContent
                    sx={{
                        ".MuiTabs-root .MuiButtonBase-root": {
                            fontSize: "18px",
                            fontWeight: 600,
                            mr: "2px",
                        },
                        ".MuiTabs-scroller": {
                            borderBottom: `1px solid ${theme.palette.colors[22]}`,
                        },
                    }}
                >
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: "#4C8B92",
                            },
                        }}
                    >
                        <Tab label="Upload Documents" />
                        <Tab label="Upload Images" />
                        <Tab label="Upload Videos" />
                    </Tabs>
                    <TabPanel value={tabValue} index={0}>
                        <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                            <Typography sx={{ mr: 2, fontSize: "16px", fontWeight: 500 }}>Upload Document(s)</Typography>
                            <Button
                                variant="outlined"
                                component="label"
                                sx={{
                                    borderColor: "#4C8B92",
                                    color: "#4C8B92",
                                    textTransform: "none",
                                    borderRadius: "20px",
                                    width: "140px",
                                    height: "40px",
                                    "&:hover": {
                                        borderColor: "#4C8B92",
                                        backgroundColor: "transparent",
                                    },
                                }}
                            >
                                Browse
                                <input type="file" hidden onChange={handleFileUpload} />
                            </Button>
                        </Box>

                        <Box
                            sx={{
                                py: 2,
                                mb: 2.5,
                                ".MuiDataGrid-columnHeader": {
                                    backgroundColor: `${theme.palette.colors[18]}`,
                                },
                                ".MuiDataGrid-root": {
                                    borderRadius: "10px 10px 0px 0px",
                                    border: "0px !important",
                                    borderColor: "white !important",
                                    "--DataGrid-rowBorderColor": "#ffffff",
                                },
                                ".MuiDataGrid-main": {
                                    borderRadius: "10px 10px 0px 0px",
                                },
                                "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
                                    borderBottom: "0px !important",
                                    borderTop: "0px !important",
                                },
                                " .MuiDataGrid-row": {
                                    border: `1px solid ${theme.palette.colors[22]}`,
                                    borderRadius: "6px",
                                    my: "1px",
                                },
                                " .MuiDataGrid-overlay": {
                                    border: `1px solid ${theme.palette.colors[22]}`,
                                    borderRadius: "6px",
                                    my: "1px",
                                },
                                ".MuiDataGrid-columnHeaders .MuiDataGrid-scrollbarFiller": {
                                    backgroundColor: `${theme.palette.colors[18]}`,
                                },
                                " .MuiDataGrid-scrollbar": {
                                    display: "none",
                                },
                                ".MuiDataGrid-footerContainer": {
                                    borderTop: "0px",
                                },
                                ".MuiDataGrid-selectedRowCount": {
                                    display: "none",
                                },
                            }}
                        >
                            <DataGrid columns={columns} rows={documents} hideFooter disableSelectionOnClick />
                        </Box>
                    </TabPanel>

                    <TabPanel value={tabValue} index={1}>
                        <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                            <Typography sx={{ mr: 2, fontSize: "16px", fontWeight: 500 }}>Upload Image(s)</Typography>
                            <Button
                                variant="outlined"
                                component="label"
                                sx={{
                                    borderColor: "#4C8B92",
                                    color: "#4C8B92",
                                    textTransform: "none",
                                    borderRadius: "20px",
                                    width: "140px",
                                    height: "40px",
                                    "&:hover": {
                                        borderColor: "#4C8B92",
                                        backgroundColor: "transparent",
                                    },
                                }}
                            >
                                Browse
                                <input type="file" hidden onChange={handleFileUpload} />
                            </Button>
                        </Box>

                        <Box
                            sx={{
                                py: 2,
                                mb: 2.5,
                                ".MuiDataGrid-columnHeader": {
                                    backgroundColor: `${theme.palette.colors[18]}`,
                                },
                                ".MuiDataGrid-root": {
                                    borderRadius: "10px 10px 0px 0px",
                                    border: "0px !important",
                                    borderColor: "white !important",
                                    "--DataGrid-rowBorderColor": "#ffffff",
                                },
                                ".MuiDataGrid-main": {
                                    borderRadius: "10px 10px 0px 0px",
                                },
                                "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
                                    borderBottom: "0px !important",
                                    borderTop: "0px !important",
                                },
                                " .MuiDataGrid-row": {
                                    border: `1px solid ${theme.palette.colors[22]}`,
                                    borderRadius: "6px",
                                    my: "1px",
                                },
                                " .MuiDataGrid-overlay": {
                                    border: `1px solid ${theme.palette.colors[22]}`,
                                    borderRadius: "6px",
                                    my: "1px",
                                },
                                ".MuiDataGrid-columnHeaders .MuiDataGrid-scrollbarFiller": {
                                    backgroundColor: `${theme.palette.colors[18]}`,
                                },
                                " .MuiDataGrid-scrollbar": {
                                    display: "none",
                                },
                                ".MuiDataGrid-footerContainer": {
                                    borderTop: "0px",
                                },
                                ".MuiDataGrid-selectedRowCount": {
                                    display: "none",
                                },
                            }}
                        >
                            <DataGrid columns={columns} rows={images} hideFooter disableSelectionOnClick />
                        </Box>
                    </TabPanel>

                    <TabPanel value={tabValue} index={2}>
                        <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                            <Typography sx={{ mr: 2, fontSize: "16px", fontWeight: 500 }}>Upload Video(s)</Typography>
                            <Button
                                variant="outlined"
                                component="label"
                                sx={{
                                    borderColor: "#4C8B92",
                                    color: "#4C8B92",
                                    textTransform: "none",
                                    borderRadius: "20px",
                                    width: "140px",
                                    height: "40px",
                                    "&:hover": {
                                        borderColor: "#4C8B92",
                                        backgroundColor: "transparent",
                                    },
                                }}
                            >
                                Browse
                                <input type="file" hidden onChange={handleFileUpload} />
                            </Button>
                        </Box>

                        <Box
                            sx={{
                                py: 2,
                                mb: 2.5,
                                ".MuiDataGrid-columnHeader": {
                                    backgroundColor: `${theme.palette.colors[18]}`,
                                },
                                ".MuiDataGrid-root": {
                                    borderRadius: "10px 10px 0px 0px",
                                    border: "0px !important",
                                    borderColor: "white !important",
                                    "--DataGrid-rowBorderColor": "#ffffff",
                                },
                                ".MuiDataGrid-main": {
                                    borderRadius: "10px 10px 0px 0px",
                                },
                                "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
                                    borderBottom: "0px !important",
                                    borderTop: "0px !important",
                                },
                                " .MuiDataGrid-row": {
                                    border: `1px solid ${theme.palette.colors[22]}`,
                                    borderRadius: "6px",
                                    my: "1px",
                                },
                                " .MuiDataGrid-overlay": {
                                    border: `1px solid ${theme.palette.colors[22]}`,
                                    borderRadius: "6px",
                                    my: "1px",
                                },
                                ".MuiDataGrid-columnHeaders .MuiDataGrid-scrollbarFiller": {
                                    backgroundColor: `${theme.palette.colors[18]}`,
                                },
                                " .MuiDataGrid-scrollbar": {
                                    display: "none",
                                },
                                ".MuiDataGrid-footerContainer": {
                                    borderTop: "0px",
                                },
                                ".MuiDataGrid-selectedRowCount": {
                                    display: "none",
                                },
                            }}
                        >
                            <DataGrid columns={columns} rows={videos} hideFooter disableSelectionOnClick />
                        </Box>
                    </TabPanel>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button
                        variant="outlined"
                        sx={{
                            border: `1px solid #4C8B92`,
                            borderRadius: "20px",
                            height: "40px",
                            color: "#4C8B92",
                            px: 4,
                            mr: 2,
                            "&:hover": { backgroundColor: "#EAF3F5" },
                        }}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: "#4C8B92",
                            color: "#FFFFFF",
                            px: 5,
                            height: "40px",
                            borderRadius: "20px",
                            "&:hover": { backgroundColor: "#4C8B92" },
                        }}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EntityRegistration;
