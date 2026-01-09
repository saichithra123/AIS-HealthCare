
import React, { useEffect, useState } from 'react';
import { Box, Grid2, useTheme, Typography } from "@mui/material";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import RoomPreferencesOutlinedIcon from "@mui/icons-material/RoomPreferencesOutlined";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useNavigate } from "react-router-dom";
import configurationIcon from "/src/assets/configuration.png";
import zoneManagementIcon from "/src/assets/zoneManagement.png";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [insights, setInsights] = useState([]);
    const [caseOverview, setCaseOverview] = useState({});

    return (
        <>
            <Box
                sx={{
                    borderRadius: "20px",
                    background: `${theme.palette.colors[2]} 0% 0% no-repeat padding-box`,
                    my: 2,
                    mr: 2,
                    p: 2.5,
                    boxShadow: `inset 0px 0px 6px ${theme.palette.colors[3]}`,
                    opacity: 1,
                }}
            >
                <>
                    <Grid2 container spacing={3}>
                        <Grid2
                            size={{ xs: 12, md: 6, lg: 4 }}
                            container
                            sx={{ cursor: "pointer" }}
                            onClick={() => navigate(`/user-management`)}
                        >
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                    backgroundColor: "#4C8B92",
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "44px",
                                    position: "relative",
                                    left: "30px",
                                    zIndex: 9,
                                }}
                            >
                                <ManageAccountsOutlinedIcon sx={{ color: "white", fontSize: "24px" }} />
                            </Box>
                            <Box
                                display="flex"
                                columnGap={2}
                                sx={{
                                    background: `#ffffff`,
                                    borderRadius: "10px",
                                    opacity: 1,
                                    p: 3,
                                    pt: 6,
                                    position: "relative",
                                    top: "-50px",
                                    border: `1px solid #EBEBEB`,
                                    height: "180px",
                                    width: "100%",
                                }}
                            >
                                <Box>
                                    <Typography variant="h4" fontWeight={600} sx={{ mb: 2 }}>
                                        User Management
                                    </Typography>
                                    <Typography>
                                        Helps you to create new users and control their access levels, and allows you to create
                                        user groups.
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid2>
                        <Grid2
                            size={{ xs: 12, md: 6, lg: 4 }}
                            container
                            sx={{ cursor: "pointer" }}
                            onClick={() => navigate(`/entity-management`)}
                        >
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                    backgroundColor: "#4C8B92",
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "44px",
                                    position: "relative",
                                    left: "30px",
                                    zIndex: 9,
                                }}
                            >
                                <RoomPreferencesOutlinedIcon sx={{ color: "white", fontSize: "24px" }} />
                            </Box>
                            <Box
                                display="flex"
                                columnGap={2}
                                sx={{
                                    background: `#ffffff`,
                                    borderRadius: "10px",
                                    opacity: 1,
                                    p: 3,
                                    pt: 6,
                                    position: "relative",
                                    top: "-50px",
                                    height: "180px",
                                    width: "100%",
                                    border: `1px solid #EBEBEB`,
                                }}
                            >
                                <Box>
                                    <Typography variant="h4" fontWeight={600} sx={{ mb: 2 }}>
                                        Entity Management
                                    </Typography>
                                    <Typography>Helps you to create new entities and sort them on the basis of zones.</Typography>
                                </Box>
                            </Box>
                        </Grid2>
                        <Grid2
                            size={{ xs: 12, md: 6, lg: 4 }}
                            container
                            sx={{ cursor: "pointer" }}
                            onClick={() => navigate(`/checklist-management`)}
                        >
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                    backgroundColor: "#4C8B92",
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "44px",
                                    position: "relative",
                                    left: "30px",
                                    zIndex: 9,
                                }}
                            >
                                <PlaylistAddCheckOutlinedIcon sx={{ color: "white", fontSize: "24px" }} />
                            </Box>
                            <Box
                                display="flex"
                                columnGap={2}
                                sx={{
                                    background: `#ffffff`,
                                    borderRadius: "10px",
                                    opacity: 1,
                                    p: 3,
                                    pt: 6,
                                    position: "relative",
                                    top: "-50px",
                                    border: `1px solid #EBEBEB`,
                                    height: "180px",
                                    width: "100%",
                                }}
                            >
                                <Box>
                                    <Typography variant="h4" fontWeight={600} sx={{ mb: 2 }}>
                                        Checklist Management
                                    </Typography>
                                    <Typography>
                                        Helps you to create checklist items, categories, templates and pre-inspection checklist
                                        items for multiple inspection types.
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid2>
                        <Grid2
                            size={{ xs: 12, md: 6, lg: 4 }}
                            container
                            sx={{ cursor: "pointer" }}
                            onClick={() => navigate(`/configurations`)}
                        >
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                    backgroundColor: "#4C8B92",
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "44px",
                                    position: "relative",
                                    left: "30px",
                                    zIndex: 9,
                                }}
                            >
                                <img
                                    src={configurationIcon}
                                    alt="Configuration Icon"
                                    style={{ width: 24, height: 24 }}
                                    sx={{ color: "white" }}
                                />
                            </Box>
                            <Box
                                display="flex"
                                columnGap={2}
                                sx={{
                                    background: `#ffffff`,
                                    borderRadius: "10px",
                                    opacity: 1,
                                    p: 3,
                                    pt: 6,
                                    position: "relative",
                                    top: "-50px",
                                    border: `1px solid #EBEBEB`,
                                    height: "180px",
                                    width: "100%",
                                }}
                            >
                                <Box>
                                    <Typography variant="h4" fontWeight={600} sx={{ mb: 2 }}>
                                        Configurations
                                    </Typography>
                                    <Typography>
                                        Helps you to configure different features like inspection type, skills, workflow settings,
                                        notification settings, answer options, and value tables for answer options.
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid2>
                        <Grid2
                            size={{ xs: 12, md: 6, lg: 4 }}
                            container
                            sx={{ cursor: "pointer" }}
                            onClick={() => navigate(`/templates`)}
                        >
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                    backgroundColor: "#4C8B92",
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "44px",
                                    position: "relative",
                                    left: "30px",
                                    zIndex: 9,
                                }}
                            >
                                <EmailOutlinedIcon sx={{ color: "white", fontSize: "24px" }} />
                            </Box>
                            <Box
                                display="flex"
                                columnGap={2}
                                sx={{
                                    background: `#f2f2f2`,
                                    borderRadius: "10px",
                                    opacity: 1,
                                    p: 3,
                                    pt: 6,
                                    position: "relative",
                                    top: "-50px",
                                    border: `1px solid #EBEBEB`,
                                    height: "180px",
                                    width: "100%",
                                }}
                            >
                                <Box>
                                    <Typography variant="h4" fontWeight={400} sx={{ mb: 2 }}>
                                        Email Template
                                    </Typography>
                                    <Typography>Helps you edit templates for email and notifications.</Typography>
                                </Box>
                            </Box>
                        </Grid2>
                        <Grid2
                            size={{ xs: 12, md: 6, lg: 4 }}
                            container
                            sx={{ cursor: "pointer" }}
                            onClick={() => navigate(`/zone-Management`)}
                        >
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                    backgroundColor: "#4C8B92",
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "44px",
                                    position: "relative",
                                    left: "30px",
                                    zIndex: 9,
                                }}
                            >
                                <img
                                    src={zoneManagementIcon}
                                    alt="zone Management Icon"
                                    style={{ width: 20, height: 20 }}
                                    sx={{ color: "white" }}
                                />
                            </Box>
                            <Box
                                display="flex"
                                columnGap={2}
                                sx={{
                                    background: `#f2f2f2`,
                                    borderRadius: "10px",
                                    opacity: 1,
                                    p: 3,
                                    pt: 6,
                                    position: "relative",
                                    top: "-50px",
                                    border: `1px solid #EBEBEB`,
                                    height: "180px",
                                    width: "100%",
                                }}
                            >
                                <Box>
                                    <Typography variant="h4" fontWeight={400} sx={{ mb: 2 }}>
                                        Zone Management
                                    </Typography>
                                    <Typography>
                                        Helps you to create zones on the basis of the zone creation method you opted for.
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid2>
                    </Grid2>
                </>
            </Box>
        </>
    );
};

export default AdminDashboard;