import MapView, { Marker } from 'react-native-maps';
import { useLocation } from '@/contexts/location';
import React from 'react';
import { Center } from '../ui/center';

interface Props { }

export function MinimapV2({ }: Props) {
    const { location, address } = useLocation();
    const [mapLongitude, setMapLongitude] = React.useState<number>(location?.coords.longitude || 106.6881);
    const [mapLatitude, setMapLatitude] = React.useState<number>(location?.coords.latitude || 10.7629);

    const getMapTemplate = React.useCallback(() => {
        return `
           <iframe width="256" height="256" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" id="gmap_canvas" src="https://maps.google.com/maps?width=256&amp;height=256&amp;hl=en&amp;q=%20Ha%20Noi+(Map)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe> <a href='https://www.versicherungen.at/unfallversicherung-rechner/'>Unfallversicherung Vergleich</a> <script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=d2a54cff957bcf81d0d88d627e1e53c8425833b1'></script>
           `
    }, []);

    return (
        <Center className='h-full aspect-square rounded-2xl shadow-soft-1'>
            <MapView
                testID='minimap'
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 20,
                }}
                initialRegion={{
                    latitude: mapLatitude,
                    longitude: mapLongitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                followsUserLocation={true}
                showsTraffic={true}
                mapType='standard'
            >
                <Marker
                    coordinate={{
                        latitude: mapLatitude,
                        longitude: mapLongitude,
                    }}
                    title={`${address.suburb}, ${address.city}`}
                    description={address.road}
                />
            </MapView>
        </Center>
    );
}