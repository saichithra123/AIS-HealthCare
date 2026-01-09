import { Box, Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CasesByInspectionType = ({ casesByInspectionType }) => {
    const [inspectionTypes, setInspectionTypes] = useState([])
    const [values, setValues] = useState([])

    useEffect(() => {
        setInspectionTypes(Object.keys(casesByInspectionType));
        setValues(Object.values(casesByInspectionType));
    }, [casesByInspectionType]);

    const data = {
        labels: inspectionTypes,
        datasets: [
            {
                label: "Cases by Inspection Type",
                data: values,
                backgroundColor: "#2255A4",
                borderRadius: 5,
                barThickness: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                title: {
                    display: true,
                    text: "No. of Cases", // Add your Y-axis label here
                },
                // beginAtZero: true, // Ensure the scale starts at zero
            },
        },
    };

    return (
        <>
            <Grid2 container>
                <Typography fontWeight={600}>Cases by Inspection Type</Typography>
            </Grid2>
            <Box width="100%" height="100%" sx={{ display: "flex", alignItems: "center" }}>
                <Bar data={data} options={options} />
            </Box>
        </>
    );
};

export default CasesByInspectionType;
