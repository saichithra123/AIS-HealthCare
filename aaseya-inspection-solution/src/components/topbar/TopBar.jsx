import { Badge, Box, Grid2, InputAdornment, TextField, Typography, useTheme } from "@mui/material";
import React from "react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./topbar.css";

const TopBar = () => {
    const theme = useTheme();

    return (
        <>
            <Box className="topbarContainer">
                <Grid2 container sx={{ justifyContent: "space-between" }}>
                    <Grid2 size={6} container alignItems="center">
                        <Typography variant="h4" fontWeight={700}>
                            Inspection Solution
                        </Typography>
                    </Grid2>
                    <Grid2
                        size={6}
                        container
                        justifyContent="flex-end"
                        columnGap={3}
                        sx={{
                            "& .MuiInputBase-root": {
                                boxShadow: `0px 1px 6px ${theme.palette.colors[3]}`,
                                borderRadius: "20px",
                                opacity: 1,
                                background: `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                                color: theme.palette.colors[8],
                            },
                        }}
                    >
                        <TextField
                            placeholder="Search"
                            variant="outlined"
                            size="small"
                            width="260px"
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchOutlinedIcon
                                                sx={{
                                                    color: theme.palette.colors[8],
                                                }}
                                            />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                background: `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                                boxShadow: `0px 1px 4px ${theme.palette.colors[3]}`,
                                borderRadius: "4px",
                                opacity: 1,
                                height: "32px",
                                width: "32px",
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
                    </Grid2>
                </Grid2>
            </Box>
        </>
    );
};

export default TopBar;
