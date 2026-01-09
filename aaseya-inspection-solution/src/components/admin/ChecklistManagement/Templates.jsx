import { Box, Button, Divider, IconButton, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import CustomPagination from '../../global/TablePagination';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CustomCheckbox from '../../global/CustomCheckbox';
import axios from 'axios';

const Templates = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const [ templates, setTemplates ] = useState([])
    const [ page, setPage ] = useState(1)
    const [ pageSize, setPageSize ] = useState(10)
    const [ totalPages, setTotalPages ] = useState(0)
    const [ totalRecords, setTotalRecords ] = useState(0)
    const [ loading, setLoading ] = useState(false)

    const columns = [
        {
            field: 'templateName',
            headerName: 'Template',
            flex: 1,
        },
        {
            field: 'inspectionTypes',
            headerName: 'Inspection Type',
            valueGetter: (value) => value[0]?.name,
            flex: 1,
        },
        {
            field: 'action',
            headerName: 'Actions',
            flex: 0.3,
            renderCell: (params) => {
                return <Button sx={{ color: `${theme.palette.colors[11]}` }} onClick={() => {navigate(`/checklist-management/template/add`, { state: { templateId: params.row?.templateId } })}}>Edit</Button>
            }
        },
    ]

    useEffect(() => {
        try {
            setLoading(true)
            const getTemplates = async () => {
                const response = await axios({
                    method: 'get',
                    url: `${import.meta.env.VITE_BASE_URL}/getalltemplatesandinspectiontypes?page=${page - 1}&size=${pageSize}`
                })
                setTemplates(response?.data?.content)
                setPage(response?.data?.number + 1)
                setPageSize(response?.data?.size)
                setTotalPages(response?.data?.totalPages)
                setTotalRecords(response?.data?.totalElements)
                setLoading(false)
            }
            getTemplates()
        } catch(error) {
            console.log(error)
        }
    }, [page, pageSize])

    return (
        <Box sx={{
            borderRadius: '20px',
            background: `${theme.palette.colors[2]} 0% 0% no-repeat padding-box`,
            my: 2,
            mr: 2,
            p: 2.5,
            boxShadow: `inset 0px 0px 6px ${theme.palette.colors[3]}`,
            opacity: 1,
        }}>
            <Button
                sx={{
                    color: theme.palette.colors[21],
                    fontSize: '14px',
                    fontWeight: 600,
                }}
                startIcon={<KeyboardBackspaceOutlinedIcon />}
                onClick={() => navigate(-1)}
            >Back</Button>
            <Box 
                sx={{
                    background: `${theme.palette.colors[1]} 0% 0% no-repeat padding-box`,
                    borderRadius: '10px',
                    opacity: 1,
                }}
            >
                <Box 
                    sx={{ 
                        py: 2, 
                        px: 2.5, 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Typography variant='h4' fontWeight={600}>Template</Typography>
                    <Box sx={{
                        display: 'flex',
                        gap: 3
                    }}>
                        <IconButton sx={{ 
                            boxShadow: `0px 1px 6px ${theme.palette.colors[3]}`,
                            borderRadius: '50%',
                            opacity: 1,
                            width: '40px',
                            height: '40px'
                        }}>
                            <SearchIcon sx={{color: `${theme.palette.colors[8]}`}} />
                        </IconButton>
                        <Button onClick={() => navigate('/checklist-management/template/add')}
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={{
                                backgroundColor: `${theme.palette.colors[11]}`,
                                color: '#ffffff',
                                borderRadius: '20px',
                                width: '150px',
                                height: '40px',
                                '&:hover': {
                                    backgroundColor: theme.palette.colors[11],
                                },
                            }}
                        >
                            Add New
                        </Button>
                    </Box>
                </Box>
                <Divider />
                <Box
                    sx={{
                        py: 2,
                        px: 2.5,
                        height: '400px',
                        '.MuiDataGrid-columnHeader': {
                            backgroundColor: `${theme.palette.colors[18]}`
                        },
                        '.MuiDataGrid-root': {
                            borderRadius: '10px 10px 0px 0px',
                            border: '0px !important',
                            borderColor: 'white !important',
                            '--DataGrid-rowBorderColor': '#ffffff'
                        },
                        '.MuiDataGrid-main': {
                            borderRadius: '10px 10px 0px 0px',
                        },
                        '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
                            borderBottom: '0px !important',
                            borderTop: '0px !important',
                        },
                        ' .MuiDataGrid-row': {
                            border: `1px solid ${theme.palette.colors[22]}`,
                            borderRadius: '6px',
                            my: '1px',
                        },
                        ' .MuiDataGrid-overlay': {
                            border: `1px solid ${theme.palette.colors[22]}`,
                            borderRadius: '6px',
                            my: '1px',
                        },
                        '.MuiDataGrid-columnHeaders .MuiDataGrid-scrollbarFiller': {
                            backgroundColor: `${theme.palette.colors[18]}`
                        },
                        ' .MuiDataGrid-scrollbar': {
                            display: 'none'
                        },
                        '.MuiDataGrid-footerContainer': {
                            borderTop: '0px'
                        }
                    }}
                >
                    <DataGrid
                        columns={columns}
                        rows={templates}
                        loading={loading}
                        getRowId={row => row?.templateId}
                        slots={{
                            pagination:() => <CustomPagination page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize} totalPages={totalPages} totalRecords={totalRecords} />,
                        }}
                        disableRowSelectionOnClick
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default Templates
