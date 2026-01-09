import React, { useState } from 'react';
import {
    Tooltip,
    useTheme,
    Box,
    Typography,
    IconButton,
    Button,
    Divider
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { DataGrid } from '@mui/x-data-grid';
import CustomPagination from '../../global/TablePagination';
import CustomCheckbox from '../../global/CustomCheckbox';


const ZoneManagement = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const rows = [
        { id: 1, zone: 'Zone 1' },
        { id: 2, zone: 'Zone 2' },
        { id: 3, zone: 'Zone 3' },
       
    ];

    const columns = [
        {
            field: 'zone',
            headerName: 'Zone',
            flex: 1,
        },
        {
            field: 'action',
            headerName: 'Actions',
            flex: 0.2,
            renderCell: () => {
                return (
                    <Button
                        sx={{ color: `${theme.palette.colors[11]}` }}
                        onClick={() => {}}
                    >
                        Edit
                    </Button>
                );
            },
        },
    ];

    return (
        <Box
            sx={{
                borderRadius: '20px',
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
                    fontSize: '14px',
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
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h4" fontWeight={600}>
                        Zone Management
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 3 }}>
                        <IconButton
                            sx={{
                                boxShadow: `0px 1px 6px ${theme.palette.colors[3]}`,
                                borderRadius: '50%',
                                opacity: 1,
                                width: '40px',
                                height: '40px',
                            }}
                        >
                            <SearchIcon sx={{ color: `${theme.palette.colors[8]}` }} />
                        </IconButton>
                        <Box
                            sx={{
                                boxShadow: `0px 1px 6px ${theme.palette.colors[3]}`,
                                borderRadius: '20px',
                                opacity: 1,
                                display: 'flex',
                                alignItems: 'center',
                                px: 1,
                            }}
                        >
                            <Tooltip title="Upload data as excel">
                                <IconButton>
                                    <ArrowUpwardOutlinedIcon sx={{ color: `${theme.palette.colors[8]}` }} />
                                </IconButton>
                            </Tooltip>
                            <Divider orientation="vertical" sx={{ height: '25px' }} />
                            <Tooltip title="Download data as excel">
                                <IconButton>
                                    <ArrowDownwardOutlinedIcon sx={{ color: `${theme.palette.colors[8]}` }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box
                            sx={{
                                '& .MuiButtonBase-root:hover': {
                                    backgroundColor: theme.palette.colors[11],
                                },
                            }}
                        >
                            <Button
                                onClick={() => navigate('/AddZone')}
                                variant="contained"
                                startIcon={<AddIcon />}
                                sx={{
                                    backgroundColor: `${theme.palette.colors[11]}`,
                                    color: '#ffffff',
                                    borderRadius: '20px',
                                    width: '150px',
                                    height: '40px',
                                }}
                            >
                                Add New
                            </Button>
                        </Box>
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
                        },
                        '.MuiDataGrid-selectedRowCount': {
                            display: 'none'
                        }
                    }}
                >
                    <DataGrid
                        columns={columns}
                        rows={rows}
                        checkboxSelection
                        slots={{
                            baseCheckbox: CustomCheckbox,
                            pagination:() => <CustomPagination pageCount={5} />,
                        }}
                        disableRowSelectionOnClick
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default ZoneManagement;

