import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Grid2, MenuItem, Select, Typography, TextField, useTheme, Divider, styled } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import axios from "axios";
import { SnackContext } from "../../global/SnackProvider";
import "./AddEditPolicy.css";
import DownloadImage from "../../../assets/download.png";
import Loader from "../../global/Loader";

const AddEditPolicy = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const policyId = location.state?.policyId;
    const { setSnack } = useContext(SnackContext);
    const [policyDetails, setPolicyDetails] = useState({});
    const [documents, setDocuments] = useState([]);
    const [hospitalBill, setHospitalBill] = useState(null);
    const [dischargeSummary, setDischargeSummary] = useState(null);
    const [prescription, setPrescription] = useState(null);
    const [loading, setLoading] = useState(false);

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
        const fetchPolicyDetails = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/getAllPolicyBasedOnPolicyById?policyId=${policyId}`
                );
                const data = response.data;
                setPolicyDetails({
                    customerName: data[0].customerName || "",
                    dateOfBirth: data[0].dateOfBirth || "",
                    gender: data[0].gender || "",
                    phoneNumber: data[0].phoneNumber || "",
                    address: data[0].address || "",
                    insurancePlanName: data[0].insurancePlanName || "",
                    coverageStartDate: data[0].coverageStartDate || "",
                    coverageEndDate: data[0].coverageEndDate || "",
                    claimType: data[0].claimType || "",
                    policyType: data[0].policyType || "",
                });
            } catch (error) {
                console.error("Error fetching policy details:", error);
                setSnack({
                    open: true,
                    message: "Failed to load policy details",
                    severity: "error",
                });
            }
        };
        if (policyId) {
            fetchPolicyDetails();
        }
    }, [policyId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (!name) return;
        setPolicyDetails({ ...policyDetails, [name]: value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const formData = new FormData();

            const policyData = {
                policyId: policyId || "",
                claimType: policyDetails.claimType,
                policyType: policyDetails.policyType,
            };

            formData.append("policyData", new Blob([JSON.stringify(policyData)], { type: "application/json" }));
            formData.append("hospitalBillDocument", hospitalBill?.file);
            formData.append("doctorPrescriptionDocument", prescription?.file);
            formData.append("hospitalDischargeSummaryDocument", dischargeSummary?.file);
            // documents?.map((document) => {
            //     formData.append("documents", document?.file);
            // });

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/starthealthclaimprocess`, formData);

            if (response?.data?.status?.toUpperCase() === "SUCCESS") {
                setLoading(false);
                navigate("/claimant", {
                    state: {
                        claimantDetails: response?.data,
                        policyId: policyId,
                        claimType: policyDetails.claimType,
                        claimantName: policyDetails?.customerName,
                    },
                });
            } else {
                setSnack({
                    open: true,
                    message: response?.data?.message || "Failed to submit claim",
                    severity: "error",
                });
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.error("Error submitting claim:", error);
            setSnack({
                open: true,
                message: "Error submitting claim",
                severity: "error",
            });
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

    const attchImage = async (documentType, e) => {
        const file = e.target.files[0];
        if (file) {
            const newFile = {
                id: file.name,
                name: file.name,
                reference: file.name,
                documentType: file.name?.split(".").pop(),
                file: file,
            };
            // const isFileExists = documents.filter((document) => document?.name === newFile?.name);
            // if (isFileExists?.length > 0) {
            //     setSnack({ open: true, message: "File already exists", severity: "error" });
            //     return;
            // }
            if (documentType === "hospital-bill") {
                setHospitalBill(newFile);
            }
            if (documentType === "discharge-summary") {
                setDischargeSummary(newFile);
            }
            if (documentType === "prescription") {
                setPrescription(newFile);
            }
            // setDocuments((prevRows) => [...prevRows, newFile]);
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
                    onClick={() => navigate(-1)}
                >
                    Back
                </Button>
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
                <Box
                    sx={{
                        py: 2,
                        px: 2.5,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h4" fontWeight={600}>
                        Claimant Details {policyId ? ` - ${policyId}` : ""}
                    </Typography>
                </Box>
                <Divider />
                <Box sx={{ py: 2, px: 2.5 }}>
                    {loading && <Loader />}
                    <Grid2 container spacing={3}>
                        {[
                            { label: "Customer Name", name: "customerName", type: "text" },
                            { label: "Date of Birth", name: "dateOfBirth", type: "date" },
                            { label: "Gender", name: "gender", type: "text" },
                            { label: "Contact Number", name: "phoneNumber", type: "text" },
                            { label: "Address", name: "address", type: "text" },
                            { label: "Insurance Plan Name", name: "insurancePlanName", type: "text" },
                            { label: "Coverage Effective Date", name: "coverageStartDate", type: "date" },
                            { label: "Coverage Expiration Date", name: "coverageEndDate", type: "date" },
                            {
                                label: "Claim Type",
                                name: "claimType",
                                type: "select",
                                options: ["InPatient", "OutPatient", "Emergency", "Prescription Drug Coverage"],
                            },
                            {
                                label: "Policy Type",
                                name: "policyType",
                                type: "select",
                                options: ["Cash", "Reimbursement"],
                            },
                        ].map((field) => (
                            <Grid2 size={4} key={field.name}>
                                <Typography variant="body2" className="policy-field-label">
                                    {field.label}
                                </Typography>
                                {field.type === "text" || field.type === "date" ? (
                                    <TextField
                                        type={field.type}
                                        name={field.name}
                                        value={policyDetails[field.name]}
                                        fullWidth
                                        variant="outlined"
                                        disabled
                                        className="policy-textfield"
                                    />
                                ) : (
                                    <Select
                                        fullWidth
                                        name={field.name}
                                        value={policyDetails[field.name]}
                                        onChange={handleChange}
                                        className="policy-select"
                                        sx={{
                                            borderRadius: "20px",
                                            height: "40px",
                                            boxShadow: "inset 0px 3px 6px #00000029",
                                        }}
                                    >
                                        {field.options.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            </Grid2>
                        ))}
                        <Grid2 size={12}>
                            <Typography variant="body2" className="policy-field-label">
                                Upload Documents
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    columnGap: 3,
                                }}
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
                                            height: "25px",
                                        }}
                                        startIcon={<AttachFileIcon sx={{ fontSize: 12 }} />}
                                    >
                                        <VisuallyHiddenInput
                                            type="file"
                                            accept="*"
                                            onChange={(e) => {
                                                attchImage("hospital-bill", e);
                                            }}
                                        />
                                        Attach Hospital Bill
                                    </Button>
                                </Box>
                                <Box className="attchmentsContainer">
                                    <Button
                                        component="label"
                                        role={undefined}
                                        tabIndex={-1}
                                        sx={{
                                            fontWeight: 500,
                                            color: "black",
                                            fontSize: 14,
                                            height: "25px",
                                        }}
                                        startIcon={<AttachFileIcon sx={{ fontSize: 12 }} />}
                                    >
                                        <VisuallyHiddenInput
                                            type="file"
                                            accept="*"
                                            onChange={(e) => {
                                                attchImage("discharge-summary", e);
                                            }}
                                        />
                                        Attach Discharge Summary
                                    </Button>
                                </Box>
                                <Box className="attchmentsContainer">
                                    <Button
                                        component="label"
                                        role={undefined}
                                        tabIndex={-1}
                                        sx={{
                                            fontWeight: 500,
                                            color: "black",
                                            fontSize: 14,
                                            height: "25px",
                                        }}
                                        startIcon={<AttachFileIcon sx={{ fontSize: 12 }} />}
                                    >
                                        <VisuallyHiddenInput
                                            type="file"
                                            accept="*"
                                            onChange={(e) => {
                                                attchImage("prescription", e);
                                            }}
                                        />
                                        Attach Prescription
                                    </Button>
                                </Box>
                            </Box>
                            {(dischargeSummary || hospitalBill || prescription) && (
                                <Box className="attachmentContainer">
                                    {hospitalBill && (
                                        <Box className="attachmentItem">
                                            <Box className="imageContainer">
                                                <img
                                                    src={getImageThumbnail(hospitalBill?.file)}
                                                    alt={hospitalBill.name}
                                                    className="attchmentImage"
                                                />
                                                <Typography className="attachmentTextStyle">
                                                    {hospitalBill.name?.length > 10
                                                        ? hospitalBill.name?.slice(0, 9) + "..."
                                                        : hospitalBill.name}
                                                </Typography>
                                            </Box>
                                            <Box className="imageDownload">
                                                <img src={DownloadImage} alt="Download" />
                                            </Box>
                                        </Box>
                                    )}
                                    {dischargeSummary && (
                                        <Box className="attachmentItem">
                                            <Box className="imageContainer">
                                                <img
                                                    src={getImageThumbnail(dischargeSummary?.file)}
                                                    alt={dischargeSummary.name}
                                                    className="attchmentImage"
                                                />
                                                <Typography className="attachmentTextStyle">
                                                    {dischargeSummary.name?.length > 10
                                                        ? dischargeSummary.name?.slice(0, 9) + "..."
                                                        : dischargeSummary.name}
                                                </Typography>
                                            </Box>
                                            <Box className="imageDownload">
                                                <img src={DownloadImage} alt="Download" />
                                            </Box>
                                        </Box>
                                    )}
                                    {prescription && (
                                        <Box className="attachmentItem">
                                            <Box className="imageContainer">
                                                <img
                                                    src={getImageThumbnail(prescription?.file)}
                                                    alt={prescription.name}
                                                    className="attchmentImage"
                                                />
                                                <Typography className="attachmentTextStyle">
                                                    {prescription.name?.length > 10
                                                        ? prescription.name?.slice(0, 9) + "..."
                                                        : prescription.name}
                                                </Typography>
                                            </Box>
                                            <Box className="imageDownload">
                                                <img src={DownloadImage} alt="Download" />
                                            </Box>
                                        </Box>
                                    )}
                                </Box>
                            )}
                            {/* {documents?.length > 0 && (
                                <>
                                    <Box className="attachmentContainer">
                                        {documents?.map((attachment, index) => {
                                            return (
                                                <Box className="attachmentItem" key={index}>
                                                    <Box className="imageContainer">
                                                        <img
                                                            src={getImageThumbnail(attachment?.file)}
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
                                    <Divider sx={{ my: 1, width: "100%" }} />
                                </>
                            )} */}
                        </Grid2>
                    </Grid2>

                    <Box sx={{ textAlign: "right", mt: 3 }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: theme.palette.colors[11],
                                color: "#fff",
                                borderRadius: "20px",
                                "&:hover": { backgroundColor: theme.palette.colors[11] },
                                px: 3,
                                py: 1,
                            }}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AddEditPolicy;
