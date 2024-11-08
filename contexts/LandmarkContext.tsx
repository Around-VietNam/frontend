import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Landmark } from '../types';

interface LandmarkContextProps {
    landmarks: Landmark[];
    setLandmarks: React.Dispatch<React.SetStateAction<Landmark[]>>;
}

const LandmarkContext = createContext<LandmarkContextProps | undefined>(undefined);

export const LandmarkProvider = ({ children }: { children: ReactNode }) => {
    const [landmarks, setLandmarks] = useState<Landmark[]>([]);

    return (
        <LandmarkContext.Provider value={{ landmarks, setLandmarks }}>
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
