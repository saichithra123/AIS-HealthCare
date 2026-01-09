import React, { useRef, useState } from "react";
import EntityInfo from "../cases/EntityInfo";
import DragIndicatorOutlinedIcon from "@mui/icons-material/DragIndicatorOutlined";
import { Box, Grid2, LinearProgress, Popper, Typography, useMediaQuery, useTheme } from "@mui/material";
import "../cases/caseInfo.css";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";

const CaseInformation = ({ inspectorCases, isCasePool = false, isGroupCases = false }) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [openEntityInfo, setOpenEntityInfo] = useState(false);
    const selectedCase = useRef("");
    const [entityInformation, setEntityInformation] = useState({});
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleClick = (event, caseItem) => {
        selectedCase.current = caseItem;
        setAnchorEl(event.currentTarget);
        setOpenEntityInfo(!openEntityInfo);
        setEntityInformation(caseItem);
    };

    const capitalizeWords = (status) => {
        const words = status?.split(/[\s_]+/);
        return words?.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        // return status?.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <>
            {inspectorCases?.map((caseItem) => {
                return (
                    <Grid2
                        key={caseItem.inspectionID}
                        size={12}
                        container
                        spacing={1}
                        direction="row"
                        sx={{
                            border: `1px solid ${theme.palette.colors[4]}`,
                            borderRadius: "10px",
                            backgroundColor: "#FFFFFF",
                            opacity: 1,
                            cursor: "pointer",
                            height: "110px",
                            mb: isNonMobile ? 2 : 0,
                        }}
                        onClick={(e) => {
                            handleClick(e, caseItem);
                        }}
                    >
                        <Grid2
                            display="inline-flex"
                            justifyContent="center"
                            alignItems="center"
                            size={0.8}
                            sx={{
                                background: `${theme.palette.colors[4]} 0% 0% no-repeat padding-box`,
                                borderRadius: `10px 0px 0px 10px`,
                                opacity: 1,
                                width: "16px",
                                height: "100%",
                            }}
                        >
                            <DragIndicatorOutlinedIcon />
                        </Grid2>
                        <Grid2 container size={11} spacing={1} direction="column" sx={{ pr: 1.5, py: 1.5, flexWrap: "nowrap" }}>
                            <Grid2 container size={12} sx={{ flexWrap: "nowrap" }}>
                                <Grid2
                                    size={3}
                                    sx={{ minWidth: "0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                                >
                                    <Box
                                        sx={{
                                            borderWidth: "0px 0px 0px 3px",
                                            borderColor: "#2661BA",
                                            borderStyle: "solid",
                                            borderRadius: `4px`,
                                            pl: 1,
                                            flexWrap: "nowrap",
                                        }}
                                    >
                                        <Typography fontSize="12px" color={theme.palette.colors[21]}>
                                            Due Date
                                        </Typography>
                                        <Typography fontSize="12px" color={theme.palette.colors[6]} fontWeight={500}>
                                            {new Date(caseItem.due_date).getDate().toString().padStart(2, "0")} &nbsp;
                                            {new Date(caseItem.due_date).toLocaleString("default", { month: "short" })}
                                        </Typography>
                                    </Box>
                                </Grid2>
                                <Grid2
                                    size={6}
                                    sx={{
                                        "& .MuiTypography-root": {
                                            fontSize: "14px",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        },
                                        minWidth: "0",
                                    }}
                                >
                                    <Typography fontSize="14px" fontWeight={600}>
                                        {caseItem.inspectionID}
                                    </Typography>
                                    <Typography fontSize="14px" fontWeight={500}>
                                        {caseItem.name?.length > 15 ? caseItem?.name?.slice(0, 15) + "..." : caseItem?.name}
                                    </Typography>
                                </Grid2>
                                <Grid2
                                    size={3}
                                    container
                                    spacing={0.5}
                                    sx={{
                                        minWidth: "0",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        alignItems: "center",
                                    }}
                                >
                                    {caseItem?.caseCreationType === "group" && (
                                        <PeopleAltOutlinedIcon sx={{ color: "#4C8B92", height: "12px", width: "16px" }} />
                                    )}
                                    {caseItem?.caseCreationType === "plan" && (
                                        <ContentPasteOutlinedIcon sx={{ color: "#4C8B92", height: "12px", width: "16px" }} />
                                    )}
                                    <Box
                                        sx={{
                                            background: `${theme.palette.colors[7]} 0% 0% no-repeat padding-box`,
                                            borderRadius: "4px",
                                            opacity: 1,
                                            height: "23px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        <Typography
                                            fontSize="12px"
                                            fontWeight={500}
                                            sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                                        >
                                            {caseItem?.inspection_type?.length > 10
                                                ? caseItem?.inspection_type?.slice(0, 9) + "..."
                                                : caseItem?.inspection_type}
                                        </Typography>
                                    </Box>
                                </Grid2>
                            </Grid2>
                            <Grid2 container size={12}>
                                <Grid2 size={3}>
                                    <Typography fontSize="12px" color={theme.palette.colors[21]}>
                                        [{capitalizeWords(caseItem.inspector_source)}]
                                    </Typography>
                                </Grid2>
                                <Grid2
                                    size={9}
                                    sx={{
                                        "& .MuiLinearProgress-root": {
                                            backgroundColor: `${theme.palette.colors[4]}`,
                                        },
                                        ".MuiLinearProgress-bar1": {
                                            backgroundColor:
                                                capitalizeWords(caseItem.status) === "New"
                                                    ? "#2661BA"
                                                    : capitalizeWords(caseItem.status) === "Pending"
                                                    ? "#D54B4B"
                                                    : "#4C8B92",
                                        },
                                        "& .MuiTypography-root": {
                                            color:
                                                capitalizeWords(caseItem.status) === "New"
                                                    ? "#2661BA"
                                                    : capitalizeWords(caseItem.status) === "Pending"
                                                    ? "#D54B4B"
                                                    : "#4C8B92",
                                        },
                                    }}
                                >
                                    <Typography fontSize="12px">{capitalizeWords(caseItem.status)}</Typography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={
                                            capitalizeWords(caseItem.status) === "New"
                                                ? 20
                                                : capitalizeWords(caseItem.status) === "Pending"
                                                ? 30
                                                : 40
                                        }
                                    />
                                </Grid2>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                );
            })}
            <Popper
                open={openEntityInfo}
                anchorEl={anchorEl}
                placement="right-start"
                disablePortal={true}
                modifiers={[
                    {
                        name: "flip",
                        enabled: true,
                        options: {
                            altBoundary: false,
                            rootBoundary: "viewport",
                            padding: 8,
                        },
                    },
                    {
                        name: "preventOverflow",
                        enabled: false,
                        options: {
                            altAxis: false,
                            altBoundary: false,
                            tether: true,
                            rootBoundary: "viewport",
                            padding: 8,
                        },
                    },
                    {
                        name: "offset",
                        options: {
                            offset: [0, 16],
                        },
                    },
                ]}
                sx={{
                    zIndex: 1,
                }}
            >
                <EntityInfo
                    setOpenEntityInfo={setOpenEntityInfo}
                    entityInformation={entityInformation}
                    isCasePool={isCasePool}
                    isGroupCases={isGroupCases}
                />
            </Popper>
        </>
    );
};

export default CaseInformation;
