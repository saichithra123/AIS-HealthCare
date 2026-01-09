import { Grid2, Box, Drawer, LinearProgress, Popper, Typography, useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import EntityInfo from './EntityInfo';
import Assign from './Assign';
import './caseInfo.css'
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";

const CaseInfo = ({ casesInformation, isCasePool = false }) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [openEntityInfo, setOpenEntityInfo] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [caseInformation, setCaseInformation] = useState([]);
    const [entityInformation, setEntityInformation] = useState({});

    const handleClick = (event, caseItem) => {
        setAnchorEl(event.currentTarget);
        setOpenEntityInfo(!openEntityInfo);
        setEntityInformation(caseItem);
    };

    useEffect(() => {
        setCaseInformation(casesInformation);
    }, [casesInformation]);

    const capitalizeWords = (status) => {
        const words = status?.split(/[\s_]+/);
        return words?.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    };

    return (
        <>
            <Grid2
                container
                position="relative"
                spacing={2}
                sx={{
                    pb: 2,
                    px: 2.5,
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    overflow: "auto",
                    maxHeight: "420px",
                    scrollbarWidth: "none",
                    height: "100%",
                    alignContent: "flex-start",
                }}
            >
                {caseInformation?.map((caseItem, index) => {
                    return (
                        <Grid2
                            key={caseItem.claimId}
                            size={{ xs: 12, md: 4 }}
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
                                display: "flex",
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
                            <Grid2
                                container
                                size={11}
                                spacing={1}
                                direction="column"
                                sx={{ pr: 1.5, py: 1.5, flexWrap: "nowrap" }}
                            >
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
                                                DOB
                                            </Typography>
                                            <Typography fontSize="12px" color={theme.palette.colors[6]} fontWeight={500}>
                                                {new Date(caseItem?.policyDetails?.dateOfBirth)
                                                    .getDate()
                                                    .toString()
                                                    .padStart(2, "0")}{" "}
                                                {new Date(caseItem?.policyDetails?.dateOfBirth).toLocaleString("default", {
                                                    month: "short",
                                                })}{" "}
                                                {new Date(caseItem?.policyDetails?.dateOfBirth)
                                                    .getFullYear()
                                                    .toString()
                                                    .slice(-2)}
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
                                            {caseItem.policyDetails?.policyId}
                                        </Typography>
                                        <Typography fontSize="14px" fontWeight={500}>
                                            {caseItem.customerName?.length > 15
                                                ? caseItem?.policyDetails?.customerName?.slice(0, 15) + "..."
                                                : caseItem?.policyDetails?.customerName}
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
                                                sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", px: 2 }}
                                            >
                                                Claim
                                            </Typography>
                                        </Box>
                                    </Grid2>
                                </Grid2>
                                <Grid2 container size={12}>
                                    <Grid2 size={3}>
                                        <Typography fontSize="12px" color={theme.palette.colors[21]}>
                                            [Mediclaim]
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
                >
                    <EntityInfo
                        setOpenDrawer={setOpenDrawer}
                        setOpenEntityInfo={setOpenEntityInfo}
                        entityInformation={entityInformation}
                        isCasePool={isCasePool}
                    />
                </Popper>
                <Drawer
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
                    anchor="right"
                    sx={{
                        backdropFilter: blur("50px"),
                    }}
                >
                    <Assign setOpenDrawer={setOpenDrawer} entityInformation={entityInformation} />
                </Drawer>
            </Grid2>
        </>
    );
};

export default CaseInfo
