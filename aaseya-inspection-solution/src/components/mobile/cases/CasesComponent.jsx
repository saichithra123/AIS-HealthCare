import React, { useContext, useEffect, useState } from "react";
import Footer from "../footer/Footer";
import HeaderComponent from "../header/Header";
import { Box, Typography } from "@mui/material";
import "./cases.css";
import InspectorCases from "../../inspector/InspectorCases";
import InspectorMyCases from "../inspector/InspectorMyCases";
import InspectorPool from "../inspector/InspectorPool";
import { HeaderContext } from "../HeaderContext";

const CasesComponent = () => {
  const [isMyCases, setIsMyCases] = useState(true);
  const [isInspectorPool, setIsInspectorPool] = useState(false);
  const { header, setHeader } = useContext(HeaderContext);

  useEffect(() => {
    setHeader("Cases");
  }, []);
  return (
    <>
      <Box className="casesContainer">
        {/* <HeaderComponent /> */}
        <Box className="headingContainer">
          <Box className="caseHeading">
            <Box
              className="caseTabName"
              sx={{
                backgroundColor: isMyCases ? "#4C8B92" : "",
                "& .MuiTypography-root": {
                  color: isMyCases ? "#FFFFFF" : "",
                },
              }}
              onClick={() => {
                setIsMyCases(true);
                setIsInspectorPool(false);
              }}
            >
              <Typography fontWeight={600} variant="h6">
                My Cases
              </Typography>
            </Box>
            <Box
              className="caseTabName"
              sx={{
                backgroundColor: isInspectorPool ? "#4C8B92" : "",
                "& .MuiTypography-root": {
                  color: isInspectorPool ? "#FFFFFF" : "",
                },
              }}
              onClick={() => {
                setIsMyCases(false);
                setIsInspectorPool(true);
              }}
            >
              <Typography fontWeight={600} variant="h6">
                Inspector Pool
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className="casesInnerContainer">
          {isMyCases && <InspectorMyCases />}
          {isInspectorPool && <InspectorPool />}
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default CasesComponent;
