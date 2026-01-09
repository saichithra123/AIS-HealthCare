import React, { useEffect, useRef, useState } from 'react'
import { MapControl } from '@vis.gl/react-google-maps';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { TextField } from '@mui/material';
import './map.css'

const MapControlComponent = ({ controlPosition, onPlaceSelect }) => {
    const [ placeAutocomplete, setPlaceAutocomplete ] = useState(null)
    const inputRef = useRef(null);
    const places = useMapsLibrary('places');

    useEffect(() => {
        if (!places || !inputRef.current) return;

        const options = {
            fields: [ 'geometry', 'name', 'formatted_address' ]
        };

        setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [ places ]);

    useEffect(() => {
        if (!placeAutocomplete) return;

        placeAutocomplete.addListener('place_changed', () => {
            onPlaceSelect(placeAutocomplete.getPlace());
        });
    }, [ onPlaceSelect, placeAutocomplete ]);

    return (
        <>
            <MapControl position={controlPosition}>
                <div className='inputContainer'>
                    <input ref={inputRef} className='mapSearchfield' placeholder='Search Entity' />
                </div>
            </MapControl>
        </>
    )
}

export default MapControlComponent
