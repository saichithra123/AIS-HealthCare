import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import HistoryReports from "./HistoryReports";
import GroupReports from "./GroupReports";
import TransactionReports from "./TransactionReports";
import SummaryReports from "./SummaryReports";

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

const ReportTabs = ({ selectedTabNumber }) => {
    const [tabNumber, setTabNumber] = useState(0);

    useEffect(() => {
        setTabNumber(selectedTabNumber);
    }, [selectedTabNumber]);

    const handleTabChange = (event, newValue) => {
        setTabNumber(newValue);
    };

    return (
        <Box
            sx={{
                ".MuiTabs-root": {
                    p: 2,
                },
                ".MuiTabs-scroller": {
                    borderRadius: "50px !important",
                    backgroundColor: "#D4E9EB",
                    // overflow: "visible !important",
                },
                ".MuiTabs-root .MuiButtonBase-root": {
                    borderRadius: "0px",
                    border: "0px",
                    fontSize: "16px",
                },
                ".MuiTabs-root .MuiButtonBase-root.Mui-selected": {
                    backgroundColor: "#ADD5DA",
                    color: "#030303",
                },
                // ".MuiTabs-root .MuiButtonBase-root:first-of-type": {
                //     borderRadius: "50px 0px 0px 50px !important",
                // },
                ".MuiTabs-indicator": {
                    backgroundColor: "#ADD5DA",
                    // "&::after": {
                    //     content: "''",
                    //     position: "absolute",
                    //     bottom: -8,
                    //     left: "50%",
                    //     transform: "translateX(-50%)",
                    //     width: 0,
                    //     height: 0,
                    //     borderLeft: "8px solid transparent",
                    //     borderRight: "8px solid transparent",
                    //     borderTop: "8px solid #ADD5DA", // Match the theme or color of your tab
                    // },
                },
            }}
        >
            <Tabs value={tabNumber} onChange={handleTabChange} aria-label="Reports">
                <Tab label="History Reports" {...a11yProps(0)} />
                <Tab label="Group Reports" {...a11yProps(1)} />
                <Tab label="Transaction Reports" {...a11yProps(2)} />
                <Tab label="Summary Reports" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={tabNumber} index={0}>
                <HistoryReports />
            </TabPanel>
            <TabPanel value={tabNumber} index={1}>
                <GroupReports />
            </TabPanel>
            <TabPanel value={tabNumber} index={2}>
                <TransactionReports />
            </TabPanel>
            <TabPanel value={tabNumber} index={3}>
                <SummaryReports />
            </TabPanel>
        </Box>
    );
};

export default ReportTabs;
