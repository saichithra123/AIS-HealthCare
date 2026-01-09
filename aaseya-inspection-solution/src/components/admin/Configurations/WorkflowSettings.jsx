import React, { useState } from 'react';
import { useTheme, Box, Typography, IconButton, Button, MenuItem, Select, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { DataGrid } from '@mui/x-data-grid';
import CustomPagination from '../../global/TablePagination';
import '../adminStyles.css'

const WorkFlowSettings = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [ isEditWorkflowSettings, setIsEditWorkflowSettings ] = useState(false)

    const columns = [
        {
            field: 'inspectionType',
            headerName: 'Inspection Type',
            flex: 1,
        },
        {
            field: 'reviewer',
            headerName: 'Reviewer',
            flex: 1,
            renderCell: (params) => {
                return <>
                    {!isEditWorkflowSettings ? <>
                        {params.row.reviewer}
                    </> : 
                    <Box className='tableFields'
                        sx={{
                            '.MuiInputBase-root': {
                                width: '200px'
                            }
                        }}
                    >
                        <Select
                            value={params.row?.reviewer}
                            className='newCaseFields'
                            onChange={(e) => {}}
                        >
                            <MenuItem value='Yes'>Yes</MenuItem>
                            <MenuItem value='No'>No</MenuItem>
                        </Select>
                    </Box>
                    }
                </>
            }
        }
    ]

    const rows = [
        {inspectionType: 'Fire Inspection', reviewer: 'Yes'},
        {inspectionType: 'Fire Safet', reviewer: 'No'},
        {inspectionType: 'Radiation Inspection', reviewer: 'Yes'},
        {inspectionType: 'Radiation Safety', reviewer: 'No'},
        {inspectionType: 'General check', reviewer: 'Yes'}
    ]

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
                <Box sx={{ 
                    py: 2, 
                    px: 2.5, 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }} >
                    <Typography variant='h4' fontWeight={600}>Workflow Settings</Typography>
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
                        {!isEditWorkflowSettings && <Button onClick={() => setIsEditWorkflowSettings(!isEditWorkflowSettings)}
                            variant="contained"
                            sx={{
                                backgroundColor: `${theme.palette.colors[11]}`,
                                color: '#ffffff',
                                borderRadius: '20px',
                                width: '150px',
                                height: '40px',
                                '&:hover': {
                                    backgroundColor: theme.palette.colors[11],
                                }
                            }}
                        >
                            Edit Workflow
                        </Button>}
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
                        rows={rows}
                        getRowId={(row) => row.inspectionType}
                        slots={{
                            pagination:() => <CustomPagination pageCount={5} />,
                        }}
                    />
                </Box>
                {isEditWorkflowSettings && <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        px: 2.5,
                        py: 2
                    }}
                > 
                    <Button onClick={() => setIsEditWorkflowSettings(!isEditWorkflowSettings)}
                        variant="contained"
                        sx={{
                            backgroundColor: `${theme.palette.colors[11]}`,
                            color: '#ffffff',
                            borderRadius: '20px',
                            height: '40px',
                            px: 4,
                            '&:hover': {
                                backgroundColor: theme.palette.colors[11],
                            }
                        }}
                    >
                        Submit
                    </Button>
                </Box>}
            </Box>     
        </Box>
    );
};

export default WorkFlowSettings;
