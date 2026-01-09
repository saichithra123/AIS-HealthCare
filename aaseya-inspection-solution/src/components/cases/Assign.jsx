import {
    Avatar,
    Box,
    Button,
    Divider,
    Grid2,
    Typography,
    useTheme,
    CircularProgress,
    FormControl,
    Select,
    MenuItem,
} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import "./caseInfo.css";
import axios from "axios";
import { SnackContext } from "../global/SnackProvider";
import { useNavigate } from "react-router-dom";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

const Assign = ({ setOpenDrawer, entityInformation }) => {
    const theme = useTheme();
    const [inspectorEmail, setInspectorEmail] = useState("");
    const { snack, setSnack } = useContext(SnackContext);
    const navigate = useNavigate();
    const [isAssignInspector, setIsAssignInspector] = useState(false);
    const [users, setUsers] = useState([]);
    const [inspectorType, setInspectorType] = useState("individual");
    const [selectedGroup, setSelectedGroup] = useState("");
    const [leadInspector, setLeadInspector] = useState("");
    const [userGroups, setUserGroups] = useState([]);
    const [groupInspectors, setGroupInspectors] = useState([]);

    useEffect(() => {
        const getAvailableInspector = async () => {
            const response = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/getavailableusers/${entityInformation.inspectionID}`,
            });
            setUsers(response?.data);
        };
        const getUserGroups = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/getUserGroupsForAssign`);
            setUserGroups(response?.data);
        };
        getAvailableInspector();
        getUserGroups();
    }, []);

    useEffect(() => {
        const getGroupInspectors = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/getUsersByGroupId/${selectedGroup}`);
            setGroupInspectors(response?.data);
        };
        if (selectedGroup) {
            getGroupInspectors();
        }
    }, [selectedGroup]);

    const assignInspector = async () => {
        try {
            if (inspectorType === "individual" && !inspectorEmail) {
                setSnack({ open: true, message: "Please select the inspector", severity: "error" });
                return;
            }
            setIsAssignInspector(true);
            const response = await axios({
                method: "post",
                url: `${import.meta.env.VITE_BASE_URL}/assignInspection`,
                data:
                    inspectorType === "individual"
                        ? {
                              inspectionId: entityInformation?.inspectionID,
                              inspectorId: inspectorEmail,
                          }
                        : {
                              inspectionId: entityInformation?.inspectionID,
                              leadId: leadInspector,
                              groupId: selectedGroup,
                          },
            });
            setSnack({ open: true, message: "Inspector assigned successfully", severity: "success" });
            setOpenDrawer(false);
            setIsAssignInspector(false);
            navigate(0);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Box className="assignContainer">
                <Button
                    sx={{
                        color: theme.palette.colors[21],
                        fontSize: "14px",
                        fontWeight: 600,
                    }}
                    startIcon={<KeyboardBackspaceOutlinedIcon />}
                    onClick={() => setOpenDrawer(false)}
                >
                    Back
                </Button>
                {isAssignInspector && (
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
                <Typography variant="h4" fontWeight={600} py={2}>
                    Assign Inspector
                </Typography>
                <Grid2 container spacing={2}>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Case ID</Typography>
                        <Typography className="contentBody">
                            {entityInformation?.inspectionID ? entityInformation?.inspectionID : "-"}
                        </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Inspection Type</Typography>
                        <Typography className="contentBody">
                            {entityInformation?.inspection_type ? entityInformation?.inspection_type : "-"}
                        </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Entity ID</Typography>
                        <Typography className="contentBody">
                            {entityInformation?.entityid ? entityInformation?.entityid : "-"}
                        </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Entity Name</Typography>
                        <Typography className="contentBody">{entityInformation?.name ? entityInformation?.name : "-"}</Typography>
                    </Grid2>
                    <Grid2>
                        <Typography className="contentHeading">Location</Typography>
                        <Typography className="contentBody">
                            {entityInformation?.location ? entityInformation?.location : "-"}
                        </Typography>
                    </Grid2>
                </Grid2>
                <Divider sx={{ my: 2 }} />
                <Grid2 container spacing={2}>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Reason for Inspection</Typography>
                        <Typography className="contentBody">
                            {entityInformation?.reason ? entityInformation?.reason : "-"}
                        </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                        <Typography className="contentHeading">Inspection Date</Typography>
                        <Typography className="contentBody">
                            {entityInformation?.dateOfInspection
                                ? new Date(entityInformation?.dateOfInspection)
                                      .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
                                      .replace(/ /g, " ")
                                : "-"}
                        </Typography>
                    </Grid2>
                </Grid2>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" fontWeight={700}>
                    Select Inspector/ Group
                </Typography>
                <Grid2 container spacing={2} sx={{ my: 2 }}>
                    <Grid2
                        size={6}
                        container
                        sx={{
                            background:
                                inspectorType === "individual"
                                    ? `${theme.palette.colors[2]} 0% 0% no-repeat padding-box`
                                    : `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                            boxShadow:
                                inspectorType === "individual"
                                    ? `inset 0px 1px 6px ${theme.palette.colors[3]}`
                                    : `0px 1px 6px ${theme.palette.colors[3]}`,
                            borderRadius: "10px",
                            opacity: 1,
                            alignItems: "center",
                            p: 1.5,
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            setInspectorEmail("");
                            setSelectedGroup("");
                            setInspectorType("individual");
                        }}
                    >
                        <Avatar sx={{ bgcolor: theme.palette.colors[20] }}>
                            <PersonOutlinedIcon sx={{ color: theme.palette.colors[11] }} />
                        </Avatar>
                        <Typography fontWeight={600}>Inspector</Typography>
                    </Grid2>
                    <Grid2
                        size={6}
                        container
                        sx={{
                            background:
                                inspectorType === "group"
                                    ? `${theme.palette.colors[2]} 0% 0% no-repeat padding-box`
                                    : `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                            boxShadow:
                                inspectorType === "group"
                                    ? `inset 0px 1px 6px ${theme.palette.colors[3]}`
                                    : `0px 1px 6px ${theme.palette.colors[3]}`,
                            borderRadius: "10px",
                            opacity: 1,
                            alignItems: "center",
                            p: 1.5,
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            setInspectorEmail("");
                            setSelectedGroup("");
                            setInspectorType("group");
                        }}
                    >
                        <Avatar sx={{ bgcolor: theme.palette.colors[20] }}>
                            <GroupOutlinedIcon sx={{ color: theme.palette.colors[11] }} />
                        </Avatar>
                        <Typography fontWeight={600}>User Group</Typography>
                    </Grid2>
                </Grid2>
                {inspectorType === "individual" && (
                    <Box
                        display="flex"
                        columnGap={2}
                        sx={{
                            "& .MuiAvatar-root": {
                                width: "55px",
                                height: "55px",
                            },
                            mt: 1,
                            overflow: "auto",
                            scrollbarWidth: "none",
                        }}
                    >
                        <Box
                            sx={{
                                height: "130px",
                                minWidth: "110px",
                                border: `1px solid ${theme.palette.colors[22]}`,
                                borderRadius: "10px",
                            }}
                            display="flex"
                            flexDirection="column"
                            rowGap={2}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Avatar />
                            <Typography fontWeight={600}>Auto-Assign</Typography>
                        </Box>
                        {users.map((user, index) => {
                            return (
                                <Box
                                    sx={{
                                        height: "130px",
                                        minWidth: "110px",
                                        border:
                                            inspectorEmail === user?.emailID
                                                ? `2px solid #4C8B92`
                                                : `1px solid ${theme.palette.colors[22]}`,
                                        borderRadius: "10px",
                                        cursor: "pointer",
                                    }}
                                    width={110}
                                    key={index}
                                    display="flex"
                                    flexDirection="column"
                                    rowGap={2}
                                    justifyContent="center"
                                    alignItems="center"
                                    onClick={() => setInspectorEmail(user.emailID)}
                                >
                                    <Avatar />
                                    <Typography fontWeight={600}>{user.userName}</Typography>
                                </Box>
                            );
                        })}
                    </Box>
                )}
                {inspectorType === "group" && (
                    <>
                        <Box
                            display="flex"
                            columnGap={2}
                            sx={{
                                mt: 1,
                                overflow: "auto",
                                scrollbarWidth: "none",
                            }}
                        >
                            {userGroups.map((group, index) => {
                                return (
                                    <Box
                                        sx={{
                                            height: "130px",
                                            minWidth: "110px",
                                            border:
                                                selectedGroup === group?.groupId
                                                    ? `2px solid ${theme.palette.colors[11]}`
                                                    : `1px solid ${theme.palette.colors[22]}`,
                                            borderRadius: "10px",
                                            cursor: "pointer",
                                        }}
                                        width={110}
                                        key={group?.groupId}
                                        display="flex"
                                        flexDirection="column"
                                        rowGap={1}
                                        justifyContent="center"
                                        alignItems="center"
                                        onClick={() => {
                                            setGroupInspectors([]);
                                            setLeadInspector("");
                                            setSelectedGroup(group?.groupId);
                                        }}
                                    >
                                        <Typography fontWeight={600}>{group?.groupName}</Typography>
                                        <Typography color={theme.palette.colors[11]}>{group?.usersCount} people</Typography>
                                    </Box>
                                );
                            })}
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <Typography className="contentHeading">Lead Inspector</Typography>
                            <FormControl className="newCaseFields" sx={{ width: "230px" }}>
                                <Select fullWidth value={leadInspector} onChange={(e) => setLeadInspector(e.target.value)}>
                                    {groupInspectors?.map((inspector) => {
                                        return (
                                            <MenuItem key={inspector?.userID} value={inspector?.userID}>
                                                {inspector?.userName}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                    </>
                )}
                <Grid2
                    container
                    sx={{
                        "& .MuiButtonBase-root:hover": {
                            backgroundColor: theme.palette.colors[11],
                        },
                        justifyContent: "flex-end",
                        pr: 1,
                        mt: 4,
                    }}
                >
                    <Button
                        sx={{
                            backgroundColor: theme.palette.colors[11],
                            borderRadius: "20px",
                            width: "160px",
                            height: "40px",
                        }}
                        onClick={() => {
                            assignInspector();
                        }}
                    >
                        Assign Inspector
                    </Button>
                </Grid2>
            </Box>
        </>
    );
};

export default Assign;
