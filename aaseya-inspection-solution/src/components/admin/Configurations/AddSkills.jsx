import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Box,
    Typography,
    useTheme,
    Button,
    Grid2,
    TextField,
    Divider,
    Chip,
    MenuItem,
    Select,
    ListItemText,
    Popover,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import CustomCheckbox from "../../global/CustomCheckbox";
import axios from "axios";
import "../adminStyles.css";
import { DataGrid } from "@mui/x-data-grid";
import CustomPagination from "../../global/TablePagination";
import CloseIcon from "@mui/icons-material/Close";
import { SnackContext } from "../../global/SnackProvider";
import Loader from "../../global/Loader";

const AddSkills = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const skillId = location.state?.skillId;
    const [users, setUsers] = useState([]);
    const [inspectionTypes, setInspectionTypes] = useState([]);
    const [selectedInspectionTypes, setSelectedInspectionTypes] = useState([]);
    const [isShowSelectedInspectionTypes, setIsShowSelectedInspectionTypes] = useState(false);
    const inspectionTypeAnchorRef = useRef(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [skillName, setSkillName] = useState("");
    const { snack, setSnack } = useContext(SnackContext);
    const [isSubmitSkill, setIsSubmitSkill] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            field: "userName",
            headerName: "Name",
            flex: 0.3,
        },
        {
            field: "role",
            headerName: "Role",
            flex: 0.3,
        },
        {
            field: "skills",
            headerName: "Skills",
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        {params.row?.skills?.map((skill) => (
                            <Chip sx={{ borderRadius: "4px", mr: 1, height: "26px" }} key={skill} label={skill} />
                        ))}
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        const getInspectionTypes = async () => {
            const response = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/getAllInspectionTypes`,
            });
            setInspectionTypes(response?.data);
        };
        getInspectionTypes();
    }, []);

    useEffect(() => {
        try {
            setLoading(true);
            const getUsers = async () => {
                const response = await axios({
                    method: "get",
                    url: `${import.meta.env.VITE_BASE_URL}/getAllUsersWithSkills?page=${page - 1}&size=${pageSize}`,
                });
                setUsers(response?.data?.content);
                setPage(response?.data?.number + 1);
                setPageSize(response?.data?.size);
                setTotalPages(response?.data?.totalPages);
                setTotalRecords(response?.data?.totalElements);
                setLoading(false);
            };
            getUsers();
        } catch (error) {
            console.log(error);
        }
    }, [page, pageSize]);

    useEffect(() => {
        const getSkillDetails = async () => {
            const response = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/getSkillDetails/${skillId}`,
            });
            setSkillName(response?.data?.name);
            setSelectedInspectionTypes(response?.data?.inspectionTypeDTO?.map((inspectionType) => inspectionType?.ins_type_id));
            setSelectedUsers(response?.data?.usersDTO?.map((user) => user?.userID));
        };
        if (skillId) {
            getSkillDetails();
        }
    }, [skillId]);

    const submitSkillDetails = async () => {
        setIsSubmitSkill(true);
        try {
            const response = await axios({
                method: "post",
                url: `${import.meta.env.VITE_BASE_URL}/AddEditSkill`,
                data: {
                    skillId: skillId,
                    skillName: skillName,
                    inspectionTypeIds: selectedInspectionTypes,
                    userIds: selectedUsers,
                    action: skillId ? "edit" : "add",
                },
            });
            if (response?.data?.status?.toUpperCase() === "SUCCESS") {
                setSnack({ open: true, message: response?.data?.message, severity: "success" });
                navigate(`/configurations/skills`);
            } else {
                setSnack({ open: true, message: response?.data?.message, severity: "error" });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitSkill(false);
        }
    };

    return (
        <>
            <Box
                sx={{
                    borderRadius: "20px",
                    background: `${theme.palette.colors[2]} 0% 0% no-repeat padding-box`,
                    my: 2,
                    mr: 2,
                    p: 2.5,
                    boxShadow: `inset 0px 0px 6px ${theme.palette.colors[3]}`,
                    opacity: 1,
                }}
            >
                <Button
                    sx={{
                        color: theme.palette.colors[21],
                        fontSize: "14px",
                        fontWeight: 600,
                    }}
                    startIcon={<KeyboardBackspaceOutlinedIcon />}
                    onClick={() => navigate(-1)}
                >
                    Back
                </Button>
                <Box
                    sx={{
                        background: `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                        borderRadius: "10px",
                        opacity: 1,
                    }}
                >
                    <Box sx={{ py: 2, px: 2.5 }}>
                        <Typography variant="h4" fontWeight={600}>
                            Add Skill
                        </Typography>
                    </Box>
                    <Divider />
                    <Box
                        sx={{
                            py: 2,
                            px: 2.5,
                            "& .MuiTypography-root": {
                                fontSize: "12px",
                                color: theme.palette.colors[21],
                            },
                        }}
                    >
                        {isSubmitSkill && <Loader />}
                        <Grid2 container spacing={3}>
                            <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
                                <Typography>
                                    Skills<span style={{ color: "red" }}>*</span>
                                </Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    value={skillName}
                                    className="inputFields"
                                    onChange={(e) => setSkillName(e.target.value)}
                                    sx={{ height: "100%" }}
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 6, lg: 4 }} className="inputFields">
                                <Typography>
                                    Inspection Type<span style={{ color: "red" }}>*</span>
                                </Typography>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    fullWidth
                                    value={selectedInspectionTypes}
                                    onChange={(e) => {
                                        setIsShowSelectedInspectionTypes(false);
                                        setSelectedInspectionTypes(
                                            typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value
                                        );
                                    }}
                                    endAdornment={
                                        <>
                                            {selectedInspectionTypes?.length > 0 && (
                                                <CloseIcon
                                                    sx={{
                                                        color: "#5F6368",
                                                        cursor: "pointer",
                                                        fontSize: "15px",
                                                        mr: 1,
                                                    }}
                                                    onClick={() => setSelectedInspectionTypes([])}
                                                />
                                            )}
                                        </>
                                    }
                                    renderValue={(selected) => (
                                        <Box sx={{ display: "flex" }}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    gap: 0.5,
                                                    overflow: "hidden",
                                                    " .MuiChip-root": {
                                                        height: "26px",
                                                        borderRadius: "4px",
                                                    },
                                                }}
                                            >
                                                {selected?.map((value) => (
                                                    <Chip
                                                        key={value}
                                                        label={
                                                            inspectionTypes?.find(
                                                                (inspectionType) => inspectionType?.id === value
                                                            )?.name
                                                        }
                                                    />
                                                ))}
                                            </Box>
                                            {selected.length > 2 && (
                                                <Button
                                                    ref={inspectionTypeAnchorRef}
                                                    sx={{
                                                        color: `${theme.palette.colors[11]}`,
                                                        size: "small",
                                                        height: "26px",
                                                    }}
                                                    onMouseLeave={() => {
                                                        setIsShowSelectedInspectionTypes(false);
                                                    }}
                                                    onMouseEnter={(event) => {
                                                        setIsShowSelectedInspectionTypes(true);
                                                    }}
                                                >
                                                    +{selected.length - 2} more
                                                </Button>
                                            )}
                                        </Box>
                                    )}
                                    sx={{
                                        height: "40px",
                                        width: "100%",
                                    }}
                                >
                                    {inspectionTypes?.map((inspectionType) => (
                                        <MenuItem key={inspectionType?.id} value={inspectionType?.id}>
                                            <CustomCheckbox checked={selectedInspectionTypes?.includes(inspectionType?.id)} />
                                            <ListItemText primary={inspectionType?.name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid2>
                            {isShowSelectedInspectionTypes && selectedInspectionTypes?.length > 2 && (
                                <Popover
                                    sx={{
                                        pointerEvents: "none",
                                        boxShadow: "0px",
                                        "& .MuiPaper-root": {
                                            boxShadow: "none",
                                        },
                                    }}
                                    open={isShowSelectedInspectionTypes}
                                    anchorReference="anchorPosition"
                                    anchorPosition={{
                                        top: inspectionTypeAnchorRef.current?.getBoundingClientRect().bottom + 10,
                                        left: inspectionTypeAnchorRef.current?.getBoundingClientRect().left - 100,
                                    }}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "left",
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "left",
                                    }}
                                    disableRestoreFocus
                                >
                                    <Box
                                        sx={{
                                            p: 1,
                                            " .MuiChip-root": {
                                                height: "26px",
                                                borderRadius: "4px",
                                            },
                                            width: "270px",
                                            backgroundColor: "#F2F6F6",
                                            display: "flex",
                                            gap: 0.5,
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        {selectedInspectionTypes?.map((inspectionType) => (
                                            <Chip
                                                key={inspectionType}
                                                label={inspectionTypes?.find((value) => value?.id === inspectionType)?.name}
                                            />
                                        ))}
                                    </Box>
                                </Popover>
                            )}
                        </Grid2>
                        <Divider sx={{ my: 2 }} />
                        <Typography sx={{ fontSize: "14px", color: theme.palette.colors[21], mb: 1 }}>User</Typography>
                        <Box
                            sx={{
                                height: "400px",
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
                                rows={users}
                                checkboxSelection
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
                                getRowId={(row) => row.userID}
                                disableRowSelectionOnClick
                                rowSelectionModel={selectedUsers}
                                onRowSelectionModelChange={(selectionModel) => setSelectedUsers(selectionModel)}
                            />
                        </Box>
                        <Button
                            mt={2}
                            sx={{
                                backgroundColor: theme.palette.colors[11],
                                textTransform: "none",
                                borderRadius: "20px",
                                width: "100px",
                                height: "40px",
                                display: "flex",
                                marginLeft: "auto",
                                "&:hover": {
                                    backgroundColor: theme.palette.colors[11],
                                },
                            }}
                            onClick={submitSkillDetails}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default AddSkills;