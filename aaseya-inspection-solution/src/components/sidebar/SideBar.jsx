import { Avatar, Box, Container, Grid2, IconButton, Typography, styled, useTheme, Popper } from "@mui/material";
import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
// import Logo from "../../assets/inspection_logo.png";
import AaseyaLogo from "../../assets/black_logo.png";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import CasesOutlinedIcon from "@mui/icons-material/CasesOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import "./sidebar.css";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import RoomPreferencesOutlinedIcon from "@mui/icons-material/RoomPreferencesOutlined";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import configIcon from "../../assets/config.png";
import zoneIcon from "../../assets/zone.png";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import PolicyIcon from "@mui/icons-material/Policy";


const TopArrowRight = styled("div")({
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "4px",
    height: "20px",
    backgroundColor: "#E6EFF0",
    transform: "translate(-50%, -50%) rotate(15deg)",
    transformOrigin: "0 0",
    borderRadius: "2px 2px 0 0",
});

const BottomArrowRight = styled("div")({
    position: "absolute",
    top: "85%",
    left: "50%",
    width: "4px",
    height: "20px",
    backgroundColor: "#E6EFF0",
    transform: "translate(-50%, -50%) rotate(-15deg)",
    transformOrigin: "0 100%",
    borderRadius: "0 0 2px 2px",
});

const TopArrowLeft = styled("div")({
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "4px",
    height: "20px",
    backgroundColor: "#E6EFF0",
    transform: "translate(-50%, -50%) rotate(-15deg)",
    transformOrigin: "0 0",
    borderRadius: "2px 2px 0 0",
});

const BottomArrowLeft = styled("div")({
    position: "absolute",
    top: "85%",
    left: "50%",
    width: "4px",
    height: "20px",
    backgroundColor: "#E6EFF0",
    transform: "translate(-50%, -50%) rotate(15deg)",
    transformOrigin: "0 100%",
    borderRadius: "0 0 2px 2px",
});

const StraightLine = styled("div")({
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "4px",
    height: "40px",
    backgroundColor: "#E6EFF0",
    transform: "translate(-50%, -50%) rotate(0deg)",
    transformOrigin: "0 100%",
    borderRadius: "2px 2px 2px 2px",
});

