import { ViewProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Button } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { useLocation } from "@/contexts/location";

import { Heading } from "../ui/heading";
import { VStack } from "../ui/vstack";
import { Text } from "../ui/text";
import { useAuth } from "@/hooks/useAuth";

interface UserAccorditionProps extends ViewProps {
}
export function UserAccordition(props: UserAccorditionProps) {
    const { address } = useLocation();
    const { account } = useAuth();

    return (
        <HStack {...props} space="md" className="flex-1">
            <Menu
                placement="bottom left"
                offset={4}
                trigger={({ ...triggerProps }) => {
                    return (
                        <Button {...triggerProps} size="lg" variant="link" className="p-0">
                            <Avatar
                                size="md"
                            >
                                <AvatarFallbackText>Jane Doe</AvatarFallbackText>
                                <AvatarImage
                                    source={{
                                        uri: account?.avatar_url || "https://media1.thehungryjpeg.com/thumbs2/ori_4282224_op7jqj6mjumuo4g1trk6qs8yee175dln0i1f80px_cute-baby-duck-logo-vector-design-template.jpg",
                                    }}
                                />
                                <AvatarBadge />
                            </Avatar>
                        </Button>
                    )
                }}
            >
                <MenuItem key="Log out" textValue="Log out">
                    <MenuItemLabel size="sm">Log out</MenuItemLabel>
                </MenuItem>
            </Menu>
            <VStack className="flex-1">
                <Text size="md" className="text-typography-500 font-normal">Xin chào &#x1F44B; <Text className="text-typography-900 font-bold">{account?.name}</Text></Text>
                <Text size="md" className="text-typography-500  font-normal">
                    {/* {address ? `${address.road}, ${address.suburb}, ${address.city}` : 'Fetching location...'}
                    <Ionicons name="location" size={12} color="#FF2929" /> */}
                    Hãy tận hưởng!
                </Text>
            </VStack>
        </HStack>
    )

}