import { Box, Divider, Grid2, MenuItem, Select, TextField, Typography, useTheme, FormControl } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GoogleMap from '../../map/GoogleMap';
import '../adminStyles.css';

const SiteForm = ({ siteDetails, setSiteDetails }) => {
    const theme = useTheme();
    const [Coordinates, setCoordinates] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSiteDetails({
            ...siteDetails,
            [name]: value
        });
    };

    useEffect(() => {
        if (Coordinates?.formatted_address) {
            setSiteDetails((prevDetails) => ({
                ...prevDetails,
                siteAddress: Coordinates.formatted_address,
            }));
        }
    }, [Coordinates, setSiteDetails]);

    return (
        <Box
            sx={{
                "& .MuiTypography-root": {
                    fontSize: "12px",
                    color: theme.palette.colors[21],
                },
            }}
        >
            <Grid2 container spacing={3} rowSpacing={2.5} columnSpacing={2.5}>
                <Grid2 size={4}>
                    <Typography>Site Name</Typography>
                    <TextField
                        fullWidth
                        size="small"
                        className="inputFields"
                        name="siteName"
                        value={siteDetails?.siteName}
                        onChange={handleInputChange}
                    />
                </Grid2>
                <Grid2 size={4}>
                    <Typography>Site ID</Typography>
                    <TextField
                        size="small"
                        fullWidth
                        name="siteId"
                        value={siteDetails?.siteId}
                        className="inputFields"
                        onChange={handleInputChange}
                        disabled
                    />
                </Grid2>
                <Grid2 size={4}>
                    <Typography>Site Manager</Typography>
                    <TextField
                        size="small"
                        fullWidth
                        name="siteManager"
                        value={siteDetails?.siteManager}
                        className="inputFields"
                        onChange={handleInputChange}
                    />
                </Grid2>
                <Grid2 size={4} className="inputFields">
                    <Typography>Site Type</Typography>
                    <FormControl fullWidth>
                        <Select size="small" value={siteDetails?.siteType} name="siteType" onChange={handleInputChange}>
                            <MenuItem value="Commercial">Commercial</MenuItem>
                            <MenuItem value="Residential">Residential</MenuItem>
                            <MenuItem value="Industrial">Industrial</MenuItem>
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 size={8}>
                    <Typography>Site Address</Typography>
                    <TextField
                        size="small"
                        fullWidth
                        name="siteAddress"
                        value={siteDetails?.siteAddress}
                        className="inputFields"
                        onChange={handleInputChange}
                    />
                </Grid2>
            </Grid2>
            <Grid2 container mt={3} sx={{ height: "400px" }}>
                <Typography>Site GPS</Typography>
                <GoogleMap setNewEntityAddress={setCoordinates} />
            </Grid2>
            <Divider sx={{ my: 2 }} />
            <Grid2 container spacing={3}>
                <Grid2 size={8}>
                    <Typography>Comments</Typography>
                    <TextField
                        size="small"
                        fullWidth
                        name="siteComments"
                        value={siteDetails?.siteComments}
                        className="inputFields"
                        onChange={handleInputChange}
                    />
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default SiteForm;
