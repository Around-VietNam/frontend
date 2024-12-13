import { useState, useEffect, useCallback } from "react";
import { Api } from "@/constants/Api";
import { useLocation } from "@/contexts/location";

interface WeatherDescription {
    value: string;
}
interface CurrentCondition {
    FeelsLikeC: string;
    FeelsLikeF: string;
    cloudcover: string;
    humidity: string;
    lang_vi: WeatherDescription[];
    localObsDateTime: string;
    observation_time: string;
    precipInches: string;
    precipMM: string;
    pressure: string;
    pressureInches: string;
    temp_C: string;
    temp_F: string;
    uvIndex: string;
    visibility: string;
    visibilityMiles: string;
    weatherCode: string;
    weatherDesc: WeatherDescription[];
    weatherIconUrl: WeatherDescription[];
    winddir16Point: string;
    winddirDegree: string;
    windspeedKmph: string;
    windspeedMiles: string;
}

export function useWeather() {
    const { address } = useLocation();
    const [currentCondition, setCurrentCondition] = useState<CurrentCondition | null>(null);

    const fetchWeather = useCallback(async () => {
        try {
            const response = await fetch(`${Api.wttrin.url}/${address.city}?format=j1`);
            const data = await response.json();
            console.log(data);
            setCurrentCondition(data.current_condition[0]);
        } catch (error) {
            console.error(error);
        }
    }, [address]);

    useEffect(() => {
        fetchWeather();
    }, [fetchWeather]);

    return {
        currentCondition,
    };
}