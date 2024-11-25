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
                variant="rounded"
                className="w-full rounded-full h-14 shadow-hard-2 bg-background-0 border-0"
            >
                <InputField
                    placeholder="Search"
                    type='text'
                />
            </Input>
        </Center>
    )
}