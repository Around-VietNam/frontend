import { ViewProps } from "react-native";
import { HStack } from "../ui/hstack";
import { useLocation } from "@/contexts/location";
import React from "react";
import { Api } from "@/constants/Api";
import { Text } from "../ui/text";
import { twMerge } from "tailwind-merge";
import { VStack } from "../ui/vstack";
import { Center } from "../ui/center";
import Field from "../ui/field";
import { Ionicons } from "@expo/vector-icons";

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
interface Props extends ViewProps { }
export function SituationWidget({ ...props }: Props) {
    const { address } = useLocation();
    const [currentCondition, setCurrentCondition] = React.useState<CurrentCondition | null>(null);

    const fetchWeather = React.useCallback(async () => {
        try {
            const response = await fetch(`${Api.wttrin.url}/${address.city}?format=j1`);
            const data = await response.json();
            console.log(data);
            setCurrentCondition(data.current_condition[0]);
        } catch (error) {
            console.error(error);
        }
    }, [address]);

    React.useEffect(() => {
        fetchWeather();
    }, []);
    if (!currentCondition) return (
        <Center
            className={twMerge(
                "w-full h-64 p-6 rounded-2xl bg-background-0",
            )}
        >
            <Text>Loading...</Text>
        </Center>
    )
    return (
        <VStack className="w-full h-full p-4 rounded-3xl bg-background-0 justify-between">
            <HStack space="sm">
                <Ionicons name="cloudy-night-sharp" size={16} />
                <Text className="text-base font-semibold text-typography-900">Thời tiết</Text>
            </HStack>
            <HStack
                className={twMerge(
                    "w-full justify-between",
                )}
            >
                <VStack>
                    <Text className="text-4xl font-bold text-typography-900">
                        {currentCondition?.temp_C}°C
                    </Text>
                    <Text>
                        {address.city}
                    </Text>
                </VStack>
            </HStack>
            <VStack>
                    <Text className="text-base font-medium text-typography-500">
                        {currentCondition?.weatherDesc[0].value || 'Nắng'}
                    </Text>
                    <HStack space="sm">
                        <Field label="Độ ẩm" icon={<Ionicons name="water-outline" size={14} />} value={currentCondition?.humidity} />
                        <Field label="UV" icon={<Ionicons name="sunny-outline" size={14} />} value={currentCondition?.uvIndex} />
                    </HStack>
                </VStack>
        </VStack>
    );
}