const SideBar = ({ setIsSidebarCollapsed, setUser }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const theme = useTheme();
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [openLogout, setOpenLogout] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        setIsSidebarCollapsed(isCollapsed);
    }, [isCollapsed]);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const hndleMouseClick = () => {
        setIsHovered(false);
        setIsCollapsed(!isCollapsed);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenLogout(!openLogout);
    };

    const signOut = () => {
        setOpenLogout(!openLogout);
        localStorage.clear();
        setUser({});
        navigate("/");
    };

    return (
        <>
            <Box className="sidebarContainer">
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    width={isCollapsed ? "70%" : "90%"}
                    sx={{
                        "& .MuiButtonBase-root:hover": {
                            backgroundColor: theme.palette.colors[18],
                        },
                        "& .MuiBox-root:hover": {
                            backgroundColor: theme.palette.colors[18],
                        },
                    }}
                    onMouseEnter={() => setIsCollapsed(!isCollapsed)}
                    onMouseLeave={() => setIsCollapsed(!isCollapsed)}
                >
                    <Grid2
                        container
                        rowGap={3}
                        sx={{
                            width: "100%",
                        }}
                    >
                        {isCollapsed && (
                            <Container
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    ml: 1.5,
                                }}
                            >
                                <img src={Logo} alt="Aaseya Inspection Solution" width={60} height={40} />
                            </Container>
                        )}
                        {!isCollapsed && (
                            <Container
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    ml: 1.5,
                                }}
                            >
                                <img src={AaseyaLogo} alt="Aaseya Inspection Solution" width={120} height={40} />
                            </Container>
                        )}
                        <Box
                            display="flex"
                            justifyContent="flex-start"
                            alignItems="center"
                            sx={{
                                backgroundColor:
                                    window.location.pathname.split("/")[1] === "dashboard" ||
                                    window.location.pathname.split("/")[1] === "admin"
                                        ? theme.palette.colors[18]
                                        : theme.palette.primary,
                                ml: 3,
                                width: "100%",
                                borderRadius: "10px",
                                color:
                                    window.location.pathname.split("/")[1] === "dashboard" ||
                                    window.location.pathname.split("/")[1] === "admin"
                                        ? theme.palette.colors[5]
                                        : theme.palette.colors[8],
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                localStorage.getItem("userRole") === "ADMIN" ? navigate(`/admin`) : navigate(`/dashboard`);
                            }}
                        >
                            <IconButton>
                                <GridViewOutlinedIcon />
                            </IconButton>
                            {!isCollapsed && <Typography>Dashboard</Typography>}
                        </Box>
                        {localStorage.getItem("userRole") === "ADMIN" && (
                            <>
                                <Box
                                    display="flex"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    sx={{
                                        backgroundColor:
                                            window.location.pathname.split("/")[1] === "user-management"
                                                ? theme.palette.colors[18]
                                                : theme.palette.primary,
                                        ml: 3,
                                        width: "100%",
                                        borderRadius: "10px",
                                        color:
                                            window.location.pathname.split("/")[1] === "user-management"
                                                ? theme.palette.colors[5]
                                                : theme.palette.colors[8],
                                        cursor: "pointer",
                                    }}
                                    onClick={() => navigate(`/user-management`)}
                                >
                                    <IconButton>
                                        <ManageAccountsOutlinedIcon />
                                    </IconButton>
                                    {!isCollapsed && <Typography>User Management</Typography>}
                                </Box>
                                <Box
                                    display="flex"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    sx={{
                                        backgroundColor:
                                            window.location.pathname.split("/")[1] === "entity-management"
                                                ? theme.palette.colors[18]
                                                : theme.palette.primary,
                                        ml: 3,
                                        width: "100%",
                                        borderRadius: "10px",
                                        color:
                                            window.location.pathname.split("/")[1] === "entity-management"
                                                ? theme.palette.colors[5]
                                                : theme.palette.colors[8],
                                        cursor: "pointer",
                                    }}
                                    onClick={() => navigate(`/entity-management`)}
                                >
                                    <IconButton>
                                        <RoomPreferencesOutlinedIcon />
                                    </IconButton>
                                    {!isCollapsed && <Typography>Entity Management</Typography>}
                                </Box>
                                <Box
                                    display="flex"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    sx={{
                                        backgroundColor:
                                            window.location.pathname.split("/")[1] === "checklist-management"
                                                ? theme.palette.colors[18]
                                                : theme.palette.primary,
                                        ml: 3,
                                        width: "100%",
                                        borderRadius: "10px",
                                        color:
                                            window.location.pathname.split("/")[1] === "checklist-management"
                                                ? theme.palette.colors[5]
                                                : theme.palette.colors[8],
                                        cursor: "pointer",
                                    }}
                                    onClick={() => navigate(`/checklist-management`)}
                                >
                                    <IconButton>
                                        <PlaylistAddCheckOutlinedIcon />
                                    </IconButton>
                                    {!isCollapsed && <Typography>Checklist Management</Typography>}
                                </Box>
                                <Box
                                    display="flex"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    sx={{
                                        backgroundColor:
                                            window.location.pathname.split("/")[1] === "configurations"
                                                ? theme.palette.colors[18]
                                                : theme.palette.primary,
                                        ml: 3,
                                        width: "100%",
                                        borderRadius: "10px",
                                        color:
                                            window.location.pathname.split("/")[1] === "configurations"
                                                ? theme.palette.colors[5]
                                                : theme.palette.colors[8],
                                        cursor: "pointer",
                                    }}
                                    onClick={() => navigate(`/configurations`)}
                                >
                                    <IconButton>
                                        <img
                                            src={configIcon}
                                            alt="Config Icon"
                                            style={{ width: 18, height: 18 }}
                                            sx={{ fontSize: 20 }}
                                        />
                                    </IconButton>
                                    {!isCollapsed && <Typography>Configurations</Typography>}
                                </Box>
                                <Box
                                    display="flex"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    sx={{
                                        backgroundColor:
                                            window.location.pathname.split("/")[1] === "templates"
                                                ? theme.palette.colors[18]
                                                : theme.palette.primary,
                                        ml: 3,
                                        width: "100%",
                                        borderRadius: "10px",
                                        color:
                                            window.location.pathname.split("/")[1] === "templates"
                                                ? theme.palette.colors[5]
                                                : theme.palette.colors[8],
                                        cursor: "pointer",
                                    }}
                                    onClick={() => navigate(`/templates`)}
                                >
                                    <IconButton>
                                        <EmailOutlinedIcon />
                                    </IconButton>
                                    {!isCollapsed && <Typography>Email Template</Typography>}
                                </Box>
                                {/* <Box
                                    display="flex"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    sx={{
                                        backgroundColor:
                                            window.location.pathname.split("/")[1] === "zone-management"
                                                ? theme.palette.colors[18]
                                                : theme.palette.primary,
                                        ml: 3,
                                        // mb:10,
                                        width: "100%",
                                        borderRadius: "10px",
                                        color:
                                            window.location.pathname.split("/")[1] === "zone-management"
                                                ? theme.palette.colors[5]
                                                : theme.palette.colors[8],
                                        cursor: "pointer",
                                    }}
                                    onClick={() => navigate(`/zone-management`)}
                                >
                                    <IconButton>
                                        <img
                                            src={zoneIcon}
                                            alt="Zone Icon"
                                            style={{ width: 18, height: 18 }}
                                            sx={{ fontSize: 18 }}
                                        />
                                    </IconButton>
                                    {!isCollapsed && <Typography>Zone Management</Typography>}
                                </Box> */}
                            </>
                        )}
                        {localStorage.getItem("userRole") !== "ADMIN" && (
                            <>
                                <Box
                                    display="flex"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    sx={{
                                        backgroundColor:
                                            window.location.pathname.split("/")[1] === "cases"
                                                ? theme.palette.colors[18]
                                                : theme.palette.primary,
                                        ml: 3,
                                        width: "100%",
                                        borderRadius: "10px",
                                        color:
                                            window.location.pathname.split("/")[1] === "cases"
                                                ? theme.palette.colors[5]
                                                : theme.palette.colors[8],
                                        cursor: "pointer",
                                    }}
                                    onClick={() => navigate(`/cases`)}
                                >
                                    <IconButton>
                                        <CasesOutlinedIcon />
                                    </IconButton>
                                    {!isCollapsed && <Typography>Cases</Typography>}
                                </Box>
                                {/* {localStorage.getItem("userRole") === "MANAGER" && (
                                    <Box
                                        display="flex"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        sx={{
                                            backgroundColor:
                                                window.location.pathname.split("/")[1] === "inspection-plan"
                                                    ? theme.palette.colors[18]
                                                    : theme.palette.primary,
                                            ml: 3,
                                            width: "100%",
                                            borderRadius: "10px",
                                            color:
                                                window.location.pathname.split("/")[1] === "inspection-plan"
                                                    ? theme.palette.colors[5]
                                                    : theme.palette.colors[8],
                                            cursor: "pointer",
                                        }}
                                        onClick={() => navigate(`/inspection-plan`)}
                                    >
                                        <IconButton>
                                            <ContentPasteOutlinedIcon />
                                        </IconButton>
                                        {!isCollapsed && <Typography>Inspection Plan</Typography>}
                                    </Box>
                                )} */}

                                {localStorage.getItem("userRole") === "MANAGER" && (
                                    <Box
                                        display="flex"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        sx={{
                                            backgroundColor:
                                                window.location.pathname.split("/")[1] === "policy-holders"
                                                    ? theme.palette.colors[18]
                                                    : theme.palette.primary,
                                            ml: 3,
                                            width: "100%",
                                            borderRadius: "10px",
                                            color:
                                                window.location.pathname.split("/")[1] === "policy-holders"
                                                    ? theme.palette.colors[5]
                                                    : theme.palette.colors[8],
                                            cursor: "pointer",
                                        }}
                                        onClick={() => navigate(`/policy-holders`)}
                                    >
                                        <IconButton>
                                            <PolicyIcon />
                                        </IconButton>
                                        {!isCollapsed && <Typography>Policy Holders</Typography>}
                                    </Box>
                                )}
                            </>
                        )}
                        <Box
                            display="flex"
                            justifyContent="flex-start"
                            alignItems="center"
                            sx={{
                                backgroundColor:
                                    window.location.pathname.split("/")[1] === "reports"
                                        ? theme.palette.colors[18]
                                        : theme.palette.primary,
                                ml: 3,
                                mb: localStorage.getItem("userRole") === "ADMIN" ? 3 : 0,
                                width: "100%",
                                borderRadius: "10px",
                                color:
                                    window.location.pathname.split("/")[1] === "reports"
                                        ? theme.palette.colors[5]
                                        : theme.palette.colors[8],
                                cursor: "pointer",
                            }}
                            onClick={() => navigate(`/reports`)}
                        >
                            <IconButton>
                                <BarChartOutlinedIcon />
                            </IconButton>
                            {!isCollapsed && <Typography>Reports Dashboard</Typography>}
                        </Box>
                    </Grid2>
                    <Grid2
                        sx={{ ml: 3, mb: 3, cursor: "pointer", width: "40px", height: "40px" }}
                        onClick={(e) => handleClick(e)}
                    >
                        <Avatar />
                    </Grid2>
                </Box>
                <Box
                    width={isCollapsed ? "30%" : "10%"}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                >
                    {!isHovered && (
                        <Box
                            sx={{
                                width: "4px",
                                height: "40px",
                                backgroundColor: theme.palette.colors[7],
                                borderRadius: "2px",
                                cursor: "pointer",
                            }}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />
                    )}
                    {isHovered && isCollapsed && (
                        <Box
                            sx={{
                                position: "relative",
                                width: "50px",
                                height: "50px",
                                cursor: "pointer",
                            }}
                            onMouseLeave={handleMouseLeave}
                            onClick={hndleMouseClick}
                        >
                            <TopArrowLeft />
                            <BottomArrowLeft />
                        </Box>
                    )}
                    {isHovered && !isCollapsed && (
                        <Box
                            sx={{
                                position: "relative",
                                width: "50px",
                                height: "50px",
                                cursor: "pointer",
                            }}
                            onMouseLeave={handleMouseLeave}
                            onClick={hndleMouseClick}
                        >
                            <TopArrowRight />
                            <BottomArrowRight />
                        </Box>
                    )}
                </Box>
            </Box>
            <Popper
                open={openLogout}
                anchorEl={anchorEl}
                placement="right"
                modifiers={[
                    {
                        name: "offset",
                        options: {
                            offset: [0, 10],
                        },
                    },
                ]}
            >
                <Box className="signoutContainer">
                    <Typography variant="h6">{localStorage.getItem("userName")}</Typography>
                    <IconButton onClick={signOut}>
                        <LogoutIcon />
                    </IconButton>
                </Box>
            </Popper>
        </>
    );
};

export default SideBar;
