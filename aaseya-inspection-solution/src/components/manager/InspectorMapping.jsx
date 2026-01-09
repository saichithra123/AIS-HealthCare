import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, MenuItem, FormControl, Select } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "../cases/newCase.css";

const InspectorMapping = ({ selectedEntityDetails, setSelectedEntityDetails, selectedGroups, inspectorCategory }) => {
    const theme = useTheme();

    useEffect(() => {
        console.log(selectedEntityDetails);
    }, [selectedEntityDetails]);

    const columns =
        inspectorCategory === "individual"
            ? [
                  {
                      field: "entity_type",
                      headerName: "Entity Type",
                      flex: 0.3,
                  },
                  {
                      field: "name",
                      headerName: "Entity Name",
                      flex: 0.5,
                  },
                  {
                      field: "inspector",
                      headerName: "Inspector",
                      flex: 1,
                      renderCell: (params) => {
                          return (
                              <>
                                  <FormControl className="newCaseFields" sx={{ mt: 0.5, width: "200px" }}>
                                      <Select
                                          value={params.row.selectedGroupId}
                                          fullWidth
                                          onChange={(e) => {
                                              return setSelectedEntityDetails((prevRows) =>
                                                  prevRows.map((row) =>
                                                      row.id === params.row.id ? { ...row, selectedGroupId: e.target.value } : row
                                                  )
                                              );
                                          }}
                                      >
                                          {selectedGroups?.map((group) => {
                                              return (
                                                  <MenuItem key={group?.userID} value={group?.emailId}>
                                                      {group?.userName}
                                                  </MenuItem>
                                              );
                                          })}
                                      </Select>
                                  </FormControl>
                              </>
                          );
                      },
                  },
              ]
            : [
                  {
                      field: "entity_type",
                      headerName: "Entity Type",
                      flex: 0.3,
                  },
                  {
                      field: "name",
                      headerName: "Entity Name",
                      flex: 0.5,
                  },
                  {
                      field: "inspectorGroup",
                      headerName: "Inspector Group",
                      flex: 1,
                      renderCell: (params) => {
                          return (
                              <>
                                  <FormControl className="newCaseFields" sx={{ mt: 0.5, width: "200px" }}>
                                      <Select
                                          value={params.row.selectedGroupId}
                                          fullWidth
                                          onChange={(e) => {
                                              return setSelectedEntityDetails((prevRows) =>
                                                  prevRows.map((row) =>
                                                      row.id === params.row.id ? { ...row, selectedGroupId: e.target.value } : row
                                                  )
                                              );
                                          }}
                                      >
                                          {selectedGroups?.map((group) => {
                                              return (
                                                  <MenuItem key={group?.groupId} value={group?.groupId}>
                                                      {group?.groupName}
                                                  </MenuItem>
                                              );
                                          })}
                                      </Select>
                                  </FormControl>
                              </>
                          );
                      },
                  },
              ];

    return (
        <>
            <Typography sx={{ color: theme.palette.colors[21], fontSize: "14px", mt: 2 }}>Assign Inspectors/Groups</Typography>
            <Box
                sx={{
                    pt: 1,
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
                <DataGrid columns={columns} rows={selectedEntityDetails} disableRowSelectionOnClick getRowId={(row) => row.id} />
            </Box>
        </>
    );
};

export default InspectorMapping;
