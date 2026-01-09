import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, useTheme, Button, Grid2, TextField, Divider, Chip } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import AddActionsOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import CustomCheckbox from "../../global/CustomCheckbox";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import CustomPagination from "../../global/TablePagination";
import "../adminStyles.css";
import { SnackContext } from "../../global/SnackProvider";
import Loader from "../../global/Loader";

const AddGroup = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const groupId = location.state?.groupId;
    const [groupName, setGroupName] = useState("");
    const [description, setDescription] = useState("");
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isSubmitUser, setIsSubmitUser] = useState(false);
    const { snack, setSnack } = useContext(SnackContext);

    const columns = [
        {
            field: "userName",
            headerName: "Name",
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
        try {
            setLoading(true);
            const getInspectors = async () => {
                const response = await axios({
                    method: "get",
                    url: `${import.meta.env.VITE_BASE_URL}/getAllUsersWithSkills?page=${
                        page - 1
                    }&size=${pageSize}&role=Inspector`,
                });
                setUsers(response?.data?.content);
                setPage(response?.data?.number + 1);
                setPageSize(response?.data?.size);
                setTotalPages(response?.data?.totalPages);
                setTotalRecords(response?.data?.totalElements);
                setLoading(false);
            };
            getInspectors();
        } catch (error) {
            console.log(error);
        }
    }, [page, pageSize]);

    useEffect(() => {
        const getGroupDetails = async () => {
            const response = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/getUserGroupForEditById/${groupId}`,
            });
            setGroupName(response?.data?.groupName);
            setDescription(response?.data?.description);
            setSelectedUsers(response?.data?.users?.map((user) => user?.userID));
        };
        if (groupId) {
            getGroupDetails();
        }
    }, [groupId]);

    const addUpdateUserGroup = async () => {
        setIsSubmitUser(true);
        try {
            const response = await axios({
                method: "post",
                url: `${import.meta.env.VITE_BASE_URL}/AddEditUserGroup`,
                data: {
                    action: groupId ? "edit" : "add",
                    groupId: groupId,
                    groupName: groupName,
                    description: description,
                    userIds: selectedUsers,
                },
            });
            if (response?.data?.status?.toUpperCase() === "SUCCESS") {
                setSnack({ open: true, message: response?.data?.message, severity: "success" });
                navigate(`/user-management/group`);
            } else {
                setSnack({ open: true, message: response?.data?.message, severity: "error" });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
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
                        {groupId ? "Edit" : "Add"} User Group
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
                    {isSubmitUser && <Loader />}
                    <Grid2 container spacing={3} className="inputFields">
                        <Grid2 size={4}>
                            <Typography>
                                User Group Name<span style={{ color: "red" }}>*</span>
                            </Typography>
                            <TextField size="small" fullWidth value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                        </Grid2>
                        <Grid2 size={8}>
                            <Typography>Description</Typography>
                            <TextField
                                size="small"
                                fullWidth
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Grid2>
                    </Grid2>
                    <Divider sx={{ my: 2 }} />
                    <Typography sx={{ fontSize: "14px", color: theme.palette.colors[21], mb: 1 }}>Users</Typography>
                    <Box
                        className="addButtonContainer"
                        onClick={() => {
                            navigate(`/user-management/add`);
                        }}
                    >
                        <AddActionsOutlinedIcon sx={{ mr: 1 }} />
                        <Typography className="typographyFontWeight">Add Users</Typography>
                    </Box>
                    <Box
                        sx={{
                            py: 2,
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
                            loading={loading}
                            checkboxSelection
                            getRowId={(row) => row?.userID}
                            rowSelectionModel={selectedUsers}
                            onRowSelectionModelChange={(selectionModel) => setSelectedUsers(selectionModel)}
                            disableRowSelectionOnClick
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
                        onClick={addUpdateUserGroup}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default AddGroup;
