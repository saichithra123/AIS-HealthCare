import { Box, Pagination, TablePagination, Typography, useTheme } from '@mui/material'
import React from 'react'

const CustomPagination = React.memo(({ page, setPage, pageSize, setPageSize, totalPages, totalRecords }) => {
    const theme = useTheme();

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleChangeRowsPerPage = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(1);
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
        }}>
                <Typography sx={{ fontSize: '12px' }}>{page * pageSize - pageSize + 1} to {page * pageSize < totalRecords ? page * pageSize : totalRecords} of {totalRecords} records</Typography>
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    '.MuiTablePagination-displayedRows': {
                        display: 'none'
                    },
                    '.MuiTablePagination-actions': {
                        display: 'none'
                    },
                    '.MuiTablePagination-input': {
                        border: `1px solid ${theme.palette.colors[22]}`,
                                borderRadius: '6px',
                    }
                }}
            >
                <TablePagination 
                    component='div'
                    page={page}
                    onPageChange={() => {}}
                    count={100}
                    rowsPerPage={pageSize}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <Pagination 
                    sx={{ 
                        '.MuiButtonBase-root': {
                            borderColor: `${theme.palette.colors[11]}` 
                        },
                        '.MuiPaginationItem-root': {
                            borderColor: `${theme.palette.colors[11]}` 
                        },
                        '.MuiPagination-ul li': {
                            borderColor: `${theme.palette.colors[11]}` 
                        },
                    }} 
                    page={page}
                    onChange={handlePageChange}
                    count={totalPages} 
                    variant="outlined" 
                    shape="rounded" 
                />
            </Box>
        </Box>
    )
})

export default CustomPagination
