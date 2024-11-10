import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Restaurant } from '../types';

interface RestaurantContextProps {
    restaurants: Restaurant[];
    setRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>;
}

const RestaurantContext = createContext<RestaurantContextProps | undefined>(undefined);

export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    return (
        <RestaurantContext.Provider value={{ restaurants, setRestaurants }}>
            {children}
        </RestaurantContext.Provider>
    );
};

export const useRestaurant = (): RestaurantContextProps => {
    const context = useContext(RestaurantContext);
    if (!context) {
        throw new Error('useRestaurant must be used within a RestaurantProvider');
    }
    return context;
};
