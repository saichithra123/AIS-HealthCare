import { Box, Tab, Tabs, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ManagerCases from '../manager/ManagerCases';
import ManagerPool from '../manager/ManagerPool';
import InspectorCases from '../inspector/InspectorCases';
import ApproverCases from '../approver/ApproverCases';
import InspectorPool from '../inspector/InspectorPool';
import ApproverPool from '../approver/ApproverPool';
import ReviewerCases from '../reviewer/ReviewerCases';
import ReviewerPool  from '../reviewer/ReviewerPool'
import GroupCases from "../inspector/GroupCases";
import HeadCases from "../head/HeadCases";
import DirectorCases from "../director/DirectorCases";
import HeadPool from "../head/HeadPool";
import DirectorPool from "../director/DirectorPool";

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

const Cases = () => {
    const theme = useTheme();
    const [tabNumber, setTabNumber] = useState(0);
    const [poolTabName, setPoolTabName] = useState("");
    const userRole = localStorage.getItem("userRole");

    useEffect(() => {
        if (localStorage.getItem("userRole") === "MANAGER") {
            setPoolTabName("Manager Pool");
        } else if (localStorage.getItem("userRole") === "INSPECTOR") {
            setPoolTabName("Inspector Pool");
        } else if (localStorage.getItem("userRole") === "REVIEWER") {
            setPoolTabName("Reviewer Pool");
        } else if (localStorage.getItem("userRole") === "APPROVER") {
            setPoolTabName("Approver Pool");
        }
    }, []);

    const handleTabChange = (event, newValue) => {
        setTabNumber(newValue);
    };

    return (
        <>
            <Box
                sx={{
                    borderRadius: "20px",
                    background: `${theme.palette.colors[2]} 0% 0% no-repeat padding-box`,
                    my: 2,
                    mr: 2,
                    px: 2.5,
                    py: 2,
                    boxShadow: `inset 0px 0px 6px ${theme.palette.colors[3]}`,
                    opacity: 1,
                    height: "640px",
                }}
            >
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
                    <Tab label={userRole === "INSPECTOR" ? "My Claims" : "My Cases"} {...a11yProps(0)} />
                    <Tab label={poolTabName} {...a11yProps(1)} />
                    {/* {localStorage.getItem("userRole") === "INSPECTOR" && <Tab label="Group Cases" {...a11yProps(2)} />} */}
                </Tabs>
                <TabPanel value={tabNumber} index={0}>
                    {localStorage.getItem("userRole") === "MANAGER" && <ManagerCases />}
                    {localStorage.getItem("userRole") === "INSPECTOR" && <InspectorCases />}
                    {localStorage.getItem("userRole") === "REVIEWER" && <ReviewerCases />}
                    {localStorage.getItem("userRole") === "APPROVER" && <ApproverCases />}
                </TabPanel>
                <TabPanel value={tabNumber} index={1}>
                    {localStorage.getItem("userRole") === "MANAGER" && <ManagerPool />}
                    {localStorage.getItem("userRole") === "INSPECTOR" && <InspectorPool />}
                    {localStorage.getItem("userRole") === "REVIEWER" && <ReviewerPool />}
                    {localStorage.getItem("userRole") === "APPROVER" && <ApproverPool />}
                </TabPanel>
                <TabPanel value={tabNumber} index={2}>
                    <GroupCases />
                </TabPanel>
            </Box>
        </>
    );
};

export default Cases
