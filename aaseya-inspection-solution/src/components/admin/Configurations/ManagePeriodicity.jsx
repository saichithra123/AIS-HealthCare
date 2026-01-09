import React, { useState } from 'react';
import { TextField, Grid2, Box, Typography, Select, MenuItem, Button, Radio, RadioGroup, FormControlLabel, useTheme, Divider } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import CustomRadio from '../../global/CustomRadio';
import '../adminStyles.css'

const Periodicity = ({ periodicity, setPeriodicity }) => {
    const theme = useTheme();
    const [inspectionStartDate, setInspectionStartDate] = useState(null);
    const [inspectionEndDate, setInspectionEndDate] = useState(null);
    const [occurence, setOccurence] = useState("");
    const [everyWeek, setEveryWeek] = useState(1);
    const [everyMonth, setEveryMonth] = useState(1);
    const [onDay, setOnDay] = useState();
    const [specificDay, setSpecificDay] = useState();
    const [selectedOption, setSelectedOption] = useState("");
    const [week, setWeek] = useState(null);
    const [weekday, setWeekday] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const days = [
        { value: "Sunday", name: "Su" },
        { value: "Monday", name: "Mo" },
        { value: "Tuesday", name: "Tu" },
        { value: "Wednesday", name: "We" },
        { value: "Thursday", name: "Th" },
        { value: "Friday", name: "Fr" },
        { value: "Saturday", name: "Sa" },
    ];

    const getDaySuffix = (day) => {
        if (day % 10 === 1 && day % 100 !== 11) return "st";
        if (day % 10 === 2 && day % 100 !== 12) return "nd";
        if (day % 10 === 3 && day % 100 !== 13) return "rd";
        return "th";
    };

    const handleInspectionStartDateChange = (newDate) => {
        setPeriodicity({
            ...periodicity,
            inspectionStartDate: newDate,
        });
    };
    const handleInspectionEndDateChange = (newDate) => {
        setPeriodicity({
            ...periodicity,
            inspectionEndDate: newDate,
        });
    };

    return (
        <>
            <Box marginBottom="100px" sx={{ mt: 3, mb: 3 }}>
                <Grid2 container spacing={2} alignItems="center">
                    <Grid2
                        size={4}
                        sx={{
                            ".MuiInputBase-root": {
                                borderRadius: "20px",
                                boxShadow: "inset 0px 3px 6px #00000029",
                                border: "1px solid #CCCCCC",
                                height: "40px",
                            },
                        }}
                    >
                        <Typography>Occurrence</Typography>
                        <Select
                            className="inputFields"
                            fullWidth
                            value={periodicity?.occurence}
                            onChange={(e) =>
                                setPeriodicity({
                                    ...periodicity,
                                    occurence: e.target.value,
                                })
                            }
                        >
                            <MenuItem value="NOREPEAT">Don't Repeat</MenuItem>
                            <MenuItem value="WEEKLY">Weekly</MenuItem>
                            <MenuItem value="MONTHLY">Monthly</MenuItem>
                            <MenuItem value="CUSTOM">Custom</MenuItem>
                        </Select>
                    </Grid2>
                    {periodicity?.occurence !== "NOREPEAT" && (
                        <>
                            <Grid2 size={4}>
                                <Typography>Start Date</Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        className="inputFields"
                                        value={periodicity?.inspectionStartDate}
                                        onChange={handleInspectionStartDateChange}
                                        format="DD MMM YYYY"
                                        sx={{ width: "100%" }}
                                    />
                                </LocalizationProvider>
                            </Grid2>
                            <Grid2 size={4}>
                                <Typography>End Date</Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        className="inputFields"
                                        value={periodicity?.inspectionEndDate}
                                        onChange={handleInspectionEndDateChange}
                                        format="DD MMM YYYY"
                                        sx={{ width: "100%" }}
                                    />
                                </LocalizationProvider>
                            </Grid2>
                        </>
                    )}
                </Grid2>
            </Box>
            {periodicity?.occurence === "WEEKLY" && (
                <Box>
                    <Typography>Repeats Every</Typography>
                    <Grid2 container spacing={2} alignItems="center">
                        <Grid2 size={3}>
                            <TextField
                                type="number"
                                className="inputFields"
                                value={periodicity?.everyWeek}
                                onChange={(e) => setPeriodicity({ ...periodicity, everyWeek: e.target.value })}
                                fullWidth
                            />
                        </Grid2>
                        <Grid2 size={2}>
                            <Typography sx={{ fontSize: "14px !important" }}>Week</Typography>
                        </Grid2>
                    </Grid2>
                    <Box mt={3}>
                        <Box display="flex" gap={2} mt={1}>
                            {days.map((day) => (
                                <Button
                                    key={day?.value}
                                    onClick={() =>
                                        setPeriodicity({
                                            ...periodicity,
                                            selectedDay: day?.value,
                                        })
                                    }
                                    sx={{
                                        maxWidth: "40px",
                                        minWidth: "40px",
                                        height: "40px",
                                        borderRadius: "6px",
                                        border: "1px solid #CCCCCC",
                                        fontWeight: periodicity?.selectedDay === day?.value ? 600 : 400,
                                        color: periodicity?.selectedDay === day?.value ? "#000" : "#000",
                                        backgroundColor: periodicity?.selectedDay === day?.value ? "#C5DBDE" : "#FFFFFF",
                                        borderColor: periodicity?.selectedDay === day?.value ? "#C5DBDE" : "#CCCCCC",
                                        "&:hover": {
                                            backgroundColor: periodicity?.selectedDay === day?.value ? "#C5DBDE" : "#FFFFFF",
                                        },
                                    }}
                                >
                                    {day?.name}
                                </Button>
                            ))}
                        </Box>
                    </Box>
                    {periodicity?.selectedDay && (
                        <Box mt={3}>
                            <Typography sx={{ color: "#4C8B92 !important", fontSize: "14px !important" }}>
                                {" "}
                                Occurs on {periodicity?.selectedDay} of every week{" "}
                            </Typography>
                        </Box>
                    )}
                </Box>
            )}
            {periodicity?.occurence === "MONTHLY" && (
                <Box>
                    <Typography>Repeats Every</Typography>
                    <Grid2 container spacing={2} alignItems="center">
                        <Grid2 size={3}>
                            <TextField
                                type="number"
                                className="inputFields"
                                value={periodicity?.everyMonth}
                                onChange={(e) => setPeriodicity({ ...periodicity, everyMonth: e.target.value })}
                                fullWidth
                            />
                        </Grid2>
                        <Grid2 size={2}>
                            <Typography sx={{ fontSize: "14px !important" }}>Month</Typography>
                        </Grid2>
                    </Grid2>
                    <Box>
                        <RadioGroup
                            value={periodicity?.selectedOption}
                            onChange={(e) => setPeriodicity({ ...periodicity, selectedOption: e.target.value })}
                        >
                            <Grid2 container alignItems="center" direction="row" mt={3}>
                                <FormControlLabel value="onDay" control={<CustomRadio />} label="On Day" sx={{ mr: 4 }} />
                                <TextField
                                    type="number"
                                    className="inputFields"
                                    value={periodicity?.onDay}
                                    onChange={(e) => setPeriodicity({ ...periodicity, onDay: e.target.value })}
                                    sx={{ width: "300px", ml: 1 }}
                                    disabled={periodicity?.selectedOption !== "onDay"}
                                />
                            </Grid2>
                            <Grid2 container alignItems="center" direction="row" mt={2}>
                                <FormControlLabel value="onEvery" control={<CustomRadio />} label="On Every" sx={{ mr: 4 }} />
                                <Box className="inputFields">
                                    <Grid2 display="flex" mt={1}>
                                        <Select
                                            value={periodicity?.week}
                                            onChange={(e) => setPeriodicity({ ...periodicity, week: e.target.value })}
                                            sx={{
                                                width: "150px",
                                                borderTopRightRadius: "0 !important",
                                                borderBottomRightRadius: "0 !important",
                                            }}
                                            disabled={periodicity?.selectedOption !== "onEvery"}
                                        >
                                            {["First", "Second", "Third", "Fourth", "Fifth"].map((w) => (
                                                <MenuItem key={w} value={w}>
                                                    {" "}
                                                    {w}{" "}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <Select
                                            value={periodicity?.weekday}
                                            onChange={(e) => setPeriodicity({ ...periodicity, weekday: e.target.value })}
                                            sx={{
                                                width: "150px",
                                                borderTopLeftRadius: "0 !important",
                                                borderBottomLeftRadius: "0 !important",
                                            }}
                                            disabled={periodicity?.selectedOption !== "onEvery"}
                                        >
                                            {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
                                                (day) => (
                                                    <MenuItem key={day} value={day}>
                                                        {" "}
                                                        {day}{" "}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                    </Grid2>
                                </Box>
                            </Grid2>
                            {periodicity?.selectedOption === "onDay" && periodicity?.onDay && (
                                <Box mt={2}>
                                    <Typography style={{ color: "#4C8B92" }}>
                                        {" "}
                                        Occurs on every {periodicity?.onDay}
                                        {getDaySuffix(periodicity?.onDay)} day of every month.
                                    </Typography>
                                </Box>
                            )}
                            {periodicity?.selectedOption === "onEvery" && periodicity?.week && periodicity?.weekday && (
                                <Box mt={2}>
                                    <Typography style={{ color: "#4C8B92" }}>
                                        {" "}
                                        Occurs on {periodicity?.week} {periodicity?.weekday} of every month.{" "}
                                    </Typography>
                                </Box>
                            )}
                        </RadioGroup>
                    </Box>
                </Box>
            )}
            {periodicity?.occurence === "CUSTOM" && (
                <Box>
                    <Typography>Repeats Every</Typography>
                    <Grid2 container spacing={2} alignItems="center">
                        <Grid2 size={3}>
                            <TextField
                                type="number"
                                className="inputFields"
                                value={periodicity?.specificDay}
                                onChange={(e) => setPeriodicity({ ...periodicity, specificDay: e.target.value })}
                                fullWidth
                            />
                        </Grid2>
                        <Grid2 size={2}>
                            <Typography sx={{ fontSize: "14px !important" }}>Day</Typography>
                        </Grid2>
                    </Grid2>
                    {periodicity?.specificDay && (
                        <Box mt={2}>
                            <Typography style={{ color: "#4C8B92" }}>
                                {" "}
                                Occurs on every {periodicity?.specificDay}
                                {getDaySuffix(periodicity?.specificDay)} day{" "}
                            </Typography>
                        </Box>
                    )}
                </Box>
            )}
        </>
    );
};

export default Periodicity;
