import { Box, Button, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import Header from "./Header";
import Checklist from "./Checklist";
import './caseDetails.css'
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Inspection = () => {
    const theme = useTheme();
    const location = useLocation();
    const caseDetails = location.state?.caseDetails;
    const action = location.state?.action;
    const [inspectionChecklists, setInspectionChecklists] = useState([]);
    const [inspectionReport, setInspectionReport] = useState("");
    const [approverReport, setApproverReport] = useState("");
    const navigate = useNavigate();
    const [groupInspectors, setGroupsInspectors] = useState([]);
    const [amountStatus, setAmountStatus] = useState("");

    useEffect(() => {
        // const getInspctionChecklist = async () => {
        //     const submittedChecklist =
        //         !action && (caseDetails?.caseCreationType === "plan" || caseDetails?.caseCreationType === "group")
        //             ? await axios({
        //                   method: "get",
        //                   url: `${import.meta.env.VITE_BASE_URL}/getSubmittedInspection/${
        //                       caseDetails?.inspectionID
        //                   }?inspectorId=${localStorage.getItem("userEmail")}`,
        //               })
        //             : await axios({
        //                   method: "get",
        //                   url: `${import.meta.env.VITE_BASE_URL}/getSubmittedInspection/${caseDetails?.inspectionID}`,
        //               });
        //     if (Object.keys(submittedChecklist?.data)?.length > 0) {
        //         setInspectionChecklists(submittedChecklist?.data?.checklist);
        //         setInspectionReport(submittedChecklist?.data?.inspectorComment);
        //     } else {
        //         const checklistResponse = await axios({
        //             method: "get",
        //             url: `${import.meta.env.VITE_BASE_URL}/getInspectionChecklist/${caseDetails?.inspectionID}`,
        //         });
        //         setInspectionChecklists(checklistResponse?.data);
        //     }
        // };
        // const getSubmittedInspectionChecklist = async () => {
        //     try {
        //         const submittedChecklist = await axios({
        //             method: "get",
        //             url: `${import.meta.env.VITE_BASE_URL}/getSubmittedInspection/${caseDetails?.inspectionID}`,
        //         });
        //         setInspectionChecklists(submittedChecklist?.data?.checklist);
        //         setInspectionReport(submittedChecklist?.data?.reviewerComment || submittedChecklist?.data?.inspectorComment);
        //         setApproverReport(submittedChecklist?.data?.approverComment);
        //     } catch (error) {
        //         console.error("Error fetching submitted inspection checklist:", error);
        //     }
        // };
        const getInspctionChecklist = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/checklistitems`);
            setInspectionChecklists(response?.data);
        };

        const getSubmittedInspectionChecklist = async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/GetApproverandReviewerChecklists?claimId=${caseDetails?.claimId}`
            );
            setInspectionChecklists(response?.data?.checklistAnswers);
            setInspectionReport(response?.data?.claim?.reviewerReport || response?.data?.claim?.inspectorReport);
            setAmountStatus(response?.data?.claim?.amountStatus);
        };

        if (caseDetails?.claimId) {
            if (localStorage.getItem("userRole") === "INSPECTOR") {
                getInspctionChecklist();
            } else {
                getSubmittedInspectionChecklist();
            }
        }
    }, [caseDetails?.claimId]);

    // useEffect(() => {
    //     const getInspectorsforGroup = async () => {
    //         const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/getUsersByGroupId/${caseDetails?.groupId}`);
    //         setGroupsInspectors(response?.data);
    //     };
    //     if (caseDetails?.groupId) {
    //         getInspectorsforGroup();
    //     }
    // }, [caseDetails?.groupId]);

    return (
        <>
            <Box className="inspectionContainer">
                <Button className="backButton" startIcon={<KeyboardBackspaceOutlinedIcon />} onClick={() => navigate(-1)}>
                    Back
                </Button>
                <Box
                    display="flex"
                    flexDirection="column"
                    sx={{
                        borderRadius: "10px",
                        background: `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                        mt: 1,
                    }}
                >
                    <Header caseDetails={caseDetails} />
                    <Checklist
                        inspectionChecklists={inspectionChecklists}
                        setInspectionChecklists={setInspectionChecklists}
                        amountStatus={amountStatus}
                        setAmountStatus={setAmountStatus}
                        claimId={caseDetails?.claimId}
                        inspectorReport={inspectionReport}
                        approverReport={approverReport}
                        action={action}
                        groupInspectors={groupInspectors}
                        caseDetails={caseDetails}
                    />
                </Box>
            </Box>
        </>
    );
};

export default Inspection;
