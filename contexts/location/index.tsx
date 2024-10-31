import React, { createContext, useState, useEffect, useContext } from 'react';
import * as Location from 'expo-location';
import { Api } from '@/constants/Api';

interface Props {
    children: React.ReactNode;
}
interface LocationContextProps {
    location: Location.LocationObject | null;
    address: {
        road?: string;
        suburb?: string;
        city?: string;
        country?: string;
    }
    errorMsg: string | null;
}

const LocationContext = createContext<LocationContextProps | undefined>(undefined);

export const LocationProvider: React.FC<Props> = ({ children }) => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [address, setAddress] = useState<LocationContextProps["address"]>({ road: '', suburb: '', city: '', country: '' });
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            const { latitude, longitude } = location.coords;
            const response = await fetch(`${Api.opencagedata.url}?q=${latitude}+${longitude}&key=${Api.opencagedata.key}`);
            console.log(Api.opencagedata.url);
            const data = await response.json();
            if (data.results.length > 0) {
                const { road, suburb, city, country } = data.results[0].components;
                setAddress({ road, suburb, city, country });
            }
        })();
    }, []);

    return (
        <LocationContext.Provider value={{ location, address, errorMsg }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => {
    const context = useContext(LocationContext);
    if (context === undefined) {
        throw new Error('useLocation must be used within a LocationProvider');
    }
    return context;
};