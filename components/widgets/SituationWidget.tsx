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
import { Image } from "../ui/image";
import { ImageBackground } from "../ui/image-background";

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
                "w-full h-full p-6 rounded-2xl bg-background-0",
            )}
        >
            <Text>Loading...</Text>
        </Center>
    )
    return (
        <VStack className="relative w-full h-full p-4 rounded-3xl justify-between overflow-hidden" >
            <ImageBackground
                source={{
                    uri: "https://images.unsplash.com/photo-1566010503302-2564ae0d47b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                }}
                style={{
                    width: "100%",
                    height: "100%",
                    transform: [{
                        scale: 1.5
                    }],
                    position: "absolute",
                }}
            />
            <HStack
                className={twMerge(
                    "w-full justify-between p-4",
                )}
            >
                <VStack>
                    <Text className="text-6xl font-bold text-white">
                        {currentCondition?.temp_C}°C
                    </Text>
                    <Text className="text-white font-medium">
                        Feel like {currentCondition?.FeelsLikeC}°C
                    </Text>
                </VStack>
                <Text className="text-lg text-white">
                    {currentCondition?.weatherDesc[0].value || "N/A"}
                </Text>
            </HStack>
            <VStack className="p-4">
                <VStack space="sm">
                    <Field label="Độ ẩm" icon={<Ionicons name="water" size={14} color={"white"} />} value={currentCondition?.humidity} classNames={{
                        value: "text-white"
                    }} />
                    <Field label="UV" icon={<Ionicons name="sunny" size={14} color={"white"} />} value={currentCondition?.uvIndex} classNames={{
                        value: "text-white"
                    }} />
                </VStack>
            </VStack>
        </VStack>
    );
}