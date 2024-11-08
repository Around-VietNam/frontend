import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Landmark } from '../types';

interface LandmarkContextProps {
    landmark: Landmark | null;
    setLandmark?: React.Dispatch<React.SetStateAction<Landmark | null>>;
}

export const LandmarkContext = createContext<LandmarkContextProps | undefined>(undefined);

export const LandmarkProvider = ({ children }: { children: ReactNode }) => {
    const [landmark, setLandmark] = useState<Landmark | null>(null);

    return (
        <LandmarkContext.Provider value={{ landmark, setLandmark }}>
            {children}
        </LandmarkContext.Provider>
    );
};

export const useLandmark = (): LandmarkContextProps => {
    const context = useContext(LandmarkContext);
    if (!context) {
        throw new Error('useLandmark must be used within a LandmarkProvider');
    }
    return context;
};
