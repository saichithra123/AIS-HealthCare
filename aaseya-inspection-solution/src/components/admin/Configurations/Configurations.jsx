import React from "react";
import { Box, Typography, useTheme, Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";
import inspectionType from "../../../assets/InspectionType.svg";
import Skills from "../../../assets/Skills.svg";
import workflow from "../../../assets/Workflow.svg";
import notification from "../../../assets/Notifications.svg";
import AnswerOption from "../../../assets/AnswerOptions.svg";
import TableValue from "../../../assets/ValueTable.svg";
import ControlType from "../../../assets/ControlType.svg";

const Configurations = () => {
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
                }}
            >
                <Typography variant="h4" fontWeight={600} sx={{ mb: 3 }}>
                    Configurations
                </Typography>
                <Grid2 container spacing={2.5}>
                    <Grid2
                        size={{ xs: 12, md: 6, lg: 3 }}
                        container
                        direction="column"
                        sx={{
                            background: `#ffffff`,
                            boxShadow: `0px 1px 4px ${theme.palette.colors[3]}`,
                            borderRadius: "10px",
                            opacity: 1,
                            p: 3,
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                        }}
                        onClick={() => navigate("/configurations/inspection-type")}
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
                            <img src={inspectionType} alt="Inspection Type" />
                        </Box>
                        <Typography variant="h6" fontWeight={600} fontSize={16}>
                            Inspection Type
                        </Typography>
                    </Grid2>
                    <Grid2
                        size={{ xs: 12, md: 6, lg: 3 }}
                        container
                        direction="column"
                        sx={{
                            background: `#ffffff`,
                            boxShadow: `0px 1px 4px ${theme.palette.colors[3]}`,
                            borderRadius: "10px",
                            opacity: 1,
                            p: 3,
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                        }}
                        onClick={() => navigate("/configurations/skills")}
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
                            <img src={Skills} alt="Skills" />
                        </Box>
                        <Typography variant="h6" fontWeight={600} fontSize={16}>
                            Skills
                        </Typography>
                    </Grid2>
                    <Grid2
                        size={{ xs: 12, md: 6, lg: 3 }}
                        container
                        direction="column"
                        sx={{
                            background: `#ffffff`,
                            boxShadow: `0px 1px 4px ${theme.palette.colors[3]}`,
                            borderRadius: "10px",
                            opacity: 1,
                            p: 3,
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                        }}
                        onClick={() => navigate("/configurations/control-type")}
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
                            <img src={ControlType} alt="Control Type" />
                        </Box>
                        <Typography variant="h6" fontWeight={600} fontSize={16}>
                            Control Type
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
                        onClick={() => navigate("/configurations/workflow-settings")}
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
                            <img src={workflow} alt="Workflow Settings" />
                        </Box>
                        <Typography variant="h6" fontWeight={400} fontSize={16}>
                            Workflow Settings
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
                        onClick={() => navigate("/configurations/notification-setup")}
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
                            <img src={notification} alt="Notification Setup" />
                        </Box>
                        <Typography variant="h6" fontWeight={400} fontSize={16}>
                            Notification Setup
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
                        onClick={() => navigate("/configurations/answer-options")}
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
                            <img src={AnswerOption} alt="Answer Options" />
                        </Box>
                        <Typography variant="h6" fontWeight={400} fontSize={16}>
                            Answer Options
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
                        onClick={() => navigate("/configurations/value-table")}
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
                            <img src={TableValue} alt="Value Table" />
                        </Box>
                        <Typography variant="h6" fontWeight={400} fontSize={16}>
                            Value Table
                        </Typography>
                    </Grid2>
                </Grid2>
            </Box>
        </>
    );
};

export default Configurations;
