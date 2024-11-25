import { ViewProps } from "react-native";
import { VStack } from "../ui/vstack";
import { HStack } from "../ui/hstack";
import { Text } from "../ui/text";
import { Ionicons } from "@expo/vector-icons";
import { Button, ButtonText } from "../ui/button";
import { Minimap } from "../map";

interface Props extends ViewProps { }
export function TrafficWidget({ ...props }: Props) {
    return (
        <VStack className="bg-background-0 p-4 rounded-3xl w-full h-64">
            <HStack space="sm">
                <Ionicons name="car-sport" size={16} color={"hsl(var(--color-typography-500))"} />
                <Text className="text-base font-semibold text-typography-900"> Tình trạng giao thông</Text>
            </HStack>
            <Minimap />
            <HStack>
                <Minimap />
            </HStack>
            <Button size="sm" >
                <ButtonText>
                    Mở map
                </ButtonText>
            </Button>
        </VStack>
    )
}