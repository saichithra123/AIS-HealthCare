import { Box, Grid2, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const LatestResults = ({ insights }) => {
    const [ inspectionSourceCounts, setInspectionSourceCounts ] = useState([])

    useEffect(() => {
        const sourceCounts = []
        insights?.map(insight => {
            if (insight?.inspectorSource?.toLowerCase() === 'adhoc'){
                sourceCounts[ 0 ] = (insight?.inspectorSourceCount && sourceCounts[ 0 ]) ?
                    sourceCounts[ 0 ] + insight?.inspectorSourceCount : sourceCounts[ 0 ] ?
                        sourceCounts[ 0 ] : insight?.inspectorSourceCount ?
                            insight?.inspectorSourceCount : 0;
            }
            if (insight?.inspectorSource?.toLowerCase() === 're inspection') {
                sourceCounts[ 1 ] = (insight?.inspectorSourceCount && sourceCounts[ 1 ]) ?
                    sourceCounts[ 1 ] + insight?.inspectorSourceCount : sourceCounts[ 1 ] ?
                        sourceCounts[ 1 ] : insight?.inspectorSourceCount ?
                            insight?.inspectorSourceCount : 0;
            }
            if (insight?.inspectorSource?.toLowerCase() === 'follow up'){
                sourceCounts[ 2 ] = (insight?.inspectorSourceCount && sourceCounts[ 2 ]) ?
                    sourceCounts[ 2 ] + insight?.inspectorSourceCount : sourceCounts[ 2 ] ?
                        sourceCounts[ 2 ] : insight?.inspectorSourceCount ?
                            insight?.inspectorSourceCount : 0;
            }
        })
        if (!sourceCounts[ 0 ]) sourceCounts[ 0 ] = 0
        if (!sourceCounts[ 1 ]) sourceCounts[ 1 ] = 0
        if (!sourceCounts[ 2 ]) sourceCounts[ 2 ] = 0
        setInspectionSourceCounts(sourceCounts)
    }, [ insights ])

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        radius: '70%',
        plugins: {
            legend: {
                // position: 'bottom',
                display: false
            },
        },
    }
    const data = {
        labels: ['Adhoc', 'Re-Inspection', 'Follow-Up'],
        datasets: [
            {
                data: inspectionSourceCounts,
                // data: [ 12, 19, 8 ],
                borderRadius: 5,
                spacing: 2,
                backgroundColor: [
                    '#003346',
                    '#4C8B92',
                    '#C5DBDE',
                ],
                borderColor: [
                    '#003346',
                    '#4C8B92',
                    '#C5DBDE',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <>
            <Grid2 container>
                <Typography variant='h4' fontWeight={700}>Latest Results</Typography>
            </Grid2>
            <Box width='100%' >
                <Doughnut data={data} options={options}  />
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
                        background: `#003346 0% 0% no-repeat padding-box`,
                        borderRadius: '45px',
                        opacity: 1,
                        width: '8px',
                        height: '8px',
                        mr: 0.8,
                    }}
                />
                <Typography fontWeight={500}>Adhoc</Typography>
                <Box
                    sx={{
                        background: `#03911A 0% 0% no-repeat padding-box`,
                        borderRadius: '45px',
                        opacity: 1,
                        width: '8px',
                        height: '8px',
                        mr: 0.8,
                        ml: 2,
                    }}
                />
                <Typography fontWeight={500}>Re-Inspection</Typography>
                <Box
                    sx={{
                        background: `#92C7CF 0% 0% no-repeat padding-box`,
                        borderRadius: '45px',
                        opacity: 1,
                        width: '8px',
                        height: '8px',
                        mr: 0.8,
                        ml: 2,
                    }}
                />
                <Typography fontWeight={500}>Follow-Up</Typography>
            </Box>
        </>
    )
}

export default LatestResults
