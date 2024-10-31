import { ViewProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Button } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { VStack } from "../../../components/ui/vstack";
import { Heading } from "../../../components/ui/heading";
import { Text } from "../../../components/ui/text";
import { useLocation } from "@/contexts/location";

interface UserAccorditionProps extends ViewProps {
}
export function UserAccordition(props: UserAccorditionProps) {
    const { address } = useLocation();

    return (
        <HStack {...props} space="md" className="flex-1">
            <Menu
                placement="bottom left"
                offset={16}
                trigger={({ ...triggerProps }) => {
                    return (
                        <Button {...triggerProps} size="lg" variant="link" className="p-0">
                            <Avatar
                                size="md"
                            >
                                <AvatarFallbackText>Jane Doe</AvatarFallbackText>
                                <AvatarImage
                                    source={{
                                        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                                    }}
                                />
                                <AvatarBadge />
                            </Avatar>
                        </Button>
                    )
                }}
            >
                <MenuItem key="Add account" textValue="Add account">
                    <MenuItemLabel size="sm">Add account</MenuItemLabel>
                </MenuItem>
                <MenuItem key="Log out" textValue="Log out">
                    <MenuItemLabel size="sm">Log out</MenuItemLabel>
                </MenuItem>
            </Menu>
            <VStack className="flex-1">
                <Heading size="md" className="text-typography-900">BestBack</Heading>
                <Text size="2xs" className="text-typography-500 w-64">
                    {address ? `${address.road}, ${address.suburb}, ${address.city}` : 'Fetching location...'}
                    <Ionicons name="location" size={12} color="#FF2929" />
                </Text>
            </VStack>
        </HStack>
    )

}