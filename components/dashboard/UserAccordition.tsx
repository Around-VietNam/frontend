import { ViewProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Button } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { VStack } from "../ui/vstack";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";
import * as Location from 'expo-location';
import React from "react";
import { Api } from "@/constants/Api";

interface UserAccorditionProps extends ViewProps {
}
export function UserAccordition(props: UserAccorditionProps) {
    const [location, setLocation] = React.useState<Location.LocationObject | null>(null);
    const [address, setAddress] = React.useState<string | null>(null);
    const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

    React.useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            const { latitude, longitude } = location.coords;
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${Api.opencagedata.key}`);
            const data = await response.json();
            if (data.results.length > 0) {
                const { road, suburb, city } = data.results[0].components;
                setAddress(`${road}, ${suburb}, ${city}`);
            }
        })();
    }, []);

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
                    {address ? address : 'Fetching location...'}
                    <Ionicons name="location" size={12} color="#FF2929" />
                </Text>
            </VStack>
        </HStack>
    )

}