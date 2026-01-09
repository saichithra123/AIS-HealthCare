import React from 'react';
import {
    Box,
    Typography,
    useTheme,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CustomPagination from '../../global/TablePagination';
import CustomCheckbox from '../../global/CustomCheckbox';

const EntityTable = ({ entities, selectedEntities, setSelectedEntities, entityPage, setEntityPage, entityPageSize, setEntityPageSize, totalEntityPages, totalEntityRecords, loadingEntities }) => {
    const theme = useTheme();

    const columns = [
        {
            field: 'id',
            headerName: 'Entity Id',
            flex: 0.3
        },
        {
            field: 'name',
            headerName: 'Entity Name',
            flex: 0.5
        },
        {
            field: 'address',
            headerName: 'Address',
            flex: 1
        }
    ];

    return (
        <>
            <Typography sx={{ color: theme.palette.colors[21], fontSize: '14px', mt: 3 }}>Entity</Typography>
            <Box
                sx={{
                    pt: 1,
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
                    rows={entities}
                    loading={loadingEntities}
                    checkboxSelection
                    rowSelectionModel={selectedEntities}
                    onRowSelectionModelChange={(selectionModel) => setSelectedEntities(selectionModel)}
                    disableRowSelectionOnClick
                    slots={{
                        baseCheckbox: CustomCheckbox,
                        pagination:() => <CustomPagination page={entityPage} setPage={setEntityPage} pageSize={entityPageSize} setPageSize={setEntityPageSize} totalPages={totalEntityPages} totalRecords={totalEntityRecords} />,
                    }}
                    getRowId={(row) => row.id}
                />
            </Box>
        </>
    );
};

export default EntityTable;
