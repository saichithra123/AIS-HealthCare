import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Box,
    Button,
    Grid2,
    MenuItem,
    Select,
    Chip,
    Typography,
    useTheme,
    Dialog,
    Divider,
    FormControl,
    ListItemText,
    Popover,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import axios from "axios";
import CustomCheckbox from "../../global/CustomCheckbox";
import CloseIcon from "@mui/icons-material/Close";
import EntityRegistration from "./EntityRegistration";
import SiteForm from "./SiteForm";
import LicenseForm from "./LicenseForm";
import ProductForm from "./ProductForm";
import "../adminStyles.css";
import dayjs from "dayjs";
import { SnackContext } from "../../global/SnackProvider";

const AddEntity = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const entityId = location.state?.entityId;
    const [entityType, setEntityType] = useState(0);
    const [siteDetails, setSiteDetails] = useState({});
    const [productDetails, setProductDetails] = useState({});
    const [licenseDetails, setLicenseDetails] = useState({});
    const [inspectionTypes, setInspectionTypes] = useState([]);
    const [selectedInspectionTypes, setSelectedInspectionTypes] = useState([]);
    const [isShowSelectedInspectionTypes, setIsShowSelectedInspectionTypes] = useState(false);
    const inspectionTypeAnchorRef = useRef(null);
    const [documentFiles, setDocumentFiles] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [videoFiles, setVideofiles] = useState([]);
    const { snack, setSnack } = useContext(SnackContext);
    const [deletedAttachmentIds, setDeletedAttachmentIds] = useState([])

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setEntityType(value);
    };

    useEffect(() => {
        try {
            const getInspectionTypes = async () => {
                const response = await axios({
                    method: "get",
                    url: `${import.meta.env.VITE_BASE_URL}/getAllInspectionTypes`,
                });
                setInspectionTypes(response?.data);
            };

            getInspectionTypes();
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        const getEntityDetails = async () => {
            const documentTypes = ["pdf", "doc", "docx", "odt", "rtx", "txt", "ppt", "pptx", "csv", "xls", "xlsx", "md"];
            const imageTypes = ["jpg", "jpeg", "gif", "bmp", "tif", "tiff", "webp"];
            const videoTypes = ["mp4", "avi", "webm", "mpeg", "mpg", "ogg"];
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/getEntityRegistrationDetailsbyEntityID?entityId=${entityId}`
                );
                setEntityType(response?.data?.entityType);
                setSelectedInspectionTypes(response?.data?.inspectionTypes?.map((inspectionType) => inspectionType?.ins_type_id));
                if (response?.data?.entityType?.toLowerCase() === "site") {
                    setSiteDetails({
                        siteName: response?.data?.site?.siteName,
                        siteManager: response?.data?.site?.siteManager,
                        siteAddress: response?.data?.site?.siteAddress,
                        siteType: response?.data?.site?.siteType,
                        siteComments: response?.data?.site?.comments,
                        siteId: entityId,
                    });
                }
                if (response?.data?.entityType?.toLowerCase() === "product") {
                    setProductDetails({
                        productName: response?.data?.product?.productName,
                        productCode: response?.data?.product?.productCode,
                        productCategory: response?.data?.product?.productCategory,
                        productExpiryDate: response?.data?.product?.productExpiryDate,
                        productBatch: response?.data?.product?.serialNumber,
                        productManufacturer: response?.data?.product?.manufacturer,
                        productDescription: response?.data?.product?.notes,
                        productAddress: response?.data?.product?.productAddress,
                    });
                }
                if (response?.data?.entityType?.toLowerCase() === "license") {
                    setLicenseDetails({
                        licenseType: response?.data?.license?.licenseType,
                        licenseName: response?.data?.license?.licenseName,
                        licenseNumber: response?.data?.license?.licenseNumber,
                        issuingAuthority: response?.data?.license?.issuingAuthority,
                        status: response?.data?.license?.status,
                        licenseLocation: response?.data?.license?.associateLocationOrSite,
                        licenseComments: response?.data?.license?.comments,
                    });
                }
                response?.data?.entityAttachments?.map((attachment) => {
                    if (documentTypes?.includes(attachment?.fileType)) {
                        setDocumentFiles((prev) => [...prev, attachment]);
                    }
                    if (imageTypes?.includes(attachment?.fileType)) {
                        setImageFiles((prev) => [...prev, attachment]);
                    }
                    if (videoTypes?.includes(attachment?.fileType)) {
                        setVideofiles((prev) => [...prev, attachment]);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        };
        if (entityId) {
            getEntityDetails();
        }
    }, [entityId]);

    const renderForm = () => {
        switch (entityType) {
            case "Site":
                return <SiteForm siteDetails={siteDetails} setSiteDetails={setSiteDetails} />;
            case "Product":
                return <ProductForm productDetails={productDetails} setProductDetails={setProductDetails} />;
            case "License":
                return <LicenseForm licenseDetails={licenseDetails} setLicenseDetails={setLicenseDetails} />;
            default:
                return null;
        }
    };

    const submitEntityDetails = async () => {
        try {
            const formData = new FormData();
            let jsonData;
            if (entityType === "Site") {
                jsonData = {
                    action: entityId ? "edit" : "Save",
                    entityId: entityId,
                    entityType: entityType,
                    insTypeId: selectedInspectionTypes,
                    deleteAttachmentIds: deletedAttachmentIds,
                    site: {
                        siteName: siteDetails?.siteName,
                        siteManager: siteDetails?.siteManager,
                        siteAddress: siteDetails?.siteAddress,
                        siteType: siteDetails?.siteType,
                        comments: siteDetails?.siteComments,
                    },
                };
            }
            if (entityType === "Product") {
                jsonData = {
                    action: entityId ? "edit" : "Save",
                    entityId: entityId,
                    entityType: entityType,
                    insTypeId: selectedInspectionTypes,
                    deleteAttachmentIds: deletedAttachmentIds,
                    product: {
                        productName: productDetails?.productName,
                        productCode: productDetails?.productCode,
                        productCategory: productDetails?.productCategory,
                        productExpiryDate: dayjs(productDetails?.productExpiryDate).format("YYYY-MM-DD"),
                        serialNumber: productDetails?.productBatch,
                        manufacturer: productDetails?.productManufacturer,
                        notes: productDetails?.productDescription,
                        productAddress: productDetails?.productAddress,
                    },
                };
            }
            if (entityType === "License") {
                jsonData = {
                    action: entityId ? "edit" : "Save",
                    entityId: entityId,
                    entityType: entityType,
                    insTypeId: selectedInspectionTypes,
                    deleteAttachmentIds: deletedAttachmentIds,
                    license: {
                        licenseType: licenseDetails?.licenseType,
                        licenseName: licenseDetails?.licenseName,
                        licenseNumber: licenseDetails?.licenseNumber,
                        issuingAuthority: licenseDetails?.issuingAuthority,
                        status: licenseDetails?.status,
                        associateLocationOrSite: licenseDetails?.licenseLocation,
                        comments: licenseDetails?.licenseComments,
                    },
                };
            }

            formData.append("entityRegistrationDTO", new Blob([JSON.stringify(jsonData)], { type: "application/json" }));
            documentFiles?.map((document) => {
                if (!document?.attachmentId) formData.append("files", document?.file);
            });
            imageFiles?.map((image) => {
                if (!image?.attachmentId) formData.append("files", image?.file);
            });
            videoFiles?.map((video) => {
                if (!video?.attachmentId) formData.append("files", video?.file);
            });
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/entityRegistration`, formData);
            if (response?.data?.status?.toUpperCase() === "SUCCESS") {
                setSnack({ open: true, message: response?.data?.message, severity: "success" });
                navigate("/entity-management");
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
                px: 2.5,
                py: 2,
                boxShadow: `inset 0px 0px 6px ${theme.palette.colors[3]}`,
                opacity: 1,
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                    sx={{
                        color: theme.palette.colors[21],
                        fontSize: "14px",
                        fontWeight: 600,
                    }}
                    startIcon={<KeyboardBackspaceOutlinedIcon />}
                    onClick={() => {
                        if (entityType && !entityId) {
                            setEntityType("");
                            setSelectedInspectionTypes([]);
                            setSiteDetails({});
                            setProductDetails({});
                            setLicenseDetails({});
                        } else {
                            navigate(-1);
                        }
                    }}
                >
                    Back
                </Button>
                <Typography variant="h4" fontWeight={600} sx={{ pl: 2 }}>
                    {" "}
                    Entity Management{" "}
                </Typography>
            </Box>
            <Box
                sx={{
                    background: `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                    borderRadius: "10px",
                    opacity: 1,
                    paddingBottom: 0.4,
                    minHeight: "400px",
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                }}
            >
                <Box sx={{ py: 2, px: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h4" fontWeight={600}>
                        {entityId ? "Edit" : "Add"} Entity{" "}
                        {!!entityType && typeof entityType === "string" ? ` - ${entityType}` : ""}
                    </Typography>
                    {!!entityType && (
                        <EntityRegistration
                            setDocumentFiles={setDocumentFiles}
                            setImageFiles={setImageFiles}
                            setVideofiles={setVideofiles}
                            documentFiles={documentFiles}
                            imageFiles={imageFiles}
                            videoFiles={videoFiles}
                            setDeletedAttachmentIds={setDeletedAttachmentIds}
                        />
                    )}
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
                    }}
                >
                    <Grid2 container spacing={3}>
                        <Grid2 size={4} className="inputFields">
                            <Typography>
                                Entity Type <span style={{ color: "red" }}>*</span>
                            </Typography>
                            <FormControl fullWidth className="configFields">
                                <Select
                                    value={entityType}
                                    onChange={handleSelectChange}
                                    slotProps={{
                                        input: {
                                            readOnly: !!entityType,
                                        },
                                    }}
                                >
                                    <MenuItem value={0} disabled>
                                        Select
                                    </MenuItem>
                                    <MenuItem value="Site">Site</MenuItem>
                                    <MenuItem value="Product">Product</MenuItem>
                                    <MenuItem value="License">License</MenuItem>
                                    <MenuItem value="Others">Others</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid2>
                        {!!entityType && (
                            <Grid2 size={4} className="inputFields">
                                <Typography>Inspection Type</Typography>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={selectedInspectionTypes}
                                    onChange={(e) => {
                                        setIsShowSelectedInspectionTypes(false);
                                        setSelectedInspectionTypes(
                                            typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value
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
                                                    ref={inspectionTypeAnchorRef}
                                                    sx={{
                                                        color: `${theme.palette.colors[11]}`,
                                                        size: "small",
                                                        height: "26px",
                                                    }}
                                                    onMouseLeave={() => {
                                                        setIsShowSelectedInspectionTypes(false);
                                                    }}
                                                    onMouseEnter={(event) => {
                                                        setIsShowSelectedInspectionTypes(true);
                                                    }}
                                                >
                                                    +{selected?.length - 2} more
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
                                            <CustomCheckbox checked={selectedInspectionTypes?.includes(inspectionType?.id)} />
                                            <ListItemText primary={inspectionType?.name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid2>
                        )}
                        {isShowSelectedInspectionTypes && selectedInspectionTypes?.length > 2 && (
                            <Popover
                                sx={{
                                    pointerEvents: "none",
                                    boxShadow: "0px",
                                    "& .MuiPaper-root": {
                                        boxShadow: "none",
                                    },
                                }}
                                open={isShowSelectedInspectionTypes}
                                anchorReference="anchorPosition"
                                anchorPosition={{
                                    top: inspectionTypeAnchorRef.current?.getBoundingClientRect().bottom + 10,
                                    left: inspectionTypeAnchorRef.current?.getBoundingClientRect().left - 100,
                                }}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                disableRestoreFocus
                            >
                                <Box
                                    sx={{
                                        p: 1,
                                        " .MuiChip-root": {
                                            height: "26px",
                                            borderRadius: "4px",
                                        },
                                        width: "270px",
                                        backgroundColor: "#F2F6F6",
                                        display: "flex",
                                        gap: 0.5,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    {selectedInspectionTypes?.map((inspectionType) => (
                                        <Chip
                                            key={inspectionType}
                                            label={inspectionTypes?.find((value) => value?.id === inspectionType)?.name}
                                        />
                                    ))}
                                </Box>
                            </Popover>
                        )}
                    </Grid2>
                    <Box mt={3}>{renderForm()}</Box>
                </Box>
                {!!entityType && (
                    <Button
                        sx={{
                            backgroundColor: theme.palette.colors[11],
                            textTransform: "none",
                            borderRadius: "20px",
                            width: "100px",
                            height: "40px",
                            display: "flex",
                            mt: 2,
                            ml: "auto",
                            mr: 2,
                            mb: 2,
                            "&:hover": {
                                backgroundColor: theme.palette.colors[11],
                            },
                        }}
                        onClick={submitEntityDetails}
                    >
                        Submit
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default AddEntity;
