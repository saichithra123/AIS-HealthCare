
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    useTheme,
    Grid2,
    TextField,
    Avatar,
    Box,
    Typography,
    IconButton,
    Button,
    Divider,
    styled,
    Select,
    MenuItem,
    ListItemText,
    Chip,
    Popover,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import "../adminStyles.css";
import CustomCheckbox from "../../global/CustomCheckbox";
import AddActionsOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import CustomPagination from "../../global/TablePagination";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { SnackContext } from "../../global/SnackProvider";
import Loader from "../../global/Loader";

const AddUser = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [skills, setSkills] = useState([]);
    const [profilePic, setProfilePic] = useState(null);
    const [base64Profile, setBase64Profile] = useState(null);
    const [userDetails, setUserDetails] = useState({
        userName: "",
        phoneNumber: "",
        emailID: "",
        role: "Admin",
        zones: [],
        userID: "",
    });
    const [isNewSkill, setIsNewSkill] = useState(false);
    const [skillDetails, setSkillDetails] = useState([]);
    const [zoneDetails, setZoneDetails] = useState([]);
    const [selectedZones, setSelectedZones] = useState([]);
    const [isShowSelectedZones, setIsShowSelectedZones] = useState(false);
    const userEmail = location.state?.userEmail;
    const anchorRef = useRef(null);
    const userIDRef = useRef(null);
    const [isSubmitUser, setIsSubmitUser] = useState(false);
    const { snack, setSnack } = useContext(SnackContext);

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

    const columns = [
        {
            field: "skill",
            headerName: "Skills",
            flex: 0.5,
            valueGetter: (value) => skillDetails?.find((skill) => skill?.skillId === value)?.skill,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.isEditSkill ? (
                            <Box className="tableFields">
                                <Select
                                    value={params.row.skill}
                                    fullWidth
                                    onChange={(e) => {
                                        return setSkills((prevRows) =>
                                            prevRows.map((row) =>
                                                row.id === params.row.id ? { ...row, skill: e.target.value } : row
                                            )
                                        );
                                    }}
                                >
                                    {skillDetails?.map((skill) => {
                                        return (
                                            <MenuItem key={skill?.skillId} value={skill?.skillId}>
                                                {skill?.skill}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </Box>
                        ) : (
                            skillDetails?.find((skill) => skill?.skillId === params.row?.skill)?.skill
                        )}
                    </>
                );
            },
        },
        {
            field: "startDate",
            headerName: "Start Date",
            flex: 0.5,
            renderCell: (params) => {
                return (
                    <>
                        {params?.row?.isEditSkill ? (
                            <>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        size="small"
                                        format="DD-MMM-YYYY"
                                        value={params.row?.startDate ? dayjs(params.row?.startDate) : dayjs(Date())}
                                        onChange={(value) => {
                                            return setSkills((prevRows) =>
                                                prevRows.map((row) =>
                                                    row.id === params.row.id ? { ...row, startDate: value } : row
                                                )
                                            );
                                        }}
                                        className="tableFields"
                                        sx={{ width: "100%", mt: "4px" }}
                                        fullWidth
                                        required
                                    />
                                </LocalizationProvider>
                            </>
                        ) : (
                            dayjs(params.row?.startDate).format("DD MMM YYYY")
                        )}
                    </>
                );
            },
        },
        {
            field: "expiryDate",
            headerName: "Expiry Date",
            flex: 0.5,
            renderCell: (params) => {
                return (
                    <>
                        {params?.row?.isEditSkill ? (
                            <>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        size="small"
                                        format="DD-MMM-YYYY"
                                        value={params.row?.expiryDate ? dayjs(params.row?.expiryDate) : dayjs(Date())}
                                        onChange={(value) => {
                                            return setSkills((prevRows) =>
                                                prevRows.map((row) =>
                                                    row.id === params.row.id ? { ...row, expiryDate: value } : row
                                                )
                                            );
                                        }}
                                        className="tableFields"
                                        sx={{ width: "100%", mt: "4px" }}
                                        fullWidth
                                        required
                                    />
                                </LocalizationProvider>
                            </>
                        ) : (
                            dayjs(params.row?.expiryDate).format("DD MMM YYYY")
                        )}
                    </>
                );
            },
        },
        {
            field: "action",
            headerName: "Actions",
            flex: 0.5,
            renderCell: (params) => {
                return (
                    <>
                        {params?.row?.isEditSkill ? (
                            <>
                                <Box>
                                    <IconButton
                                        onClick={() => {
                                            setIsNewSkill(false);
                                            setSkills((prevRows) => prevRows.filter((row) => row.id !== params.row.id));
                                        }}
                                    >
                                        <CloseIcon sx={{ color: "#d54b4b", fontWeight: "bold" }} />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            setIsNewSkill(false);
                                            setSkills((prevRows) =>
                                                prevRows.map((row) =>
                                                    row.id === params.row.id ? { ...row, isEditSkill: !row.isEditSkill } : row
                                                )
                                            );
                                        }}
                                    >
                                        <CheckIcon sx={{ color: "#03911a", fontWeight: "bold" }} />
                                    </IconButton>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Button
                                    sx={{ color: `${theme.palette.colors[11]}` }}
                                    onClick={() => handleEditSkill(params.row.id)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    sx={{ color: `${theme.palette.colors[11]}` }}
                                    onClick={() => {
                                        setSkills((prevRows) => prevRows.filter((row) => row.id !== params.row.id));
                                    }}
                                >
                                    Remove
                                </Button>
                            </>
                        )}
                    </>
                );
            },
        },
    ];

    const handleEditSkill = (rowId) => {
        setSkills((prevRows) => prevRows.map((row) => (row.id === rowId ? { ...row, isEditSkill: !row.isEditSkill } : row)));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
                setBase64Profile(base64String);
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        // Get skill details & zone details
        const fetchData = async () => {
            try {
                const [skillResponse, zoneResponse] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_BASE_URL}/getAllSkillNames`),
                    axios.get(`${import.meta.env.VITE_BASE_URL}/getIdAndNames`),
                ]);
                setSkillDetails(skillResponse?.data);
                setZoneDetails(zoneResponse?.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const getUserDetails = async () => {
            const response = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/UserDetails?emailID=${userEmail}`,
            });

            const zoneIds = [];
            response?.data?.Zones?.map((zone) => zoneIds.push(zone?.ZoneId));
            setSelectedZones(zoneIds);

            setUserDetails({
                userName: response?.data?.UserDetails?.Name,
                phoneNumber: response?.data?.UserDetails?.ContactNumber,
                emailID: response?.data?.UserDetails?.EmailId,
                role: response?.data?.UserDetails?.Role,
                zones: zoneIds,
                userID: response?.data?.UserDetails?.UserId,
            });
            setProfilePic("data:image/*;base64," + response?.data?.UserDetails?.Photo);
            setBase64Profile(response?.data?.UserDetails?.Photo);
            userIDRef.current = response?.data?.UserDetails?.userID;

            let skillData = [];
            response?.data?.Skills?.map((skill, index) => {
                const data = {
                    id: index,
                    skill: skill?.SkillId,
                    startDate: skill?.StartDate,
                    expiryDate: skill?.ExpiryDate,
                };
                skillData.push(data);
            });
            setSkills(skillData);
        };
        if (userEmail) {
            getUserDetails();
        }
    }, [userEmail]);

    const addUserDetails = async () => {
        setIsSubmitUser(true);
        let skillData = [];
        skills?.map((skill) => {
            let data = {
                skillId: skill?.skill,
                startDate: new Date(skill?.startDate).toISOString().split("T")[0],
                expiryDate: new Date(skill?.expiryDate).toISOString().split("T")[0],
            };
            skillData.push(data);
        });
        try {
            const response = await axios({
                method: "post",
                url: `${import.meta.env.VITE_BASE_URL}/addUsers`,
                data: {
                    userName: userDetails?.userName,
                    password: "Abc@123",
                    emailID: userDetails?.emailID,
                    userId: userDetails?.userID,
                    phoneNumber: userDetails?.phoneNumber,
                    role: userDetails?.role,
                    zoneIds: selectedZones,
                    skill: skillData,
                    status: "Active",
                    photo: base64Profile,
                },
            });
            if (response?.data?.status?.toUpperCase() === "SUCCESS") {
                setSnack({ open: true, message: response?.data?.message, severity: "success" });
                navigate("/user-management/registration");
            } else {
                setSnack({ open: true, message: response?.data?.message, severity: "error" });
            }
        } catch (error) {
            console.error("Error adding user:", error);
        } finally {
            setIsSubmitUser(false);
        }
    };

    const updateUserDetails = async () => {
        setIsSubmitUser(true);
        let skillData = [];
        skills?.map((skill) => {
            let data = {
                skillId: skill?.skill,
                startDate: new Date(skill?.startDate).toISOString().split("T")[0],
                expiryDate: new Date(skill?.expiryDate).toISOString().split("T")[0],
            };
            skillData.push(data);
        });
        try {
            const response = await axios({
                method: "post",
                url: `${import.meta.env.VITE_BASE_URL}/updateUserDetails`,
                data: {
                    userID: userIDRef.current,
                    userName: userDetails?.userName,
                    emailID: userDetails?.emailID,
                    phoneNumber: userDetails?.phoneNumber,
                    role: userDetails?.role,
                    zones: selectedZones,
                    skill: skillData,
                    photo: base64Profile,
                },
            });
            if (response?.data?.status?.toUpperCase() === "SUCCESS") {
                setSnack({ open: true, message: response?.data?.message, severity: "success" });
                navigate("/user-management/registration");
            } else {
                setSnack({ open: true, message: response?.data?.message, severity: "error" });
            }
        } catch (error) {
            console.error("Error adding user:", error);
        } finally {
            setIsSubmitUser(false);
        }
    };

    return (
        <Box
            sx={{
                borderRadius: "20px",
                background: `${theme.palette.colors[2]} 0% 0% no-repeat padding-box`,
                my: 2,
                mr: 2,
                p: 2.5,
                boxShadow: `inset 0px 0px 6px ${theme.palette.colors[3]}`,
                opacity: 1,
                height: "100%",
            }}
        >
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
            <Box
                sx={{
                    background: `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                    borderRadius: "10px",
                    opacity: 1,
                }}
            >
                <Box
                    sx={{
                        py: 2,
                        px: 2.5,
                    }}
                >
                    <Typography variant="h4" fontWeight={600}>
                        {userEmail ? "Edit" : "Add"} User
                    </Typography>
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
                    {isSubmitUser && <Loader />}
                    <Grid2 container spacing={3}>
                        <Grid2 size={{ xs: 12, lg: 8 }} container spacing={3}>
                            <Grid2 size={6}>
                                <Typography>Name</Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    value={userDetails.userName}
                                    className="inputFields"
                                    onChange={(e) => {
                                        setUserDetails({
                                            ...userDetails,
                                            userName: e.target.value,
                                        });
                                    }}
                                />
                            </Grid2>
                            <Grid2 size={6}>
                                <Typography>Contact number</Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    value={userDetails.phoneNumber}
                                    className="inputFields"
                                    onChange={(e) => {
                                        setUserDetails({
                                            ...userDetails,
                                            phoneNumber: e.target.value,
                                        });
                                    }}
                                />
                            </Grid2>
                            <Grid2 size={6}>
                                <Typography>Email ID</Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    value={userDetails.emailID}
                                    className="inputFields"
                                    onChange={(e) => {
                                        setUserDetails({
                                            ...userDetails,
                                            emailID: e.target.value,
                                        });
                                    }}
                                    onBlur={(e) => {
                                        if (!userDetails?.userID) {
                                            setUserDetails({
                                                ...userDetails,
                                                userID: e.target.value,
                                            });
                                        }
                                    }}
                                />
                            </Grid2>
                            <Grid2 size={6}>
                                <Typography>User ID</Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    disabled
                                    value={userDetails.userID}
                                    className="inputFields"
                                    onChange={(e) => {
                                        setUserDetails({
                                            ...userDetails,
                                            userID: e.target.value,
                                        });
                                    }}
                                />
                            </Grid2>
                        </Grid2>
                        <Grid2
                            size={{ xs: 12, lg: 4 }}
                            container
                            direction="row"
                            sx={{
                                border: `1px dashed ${theme.palette.colors[22]}`,
                                borderRadius: "10px",
                                background: `#F5F5F5 0% 0% no-repeat padding-box`,
                                opacity: 1,
                                px: 3,
                            }}
                        >
                            <Grid2 size={4} container sx={{ justifyContent: "center", alignItems: "center", p: 2 }}>
                                {profilePic ? (
                                    <Avatar
                                        sx={{
                                            width: "94px",
                                            height: "94px",
                                        }}
                                        src={profilePic}
                                    />
                                ) : (
                                    <Avatar
                                        sx={{
                                            width: "94px",
                                            height: "94px",
                                        }}
                                    />
                                )}
                            </Grid2>
                            <Grid2 size={8} container direction='column' spacing={1} sx={{ justifyContent: "center", alignItems: "center", direction: 'column' }}>
                                <Typography>Upload user's profile picture</Typography>
                                <Typography>or</Typography>
                                <Button
                                    component="label"
                                    role={undefined}
                                    tabIndex={-1}
                                    sx={{
                                        fontWeight: 500,
                                        color: `${theme.palette.colors[11]}`,
                                        fontSize: 14,
                                        height: "25px",
                                        textDecoration: "underline",
                                    }}
                                >
                                    <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileChange} />
                                    Browse Gallery
                                </Button>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                    <Divider sx={{ my: 3 }} />
                    <Grid2 container spacing={3}>
                        <Grid2 size={4} className="inputFields">
                            <Typography>Role</Typography>
                            <Select
                                value={userDetails?.role}
                                onChange={(e) => {
                                    setUserDetails({
                                        ...userDetails,
                                        role: e.target.value,
                                    });
                                }}
                                sx={{
                                    height: "40px",
                                    width: "100%",
                                }}
                            >
                                <MenuItem value="Admin">Admin</MenuItem>
                                <MenuItem value="Manager">Manager</MenuItem>
                                <MenuItem value="Inspector">Inspector</MenuItem>
                                <MenuItem value="Reviewer">Reviewer</MenuItem>
                                <MenuItem value="Approver">Approver</MenuItem>
                            </Select>
                        </Grid2>
                        <Grid2 size={4} className="inputFields">
                            <Typography>Zone</Typography>
                            <Select
                                multiple
                                value={selectedZones}
                                onChange={(e) => {
                                    setIsShowSelectedZones(false);
                                    setSelectedZones(
                                        typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value
                                    );
                                }}
                                endAdornment={
                                    <>
                                        {selectedZones?.length > 0 && (
                                            <CloseIcon
                                                sx={{
                                                    color: "#5F6368",
                                                    cursor: "pointer",
                                                    fontSize: "15px",
                                                    mr: 1,
                                                }}
                                                onClick={() => setSelectedZones([])}
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
                                                    label={zoneDetails?.find((zone) => zone?.zoneId === value)?.name}
                                                />
                                            ))}
                                        </Box>
                                        {selected.length > 2 && (
                                            <Button
                                                ref={anchorRef}
                                                sx={{
                                                    color: `${theme.palette.colors[11]}`,
                                                    size: "small",
                                                    height: "26px",
                                                }}
                                                onMouseLeave={() => {
                                                    setIsShowSelectedZones(false);
                                                }}
                                                onMouseEnter={(event) => {
                                                    setIsShowSelectedZones(true);
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
                                {zoneDetails?.map((zone) => (
                                    <MenuItem key={zone?.zoneId} value={zone?.zoneId}>
                                        <CustomCheckbox checked={selectedZones?.includes(zone?.zoneId)} />
                                        <ListItemText primary={zone?.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                            {isShowSelectedZones && selectedZones?.length > 2 && (
                                <Popover
                                    sx={{
                                        pointerEvents: "none",
                                        boxShadow: "0px",
                                        "& .MuiPaper-root": {
                                            boxShadow: "none",
                                        },
                                    }}
                                    open={isShowSelectedZones}
                                    anchorReference="anchorPosition"
                                    anchorPosition={{
                                        top: anchorRef.current?.getBoundingClientRect().bottom + 10,
                                        left: anchorRef.current?.getBoundingClientRect().left - 100,
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
                                        {selectedZones?.map((zone) => (
                                            <Chip key={zone} label={zoneDetails?.find((value) => value?.zoneId === zone)?.name} />
                                        ))}
                                    </Box>
                                </Popover>
                            )}
                        </Grid2>
                    </Grid2>
                    <Divider sx={{ my: 3 }} />
                    <Typography sx={{ fontSize: "14px !important", mb: 1 }}>Skills</Typography>
                    <Box
                        className="addButtonContainer"
                        onClick={() => {
                            if (isNewSkill) return;
                            setSkills((prev) => [
                                {
                                    id: prev.length,
                                    skill: "",
                                    startDate: dayjs(Date()),
                                    expiryDate: dayjs(Date()),
                                    isEditSkill: true,
                                },
                                ...prev,
                            ]);
                            setIsNewSkill(true);
                        }}
                    >
                        <AddActionsOutlinedIcon sx={{ mr: 1 }} />
                        <Typography className="typographyFontWeight">Add Skills</Typography>
                    </Box>
                    <Box
                        sx={{
                            maxHeight: "400px",
                            mt: 1,
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
                                display: "none",
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
                        }}
                    >
                        <DataGrid columns={columns} rows={skills} hideFooter />
                    </Box>
                    <Box
                        sx={{
                            "& .MuiButtonBase-root:hover": {
                                backgroundColor: theme.palette.colors[11],
                            },
                            display: "flex",
                            justifyContent: "flex-end",
                            mt: 2,
                        }}
                    >
                        <Button
                            onClick={() => (userEmail ? updateUserDetails() : addUserDetails())}
                            variant="contained"
                            sx={{
                                backgroundColor: `${theme.palette.colors[11]}`,
                                color: "#ffffff",
                                borderRadius: "20px",
                                px: 5,
                                height: "40px",
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AddUser;
