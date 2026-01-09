import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import CaseInfo from "./CaseInfo";

const InspectorMyCases = () => {
  const theme = useTheme();
  const todayDate = useRef(new Date());
  const yesterdayDate = useRef(new Date());
  const tomorrowDate = useRef(new Date());
  const [inspectorCases, setInspectorCases] = useState([]);
  const [yesterdayCases, setYesterdayCases] = useState([]);
  const [todayCases, setTodayCases] = useState([]);
  const [tomorrowCases, setTomorrowCases] = useState([]);

  useEffect(() => {
    tomorrowDate.current.setDate(todayDate.current.getDate() + 1);
    yesterdayDate.current.setDate(todayDate.current.getDate() - 1);
  }, []);

  useEffect(() => {
    const getInspectorCases = async () => {
      const todayCaseDate = `${new Date(
        todayDate.current
      ).getFullYear()}-${String(
        new Date(todayDate.current).getMonth() + 1
      ).padStart(2, "0")}-${String(
        new Date(todayDate.current).getDate()
      ).padStart(2, "0")}`;
      const responseCases = await axios({
        method: "get",
        url: `${
          import.meta.env.VITE_BASE_URL
        }/getMycasesForInspectorDate/${localStorage.getItem(
          "userEmail"
        )}/${todayCaseDate}`,
      });
      setYesterdayCases(responseCases?.data?.Yesterday);
      setTodayCases(responseCases?.data?.Today);
      setTomorrowCases(responseCases?.data?.Tomorrow);
    };
    getInspectorCases();
  }, []);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          mt: 1,
          overflow: "auto",
          scrollbarWidth: "none",
          pt: 1,
          width: "100%",
          position: "absolute",
          backgroundColor: "#F2F6F6",
          pb: 10,
          // overflow:"scroll"
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={600} mb="12px" mt={14} ml="20px">
            {new Date(yesterdayDate.current)
              .getDate()
              .toString()
              .padStart(2, "0")}{" "}
            &nbsp;
            {new Date(yesterdayDate.current).toLocaleString("default", {
              month: "short",
            })}
            &nbsp; | &nbsp; Yesterday
          </Typography>
          {yesterdayCases?.length > 0 ? (
            <CaseInfo inspectorCases={yesterdayCases} />
          ) : (
            <Typography fontWeight={500} ml="20px">
              No cases available
            </Typography>
          )}
        </Box>
        <Box>
          <Typography
            variant="h5"
            fontWeight={600}
            color={theme.palette.colors[11]}
            mb="12px"
            mt="24px"
            ml="20px"
          >
            {new Date(todayDate.current).getDate().toString().padStart(2, "0")}{" "}
            &nbsp;
            {new Date(todayDate.current).toLocaleString("default", {
              month: "short",
            })}
            &nbsp; | &nbsp; Today
          </Typography>
          {todayCases?.length > 0 ? (
            <CaseInfo inspectorCases={todayCases} />
          ) : (
            <Typography fontWeight={500} ml="20px">
              No cases available
            </Typography>
          )}
        </Box>
        <Box>
          <Typography
            variant="h5"
            fontWeight={600}
            mb="10px"
            mt="24px"
            ml="20px"
          >
            {new Date(tomorrowDate.current)
              .getDate()
              .toString()
              .padStart(2, "0")}{" "}
            &nbsp;
            {new Date(tomorrowDate.current).toLocaleString("default", {
              month: "short",
            })}
            &nbsp; | &nbsp; Tomorrow
          </Typography>
          {tomorrowCases?.length > 0 ? (
            <CaseInfo inspectorCases={tomorrowCases} />
          ) : (
            <Typography fontWeight={500} ml="20px">
              No cases available
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default InspectorMyCases;
