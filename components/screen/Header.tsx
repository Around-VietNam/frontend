import { ReactNode } from "react";
import { ViewProps } from "react-native";

import { View } from "../ui/view";
import { VStack } from "../ui/vstack";
import { Text } from "../ui/text";
import { HStack } from "../ui/hstack";
import { Ionicons } from "@expo/vector-icons";

type BadgeType = "Du lịch" | "Ẩm thực" | "Nhà hàng" | "Khác";
interface Props extends ViewProps {
    more?: ReactNode;
    title: ReactNode;
    badge?: BadgeType;
}
export function Header({ more, title, badge = "Khác", ...props }: Props) {
    const getBadgeIcon = (type: BadgeType) => {
        const size = 16;
        switch (type) {
            case "Du lịch":
                return <Ionicons name="map-outline" size={size} />;
            case "Nhà hàng":
                return <Ionicons name="restaurant-outline" size={size} />;
            case "Ẩm thực":
                return <Ionicons name="fast-food-outline" size={size} />;
            case "Khác":
                return <Ionicons name="ellipsis-horizontal-outline" size={size} />;
        }
    };

    return (
        <VStack {...props} space="md">
            <HStack className="px-2 py-1 rounded-full bg-background-900 text-typography-0 items-center justify-center w-32" space="sm">
                <Text className="text-md font-medium text-typography-0">
                    {getBadgeIcon(badge)}
                </Text>
                <Text className="text-md font-medium text-typography-0">
                    {badge}
                </Text>
            </HStack>
            <View>
                <Text className="text-2xl font-semibold text-typography-900">
                    {title}
                </Text>
            </View>
            <View>
                {more}
            </View>
        </VStack>
    );
}