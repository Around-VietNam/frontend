import { ViewProps } from "react-native";
import { VStack } from "../ui/vstack";
import { HStack } from "../ui/hstack";
import { Text } from "../ui/text";
import { MinimapV2 } from "../map";
import { useLocation } from "@/contexts/location";
import { useWeather } from "@/hooks/useWeather";
import { Center } from "../ui/center";
import Field from "../ui/field";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props extends ViewProps { }
export function OpenWidget({ ...props }: Props) {
    const { address } = useLocation();
    const { currentCondition } = useWeather();

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <VStack className="bg-background-0 p-2 rounded-3xl w-3/4 h-fit" space="md">
            <HStack className="flex-1 w-full" space="md">
                <MinimapV2
                    style={{
                        width: 96,
                        height: 96,
                        borderRadius: 18,
                    }}
                />
                <VStack className="h-full flex-1 justify-between" space="md">
                    <Center className="bg-background-400 w-fit h-fit p-1 rounded-full max-w-16">
                        <Text className="text-2xs text-typography-900 flex-1">
                            {currentCondition?.weatherDesc[0].value}
                        </Text>
                    </Center>
                    <Text
                        className="text-md font-semibold text-typography-900 flex-1 w-full"
                    >
                        {address.suburb}, {address.city}
                    </Text>
                    <HStack space="sm" className="w-full">
                        <Field
                            icon={<MaterialCommunityIcons name="thermometer" color={"gray"} size={14} />}
                            label="Nhiệt độ"
                            value={`${currentCondition?.temp_C}°C`}
                        />
                        <Field
                            icon={<MaterialCommunityIcons name="water" color={"gray"} size={14} />}
                            label="Độ ẩm"
                            value={currentCondition?.humidity}
                        />
                        <Field
                            icon={<MaterialCommunityIcons name="weather-sunny" color={"gray"} size={14} />}
                            label="UV"
                            value={currentCondition?.uvIndex}
                        />
                    </HStack>
                </VStack>
            </HStack>
        </VStack>
    )
}