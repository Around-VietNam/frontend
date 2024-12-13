import { Landmark } from "@/types";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { router } from 'expo-router';

import { Center } from "../ui/center";
import { Image } from "../ui/image";
import { twMerge } from "tailwind-merge";
import { HStack } from "../ui/hstack";
import { BlurButton, Button } from "../ui/button";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { VStack } from "../ui/vstack";
import { Text } from "../ui/text";
import { View } from "../ui/view";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Platform, Pressable } from "react-native";
import { haversineDistance } from "@/utils";
import { useLocation } from "@/contexts/location";
import Field from "../ui/field";

interface Props extends ViewProps {
    landmark: Landmark;
    onClick?: () => void;
}
export function LandmarkViewCard({ landmark, ...props }: Props) {
    // get platform
    const platform = Platform.OS;
    const { location } = useLocation();

    const Toolbar = () => {
        // like (heart icon) button and (share icon) button
        return (
            <HStack className="w-full h-fit py-4 justify-between items-center">
                <Field
                    icon={<Ionicons name="analytics-outline" size={24} color="white" />}
                    label="Khoảng cách"
                    value={haversineDistance(location?.coords.latitude!, location?.coords.longitude!, landmark.latitude!, landmark.longitude!).toFixed(2) + ' km' || '0 km'}
                />
                <Button
                    size="md"
                    variant="solid"
                    className="rounded-full h-fit p-4"
                    onPress={() => router.push(`/landmark/${landmark.id}`)}
                >
                    <Ionicons name="heart-outline" size={24} color="black" />
                </Button>
            </HStack >
        );
    }
    const Footer = () => {
        return (
            <VStack className="w-full p-4">
                <HStack>
                </HStack>
                {/* <VStack space="sm" className="h-fit w-full">
                    <Text className="text-white text-2xs flex flex-row items-center">
                        <Ionicons name="location-outline" size={16} color="#808080" className="text-typography-500" />
                        {landmark.address}
                    </Text>
                    <Text className="text-white text-2xs flex flex-row items-center">
                        <MaterialCommunityIcons name="scooter" size={16} color="#808080" className="text-typography-500" />
                        {haversineDistance(location?.coords.latitude!, location?.coords.longitude!, landmark.latitude!, landmark.longitude!).toFixed(2) + ' km' || '0 km'}
                    </Text>
                    <Text className="text-white text-2xs flex flex-row items-center">
                        <AntDesign name="star" size={16} color="#FFC53C" />
                        {landmark.rating}
                    </Text>
                </VStack> */}
            </VStack>
        )
    }
    return (
        <Pressable
            //  onPress={() => router.push(`/landmark/${landmark.id}`)}
            onPress={props.onClick}
        >
            <VStack
                className="relative w-full h-fit p-4 rounded-[32] bg-background-0"
                space="md"
                // navigation to the landmark detail page, use router
                {...props}
            >
                <Toolbar />
                <Text
                    className="text-typography-900 text-center text-3xl font-semibold"
                >
                    {landmark.name}
                </Text>
                <Image
                    alt={landmark.name}
                    source={{ uri: landmark.image }}
                    className={twMerge(
                        "w-full h-auto aspect-square object-cover rounded-[32]",
                    )}
                />
            </VStack>
        </Pressable>
    );
}
