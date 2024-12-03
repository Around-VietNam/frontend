import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuth = () => {
    const [account, setAccount] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    const fetchAccountInfo = useCallback(async () => {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
            const response = await fetch('https://api.github.com/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);
            setAccount(data);
            setIsConnected(true);
        } else {
            setIsConnected(false);
        }
    }, []);

    useEffect(() => {
        fetchAccountInfo();
    }, [fetchAccountInfo]);

    return { account, isConnected };
};
