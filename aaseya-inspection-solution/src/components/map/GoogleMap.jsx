import React, { useEffect, useState } from 'react'
import { APIProvider, ControlPosition, Map, Marker } from '@vis.gl/react-google-maps';
import MapControlComponent from './MapControlComponent';
import MapHandler from './MapHandler';

const GoogleMap = ({ setNewEntityAddress }) => {
    const [ selectedPlace, setSelectedPlace ] = useState(null);

    useEffect(() => {
        setNewEntityAddress(selectedPlace)
    }, [ selectedPlace ])

    return (
        <>
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
        </>
    )
}

export default GoogleMap
