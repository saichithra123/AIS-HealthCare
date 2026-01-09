import React, { useState } from 'react';
import { Grid2, TextField, useTheme, Box, Typography, Button, Divider } from "@mui/material";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { useNavigate } from "react-router-dom";
import GoogleMap from "../../map/GoogleMap";
import axios from "axios";
import "../adminStyles.css";

const AddZone = () => {
    const [zoneDetails, setZoneDetails] = useState({
        zoneName: "",
        address: "",
        facility: "",
        building: "",
        entityName: "",
        description: "",
        coordinates: "",
    });
    const [zoneName, setZoneName] = useState("");
    const [address, setAddress] = useState("");
    const [area, setArea] = useState("");
    const [floorNumber, setFloorNumber] = useState("");
    const [entityName, setEntityName] = useState("");
    const [description, setDescription] = useState("");
    const [coordinates, setCoordinates] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    const handleSubmit = async () => {
        if (!zoneName || !address || !area || !floorNumber || !entityName || !description || !coordinates) {
            alert("Please fill all required fields and select a location on the map.");
            return;
        }
        const requestBody = {
            name: zoneName,
            address,
            area,
            floorNumber,
            entityName,
            description,
            coordinates,
            isDefaultZone: true,
        };

        try {
            const response = await axios.post("http://localhost:8989/saveZone", requestBody);
            if (response.status === 200) {
                navigate("/zone-management");
            }
        } catch (error) {
            console.error("Error saving zone:", error);
        }
    };

    return (
        <Box
            sx={{
                borderRadius: "20px",
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
                    fontSize: "14px",
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
                    borderRadius: "10px",
                    mt: 2,
                }}
            >
                <Box sx={{ py: 2, px: 2.5 }}>
                    <Typography variant="h4" fontWeight={600}>
                        Add Zone
                    </Typography>
                </Box>
                <Divider />
                <Box
                    sx={{
                        py: 2,
                        px: 2.5,
                        "& .MuiTypography-root": {
                            fontSize: "12px",
                            color: theme.palette.colors[21],
                        },
                    }}
                >
                    <Grid2 container spacing={3}>
                        <Grid2 size={4}>
                            <Typography>
                                Zone Name <span style={{ color: "red" }}>*</span>
                            </Typography>
                            <TextField
                                size="small"
                                fullWidth
                                value={zoneDetails?.zoneName}
                                className="inputFields"
                                onChange={(e) => {
                                    setZoneDetails({
                                        ...zoneDetails,
                                        zoneName: e.target.value,
                                    });
                                }}
                            />
                        </Grid2>
                    </Grid2>
                    <Divider sx={{ my: 2 }} />
                    <Grid2 container spacing={3}>
                        <Grid2 container size={4} rowSpacing={2.5}>
                            <Grid2 size={12}>
                                <Typography>
                                    {" "}
                                    Address <span style={{ color: "red" }}>*</span>
                                </Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    className="inputFields"
                                    value={zoneDetails?.address}
                                    onChange={(e) => {
                                        setZoneDetails({
                                            ...entityDetails,
                                            address: e.target.value,
                                        });
                                    }}
                                />
                            </Grid2>
                            <Grid2 size={12}>
                                <Typography>
                                    {" "}
                                    Area/ Facility <span style={{ color: "red" }}>*</span>
                                </Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    className="inputFields"
                                    value={zoneDetails?.facility}
                                    onChange={(e) => {
                                        setZoneDetails({
                                            ...entityDetails,
                                            facility: e.target.value,
                                        });
                                    }}
                                />
                            </Grid2>
                            <Grid2 size={12}>
                                <Typography>
                                    {" "}
                                    Floor Number/ Building Name <span style={{ color: "red" }}>*</span>
                                </Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    className="inputFields"
                                    value={zoneDetails?.building}
                                    onChange={(e) => {
                                        setZoneDetails({
                                            ...entityDetails,
                                            building: e.target.value,
                                        });
                                    }}
                                />
                            </Grid2>
                            <Grid2 size={12}>
                                <Typography>
                                    {" "}
                                    Entity Name <span style={{ color: "red" }}>*</span>
                                </Typography>
                                <TextField
                                    size="small"
                                    fullWidth
                                    className="inputFields"
                                    value={zoneDetails?.entityName}
                                    onChange={(e) => {
                                        setZoneDetails({
                                            ...zoneDetails,
                                            entityName: e.target.value,
                                        });
                                    }}
                                />
                            </Grid2>
                        </Grid2>
                        <Grid2 size={8}>
                            <GoogleMap setNewEntityAddress={setCoordinates} />
                        </Grid2>
                    </Grid2>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: `${theme.palette.colors[11]}`,
                                color: "#fff",
                                borderRadius: "50px",
                                padding: "8px 24px",
                                "&:hover": {
                                    backgroundColor: theme.palette.colors[11],
                                },
                            }}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AddZone;
