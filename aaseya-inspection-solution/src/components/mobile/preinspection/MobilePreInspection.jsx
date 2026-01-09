import { Box, Button, useTheme, Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import "../inspection/caseDetails.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../inspection/Header";
import CheckList from "./CheckList";

const MobilePreInspection = () => {
    const theme = useTheme();
    const location = useLocation();
    const caseDetails = location.state?.caseDetails;
    const [preInspectionChecklists, setPreInspectionChecklists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getPreInspctionChecklist = async () => {
            const responsePreInspection = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/savedPreInspection?inspectionid=${caseDetails?.inspectionID}`,
            });
            setPreInspectionChecklists(responsePreInspection?.data);
        };
        if (caseDetails?.inspectionID) {
            getPreInspctionChecklist();
        }
    }, [caseDetails?.inspectionID]);

    return (
        <>
            <Box>
                <CheckList preInspectionChecklists={preInspectionChecklists} inspectionID={caseDetails?.inspectionID} />
            </Box>
        </>
    );
};

export default MobilePreInspection;
