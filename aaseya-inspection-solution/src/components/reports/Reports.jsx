import { Box, Button, Grid2, Tab, Tabs, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import KPIReports from "./KPIreports/KPIReports";
import GeneralInquiry from "./generalInquiry/GeneralInquiry";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const Reports = () => {
    const theme = useTheme();
    const [tabNumber, setTabNumber] = useState(0);
    const [isShowReport, setIsShowReport] = useState(false);

    const handleTabChange = (event, newValue) => {
        setTabNumber(newValue);
        setIsShowReport(false);
    };

    return (
        <Box
            sx={{
                borderRadius: "20px",
                background: `${theme.palette.colors[2]} 0% 0% no-repeat padding-box`,
                my: 2,
                mr: 2,
                p: 2.5,
                boxShadow: `inset 0px 0px 6px ${theme.palette.colors[3]}`,
                opacity: 1,
                ".MuiTabs-root .MuiButtonBase-root.Mui-selected": {
                    color: "#FFFFFF",
                },
            }}
        >
            <Grid2 container alignItems="center" sx={{ mb: 2 }}>
                {isShowReport && (
                    <Button
                        sx={{
                            color: theme.palette.colors[21],
                            fontSize: "14px",
                            fontWeight: 600,
                            mr: 2,
                        }}
                        startIcon={<KeyboardBackspaceOutlinedIcon />}
                        onClick={() => setIsShowReport(false)}
                    >
                        Back
                    </Button>
                )}
                <Typography variant="h3" sx={{ fontSize: "18px", fontWeight: 600 }}>
                    Reports
                </Typography>
            </Grid2>
            <Tabs
                value={tabNumber}
                onChange={handleTabChange}
                aria-label="List of cases"
                TabIndicatorProps={{
                    style: {
                        backgroundColor: "#4C8B92",
                    },
                }}
            >
                <Tab label="General Inquiry" {...a11yProps(0)} />
                <Tab label="KPI Reports" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={tabNumber} index={0}>
                <GeneralInquiry />
            </TabPanel>
            <TabPanel value={tabNumber} index={1}>
                <KPIReports isShowReport={isShowReport} setIsShowReport={setIsShowReport} />
            </TabPanel>
        </Box>
    );
};

export default Reports;
