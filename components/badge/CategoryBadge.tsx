import { ViewProps } from "react-native";
import { Text } from "../ui/text";
import { Ionicons } from "@expo/vector-icons";
import { HStack } from "../ui/hstack";

type Category = 'landmark' | 'specialDish';
interface Props extends ViewProps {
    category: Category;
}
export function CategoryBadge({ category, ...props }: Props) {
    const getCategoryIcon = () => {
        switch (category) {
            case 'landmark':
                return <Ionicons name="map-outline" size={16} color="white" />;
            case 'specialDish':
                return <Ionicons name="fast-food-outline" size={16} color="white" />;
            default:
                return null;
        }
    }
    return (
        <HStack {...props} className="bg-background-900 rounded-full px-3 py-1 items-center justify-center" space="sm">
            {getCategoryIcon()}
            <Text className="text-typography-0 text-base font-medium capitalize">
                {category}
            </Text>
        </HStack>
    )
}