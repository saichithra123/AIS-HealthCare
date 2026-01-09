import { Box, Button, Divider, Grid2, MenuItem, Select, useTheme, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import CaseInfo from "../cases/CaseInfo";
import axios from "axios";
import ErrorInfoIcon from "../../assets/errorInfo.png";

const ReviewerCases = () => {
    const theme = useTheme();
    const [displayFilter, setDisplayFilter] = useState("TODAY");
    const [allCaseInformation, setAllCaseInformation] = useState([]);
    const [casesInformation, setCasesInformation] = useState([]);
    const [isFilterCases, setIsFilterCases] = useState(false);

    useEffect(() => {
        const getCaseInformation = async () => {
            // const response = await axios({
            //     method: "get",
            //     url: `${import.meta.env.VITE_BASE_URL}/getMycasesForReviewer/${localStorage.getItem(
            //         "userEmail"
            //     )}/${displayFilter.toLowerCase()}`,
            // });
            const response = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/getAssignedcases?emailID=${localStorage.getItem("userEmail")}`,
            });
            setAllCaseInformation(response?.data.sort((a, b) => new Date(b.due_date) - new Date(a.due_date)));
            setCasesInformation(response?.data.sort((a, b) => new Date(b.due_date) - new Date(a.due_date)));
        };
        getCaseInformation();
    }, [displayFilter]);

    useEffect(() => {
        if (isFilterCases) {
            const filterredCases = allCaseInformation?.filter((caseInfo) => caseInfo?.status?.toLowerCase() === "new");
            setCasesInformation(filterredCases?.sort((a, b) => new Date(b.due_date) - new Date(a.due_date)));
        } else {
            setCasesInformation(allCaseInformation);
        }
    }, [isFilterCases]);

    return (
        <>
            <Box
                sx={{
                    background: `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                    borderRadius: `0px 10px 10px 10px`,
                    opacity: 1,
                    height: "550px",
                }}
            >
                <Grid2
                    container
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 1,
                        px: 2,
                    }}
                >
                    <Grid2
                        container
                        size={8}
                        sx={{
                            "& .MuiButtonBase-root:hover": {
                                border: "1px solid #CCCCCC",
                                backgroundColor: isFilterCases ? "#4C8B92" : "",
                            },
                            py: 0.5,
                            px: 1,
                        }}
                    >
                        <Button
                            endIcon={<img src={ErrorInfoIcon} alt="Unassigned Cases" sx={{ color: "#D54B4B" }} />}
                            variant="outlined"
                            sx={{
                                color: isFilterCases ? "#FFFFFF" : theme.palette.colors[6],
                                textTransform: "none",
                                border: "1px solid #CCCCCC",
                                borderRadius: "20px",
                                px: 3,
                                mr: 2,
                                height: "40px",
                                fontWeight: 600,
                                fontSize: "14px",
                                backgroundColor: isFilterCases ? "#4C8B92" : "",
                            }}
                            onClick={() => {
                                setIsFilterCases(!isFilterCases);
                            }}
                        >
                            Past Due Date
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{
                                color: isFilterCases ? "#FFFFFF" : theme.palette.colors[6],
                                textTransform: "none",
                                border: "1px solid #CCCCCC",
                                borderRadius: "20px",
                                px: 3,
                                mr: 2,
                                height: "40px",
                                fontWeight: 600,
                                fontSize: "14px",
                                backgroundColor: isFilterCases ? "#4C8B92" : "",
                            }}
                            onClick={() => {
                                setIsFilterCases(!isFilterCases);
                            }}
                        >
                            Due Today
                        </Button>
                        <Button
                            endIcon={<img src={ErrorInfoIcon} alt="Unassigned Cases" sx={{ color: "#D54B4B" }} />}
                            variant="outlined"
                            sx={{
                                color: isFilterCases ? "#FFFFFF" : theme.palette.colors[6],
                                textTransform: "none",
                                border: "1px solid #CCCCCC",
                                borderRadius: "20px",
                                px: 3,
                                height: "40px",
                                fontWeight: 600,
                                fontSize: "14px",
                                backgroundColor: isFilterCases ? "#4C8B92" : "",
                            }}
                            onClick={() => {
                                setIsFilterCases(!isFilterCases);
                            }}
                        >
                            Upcoming Due
                        </Button>
                    </Grid2>
                    <Grid2
                        size={4}
                        container
                        sx={{
                            "& .MuiOutlinedInput-root.Mui-focused": {
                                "& > fieldset": {
                                    border: `1px solid #CCCCCC`,
                                },
                            },
                            justifyContent: "flex-end",
                        }}
                    >
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={displayFilter}
                            size="small"
                            sx={{
                                minWidth: "100px",
                            }}
                            onChange={(e) => setDisplayFilter(e.target.value)}
                        >
                            <MenuItem value="TODAY">Today</MenuItem>
                            <MenuItem value="WEEK">This week</MenuItem>
                            <MenuItem value="MONTH">Past 30 Days</MenuItem>
                            <MenuItem value="ALL">All</MenuItem>
                        </Select>
                    </Grid2>
                </Grid2>
                <Divider sx={{ mb: 3 }} />
                <CaseInfo casesInformation={casesInformation} />
            </Box>
        </>
    );
};

export default ReviewerCases;
