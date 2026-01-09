import { Box, Button, FormControl, Grid2, MenuItem, Popper, Select, Typography, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { DataGrid } from "@mui/x-data-grid";
import CustomPagination from "../../global/TablePagination";
import CustomCheckbox from "../../global/CustomCheckbox";
import "../reportStyles.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const GeneralInquiry = () => {
    const theme = useTheme();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    const [generalInquiry, setGeneralInquiry] = useState([]);
    const [isShowFilters, setIsShowFilters] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [filterData, setFilterData] = useState({
        entityName: "",
        status: "",
        inspectedBy: "",
        inspectionSource: "",
        inspectionStartDate: null,
        inspectionEndDate: null,
        dueDateStart: null,
        dueDateEnd: null,
    });
    const [entityNames, setEntityNames] = useState([]);
    const [inspectors, setInspectors] = useState([]);

    const columns = [
        {
            field: "Case_ID",
            headerName: "Case ID",
            flex: 1,
            renderCell: (params) => (
                <Link
                    to="/reports/case-details"
                    state={{ inspectionID: params.row?.Case_ID }}
                    sx={{ color: theme.palette.colors[11] }}
                >
                    {params.row?.Case_ID}
                </Link>
            ),
        },
        {
            field: "Entity_Name",
            headerName: "Entity Name",
            flex: 1,
        },
        {
            field: "location",
            headerName: "Location",
            flex: 1,
        },
        {
            field: "Inspection_Type",
            headerName: "Inspection Type",
            flex: 1,
        },
        {
            field: "Inspection_Date",
            headerName: "Inspection Date",
            flex: 1,
        },
        {
            field: "Inspected_By",
            headerName: "Inspected By",
            flex: 1,
        },
        {
            field: "Approved_By",
            headerName: "Approved By",
            flex: 1,
        },
        {
            field: "status",
            headerName: "Status",
            valueGetter: (value) => capitalizeWords(value),
            flex: 1,
        },
    ];

    const capitalizeWords = (status) => {
        const words = status?.split(/[\s_]+/);
        return words?.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [entityNamesResponse, inspectorsResponse] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_BASE_URL}/getEntityNames`),
                    axios.get(`${import.meta.env.VITE_BASE_URL}/getAllInspectorNames?role=Inspector`),
                ]);
                setEntityNames(entityNamesResponse?.data);
                setInspectors(inspectorsResponse?.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        getCases();
    }, [page, pageSize]);

    const getCases = async () => {
        try {
            setLoading(true);

            let url = `${import.meta.env.VITE_BASE_URL}/getAllCasesBasedOnFilters?page=${page - 1}&size=${pageSize}`;
            if (filterData?.entityName) {
                url = `${url}&entityid=${filterData?.entityName}`;
            }
            if (filterData?.status) {
                url = `${url}&status=${filterData?.status}`;
            }
            if (filterData?.inspectedBy) {
                url = `${url}&inspectorID=${filterData?.inspectedBy}`;
            }
            if (filterData?.inspectionSource) {
                url = `${url}&inspector_source=${filterData?.inspectionSource}`;
            }
            if (filterData?.inspectionStartDate) {
                url = `${url}&start_date=${dayjs(filterData?.inspectionStartDate).format("YYYY-MM-DD")}`;
            }
            if (filterData?.inspectionEndDate) {
                url = `${url}&end_date=${dayjs(filterData?.inspectionEndDate).format("YYYY-MM-DD")}`;
            }
            if (filterData?.dueDateStart) {
                url = `${url}&dueStartDate=${dayjs(filterData?.dueDateStart).format("YYYY-MM-DD")}`;
            }
            if (filterData?.dueDateEnd) {
                url = `${url}&dueEndDate=${dayjs(filterData?.dueDateEnd).format("YYYY-MM-DD")}`;
            }
            const response = await axios.get(`${url}`);
            setGeneralInquiry(response?.data?.content);
            setPage(response?.data?.number + 1);
            setPageSize(response?.data?.size);
            setTotalPages(response?.data?.totalPages);
            setTotalRecords(response?.data?.totalElements);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setIsShowFilters(!isShowFilters);
    };

    return (
        <Box
            sx={{
                background: `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                borderRadius: `0px 10px 10px 10px`,
                opacity: 1,
                height: "550px",
            }}
        >
            <Grid2 container justifyContent="flex-end" columnGap={2} sx={{ px: 2.5, pt: 2 }}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        background: `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                        boxShadow: `0px 1px 4px ${theme.palette.colors[3]}`,
                        borderRadius: "4px",
                        opacity: 1,
                        height: "32px",
                        width: "32px",
                        cursor: "pointer",
                    }}
                >
                    <FileDownloadOutlinedIcon sx={{ color: `${theme.palette.colors[8]}` }} />
                </Box>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        background: `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                        boxShadow: `0px 1px 4px ${theme.palette.colors[3]}`,
                        borderRadius: "4px",
                        opacity: 1,
                        height: "32px",
                        width: "32px",
                        cursor: "pointer",
                    }}
                    onClick={handleClick}
                >
                    <FilterAltOutlinedIcon sx={{ color: `${theme.palette.colors[8]}` }} />
                </Box>
            </Grid2>
            <Popper
                sx={{
                    zIndex: 9,
                    background: "#FFFFFF 0% 0% no-repeat padding-box",
                    boxShadow: "0px 3px 15px #00000029",
                    borderRadius: "4px",
                    marginTop: "2px !important",
                }}
                open={isShowFilters}
                anchorEl={anchorEl}
                placement={"bottom-end"}
            >
                <Grid2 container sx={{ p: 3 }} spacing={3}>
                    <Grid2 size={12}>
                        <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>Filter By</Typography>
                    </Grid2>
                    <Grid2 size={3.5} sx={{ borderRight: "1px solid #DCDCDC", pr: 3 }}>
                        <Typography sx={{ fontSize: "16px", fontWeight: 500, mb: 2 }}>Entity Details</Typography>
                        <Typography>Entity Name</Typography>
                        <FormControl fullWidth className="inputFields">
                            <Select
                                value={filterData?.entityName}
                                onChange={(e) =>
                                    setFilterData({
                                        ...filterData,
                                        entityName: e.target.value,
                                    })
                                }
                                sx={{
                                    "& .MuiSelect-select": {
                                        padding: "9px 0 9px 20px",
                                    },
                                    mb: 3,
                                }}
                            >
                                <MenuItem value={""} disabled>
                                    Select
                                </MenuItem>
                                {entityNames?.map((entity) => {
                                    return (
                                        <MenuItem key={entity?.entityid} value={entity?.entityid}>
                                            {entity?.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <Typography sx={{ fontSize: "16px", fontWeight: 500, mb: 2 }}>Status</Typography>
                        <Typography>Status</Typography>
                        <FormControl fullWidth className="inputFields">
                            <Select
                                value={filterData?.status}
                                onChange={(e) =>
                                    setFilterData({
                                        ...filterData,
                                        status: e.target.value,
                                    })
                                }
                                sx={{
                                    "& .MuiSelect-select": {
                                        padding: "9px 0 9px 20px",
                                    },
                                }}
                            >
                                <MenuItem value={""} disabled>
                                    Select
                                </MenuItem>
                                <MenuItem value="new">New</MenuItem>
                                <MenuItem value="pending">Pending</MenuItem>
                                <MenuItem value="in_progress">In Progress</MenuItem>
                                <MenuItem value="pending_review">Pending Review</MenuItem>
                                <MenuItem value="under_review">Under Review</MenuItem>
                                <MenuItem value="pending_approval">Pending Approval</MenuItem>
                                <MenuItem value="under_approval">Under Approval</MenuItem>
                                <MenuItem value="reopened">Re Opened</MenuItem>
                                <MenuItem value="completed">Completed</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid2>
                    <Grid2 size={3.5} sx={{ borderRight: "1px solid #DCDCDC", pr: 3 }}>
                        <Typography sx={{ fontSize: "16px", fontWeight: 500, mb: 2 }}>Inspection Details</Typography>
                        <Typography>Inspected By</Typography>
                        <FormControl fullWidth className="inputFields">
                            <Select
                                value={filterData?.inspectedBy}
                                onChange={(e) =>
                                    setFilterData({
                                        ...filterData,
                                        inspectedBy: e.target.value,
                                    })
                                }
                                sx={{
                                    "& .MuiSelect-select": {
                                        padding: "9px 0 9px 20px",
                                    },
                                    mb: 3,
                                }}
                            >
                                <MenuItem value={""} disabled>
                                    Select
                                </MenuItem>
                                {inspectors?.map((inspector) => {
                                    return (
                                        <MenuItem key={inspector?.userID} value={inspector?.userid}>
                                            {inspector?.userName}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <Typography>Inspection Source</Typography>
                        <FormControl fullWidth className="inputFields">
                            <Select
                                value={filterData?.inspectionSource}
                                onChange={(e) =>
                                    setFilterData({
                                        ...filterData,
                                        inspectionSource: e.target.value,
                                    })
                                }
                                sx={{
                                    "& .MuiSelect-select": {
                                        padding: "9px 0 9px 20px",
                                    },
                                }}
                            >
                                <MenuItem value={""} disabled>
                                    Select
                                </MenuItem>
                                <MenuItem value="Adhoc">Adhoc</MenuItem>
                                <MenuItem value="Follow Up">Follow Up</MenuItem>
                                <MenuItem value="Re Inspection">Re Inspection</MenuItem>
                                <MenuItem value="Periodic">Periodic</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid2>
                    <Grid2 size={5}>
                        <Typography sx={{ fontSize: "16px", fontWeight: 500, mb: 2 }}>Date</Typography>
                        <Grid2 container spacing={3} sx={{ mb: 3 }}>
                            <Grid2 size={6}>
                                <Typography>Inspection Start Date</Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        className="inputFields"
                                        value={filterData?.inspectionStartDate}
                                        onChange={(value) =>
                                            setFilterData({
                                                ...filterData,
                                                inspectionStartDate: value,
                                            })
                                        }
                                        format="DD MMM YYYY"
                                        sx={{ width: "100%" }}
                                    />
                                </LocalizationProvider>
                            </Grid2>
                            <Grid2 size={6}>
                                <Typography>Inspection End Date</Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        className="inputFields"
                                        value={filterData?.inspectionEndDate}
                                        onChange={(value) =>
                                            setFilterData({
                                                ...filterData,
                                                inspectionEndDate: value,
                                            })
                                        }
                                        format="DD MMM YYYY"
                                        sx={{ width: "100%" }}
                                    />
                                </LocalizationProvider>
                            </Grid2>
                        </Grid2>
                        <Grid2 container spacing={3}>
                            <Grid2 size={6}>
                                <Typography>Due Date - Start</Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        className="inputFields"
                                        value={filterData?.dueDateStart}
                                        onChange={(value) =>
                                            setFilterData({
                                                ...filterData,
                                                dueDateStart: value,
                                            })
                                        }
                                        format="DD MMM YYYY"
                                        sx={{ width: "100%" }}
                                    />
                                </LocalizationProvider>
                            </Grid2>
                            <Grid2 size={6}>
                                <Typography>Due Date - End</Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        className="inputFields"
                                        value={filterData?.dueDateEnd}
                                        onChange={(value) =>
                                            setFilterData({
                                                ...filterData,
                                                dueDateEnd: value,
                                            })
                                        }
                                        format="DD MMM YYYY"
                                        sx={{ width: "100%" }}
                                    />
                                </LocalizationProvider>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Grid2>
                <Grid2 container alignItems="flex-end" justifyContent="flex-end" sx={{ pr: 3, pb: 3 }}>
                    <Button
                        sx={{
                            border: "1px solid #4C8B92",
                            textTransform: "none",
                            borderRadius: "20px",
                            color: "#4C8B92",
                            px: 4,
                            height: "40px",
                            mr: 3,
                            ":hover": {
                                border: "1px solid #4C8B92",
                            },
                        }}
                        onClick={() => {
                            setFilterData({
                                entityName: 0,
                                status: 0,
                                inspectedBy: 0,
                                inspectionSource: 0,
                                inspectionStartDate: null,
                                inspectionEndDate: null,
                                dueDateStart: null,
                                dueDateEnd: null,
                            });
                            setIsShowFilters(false);
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: theme.palette.colors[11],
                            textTransform: "none",
                            borderRadius: "20px",
                            px: 4,
                            height: "40px",
                            ":hover": {
                                backgroundColor: theme.palette.colors[11],
                            },
                        }}
                        onClick={() => {
                            setIsShowFilters(false);
                            setPage(1);
                            setPageSize(10);
                            getCases();
                        }}
                    >
                        Apply
                    </Button>
                </Grid2>
            </Popper>
            <Box
                sx={{
                    height: "400px",
                    py: 2,
                    px: 2.5,
                    ".MuiDataGrid-columnHeader": {
                        backgroundColor: `${theme.palette.colors[18]}`,
                    },
                    ".MuiDataGrid-root": {
                        borderRadius: "10px 10px 0px 0px",
                        border: "0px !important",
                        borderColor: "white !important",
                        "--DataGrid-rowBorderColor": "#ffffff",
                    },
                    ".MuiDataGrid-main": {
                        borderRadius: "10px 10px 0px 0px",
                    },
                    "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
                        borderBottom: "0px !important",
                        borderTop: "0px !important",
                    },
                    " .MuiDataGrid-row": {
                        border: `1px solid ${theme.palette.colors[22]}`,
                        borderRadius: "6px",
                        my: "1px",
                    },
                    " .MuiDataGrid-overlay": {
                        border: `1px solid ${theme.palette.colors[22]}`,
                        borderRadius: "6px",
                        my: "1px",
                    },
                    ".MuiDataGrid-columnHeaders .MuiDataGrid-scrollbarFiller": {
                        backgroundColor: `${theme.palette.colors[18]}`,
                    },
                    " .MuiDataGrid-scrollbar": {
                        display: "none",
                    },
                    ".MuiDataGrid-footerContainer": {
                        borderTop: "0px",
                    },
                    ".MuiDataGrid-selectedRowCount": {
                        display: "none",
                    },
                }}
            >
                <DataGrid
                    columns={columns}
                    rows={generalInquiry}
                    getRowId={(row) => row?.Case_ID}
                    loading={loading}
                    slots={{
                        baseCheckbox: CustomCheckbox,
                        pagination: () => (
                            <CustomPagination
                                page={page}
                                setPage={setPage}
                                pageSize={pageSize}
                                setPageSize={setPageSize}
                                totalPages={totalPages}
                                totalRecords={totalRecords}
                            />
                        ),
                    }}
                />
            </Box>
        </Box>
    );
};

export default GeneralInquiry;
