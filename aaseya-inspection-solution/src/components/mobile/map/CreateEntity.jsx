import React, { useContext, useEffect, useState } from 'react';
import { APIProvider, ControlPosition, Map, Marker } from '@vis.gl/react-google-maps';
import MapControlComponent from './MapControlComponent';
import MapHandler from './MapHandler';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Grid2, Typography, Drawer } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { HeaderContext } from "../HeaderContext";

const CreateEntity = () => {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [openDrawer, setOpenDrawer] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { isCreateEntity, inspectionType } = location?.state;
    const { header, setHeader } = useContext(HeaderContext);

    useEffect(() => {
        setHeader("Create Entity");
    }, []);

    useEffect(() => {
        if (selectedPlace?.name) {
            setOpenDrawer(true);
        }
    }, [selectedPlace]);

    return (
        <>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}>
                <Map
                    style={{ width: "100%", height: "100vh", borderRadius: "20px" }}
                    defaultCenter={{ lat: 22.54992, lng: 0 }}
                    defaultZoom={3}
                    gestureHandling={"greedy"}
                    disableDefaultUI={true}
                />
                <MapControlComponent
                    style={{ width: "100%" }}
                    controlPosition={ControlPosition.TOP_LEFT}
                    onPlaceSelect={setSelectedPlace}
                />
                <Marker
                    position={{ lat: selectedPlace?.geometry?.location?.lat(), lng: selectedPlace?.geometry?.location?.lng() }}
                    clickable={true}
                    title={selectedPlace?.name}
                />
                <MapHandler place={selectedPlace} />
            </APIProvider>
            <Drawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                anchor="bottom"
                variant="persistent"
                className="addressDrawer"
            >
                <Grid2 container sx={{ p: 3 }}>
                    <Grid2 sx={{ mb: 3 }}>
                        <Typography color="#4C8B92" variant="h6">
                            Creating case for Entity
                        </Typography>
                    </Grid2>
                    <Grid2 container sx={{ mb: 3 }}>
                        <Grid2 size={2}>
                            <LocationOnIcon sx={{ color: "#4C8B92", fontSize: "50px" }} />
                        </Grid2>
                        <Grid2 size={10}>
                            <Typography variant="h5" fontWeight={700} my={1}>
                                {selectedPlace?.name}
                            </Typography>
                            <Typography>{selectedPlace?.formatted_address}</Typography>
                        </Grid2>
                    </Grid2>
                    <Grid2
                        container
                        sx={{
                            "& .MuiButtonBase-root:hover": {
                                backgroundColor: "#4C8B92",
                            },
                        }}
                    >
                        <Button
                            sx={{
                                backgroundColor: "#4C8B92",
                                textTransform: "none",
                                borderRadius: "20px",
                                width: "100%",
                                height: "40px",
                            }}
                            onClick={() => {
                                setOpenDrawer(false);
                                navigate(`/cases/new`, {
                                    state: {
                                        newEntityAddress: JSON.stringify(selectedPlace),
                                        isCreateEntity: isCreateEntity,
                                        inspectionType: inspectionType,
                                    },
                                });
                            }}
                        >
                            Fill Entity details
                        </Button>
                    </Grid2>
                </Grid2>
            </Drawer>
        </>
    );
};

export default CreateEntity
