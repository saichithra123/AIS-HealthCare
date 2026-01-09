import { Box, Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const CasesByStatus = ({ casesByStatus }) => {
    const [statusValues, setStatusValues] = useState([]);
    const [status, setStatus] = useState([]);

    useEffect(() => {
        const values = [];
        const keys = capitalizeWords(casesByStatus && Object.keys(casesByStatus)?.length > 0 ? Object.keys(casesByStatus) : []);
        setStatus(keys);
        values.push(casesByStatus?.new ? casesByStatus?.new : 0);
        values.push(casesByStatus?.pending ? casesByStatus?.pending : 0);
        values.push(casesByStatus?.in_progress ? casesByStatus?.in_progress : 0);
        values.push(casesByStatus?.pending_review ? casesByStatus?.pending_review : 0);
        values.push(casesByStatus?.under_review ? casesByStatus?.under_review : 0);
        values.push(casesByStatus?.pending_approval ? casesByStatus?.pending_approval : 0);
        values.push(casesByStatus?.under_approval ? casesByStatus?.under_approval : 0);
        values.push(casesByStatus?.reopened ? casesByStatus?.reopened : 0);
        values.push(casesByStatus?.completed ? casesByStatus?.completed : 0);
        setStatusValues(values);
    }, [casesByStatus]);

    const labels = [
        "New",
        "Pending",
        "In Progress",
        "Pending Review",
        "Under Review",
        "Pending Approval",
        "Under Approval",
        "Re-Opened",
        "Completed",
    ];

    const labelColors = ["#66B6D9", "#FFA282", "#037F4C", "#FECD8B", "#749CA1", "#C4E57D", "#6A9D88", "#DFD38D", "#8C73BF"];

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        radius: "70%",
        plugins: {
            legend: {
                // position: "bottom",
                display: false,
            },
        },
    };

    const data = {
        labels: [
            "New",
            "Pending",
            "In Progress",
            "Pending Review",
            "Under Review",
            "Pending Approval",
            "Under Approval",
            "Re-Opened",
            "Completed",
        ],
        datasets: [
            {
                data: statusValues,
                backgroundColor: [
                    "#66B6D9",
                    "#FFA282",
                    "#037F4C",
                    "#FECD8B",
                    "#749CA1",
                    "#C4E57D",
                    "#6A9D88",
                    "#DFD38D",
                    "#8C73BF",
                ],
                borderColor: ["#66B6D9", "#FFA282", "#037F4C", "#FECD8B", "#749CA1", "#C4E57D", "#6A9D88", "#DFD38D", "#8C73BF"],
                borderWidth: 1,
            },
        ],
    };

    const capitalizeWords = (status) => {
        const statusArray = [];
        status?.map((state) => {
            const words = state?.split(/[\s_]+/);
            statusArray.push(words?.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "));
        });
        return statusArray;
    };

    return (
        <>
            <Grid2 container>
                <Typography fontWeight={600}>Cases by Status</Typography>
            </Grid2>
            <Box width="100%">
                <Doughnut data={data} options={options} />
            </Box>
            <Grid2 container sx={{ pl: 4 }}>
                {labels?.map((label, index) => {
                    return (
                        status?.includes(label) && (
                            <Grid2 key={label} size={6} container alignItems="center">
                                <Box
                                    sx={{
                                        background: `${labelColors[index]} 0% 0% no-repeat padding-box`,
                                        borderRadius: "45px",
                                        opacity: 1,
                                        width: "8px",
                                        height: "8px",
                                        mr: 0.8,
                                    }}
                                />
                                <Typography fontSize={12} fontWeight={500}>
                                    {label}
                                </Typography>
                            </Grid2>
                        )
                    );
                })}
            </Grid2>
        </>
    );
};

export default CasesByStatus;
