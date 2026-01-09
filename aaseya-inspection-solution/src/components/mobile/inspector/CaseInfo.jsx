import React from 'react';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { Box, Grid2, LinearProgress, Typography, useMediaQuery, useTheme } from "@mui/material";
import "../../cases/caseInfo.css";
import { useNavigate } from "react-router-dom";

const CaseInfo = ({ inspectorCases, isCasePool = false }) => {
    const theme = useTheme();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();

    const handleClick = (event, caseItem) => {
        navigate(`/cases/details`, { state: { entityInformation: caseItem, isCasePool: isCasePool } });
    };

    const capitalizeWords = (status) => {
        return status
            ?.toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <>
            {inspectorCases?.map((caseItem) => {
                return (
                    <Grid2
                        key={caseItem.inspectionID}
                        size={12}
                        container
                        sx={{
                            border: `1px solid ${theme.palette.colors[4]}`,
                            borderRadius: "0px",
                            backgroundColor: "#FFFFFF",
                            opacity: 1,
                            cursor: "pointer",
                            height: "120px",
                            mb: isNonMobile ? 2 : 0,
                        }}
                        onClick={(e) => {
                            handleClick(e, caseItem);
                        }}
                    >
                        <Grid2 size={0.5}>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                    // background: `${theme.palette.colors[ 4 ]} 0% 0% no-repeat padding-box`,
                                    borderRadius: `10px 0px 0px 10px`,
                                    opacity: 1,
                                    width: "16px",
                                    height: "120px",
                                    ml: "6px",
                                }}
                            >
                                <DragIndicatorOutlinedIcon />
                            </Box>
                        </Grid2>
                        <Grid2 size={11.5}>
                            <Box
                                display="flex"
                                p="20px"
                                width="96%"
                                ml="10px"
                                flexDirection="column"
                                sx={{
                                    "& .MuiTypography-root": {
                                        fontSize: "12px",
                                    },
                                }}
                            >
                                <Box display="flex" width="96%" gap="30px">
                                    <Box
                                        sx={{
                                            borderWidth: "0px 0px 0px 3px",
                                            borderColor: "#D54B4B",
                                            borderStyle: "solid",
                                            borderRadius: `4px`,
                                            pl: 1,
                                            width: "25%",
                                        }}
                                    >
                                        <Typography color={theme.palette.colors[21]}>Due Date</Typography>
                                        <Typography color={theme.palette.colors[6]} fontWeight={600}>
                                            {new Date(caseItem.due_date).getDate().toString().padStart(2, "0")} &nbsp;
                                            {new Date(caseItem.due_date).toLocaleString("default", { month: "short" })}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: "75%",
                                            "& .MuiTypography-root": {
                                                fontSize: "14px",
                                            },
                                        }}
                                    >
                                        <Typography fontWeight={700}>{caseItem.inspectionID}</Typography>
                                        <Typography fontWeight={600}>
                                            {caseItem.name?.length > 20 ? caseItem?.name?.slice(0, 20) + "..." : caseItem?.name}
                                        </Typography>
                                    </Box>
                                    {/* <Box
                                    sx={{
                                        width: '25%',
                                        background: `${theme.palette.colors[ 7 ]} 0% 0% no-repeat padding-box`,
                                        borderRadius: '4px',
                                        opacity: 1,
                                        height: '23px',
                                    }}
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                >
                                    <Typography fontWeight={600}>{caseItem?.inspection_type?.length > 11 ? caseItem?.inspection_type?.slice(0, 10) + '...' : caseItem?.inspection_type}</Typography>
                                </Box> */}
                                </Box>
                                <Box display="flex" width="96%" gap="30px" mt="20px">
                                    <Box
                                        sx={{
                                            width: "25%",
                                            marginTop: "3px",
                                        }}
                                    >
                                        <Typography color={theme.palette.colors[21]}>
                                            [{capitalizeWords(caseItem.inspector_source)}]
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: "75%",
                                            "& .MuiLinearProgress-root": {
                                                backgroundColor: `${theme.palette.colors[4]}`,
                                            },
                                            " .MuiLinearProgress-bar1": {
                                                backgroundColor:
                                                    capitalizeWords(caseItem.status) === "New"
                                                        ? "#2661BA"
                                                        : capitalizeWords(caseItem.status) === "Pending"
                                                        ? "#D54B4B"
                                                        : capitalizeWords(caseItem.status) === "In Progress"
                                                        ? "#4C8B92"
                                                        : capitalizeWords(caseItem.status) === "Under Approval"
                                                        ? "#71924C"
                                                        : capitalizeWords(caseItem.status) === "Re-Opened"
                                                        ? "#DC7C0B"
                                                        : "#4C8B92",
                                            },
                                            "& .MuiTypography-root": {
                                                color:
                                                    capitalizeWords(caseItem.status) === "New"
                                                        ? "#2661BA"
                                                        : capitalizeWords(caseItem.status) === "Pending"
                                                        ? "#D54B4B"
                                                        : capitalizeWords(caseItem.status) === "In Progress"
                                                        ? "#4C8B92"
                                                        : capitalizeWords(caseItem.status) === "Under Approval"
                                                        ? "#71924C"
                                                        : capitalizeWords(caseItem.status) === "Re-Opened"
                                                        ? "#DC7C0B"
                                                        : "#4C8B92",
                                            },
                                        }}
                                    >
                                        <Typography>{capitalizeWords(caseItem.status)}</Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={
                                                capitalizeWords(caseItem.status) === "New"
                                                    ? 2
                                                    : capitalizeWords(caseItem.status) === "Pending"
                                                    ? 40
                                                    : capitalizeWords(caseItem.status) === "In Progress"
                                                    ? 50
                                                    : capitalizeWords(caseItem.status) === "Under Approval"
                                                    ? 75
                                                    : capitalizeWords(caseItem.status) === "Re-Opened"
                                                    ? 50
                                                    : 50
                                            }
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Grid2>
                    </Grid2>
                );
            })}
        </>
    );
};

export default CaseInfo
