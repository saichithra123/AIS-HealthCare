import React, { useState } from "react";
import { Box, Grid2, Card, CardContent, Typography, IconButton, Button, TextField, Divider } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";

const NotificationTemplates = [
    {
        id: 1,
        title: "Welcome Onboard",
        description:
            "Welcome, [Name]! Thank you for joining us. We're glad to have you on board. To get the most out of your experience, complete this next step...",
    },
    {
        id: 2,
        title: "Welcome Onboard",
        description:
            "Welcome, [Name]! Thank you for joining us. We're glad to have you on board. To get the most out of your experience, complete this next step...",
    },
    {
        id: 3,
        title: "Welcome Onboard",
        description:
            "Welcome, [Name]! Thank you for joining us. We're glad to have you on board. To get the most out of your experience, complete this next step...",
    },
    {
        id: 4,
        title: "Welcome Onboard",
        description:
            "Welcome, [Name]! Thank you for joining us. We're glad to have you on board. To get the most out of your experience, complete this next step...",
    },
    {
        id: 5,
        title: "Welcome Onboard",
        description:
            "Welcome, [Name]! Thank you for joining us. We're glad to have you on board. To get the most out of your experience, complete this next step...",
    },
    {
        id: 6,
        title: "Welcome Onboard",
        description:
            "Welcome, [Name]! Thank you for joining us. We're glad to have you on board. To get the most out of your experience, complete this next step...",
    },
];

const NotificationTemplate = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const navigate = useNavigate();
    const theme = useTheme();

    const handleTemplateClick = (template) => {
        setSelectedTemplate(template);
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
                    background: theme.palette.colors[1],
                    borderRadius: "10px",
                    mt: 1,
                }}
            >
                <Box sx={{ py: 2, px: 2.5 }}>
                    <Typography variant="h4" fontWeight={600} sx={{ color: theme.palette.colors[6] }}>
                        Notification Templates
                    </Typography>
                </Box>

                <Divider sx={{ backgroundColor: theme.palette.colors[4] }} />

                <Box sx={{ py: 2, px: 2.5 }}>
                    {selectedTemplate ? (
                        <Box>
                            <Typography variant="h6" fontWeight="bold" mb={1}>
                                {selectedTemplate.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {selectedTemplate.description}
                            </Typography>
                        </Box>
                    ) : (
                        <Grid2 container spacing={3}>
                            {NotificationTemplates.map((template) => (
                                <Grid2 size={{ xs: 12, md: 6, lg: 3 }} key={template.id}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            borderRadius: "12px",
                                            "&:hover": {
                                                // boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                                            },
                                        }}
                                    >
                                        <CardContent>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    {template.title}
                                                </Typography>

                                                <Box
                                                    sx={{
                                                        backgroundColor: theme.palette.background.paper,
                                                        borderRadius: "4px",
                                                        padding: "5px",
                                                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        cursor: "pointer",
                                                        "&:hover": {
                                                            boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.15)",
                                                        },
                                                    }}
                                                >
                                                    <EditOutlinedIcon fontSize="small" sx={{ color: theme.palette.colors[11] }} />
                                                </Box>
                                            </Box>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontSize: 12,
                                                    color: theme.palette.colors[6],
                                                }}
                                            >
                                                {template.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid2>
                            ))}
                        </Grid2>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default NotificationTemplate;
