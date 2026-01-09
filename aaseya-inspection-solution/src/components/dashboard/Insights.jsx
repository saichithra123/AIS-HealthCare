import { Box, Grid2, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const Insights = ({ insights }) => {
    const [ totalCaseCounts, setTotalCaseCounts ] = useState([])
    const [ completedCaseCounts, setCompletedCaseCounts ] = useState([])
    const [ inProgressCaseCounts, setInProgressCaseCounts ] = useState([])
    const [ pendingCaseCounts, setPendingCaseCounts ] = useState([])

    useEffect(() => {
        const totalCases = []
        const completedCases = []
        const inProgressCases = []
        const pendingCases = []
        insights?.map(insight => {
            if (insight?.inspectorSource?.toLowerCase() === 'adhoc'){
                totalCases[ 0 ] = (insight?.inspectorSourceCount && totalCases[ 0 ]) ?
                    totalCases[ 0 ] + insight?.inspectorSourceCount : totalCases[ 0 ] ?
                        totalCases[ 0 ] : insight?.inspectorSourceCount ?
                            insight?.inspectorSourceCount : 0;
                completedCases[ 0 ] = (insight?.statusCounts?.completed && completedCases[ 0 ]) ?
                    completedCases[ 0 ] + insight?.statusCounts?.completed : completedCases[ 0 ] ?
                        completedCases[ 0 ] : insight?.statusCounts?.completed ?
                            insight?.statusCounts?.completed : 0;
                inProgressCases[ 0 ] = (insight?.statusCounts?.in_progress && inProgressCases[ 0 ]) ?
                    inProgressCases[ 0 ] + insight?.statusCounts?.in_progress : inProgressCases[ 0 ] ?
                        inProgressCases[ 0 ] : insight?.statusCounts?.in_progress ?
                            insight?.statusCounts?.in_progress : 0;
                pendingCases[ 0 ] = (insight?.statusCounts?.pending && pendingCases[ 0 ]) ?
                    pendingCases[ 0 ] + insight?.statusCounts?.pending : pendingCases[ 0 ] ?
                        pendingCases[ 0 ] : insight?.statusCounts?.pending ?
                            insight?.statusCounts?.pending : 0
            } else if (insight?.inspectorSource?.toLowerCase() === 'follow up'){
                totalCases[ 1 ] = (insight?.inspectorSourceCount && totalCases[ 1 ]) ?
                    totalCases[ 1 ] + insight?.inspectorSourceCount : totalCases[ 1 ] ?
                        totalCases[ 1 ] : insight?.inspectorSourceCount ?
                            insight?.inspectorSourceCount : 0;
                completedCases[ 1 ] = (insight?.statusCounts?.completed && completedCases[ 1 ]) ?
                    completedCases[ 1 ] + insight?.statusCounts?.completed : completedCases[ 1 ] ?
                        completedCases[ 1 ] : insight?.statusCounts?.completed ?
                            insight?.statusCounts?.completed : 0;
                inProgressCases[ 1 ] = (insight?.statusCounts?.in_progress && inProgressCases[ 1 ]) ?
                    inProgressCases[ 1 ] + insight?.statusCounts?.in_progress : inProgressCases[ 1 ] ?
                        inProgressCases[ 1 ] : insight?.statusCounts?.in_progress ?
                            insight?.statusCounts?.in_progress : 0;
                pendingCases[ 1 ] = (insight?.statusCounts?.pending && pendingCases[ 1 ]) ?
                    pendingCases[ 1 ] + insight?.statusCounts?.pending : pendingCases[ 1 ] ?
                        pendingCases[ 1 ] : insight?.statusCounts?.pending ?
                            insight?.statusCounts?.pending : 0
            } else if (insight?.inspectorSource?.toLowerCase() === 're inspection'){
                totalCases[ 2 ] = (insight?.inspectorSourceCount && totalCases[ 2 ]) ?
                    totalCases[ 2 ] + insight?.inspectorSourceCount : totalCases[ 2 ] ?
                        totalCases[ 2 ] : insight?.inspectorSourceCount ?
                            insight?.inspectorSourceCount : 0;
                completedCases[ 2 ] = (insight?.statusCounts?.completed && completedCases[ 2 ]) ?
                    completedCases[ 2 ] + insight?.statusCounts?.completed : completedCases[ 2 ] ?
                        completedCases[ 2 ] : insight?.statusCounts?.completed ?
                            insight?.statusCounts?.completed : 0;
                inProgressCases[ 2 ] = (insight?.statusCounts?.in_progress && inProgressCases[ 2 ]) ?
                    inProgressCases[ 2 ] + insight?.statusCounts?.in_progress : inProgressCases[ 2 ] ?
                        inProgressCases[ 2 ] : insight?.statusCounts?.in_progress ?
                            insight?.statusCounts?.in_progress : 0;
                pendingCases[ 2 ] = (insight?.statusCounts?.pending && pendingCases[ 2 ]) ?
                    pendingCases[ 2 ] + insight?.statusCounts?.pending : pendingCases[ 2 ] ?
                        pendingCases[ 2 ] : insight?.statusCounts?.pending ?
                            insight?.statusCounts?.pending : 0
            } else if (insight?.inspectorSource?.toLowerCase() === 'periodic'){
                totalCases[ 3 ] = (insight?.inspectorSourceCount && totalCases[ 3 ]) ?
                    totalCases[ 3 ] + insight?.inspectorSourceCount : totalCases[ 3 ] ?
                        totalCases[ 3 ] : insight?.inspectorSourceCount ?
                            insight?.inspectorSourceCount : 0;
                completedCases[ 3 ] = (insight?.statusCounts?.completed && completedCases[ 3 ]) ?
                    completedCases[ 3 ] + insight?.statusCounts?.completed : completedCases[ 3 ] ?
                        completedCases[ 3 ] : insight?.statusCounts?.completed ?
                            insight?.statusCounts?.completed : 0;
                inProgressCases[ 3 ] = (insight?.statusCounts?.in_progress && inProgressCases[ 3 ]) ?
                    inProgressCases[ 3 ] + insight?.statusCounts?.in_progress : inProgressCases[ 3 ] ?
                        inProgressCases[ 3 ] : insight?.statusCounts?.in_progress ?
                            insight?.statusCounts?.in_progress : 0;
                pendingCases[ 3 ] = (insight?.statusCounts?.pending && pendingCases[ 3 ]) ?
                    pendingCases[ 3 ] + insight?.statusCounts?.pending : pendingCases[ 3 ] ?
                        pendingCases[ 3 ] : insight?.statusCounts?.pending ?
                            insight?.statusCounts?.pending : 0
            } else {
                totalCases.push(0);
                completedCases.push(0);
                inProgressCases.push(0);
                pendingCases.push(0)
            }
        })
        if(!totalCases[ 0 ]) totalCases[ 0 ] = 0
        if(!totalCases[ 1 ]) totalCases[ 1 ] = 0
        if(!totalCases[ 2 ]) totalCases[ 2 ] = 0
        if(!totalCases[ 3 ]) totalCases[ 3 ] = 0
        if (!completedCases[ 0 ]) completedCases[ 0 ] = 0
        if (!completedCases[ 1 ]) completedCases[ 1 ] = 0
        if (!completedCases[ 2 ]) completedCases[ 2 ] = 0
        if (!completedCases[ 3 ]) completedCases[ 3 ] = 0
        if (!inProgressCases[ 0 ]) inProgressCases[ 0 ] = 0
        if (!inProgressCases[ 1 ]) inProgressCases[ 1 ] = 0
        if (!inProgressCases[ 2 ]) inProgressCases[ 2 ] = 0
        if (!inProgressCases[ 3 ]) inProgressCases[ 3 ] = 0
        if (!pendingCases[ 0 ]) pendingCases[ 0 ] = 0
        if (!pendingCases[ 1 ]) pendingCases[ 1 ] = 0
        if (!pendingCases[ 2 ]) pendingCases[ 2 ] = 0
        if (!pendingCases[ 3 ]) pendingCases[ 3 ] = 0
        setTotalCaseCounts(totalCases)
        setCompletedCaseCounts(completedCases)
        setInProgressCaseCounts(inProgressCases)
        setPendingCaseCounts(pendingCases)
    }, [ insights ])

    const getTotalCaseGradient = () => {
        const ctx = document.getElementById('lineGraph').getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 110);
        gradient.addColorStop(0, 'rgb(76, 139, 146, 0.03)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.5)');
        return gradient
    }

    const getCompletedGradient = () => {
        const ctx = document.getElementById('lineGraph').getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 110);
        gradient.addColorStop(0, 'rgb(24, 56, 132, 0.03)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.5)');
        return gradient
    }

    const getInProgressGradient = () => {
        const ctx = document.getElementById('lineGraph').getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 110);
        gradient.addColorStop(0, 'rgb(220, 124, 11, 0.03)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.5)');
        return gradient
    }

    const getPendingGradient = () => {
        const ctx = document.getElementById('lineGraph').getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 110);
        gradient.addColorStop(0, 'rgb(138, 0, 0, 0.03)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.5)');
        return gradient
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    align: 'right', // Hide default x-axis labels
                },
            },
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                // position: 'none',
                display: false
            },
        },
    }
    const data = {
        labels: [ 'Adhoc', 'Follow Up', 'Re Inspection', 'Periodic'],
        datasets: [
            {
                label: 'Total Cases',
                data: totalCaseCounts,
                borderWidth: 1,
                pointRadius: 0,
                lineTension: 0.4,
                opacity: 1,
                borderColor: 'rgb(76, 139, 146, 0.6)',
                fill: true,
                backgroundColor: getTotalCaseGradient
            },
            {
                label: 'Completed',
                data: completedCaseCounts,
                borderWidth: 1,
                pointRadius: 0,
                lineTension: 0.4,
                borderColor: 'rgb(24, 56, 132, 0.6)',
                fill: true,
                backgroundColor: getCompletedGradient,
            },
            {
                label: 'In Progress',
                data: inProgressCaseCounts,
                borderWidth: 1,
                pointRadius: 0,
                lineTension: 0.4,
                borderColor: 'rgb(220, 124, 11, 0.6)',
                fill: true,
                backgroundColor: getInProgressGradient,
            },
            {
                label: 'Pending',
                data: pendingCaseCounts,
                borderWidth: 1,
                pointRadius: 0,
                lineTension: 0.4,
                borderColor: 'rgb(138, 0, 0, 0.6)',
                fill: true,
                backgroundColor: getPendingGradient,
            },
        ],
    }
    return (
        <>
            <Grid2 container>
                <Typography variant='h4' fontWeight={700}>Insights</Typography>
            </Grid2>
            <Box width='100%' px={8}>
                <Line id='lineGraph'
                    options={options}
                    data={data}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        background: `#4C8B92 0% 0% no-repeat padding-box`,
                        borderRadius: '2px',
                        opacity: 1,
                        width: '10px',
                        height: '10px',
                        mr: 0.8,
                    }}
                />
                <Typography fontWeight={500}>Total Cases</Typography>
                <Box
                    sx={{
                        background: `#183884 0% 0% no-repeat padding-box`,
                        borderRadius: '2px',
                        opacity: 1,
                        width: '10px',
                        height: '10px',
                        mr: 0.8,
                        ml: 2,
                    }}
                />
                <Typography fontWeight={500}>Completed</Typography>
                <Box
                    sx={{
                        background: `#DC7C0B 0% 0% no-repeat padding-box`,
                        borderRadius: '2px',
                        opacity: 1,
                        width: '10px',
                        height: '10px',
                        mr: 0.8,
                        ml: 2,
                    }}
                />
                <Typography fontWeight={500}>In Progress</Typography>
                <Box
                    sx={{
                        background: `#8A0000  0% 0% no-repeat padding-box`,
                        borderRadius: '2px',
                        opacity: 1,
                        width: '10px',
                        height: '10px',
                        mr: 0.8,
                        ml: 2,
                    }}
                />
                <Typography fontWeight={500}>Pending</Typography>
            </Box>
        </>
    )
}

export default Insights
