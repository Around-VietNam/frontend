import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SpecialDish } from '../types';

interface SpecialDishContextProps {
    specialDish: SpecialDish | null;
    setSpecialDish?: React.Dispatch<React.SetStateAction<SpecialDish | null>>;
}

export const SpecialDishContext = createContext<SpecialDishContextProps | undefined>(undefined);

export const SpecialDishProvider = ({ children }: { children: ReactNode }) => {
    const [specialDish, setSpecialDish] = useState<SpecialDish | null>(null);

    return (
        <SpecialDishContext.Provider value={{ specialDish, setSpecialDish }}>
            {children}
        </SpecialDishContext.Provider>
    );
};

export const useSpecialDish = (): SpecialDishContextProps => {
    const context = useContext(SpecialDishContext);
    if (!context) {
        throw new Error('useSpecialDish must be used within a SpecialDishProvider');
    }
    return context;
};
