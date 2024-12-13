import { ViewProps } from "react-native";
import { VStack } from "../ui/vstack";
import { HStack } from "../ui/hstack";
import { Text } from "../ui/text";
import { Ionicons } from "@expo/vector-icons";
import { Button, ButtonText } from "../ui/button";
import { MinimapV2 } from "../map";
import Field from "../ui/field";
import { useTraffic } from "@/hooks/useTraffic";

interface Props extends ViewProps { }
export function TrafficWidget({ ...props }: Props) {
    const { address, formattedDate } = useTraffic();

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
                <VStack className="h-full justify-between" space="md">
                    <Field
                        icon={<Ionicons name="location-sharp" size={14} />}
                        label="Địa điểm"
                        value={`${address.road}, ${address.suburb}, ${address.city}`}
                    />
                    <Field
                        icon={<Ionicons name="calendar" size={14} />}
                        label="Thơi gian"
                        value={formattedDate}
                    />
                    <Field
                        icon={<Ionicons name="car-sport" size={14} />}
                        label="Tình trạng"
                        value="Đang chạy"
                    />
                </VStack>
            </HStack>
        </VStack>
    )
}