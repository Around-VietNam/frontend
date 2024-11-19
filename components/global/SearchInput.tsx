import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useLocation } from "@/contexts/location";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ViewProps } from "react-native";

interface Props extends ViewProps {

}
export function SearchInput(props: Props) {
    const { address } = useLocation();

    return (
        <Center
            {...props}
            className="w-full"
        >
            <Input
                size="lg"
                className="w-full rounded-full h-fit p-1"
            >
                <HStack
                    className="px-4 py-2 items-center justify-center bg-background-50 rounded-full"
                >
                    <Ionicons name="location" size={16} color="gray" />
                    <Text
                        className="truncate"
                    >
                        {address ? address.city : 'Fetching location...'}
                    </Text>
                </HStack>
                <InputField
                    placeholder="Search"
                    type='text'
                />
            </Input>
        </Center>
    )
}