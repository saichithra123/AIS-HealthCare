import { Box, Button, Chip, Grid2, ListItemText, MenuItem, Popover, Select, Dialog, TextField, Typography, useTheme, FormControl } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../adminStyles.css'

const LicenseForm = ({ licenseDetails, setLicenseDetails }) => {
    const theme = useTheme()
    const location = useLocation()
    const entityId = location.state?.entityId;
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLicenseDetails({
            ...licenseDetails,
            [name]: value
        });
    };

    return (
        <Box
            sx={{
                "& .MuiTypography-root": {
                    fontSize: "12px",
                    color: theme.palette.colors[21],
                },
            }}
        >
            <Grid2 container spacing={2.5}>
                <Grid2 size={4}>
                    <Typography>License Type</Typography>
                    <FormControl fullWidth className="inputFields">
                        <Select size="small" value={licenseDetails?.licenseType} name="licenseType" onChange={handleInputChange}>
                            <MenuItem value="Business">Business</MenuItem>
                            <MenuItem value="Professional">Professional</MenuItem>
                            <MenuItem value="Operational">Operational</MenuItem>
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 size={4}>
                    <Typography>License Name</Typography>
                    <TextField
                        size="small"
                        fullWidth
                        className="inputFields"
                        value={licenseDetails?.licenseName}
                        name="licenseName"
                        onChange={handleInputChange}
                    />
                </Grid2>
                <Grid2 size={4}>
                    <Typography>License Number</Typography>
                    <TextField
                        size="small"
                        fullWidth
                        className="inputFields"
                        value={licenseDetails?.licenseNumber}
                        name="licenseNumber"
                        onChange={handleInputChange}
                    />
                </Grid2>
                <Grid2 size={4}>
                    <Typography>Issuing Authority</Typography>
                    <TextField
                        size="small"
                        fullWidth
                        className="inputFields"
                        value={licenseDetails?.issuingAuthority}
                        name="issuingAuthority"
                        onChange={handleInputChange}
                    />
                </Grid2>
                <Grid2 size={4}>
                    <Typography>Status</Typography>
                    <FormControl fullWidth className="inputFields">
                        <Select size="small" value={licenseDetails?.status} name="status" onChange={handleInputChange}>
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Expired">Expired</MenuItem>
                            <MenuItem value="Suspended">Suspended</MenuItem>
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 size={4}>
                    <Typography>Associate Location / Site</Typography>
                    <TextField
                        size="small"
                        fullWidth
                        value={licenseDetails?.licenseLocation}
                        className="inputFields"
                        name="licenseLocation"
                        onChange={handleInputChange}
                    />
                </Grid2>
                <Grid2 size={8}>
                    <Typography>Comments</Typography>
                    <TextField
                        size="small"
                        fullWidth
                        value={licenseDetails?.licenseComments}
                        className="inputFields"
                        name="licenseComments"
                        onChange={handleInputChange}
                    />
                </Grid2>
            </Grid2>
        </Box>
    );
}

export default LicenseForm