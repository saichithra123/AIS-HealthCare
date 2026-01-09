import { Box, Button, Divider, Grid2, MenuItem, Select, TextField, Typography, useTheme } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import CustomPagination from '../../global/TablePagination';
import { DataGrid } from '@mui/x-data-grid';
import AddActionsOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import CustomCheckbox from '../../global/CustomCheckbox';
import axios from 'axios';
import '../adminStyles.css'
import { SnackContext } from '../../global/SnackProvider';
import Loader from '../../global/Loader';

const AddTemplate = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const location = useLocation()
    const templateId = location.state?.templateId
    const [ templateName, setTemplateName ] = useState('')
    const [ selectedInspectionType, setSelectedInspectionType ] = useState('')
    const [ checklistCategories, setChecklistCategories ] = useState([])
    const [ inspectionTypes, setInspectionTypes ] = useState([])
    const [ selectedCategories, setSelectedCategories ] = useState([])
    const [ page, setPage ] = useState(1)
    const [ pageSize, setPageSize ] = useState(10)
    const [ totalPages, setTotalPages ] = useState(0)
    const [ totalRecords, setTotalRecords ] = useState(0)
    const [ loading, setLoading ] = useState(false)
    const [ isSubmitTemplate, setIsSubmitTemplate ] = useState(false)
    const { snack, setSnack } = useContext(SnackContext)

    const columns = [
        {
            field: 'checklistCategoryName',
            headerName: 'Category',
            flex: 1,
        },
        {
            field: 'isActive',
            headerName: 'Status',
            flex: 0.2,
            renderCell: (params) => (
                <>
                    {params.row?.isActive ? <>
                        <Box sx={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#03911A', mr: 1 }}></Box>Active
                    </> : <>
                        <Box sx={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#D54B4B', mr: 1 }}></Box>Inactive
                    </>}
                </>
            )
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 0.2,
            renderCell: (params) => {
                return <Button sx={{ color: `${theme.palette.colors[11]}` }} onClick={() => {navigate(`/checklist-management/category/add`, {state: { categoryId: params.row?.checklistCatId }})}}>Edit</Button>
            }
        },
    ]

    useEffect(() => {
        const getInspectionTypes = async () => {
            const response = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/getAllInspectionTypes`,
            });
            setInspectionTypes(response?.data)
        }
        getInspectionTypes()
    }, [])

    useEffect(() => {
        try {
            setLoading(true)
            const getChecklistCategories = async () => {
                const response = await axios({
                    method: 'get',
                    url: `${import.meta.env.VITE_BASE_URL}/getAllCheckListCategory?page=${page - 1}&size=${pageSize}`
                })
                setChecklistCategories(response?.data?.content)
                setPage(response?.data?.number + 1)
                setPageSize(response?.data?.size)
                setTotalPages(response?.data?.totalPages)
                setTotalRecords(response?.data?.totalElements)
                setLoading(false)
            }
            getChecklistCategories()
        } catch(error) {
            console.log(error)
        }
    }, [page, pageSize])

    useEffect(() => {
        const getTemplateDetails = async () => {
            const response = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_BASE_URL}/getTemplateDetails/${templateId}`
            })
            setTemplateName(response?.data?.templateName)
            setSelectedInspectionType(response?.data?.insTypeId)
            setSelectedCategories(response?.data?.categories?.map(category => category?.categoryId))
        }
        if(templateId) {
            getTemplateDetails()
        }
    }, [templateId])

    const saveChecklistTemplate = async () => {
        setIsSubmitTemplate(true)
        try {
            const response = await axios({
                method: 'post',
                url: `${import.meta.env.VITE_BASE_URL}/AddEditTemplate`,
                data: {
                    action: templateId ? 'edit' : 'add',
                    template_id: templateId,
                    template_name: templateName,
                    version: '1.0',
                    isActive: true,
                    ins_type_id: selectedInspectionType,
                    checklist_ids: selectedCategories
                }
            })
            if(response?.data?.status?.toUpperCase() === 'SUCCESS') {
                setSnack({ open: true, message: response?.data?.message, severity: 'success' })
                navigate(`/checklist-management/template`)
            } else {
                setSnack({ open: true, message: response?.data?.message, severity: 'error' })
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitTemplate(false)
        }
    }

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
                        {templateId ? "Edit" : "Add"} Template
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
                    {isSubmitTemplate && <Loader />}
                    <Grid2 container spacing={3} className="inputFields">
                        <Grid2 size={4}>
                            <Typography>
                                Template Name<span style={{ color: "red" }}>*</span>
                            </Typography>
                            <TextField
                                size="small"
                                fullWidth
                                value={templateName}
                                onChange={(e) => setTemplateName(e.target.value)}
                            />
                        </Grid2>
                        <Grid2 size={4}>
                            <Typography>
                                Inspection Type<span style={{ color: "red" }}>*</span>
                            </Typography>
                            <Select
                                className="newCaseFields"
                                fullWidth
                                sx={{
                                    height: "37px",
                                }}
                                value={selectedInspectionType}
                                onChange={(e) => setSelectedInspectionType(e.target.value)}
                            >
                                {inspectionTypes?.map((inspectionType) => {
                                    return (
                                        <MenuItem key={inspectionType?.id} value={inspectionType?.id}>
                                            {inspectionType?.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </Grid2>
                    </Grid2>
                    <Divider sx={{ my: 2 }} />
                    <Typography sx={{ fontSize: "14px", color: theme.palette.colors[21], mb: 1 }}>Category</Typography>
                    <Box
                        className="addButtonContainer"
                        onClick={() => {
                            navigate(`/checklist-management/category/add`);
                        }}
                    >
                        <AddActionsOutlinedIcon sx={{ mr: 1 }} />
                        <Typography className="typographyFontWeight">Add Category</Typography>
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
                            rows={checklistCategories}
                            loading={loading}
                            getRowId={(row) => row?.checklistCatId}
                            checkboxSelection
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
                            rowSelectionModel={selectedCategories}
                            onRowSelectionModelChange={(selectionModel) => setSelectedCategories(selectionModel)}
                            disableRowSelectionOnClick
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
                        onClick={saveChecklistTemplate}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default AddTemplate
