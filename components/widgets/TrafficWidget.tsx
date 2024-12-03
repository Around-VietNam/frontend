import { ViewProps } from "react-native";
import { VStack } from "../ui/vstack";
import { HStack } from "../ui/hstack";
import { Text } from "../ui/text";
import { Ionicons } from "@expo/vector-icons";
import { Button, ButtonText } from "../ui/button";
import { MinimapV2 } from "../map";
import Field from "../ui/field";
import { useLocation } from "@/contexts/location";

interface Props extends ViewProps { }
export function TrafficWidget({ ...props }: Props) {
    const { address } = useLocation();

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
        <VStack className="bg-background-0 p-4 rounded-3xl w-full h-full" space="md">
            <VStack className="flex-1 w-full" space="md">
                <MinimapV2 className="flex-1"/>
                <VStack className="flex-[2] justify-between" space="md">
                    <Field
                        icon={<Ionicons name="location-sharp" size={14} />}
                        label="Địa điểm"
                        value={`${address.road}, ${address.suburb}, ${address.city}`}
                    />
                    <Field
                        icon={<Ionicons name="calendar" size={14} />}
                        label="Thơi gian"
                        value={formatDate(new Date())}
                    />
                    <Field
                        icon={<Ionicons name="car-sport" size={14} />}
                        label="Tình trạng"
                        value="Đang chạy"
                    />
                </VStack>
            </VStack>
        </VStack>
    )
}