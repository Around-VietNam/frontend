import MapView, { Marker, MapViewProps } from 'react-native-maps';
import { useLocation } from '@/contexts/location';
import React from 'react';
import { Center } from '../ui/center';
import { ViewProps } from 'react-native/Libraries/Components/View/ViewPropTypes';
import { twMerge } from 'tailwind-merge';

interface Props extends MapViewProps {
}

export function MinimapV2({ className, ...props }: Props) {
    const { location, address } = useLocation();
    const [mapLongitude, setMapLongitude] = React.useState<number>(location?.coords.longitude || 106.6881);
    const [mapLatitude, setMapLatitude] = React.useState<number>(location?.coords.latitude || 10.7629);

    return (
        <Center className={twMerge(
            'w-full h-full rounded-2xl shadow-soft-1',
            className
        )} {...props}>
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
                {...props}
            >
                <Marker
                    coordinate={{
                        latitude: mapLatitude,
                        longitude: mapLongitude,
                    }}
                    title={`${address.suburb}, ${address.city}`}
                    description={address.road}
                />
                {props.children}
            </MapView>
        </Center>
    );
}