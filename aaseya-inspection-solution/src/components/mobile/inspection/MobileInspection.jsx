import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Checklist from "./Checklist";
import './caseDetails.css';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { HeaderContext } from "../HeaderContext";
 
const MobileInspection = () => {
    const theme = useTheme();
    const location = useLocation();
    const caseDetails = location.state?.caseDetails;
    const [ inspectionChecklists, setInspectionChecklists ] = useState([]);
    const navigate = useNavigate();
    const categoryIndex = location.state?.categoryIndex
    const inspectionID = location.state?.inspectionID
    const isShowInspectionReport = location.state?.isShowInspectionReport
    // const { categoryIndex, inspectionID, isShowInspectionReport } = location.state
    const { header, setHeader } = useContext(HeaderContext)
    const [ loading, setLoading ] = useState(true)
 
    useEffect(() => {
        setHeader(caseDetails?.inspectionID ? `Case ID ${caseDetails?.inspectionID}` : `Case ID ${inspectionID}`);
    }, [])
 
    useEffect(() => {
        const getInspctionChecklist = async () => {
            const submittedChecklist = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_BASE_URL}/getSubmittedInspection/${caseDetails?.inspectionID ? caseDetails?.inspectionID : inspectionID}`
            });
            if (Object.keys(submittedChecklist?.data)?.length > 0) {
                setInspectionChecklists(submittedChecklist?.data?.checklist);
            } else {
                const checklistResponse = await axios({
                    method: 'get',
                    url: `${import.meta.env.VITE_BASE_URL}/getInspectionChecklist/${caseDetails?.inspectionID ? caseDetails?.inspectionID : inspectionID}`
                });
                setInspectionChecklists(checklistResponse?.data);
            }
            setLoading(false)
        };
        if (caseDetails?.inspectionID || inspectionID) {
            getInspctionChecklist();
        }
    }, [ caseDetails?.inspectionID, inspectionID ])
 
    if(loading) return <>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '85vh'
        }}>
            <Typography variant="h4">Loading...</Typography>
        </Box>
    </>
    else return (
        <>
            <Box>
                <Checklist inspectionChecklists={inspectionChecklists} inspectionID={caseDetails?.inspectionID ? caseDetails?.inspectionID : inspectionID} categoryIndex={categoryIndex} isShowInspectionReport={isShowInspectionReport} />
            </Box>
        </>
    )
}
 
export default MobileInspection
 