import React, { useEffect, useState } from 'react';
import { APIProvider, ControlPosition, Map, Marker } from '@vis.gl/react-google-maps';
import MapControlComponent from './MapControlComponent';
import MapHandler from './MapHandler';
import { Box, useTheme, Button, Divider, Typography } from '@mui/material';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';

const RouteOptimization = () => {
    const [ selectedPlace, setSelectedPlace ] = useState(null);
    const theme = useTheme()

    return (
        <>
            <Box sx={{
                borderRadius: '20px',
                background: `${theme.palette.colors[ 2 ]} 0% 0% no-repeat padding-box`,
                my: 2,
                mr: 2,
                px: 2.5,
                py: 2,
                boxShadow: `inset 0px 0px 6px ${theme.palette.colors[ 3 ]}`,
                opacity: 1,
                height: '640px',
            }}>
                <Button
                    sx={{
                        color: theme.palette.colors[ 21 ],
                        fontSize: '14px',
                        fontWeight: 600,
                    }}
                    startIcon={<KeyboardBackspaceOutlinedIcon />}
                    onClick={() => navigate(-1)}
                >Back</Button>
                <Box
                    sx={{
                        background: `${theme.palette.colors[ 1 ]} 0% 0% no-repeat padding-box`,
                        borderRadius: '10px',
                        opacity: 1,
                    }}
                >
                    <Box sx={{ py: 2, px: 2.5, }} >
                        <Typography variant='h4' fontWeight={600}>Route Optimization</Typography>
                    </Box>
                    <Divider />
                    <Box className='mapContainer' sx={{ m: 3, pb: 3, height: '490px' }}>
                        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}>
                            <Map
                                style={{ width: '100%', height: '100%', borderRadius: '20px' }}
                                defaultCenter={{ lat: 22.54992, lng: 0 }}
                                defaultZoom={3}
                                gestureHandling={'greedy'}
                                disableDefaultUI={true}
                            />
                            <MapControlComponent
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
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default RouteOptimization
