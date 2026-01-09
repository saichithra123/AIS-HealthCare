import { Box, Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InspectionsByEntity = ({ inspectionByEntities }) => {
    const [entities, setEntities] = useState([]);
    const [values, setValues] = useState([]);

    useEffect(() => {
        setEntities(
            inspectionByEntities && Object.keys(inspectionByEntities).length > 0 ? Object.keys(inspectionByEntities) : []
        );
        setValues(Object.values(inspectionByEntities));
    }, [inspectionByEntities]);

    const data = {
        labels: entities,
        datasets: [
            {
                label: "Inspections by Entities",
                data: values,
                backgroundColor: "#4263EB",
                borderRadius: 5,
                barThickness: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        indexAxis: "y",
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
                grid: {
                    display: false,
                },
            },
        },
    };

    return (
        <>
            <Grid2 container sx={{ width: "100%" }}>
                <Grid2 size={6}>
                    <Typography fontWeight={600}>Cases by Inspection Type</Typography>
                </Grid2>
                <Grid2 size={6} container sx={{ justifyContent: "flex-end" }}>
                    <Box>
                        <Typography fontSize={12}>
                            <b>X - axis</b> - Number of Inspections
                        </Typography>
                        <Typography fontSize={12}>
                            <b>Y - axis</b> - Entity Name
                        </Typography>
                    </Box>
                </Grid2>
            </Grid2>
            <Box sx={{ px: 30 }} width="100%" height="100%">
                <Bar data={data} options={options} />
            </Box>
        </>
    );
};

export default InspectionsByEntity;
