import { Box, Drawer, Grid2, useTheme, IconButton, Avatar, Badge } from "@mui/material";
import React from "react";
import "./footer.css";
import { useNavigate } from "react-router-dom";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import CasesOutlinedIcon from "@mui/icons-material/CasesOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

const Footer = ({ setUser }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.clear();
        setUser({});
        navigate("/");
    };

    return (
        <>
            <Drawer open={true} anchor="bottom" variant="persistent" className="footerDrawer">
                <Grid2 container direction="row" sx={{ justifyContent: "space-between", py: 2, px: 4 }}>
                    <Box
                        display="flex"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{
                            backgroundColor:
                                window.location.pathname.split("/")[1] === "dashboard"
                                    ? theme.palette.colors[18]
                                    : theme.palette.primary,
                            borderRadius: "10px",
                            color:
                                window.location.pathname.split("/")[1] === "dashboard"
                                    ? theme.palette.colors[5]
                                    : theme.palette.colors[8],
                            cursor: "pointer",
                        }}
                        onClick={() => navigate(`/dashboard`)}
                    >
                        <IconButton>
                            <GridViewOutlinedIcon />
                        </IconButton>
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{
                            backgroundColor:
                                window.location.pathname.split("/")[1] === "cases"
                                    ? theme.palette.colors[18]
                                    : theme.palette.primary,
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
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{
                            backgroundColor:
                                window.location.pathname.split("/")[1] === "inquiry"
                                    ? theme.palette.colors[18]
                                    : theme.palette.primary,
                            borderRadius: "10px",
                            color:
                                window.location.pathname.split("/")[1] === "inquiry"
                                    ? theme.palette.colors[5]
                                    : theme.palette.colors[8],
                            cursor: "pointer",
                        }}
                        onClick={() => navigate(`/inquiry`)}
                    >
                        <IconButton>
                            <BarChartOutlinedIcon />
                        </IconButton>
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            borderRadius: "10px",
                            color:
                                window.location.pathname.split("/")[1] === "inquiry"
                                    ? theme.palette.colors[5]
                                    : theme.palette.colors[8],
                            cursor: "pointer",
                        }}
                    >
                        <Badge variant="dot">
                            <NotificationsOutlinedIcon
                                sx={{
                                    width: "25px",
                                    height: "auto",
                                    color: "#00060A",
                                }}
                            />
                        </Badge>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{ cursor: "pointer" }}>
                        <Avatar onClick={handleClick} />
                    </Box>
                </Grid2>
            </Drawer>
        </>
    );
};

export default Footer;
