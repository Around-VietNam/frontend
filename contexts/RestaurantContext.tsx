import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Restaurant } from '../types';

interface RestaurantContextProps {
    restaurant: Restaurant | null;
    setRestaurant?: React.Dispatch<React.SetStateAction<Restaurant | null>>;
}

export const RestaurantContext = createContext<RestaurantContextProps | undefined>(undefined);

export const useRestaurant = (): RestaurantContextProps => {
    const context = useContext(RestaurantContext);
    if (!context) {
        throw new Error('useRestaurant must be used within a RestaurantProvider');
    }
    return context;
};
