import { Box, Button, Divider, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { DataGrid } from '@mui/x-data-grid';
import '../adminStyles.css'

const NotificationSetup = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const [ isEditReminder, setIsEditReminder ] = useState(false)

    const rows = [
        {
            role: 'Inspector',
            goal: [2, 3],
            deadline: [2, 3 ]
        },
        {
            role: 'Reviewer',
            goal: [1, 3],
            deadline: [2, 4 ],
        },
        {
            role: 'Approver',
            goal: [1, 2],
            deadline: [1, 2 ]
        },
    ]

    const columns = [
        {
            field: 'role',
            headerName: 'Role',
            flex: 0.5,
            valueGetter: (value) => value,
            renderCell: (params) => (
                <Box sx={{ my: 1 }}>
                    <Typography sx={{ fontSize: '12px' }}>{params.row?.role}</Typography>
                </Box>
            )
        },
        {
            field: 'goal',
            headerName: 'Goal',
            flex: 1,
            renderCell: (params) => {
                return <>
                    {params.row?.goal?.map((days, index) => (
                        <Box key={index} sx={{ display: 'flex', my: 1, alignItems: 'center', columnGap: 2 }}>
                            {!isEditReminder ? <>
                                <Typography sx={{ width: '60px',fontSize: '12px' }}>
                                    {days} days
                                </Typography>
                                <Divider orientation="vertical" flexItem sx={{ height: '20px' }} />
                            </> : 
                            <TextField 
                                type='number'
                                value={days}
                                onChange={(e) => {}}
                                className='tableFields'
                            />
                            }
                            <Typography sx={{ fontSize: '12px' }}>{index + 1}{index + 1 === 1 ? 'st' : 'nd' } Reminder</Typography>
                        </Box>
                    ))}
                </>
            }
        },
        {
            field: 'deadline',
            headerName: 'Deadline',
            flex: 1,
            renderCell: (params) => {
                return <>
                    {params.row?.deadline?.map((days, index) => (
                        <Box key={index} sx={{ display: 'flex', my: 1, alignItems: 'center', columnGap: 2 }}>
                            {!isEditReminder ? <>
                                <Typography sx={{ width: '60px',fontSize: '12px' }}>
                                    {days} days
                                </Typography>
                                <Divider orientation="vertical" flexItem sx={{ height: '20px' }} />
                            </> : 
                            <TextField 
                                type='number'
                                value={days}
                                onChange={(e) => {}}
                                className='tableFields'
                            />}
                            <Typography sx={{ fontSize: '12px' }}>{index + 1}{index + 1 === 1 ? 'st' : 'nd' } Reminder</Typography>
                        </Box>
                    ))}
                </>
            }
        },
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
                    <Typography variant='h4' fontWeight={600}>Notification Setup</Typography>
                    {!isEditReminder && <Button onClick={() => setIsEditReminder(!isEditReminder)}
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
                        Edit Reminder
                    </Button>}
                </Box>
                <Divider />
                <Box
                    sx={{
                        py: 2,
                        px: 2.5,
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
                    }}
                >
                    <DataGrid 
                        columns={columns}
                        rows={rows}
                        getRowId={(row) => row.role}
                        getRowHeight={() => 'auto'}
                        autoHeight
                        hideFooter
                    />
                </Box>
                {isEditReminder && <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        px: 2.5,
                        py: 2
                    }}
                > 
                    <Button onClick={() => setIsEditReminder(!isEditReminder)}
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
    )
}

export default NotificationSetup
