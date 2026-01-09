import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, useTheme, Button, Grid2, TextField, Divider } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import AddActionsOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import CustomCheckbox from '../../global/CustomCheckbox';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import CustomPagination from '../../global/TablePagination';
import '../adminStyles.css'
import { SnackContext } from "../../global/SnackProvider";
import Loader from "../../global/Loader";

const AddNewCategory = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation()
    const categoryId = location.state?.categoryId
    const [ weightage, setWeightage ] = useState("")
    const [ categoryName, setCategoryName ] = useState("")
    const [ threshold, setThreshold ] = useState('')
    const [ checklisItems, setChceklistItems ] = useState([])
    const [ selectedChecklistItems, setSelectedChecklistItems ] = useState([])
    const [ page, setPage ] = useState(1)
    const [ pageSize, setPageSize ] = useState(10)
    const [ totalPages, setTotalPages ] = useState(0)
    const [ totalRecords, setTotalRecords ] = useState(0)
    const [ loading, setLoading ] = useState(false)
    const [ isSubmitCategory, setIsSubmitCategory ] = useState(false)
    const { snack, setSnack } = useContext(SnackContext)

    const columns = [
        {
            field: 'checklist_name',
            headerName: 'Checklist Item',
            flex: 1
        },
        {
            field: 'answer_type',
            headerName: 'Answer Type',
            flex: 0.3
        },
        {
            field: 'action',
            headerName: 'Actions',
            flex: 0.2,
            renderCell: (params) => {
                return <Button sx={{ color: `${theme.palette.colors[11]}` }} onClick={() => {navigate(`/checklist-management/items/add`, { state: { checklistItemId: params.row?.checklist_id } })}}>Edit</Button>
            }
        },
    ];

    useEffect(() => {
        try {
            setLoading(true);
            const getChecklistItems = async () => {
                const response = await axios({
                    method: "get",
                    url: `${import.meta.env.VITE_BASE_URL}/getAllCheckListitems?page=${page - 1}&size=${pageSize}`,
                });
                setChceklistItems(response?.data?.content);
                setPage(response?.data?.number + 1);
                setPageSize(response?.data?.size);
                setTotalPages(response?.data?.totalPages);
                setTotalRecords(response?.data?.totalElements);
                setLoading(false);
            };
            getChecklistItems();
        } catch (error) {
            console.log(error);
        }
    }, [page, pageSize]);

    useEffect(() => {
        const getCategoryDetails = async () => {
            const response = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_BASE_URL}/getChecklistCategory/${categoryId}`
            })
            setCategoryName(response?.data?.checklist_category_name)
            setWeightage(response?.data?.category_weightage_local)
            setThreshold(response?.data?.category_threshold_local)
            setSelectedChecklistItems(response?.data?.checklist_items?.map(checklistItem => checklistItem?.checklist_id))
        }
        if(categoryId) {
            getCategoryDetails()
        }
    }, [ categoryId ])

    const addCategory = async () => {
        setIsSubmitCategory(true)
        try {
            const response = await axios({
                method: "post",
                url: `${import.meta.env.VITE_BASE_URL}/addChecklistCategory`,
                data: {
                    checklist_category_name: categoryName,
                    category_threshold_local: threshold,
                    category_weightage_local: weightage,
                    checklist_ids: selectedChecklistItems,
                },
            });
            if(response?.data?.status?.toUpperCase() === 'SUCCESS') {
                setSnack({ open: true, message: response?.data?.message, severity: 'success' })
                navigate(`/checklist-management/category`)
            } else {
                setSnack({ open: true, message: response?.data?.message, severity: 'error' })
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        } finally {
            setIsSubmitCategory(false)
        }
    }

    const updateCategory = async () => {
        setIsSubmitCategory(true)
        try {
            const response = await axios({
                method: 'put',
                url: `${import.meta.env.VITE_BASE_URL}/updateChecklistCategory`,
                data: {
                    checklist_cat_id: categoryId,
                    checklist_category_name: categoryName,
                    category_threshold_local: threshold,
                    category_weightage_local: weightage,
                    checklist_ids: selectedChecklistItems
                },
            });
            if(response?.data?.status?.toUpperCase() === 'SUCCESS') {
                setSnack({ open: true, message: response?.data?.message, severity: 'success' })
                navigate(`/checklist-management/category`)
            } else {
                setSnack({ open: true, message: response?.data?.message, severity: 'error' })
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        } finally {
            setIsSubmitCategory(false)
        }
    }

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
                            {categoryId ? "Edit" : "Add"} Category
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
                        {isSubmitCategory && <Loader />}
                        <Grid2 container spacing={3} className="inputFields">
                            <Grid2 size={4}>
                                <Typography>
                                    Category Name<span style={{ color: "red" }}>*</span>
                                </Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                />
                            </Grid2>
                            <Grid2 size={4}>
                                <Typography>
                                    Weightage<span style={{ color: "red" }}>*</span>
                                </Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    value={weightage}
                                    onChange={(e) => setWeightage(e.target.value)}
                                />
                            </Grid2>
                            <Grid2 size={4}>
                                <Typography>
                                    Threshold<span style={{ color: "red" }}>*</span>
                                </Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    value={threshold}
                                    className="newCaseFields"
                                    onChange={(e) => setThreshold(e.target.value)}
                                />
                            </Grid2>
                        </Grid2>
                        <Divider sx={{ my: 2 }} />
                        <Typography sx={{ fontSize: "14px", color: theme.palette.colors[21], mb: 1 }}>Checklist Item</Typography>
                        <Box
                            className="addButtonContainer"
                            onClick={() => {
                                navigate(`/checklist-management/items/add`);
                            }}
                        >
                            <AddActionsOutlinedIcon sx={{ mr: 1 }} />
                            <Typography className="typographyFontWeight">Add Checklist Item</Typography>
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
                                rows={checklisItems}
                                loading={loading}
                                checkboxSelection
                                getRowId={(row) => row?.checklist_id}
                                rowSelectionModel={selectedChecklistItems}
                                onRowSelectionModelChange={(selectionModel) => setSelectedChecklistItems(selectionModel)}
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
                            onClick={() => {
                                categoryId ? updateCategory() : addCategory();
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
};



export default AddNewCategory;