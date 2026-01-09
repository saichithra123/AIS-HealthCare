import React, { useEffect, useState, useRef, useContext } from "react";
import {
    Box,
    Button,
    Grid2,
    MenuItem,
    Select,
    Chip,
    Typography,
    Popover,
    useTheme,
    TextField,
    Divider,
    ListItemText,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import axios from "axios";
import CustomCheckbox from "../../global/CustomCheckbox";
import CloseIcon from "@mui/icons-material/Close";
import "../adminStyles.css";
import { SnackContext } from "../../global/SnackProvider";

const AddControlType = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const controlTypeId = location.state?.controlTypeId;
    const [entityType, setEntityType] = useState("");
    const [controltype, setcontroltype] = useState("");
    const [inspectionTypes, setInspectionTypes] = useState([]);
    const [selectedInspectionTypes, setSelectedInspectionTypes] = useState([]);
    const [isShowSelectedInspectionTypes, setIsShowSelectedInspectionTypes] = useState(false);
    const inspectionTypeAnchorRef = useRef(null);
    const { snack, setSnack } = useContext(SnackContext);

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
        const getControlTypeDetails = async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/getControlTypeWithInspectionDetails/${controlTypeId}`
            );
            setcontroltype(response?.data?.controlTypeName);
            setSelectedInspectionTypes(response?.data?.inspections?.map((inspectionType) => inspectionType?.ins_type_id));
        };
        if (controlTypeId) {
            getControlTypeDetails();
        }
    }, [controlTypeId]);

    const submitControlType = async () => {
        try {
            const response = await axios({
                method: "post",
                url: `${import.meta.env.VITE_BASE_URL}/AddorEditControlType`,
                data: {
                    controlTypeId: controlTypeId,
                    controlTypeName: controltype,
                    inspectionTypeIds: selectedInspectionTypes,
                    action: controlTypeId ? "edit" : "add",
                },
            });
            if (response?.data?.status?.toUpperCase() === "SUCCESS") {
                setSnack({ open: true, message: response?.data?.message, severity: "success" });
                navigate("/configurations/control-type");
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
                        if (entityType) {
                            setEntityType("");
                        } else {
                            navigate(-1);
                        }
                    }}
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
                <Typography variant="h4" fontWeight={600} sx={{ pl: 2, pt: 2 }}>
                    {controlTypeId ? "Edit" : "Add"} Control Type
                </Typography>
                <Divider sx={{ my: 1.5 }} />
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
                        <Grid2 size={4}>
                            <Typography>Control Type</Typography>
                            <TextField
                                size="small"
                                fullWidth
                                value={controltype}
                                className="inputFields"
                                onChange={(e) => setcontroltype(e.target.value)}
                            />
                        </Grid2>
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
                                                        inspectionTypes?.find((inspectionType) => inspectionType?.id === value)
                                                            ?.name
                                                    }
                                                />
                                            ))}
                                        </Box>
                                        {selected.length > 2 && (
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
                                        <CustomCheckbox checked={selectedInspectionTypes?.includes(inspectionType?.id)} />
                                        <ListItemText primary={inspectionType?.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid2>
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
                </Box>
                <Button
                    sx={{
                        backgroundColor: theme.palette.colors[11],
                        textTransform: "none",
                        borderRadius: "20px",
                        width: "100px",
                        height: "40px",
                        display: "flex",
                        mt: 25,
                        ml: "auto",
                        mr: 2,
                        mb: 2,
                        "&:hover": {
                            backgroundColor: theme.palette.colors[11],
                        },
                    }}
                    onClick={submitControlType}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default AddControlType;
