import { Box, Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CasesBySource = ({ casesBySource, isSummary = false }) => {
    const [inspectionSource, setInspectionSource] = useState([]);
    const colors = ["#527DC0", "#AADEA7", "#2DAC86", "#FEAE65", "#86A10C"];
    const [sourceCount, setSourceCount] = useState([]);
    const [sources, setSources] = useState([]);

    useEffect(() => {
        if (isSummary) {
            setInspectionSource(Object.keys(casesBySource));
            setSources(Object.keys(casesBySource));
            setSourceCount(Object.values(casesBySource));
        } else {
            const count = [];
            setInspectionSource(["Adhoc", "Follow Up", "Periodic", "Re Inspection"]);
            if (casesBySource && Object.keys(casesBySource)?.length > 0) {
                setSources(Object.keys(casesBySource));
            }
            count.push(casesBySource?.["Adhoc"] ? casesBySource["Adhoc"] : 0);
            count.push(casesBySource?.["Follow Up"] ? casesBySource["Follow Up"] : 0);
            count.push(casesBySource?.["Periodic"] ? casesBySource["Periodic"] : 0);
            count.push(casesBySource?.["Re Inspection"] ? casesBySource["Re Inspection"] : 0);
            setSourceCount(count);
        }
    }, [casesBySource]);

    const data = {
        labels: sources,
        datasets: [
            {
                label: isSummary ? "Category" : "Inspection Source",
                data: sourceCount,
                backgroundColor: ["#527DC0", "#AADEA7", "#2DAC86", "#FEAE65", "#86A10C"],
                borderColor: ["#527DC0", "#AADEA7", "#2DAC86", "#FEAE65", "#86A10C"],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        radius: "70%",
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <>
            <Grid2 container>
                <Typography fontWeight={600}>
                    {isSummary ? "Top 5 Categories (of issues)" : "Cases by Inspection Source"}
                </Typography>
            </Grid2>
            <Box width="100%">
                <Pie data={data} options={options} />
            </Box>
            <Grid2 container sx={{ pl: 4 }}>
                {inspectionSource?.map((source, index) => {
                    return (
                        sources?.includes(source) && (
                            <Grid2 key={source} size={6} container alignItems="center">
                                <Box
                                    sx={{
                                        background: `${colors[index]} 0% 0% no-repeat padding-box`,
                                        borderRadius: "45px",
                                        opacity: 1,
                                        width: "8px",
                                        height: "8px",
                                        mr: 0.8,
                                    }}
                                />
                                <Typography fontSize={12} fontWeight={500}>
                                    {source}
                                </Typography>
                            </Grid2>
                        )
                    );
                })}
            </Grid2>
        </>
    );
};

export default CasesBySource;
