import React from 'react'
import CasesIcon from '../../assets/total.svg';
import PendingIcon from '../../assets/pending.svg';
import CompletedIcon from '../../assets/completed.svg';
import ReopenIcon from '../../assets/reopen.svg'
import { Box, Typography, useTheme } from '@mui/material';

const CaseOverview = ({ caseOverview }) => {
    const theme = useTheme()
    const userRole = localStorage.getItem("userRole");
    return (
        <>
            <Box display='flex' columnGap={2}
                sx={{
                    background: `0% 0% no-repeat padding-box`,
                    boxShadow: `0px 1px 4px ${theme.palette.colors[3]}`,
                    borderRadius: '4px',
                    opacity: 1,
                    p: 2.5,
                    mb: 5,
                }}
            >
                <Box
                    sx={{
                        backgroundColor: theme.palette.colors[7],
                        p: 1,
                        width: '40px',
                        height: '40px',
                        borderRadius: '44px',
                    }}
                >
                    <img src={CasesIcon} alt='Total cases' />
                </Box>
                <Box>
                    <Typography variant='h1' color={theme.palette.colors[5]}>{caseOverview?.totalCount ? caseOverview?.totalCount : "-"}</Typography>
                    <Typography variant='h6' fontWeight={600}>
                        {userRole === "INSPECTOR" ? "Total Claims" : "Total Cases"}</Typography>
                </Box>
            </Box>
            <Box display='flex' columnGap={2}
                sx={{
                    background: `0% 0% no-repeat padding-box`,
                    boxShadow: `0px 1px 4px ${theme.palette.colors[3]}`,
                    borderRadius: '4px',
                    opacity: 1,
                    p: 2.5,
                    mb: 5,
                }}
            >
                <Box
                    sx={{
                        backgroundColor: theme.palette.colors[7],
                        p: 1,
                        width: '40px',
                        height: '40px',
                        borderRadius: '44px',
                    }}
                >
                    <img src={PendingIcon} alt='Pending cases' />
                </Box>
                <Box>
                    <Typography variant='h1' color={theme.palette.colors[5]}>{caseOverview?.statusCounts?.pending ? caseOverview?.statusCounts?.pending : '-'}</Typography>
                    <Typography variant='h6' fontWeight={600}>
                        {userRole === "INSPECTOR" ? "Pending Claims" : "Pending"}</Typography>
                </Box>
            </Box>
            <Box display='flex' columnGap={2}
                sx={{
                    background: `0% 0% no-repeat padding-box`,
                    boxShadow: `0px 1px 4px ${theme.palette.colors[3]}`,
                    borderRadius: '4px',
                    opacity: 1,
                    p: 2.5,
                    mb: 5,
                }}
            >
                <Box
                    sx={{
                        backgroundColor: theme.palette.colors[7],
                        p: 1,
                        width: '40px',
                        height: '40px',
                        borderRadius: '44px',
                    }}
                >
                    <img src={CompletedIcon} alt='Total cases' />
                </Box>
                <Box>
                    <Typography variant='h1' color={theme.palette.colors[5]}>{caseOverview?.statusCounts?.completed ? caseOverview?.statusCounts?.completed : '-'}</Typography>
                    <Typography variant='h6' fontWeight={600}>
                        {userRole === "INSPECTOR" ? "Completed Claims" : "Completed Cases"}
                    </Typography>
                </Box>
            </Box>
            <Box display='flex' columnGap={2}
                sx={{
                    background: `0% 0% no-repeat padding-box`,
                    boxShadow: `0px 1px 4px ${theme.palette.colors[3]}`,
                    borderRadius: '4px',
                    opacity: 1,
                    p: 2.5,
                }}
            >
                <Box
                    sx={{
                        backgroundColor: theme.palette.colors[7],
                        p: 1,
                        width: '40px',
                        height: '40px',
                        borderRadius: '44px',
                    }}
                >
                    <img src={ReopenIcon} alt='Total cases' />
                </Box>
                <Box>
                    <Typography variant='h1' color={theme.palette.colors[5]}>{caseOverview?.statusCounts?.reopened ? caseOverview?.statusCounts?.reopened : '-'}</Typography>
                    <Typography variant='h6' fontWeight={600}>
                        {userRole === "INSPECTOR" ? "Re-Opened Claims" : "Re-Opened Cases"}
                    </Typography>
                </Box>
            </Box>
        </>
    )
}

export default CaseOverview
