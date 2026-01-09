import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Box, Grid2, IconButton, Typography, useTheme } from "@mui/material";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Create = () => {
    const [controlTypes, setControlTypes] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const startIndex = useRef(0);
    const endIndex = useRef(0);
    const recordsPerPage = useRef(4);
    const [currentRecords, setCurrentRecords] = useState([]);
    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        startIndex.current = currentPage * recordsPerPage.current;
        endIndex.current = startIndex.current + recordsPerPage.current;
        const records = controlTypes.slice(startIndex.current, endIndex.current);
        setCurrentRecords(records);
    }, [currentPage, controlTypes]);

    const nextPage = () => {
        if (endIndex.current < controlTypes.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const previousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    useEffect(() => {
        const getControlTypes = async () => {
            const response = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/getAllControlTypesForCase`,
            });
            setControlTypes(response?.data);
        };
        getControlTypes();
    }, []);

    return (
        <Grid2 container direction="column">
            <Grid2 container justifyContent="space-between">
                <Grid2 size={7}>
                    <Typography variant="h5" fontWeight={600}>
                        Create Inspection
                    </Typography>
                </Grid2>
                <Grid2 size={5} container justifyContent="flex-end">
                    <Box
                        sx={{
                            cursor: "pointer",
                        }}
                        onClick={previousPage}
                    >
                        <KeyboardArrowLeftOutlinedIcon />
                    </Box>
                    <Box
                        sx={{
                            cursor: "pointer",
                        }}
                        disabled={currentPage === 0}
                        onClick={nextPage}
                    >
                        <KeyboardArrowRightOutlinedIcon />
                    </Box>
                </Grid2>
            </Grid2>
            <Grid2 container>
                {currentRecords?.map((controlType) => {
                    return (
                        <Box
                            display="flex"
                            key={controlType?.controlTypeId}
                            justifyContent="space-between"
                            sx={{
                                width: "100%",
                                mt: 1,
                                p: 0.5,
                                background: `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                                border: `1px solid ${theme.palette.colors[1]}`,
                                borderRadius: "30px",
                                opacity: 1,
                                "& .MuiButtonBase-root:hover": {
                                    backgroundColor: theme.palette.colors[11],
                                },
                            }}
                        >
                            <Box display="flex" alignItems="center">
                                <Avatar
                                    sx={{
                                        mr: 2,
                                        width: "30px",
                                        height: "30px",
                                        backgroundColor: theme.palette.colors[7],
                                        color: theme.palette.colors[6],
                                    }}
                                >
                                    <Typography variant="h4">{controlType?.controlTypeName?.charAt(0).toUpperCase()}</Typography>
                                </Avatar>
                                <Typography variant="h6" fontWeight={600}>
                                    {controlType?.controlTypeName?.length > 18
                                        ? controlType?.controlTypeName?.slice(0, 18) + "..."
                                        : controlType?.controlTypeName}
                                </Typography>
                            </Box>
                            <IconButton
                                sx={{
                                    width: "30px",
                                    height: "30px",
                                    backgroundColor: theme.palette.colors[11],
                                }}
                                onClick={() => navigate(`/cases/new`, { state: { controlType: controlType?.controlTypeId } })}
                            >
                                <AddOutlinedIcon sx={{ color: theme.palette.colors[1] }} />
                            </IconButton>
                        </Box>
                    );
                })}
            </Grid2>
        </Grid2>
    );
};

export default Create
