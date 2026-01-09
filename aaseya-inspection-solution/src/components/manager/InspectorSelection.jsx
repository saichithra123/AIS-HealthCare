import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, FormControl, Select, MenuItem, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CustomPagination from "../global/TablePagination";
import CustomCheckbox from "../global/CustomCheckbox";
import "../cases/newCase.css";
import axios from "axios";

const InspectorSelection = React.memo(
    ({
        userGroup,
        setUserGroup,
        selectedUserGroups,
        setSelectedUserGroups,
        userGroupPage,
        setUserGroupPage,
        userGroupPageSize,
        setUserGroupPageSize,
        totalUserGroupPages,
        totalUserGroupRecords,
        loadingUserGroups,
        inspectorCategory,
    }) => {
        const theme = useTheme();
        const [userOptions, setUserOptions] = useState({});

        useEffect(() => {
            const fetchGroupLeads = async (groupId) => {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/getUsersByGroupId/${groupId}`);
                    setUserOptions((prev) => ({ ...prev, [groupId]: response?.data }));
                } catch (error) {
                    console.error(`Error fetching users for group ${groupId}:`, error);
                }
            };
            if (inspectorCategory === "group") {
                selectedUserGroups.forEach((groupId) => {
                    if (!userOptions[groupId]) {
                        fetchGroupLeads(groupId);
                    }
                });
            }
        }, [selectedUserGroups]);

        const columns =
            inspectorCategory === "individual"
                ? [
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
                  ]
                : [
                      {
                          field: "groupName",
                          headerName: "Group Name",
                          flex: 0.3,
                      },
                      {
                          field: "groupLead",
                          headerName: "Group Lead",
                          flex: 0.5,
                          renderCell: (params) => (
                              <FormControl fullWidth className="newCaseFields" sx={{ mt: 0.5, width: "200px" }}>
                                  <Select
                                      value={params.row.selectedGroupLead}
                                      fullWidth
                                      disabled={!selectedUserGroups?.includes(params.row.groupId)}
                                      onChange={(e) => {
                                          return setUserGroup((prevRows) =>
                                              prevRows.map((row) =>
                                                  row.groupId === params.row.groupId
                                                      ? { ...row, selectedGroupLead: e.target.value }
                                                      : row
                                              )
                                          );
                                      }}
                                  >
                                      {userOptions[params.row.groupId]?.map((user) => (
                                          <MenuItem key={user.userID} value={user.userID}>
                                              {user.userName}
                                          </MenuItem>
                                      ))}
                                  </Select>
                              </FormControl>
                          ),
                      },
                      {
                          field: "description",
                          headerName: "Description",
                          flex: 1,
                      },
                  ];

        return (
            <>
                <Typography sx={{ color: theme.palette.colors[21], fontSize: "14px", mt: 2 }}>Choose Inspector Groups</Typography>
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
                    <DataGrid
                        columns={columns}
                        rows={userGroup}
                        loading={loadingUserGroups}
                        checkboxSelection
                        rowSelectionModel={selectedUserGroups}
                        onRowSelectionModelChange={(selectionModel) => setSelectedUserGroups(selectionModel)}
                        disableRowSelectionOnClick
                        getRowId={(row) => (inspectorCategory === "individual" ? row?.emailId : row?.groupId)}
                        slots={{
                            baseCheckbox: CustomCheckbox,
                            pagination: () => (
                                <CustomPagination
                                    page={userGroupPage}
                                    setPage={setUserGroupPage}
                                    pageSize={userGroupPageSize}
                                    setPageSize={setUserGroupPageSize}
                                    totalPages={totalUserGroupPages}
                                    totalRecords={totalUserGroupRecords}
                                />
                            ),
                        }}
                    />
                </Box>
            </>
        );
    }
);

export default InspectorSelection;
