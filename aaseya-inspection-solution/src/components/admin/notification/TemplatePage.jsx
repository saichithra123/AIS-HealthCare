import React from "react";
import { Box, Grid2, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmailIcon from "../../../assets/Email.svg";
import NotificationIcon from "../../../assets/Notification.svg";

const TemplatePage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
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
                    height: "100%",
                }}
            >
                <Typography variant="h4" fontWeight={600} sx={{ mb: 3 }}>
                    Templates
                </Typography>
                <Grid2 container spacing={2.5}>
                    <Grid2
                        size={{ xs: 12, md: 6, lg: 3 }}
                        container
                        direction="column"
                        sx={{
                            background: `#f2f2f2`,
                            boxShadow: `0px 1px 4px ${theme.palette.colors[3]}`,
                            borderRadius: "10px",
                            opacity: 1,
                            p: 3,
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                        }}
                        onClick={() => navigate("/templates/email")}
                    >
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                backgroundColor: "#E6EFF0",
                                width: "60px",
                                height: "60px",
                                borderRadius: "44px",
                            }}
                        >
                            <img src={EmailIcon} alt="User Registration" />
                        </Box>
                        <Typography variant="h6" fontWeight={400} fontSize={16}>
                            Email Template
                        </Typography>
                    </Grid2>
                    <Grid2
                        size={{ xs: 12, md: 6, lg: 3 }}
                        container
                        direction="column"
                        sx={{
                            background: `#f2f2f2`,
                            boxShadow: `0px 1px 4px ${theme.palette.colors[3]}`,
                            borderRadius: "10px",
                            opacity: 1,
                            p: 3,
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                        }}
                        onClick={() => navigate("/templates/notification")}
                    >
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                backgroundColor: "#E6EFF0",
                                width: "60px",
                                height: "60px",
                                borderRadius: "44px",
                            }}
                        >
                            <img src={NotificationIcon} alt="Access Control" />
                        </Box>
                        <Typography variant="h6" fontWeight={400} fontSize={16}>
                            Notification Template
                        </Typography>
                    </Grid2>
                </Grid2>
            </Box>
        </>
    );
};

export default TemplatePage;
