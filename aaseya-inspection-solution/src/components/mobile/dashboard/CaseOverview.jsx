import React from 'react';
import CasesIcon from '../../../assets/total.svg';
import PendingIcon from '../../../assets/pending.svg';
import CompletedIcon from '../../../assets/completed.svg';
import ReopenIcon from '../../../assets/reopen.svg';
import { Box, Grid2, Typography, useTheme } from "@mui/material";

const CaseOverview = ({ caseOverview }) => {
    const theme = useTheme();

    return (
        <>
            <Grid2 container spacing={3} sx={{ justifyContent: "space-between", mb: 3, width: "100%" }}>
                <Grid2
                    sx={{
                        background: `#FFFFFF 0% 0% no-repeat padding-box`,
                        boxShadow: `0px 1px 4px ${theme.palette.colors[3]}`,
                        borderRadius: "4px",
                        opacity: 1,
                        py: 2.5,
                        alignItems: "center",
                    }}
                    size={6}
                    container
                    direction="column"
                >
                    <Grid2
                        sx={{
                            backgroundColor: theme.palette.colors[7],
                            p: 1,
                            width: "40px",
                            height: "40px",
                            borderRadius: "44px",
                        }}
                    >
                        <img src={CasesIcon} alt="Total cases" />
                    </Grid2>
                    <Grid2
                        container
                        direction="column"
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            mt: 1,
                        }}
                    >
                        <Typography variant="h6" fontWeight={600}>
                            Total Cases
                        </Typography>
                        <Typography variant="h1" color={theme.palette.colors[5]}>
                            {caseOverview?.totalCount ? caseOverview?.totalCount : "-"}
                        </Typography>
                    </Grid2>
                </Grid2>
                <Grid2
                    sx={{
                        background: `#FFFFFF 0% 0% no-repeat padding-box`,
                        boxShadow: `0px 1px 4px ${theme.palette.colors[3]}`,
                        borderRadius: "4px",
                        opacity: 1,
                        py: 2.5,
                        alignItems: "center",
                    }}
                    size={6}
                    container
                    direction={"column"}
                >
                    <Grid2
                        sx={{
                            backgroundColor: theme.palette.colors[7],
                            p: 1,
                            width: "40px",
                            height: "40px",
                            borderRadius: "44px",
                        }}
                    >
                        <img src={PendingIcon} alt="Pending cases" />
                    </Grid2>
                    <Grid2
                        container
                        direction="column"
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            mt: 1,
                        }}
                    >
                        <Typography variant="h6" fontWeight={600}>
                            Pending Cases
                        </Typography>
                        <Typography variant="h1" color={theme.palette.colors[5]}>
                            {caseOverview?.statusCounts?.pending ? caseOverview?.statusCounts?.pending : "-"}
                        </Typography>
                    </Grid2>
                </Grid2>
            </Grid2>
            <Grid2 container spacing={3} sx={{ justifyContent: "space-between", mb: 3, width: "100%" }}>
                <Grid2
                    size={6}
                    container
                    direction="column"
                    sx={{
                        background: `#FFFFFF 0% 0% no-repeat padding-box`,
                        boxShadow: `0px 1px 4px ${theme.palette.colors[3]}`,
                        borderRadius: "4px",
                        opacity: 1,
                        py: 2.5,
                        alignItems: "center",
                    }}
                >
                    <Grid2
                        sx={{
                            backgroundColor: theme.palette.colors[7],
                            p: 1,
                            width: "40px",
                            height: "40px",
                            borderRadius: "44px",
                        }}
                    >
                        <img src={CompletedIcon} alt="completed cases" />
                    </Grid2>
                    <Grid2
                        container
                        direction="column"
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            mt: 1,
                        }}
                    >
                        <Typography variant="h6" fontWeight={600}>
                            Completed Cases
                        </Typography>
                        <Typography variant="h1" color={theme.palette.colors[5]}>
                            {caseOverview?.statusCounts?.completed ? caseOverview?.statusCounts?.completed : "-"}
                        </Typography>
                    </Grid2>
                </Grid2>
                <Grid2
                    size={6}
                    container
                    sx={{
                        background: `#FFFFFF 0% 0% no-repeat padding-box`,
                        boxShadow: `0px 1px 4px ${theme.palette.colors[3]}`,
                        borderRadius: "4px",
                        opacity: 1,
                        py: 2.5,
                        alignItems: "center",
                    }}
                    direction="column"
                >
                    <Grid2
                        sx={{
                            backgroundColor: theme.palette.colors[7],
                            p: 1,
                            width: "40px",
                            height: "40px",
                            borderRadius: "44px",
                        }}
                    >
                        <img src={ReopenIcon} alt="Reopen cases" />
                    </Grid2>
                    <Grid2
                        container
                        direction="column"
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            mt: 1,
                        }}
                    >
                        <Typography variant="h6" fontWeight={600}>
                            Re-Opened Cases
                        </Typography>
                        <Typography variant="h1" color={theme.palette.colors[5]}>
                            {caseOverview?.statusCounts?.reopened ? caseOverview?.statusCounts?.reopened : "-"}
                        </Typography>
                    </Grid2>
                </Grid2>
            </Grid2>
        </>
    );
};

export default CaseOverview
