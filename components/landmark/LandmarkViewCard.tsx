import { Landmark } from "@/types";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { router } from 'expo-router';

import { Center } from "../ui/center";
import { Image } from "../ui/image";
import { twMerge } from "tailwind-merge";
import { HStack } from "../ui/hstack";
import { Button } from "../ui/button";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { VStack } from "../ui/vstack";
import { Text } from "../ui/text";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { LinkText } from "../ui/link";

interface Props extends ViewProps {
    landmark: Landmark;
}
export function LandmarkViewCard({ landmark, ...props }: Props) {

    const Toolbar = () => {
        // like (heart icon) button and (share icon) button
        return (
            <HStack className="w-full p-4">
                <BlurView intensity={100} style={{
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    borderRadius: 999,
                }}>
                    <Button
                        size="lg"
                        className="rounded-full p-4 bg-transparent"
                        variant="solid"
                    >
                        <Ionicons name="heart-outline" size={24} color="black" />
                    </Button>
                </BlurView>
            </HStack>
        );
    }
    const Footer = () => {
        return (
            <VStack className="w-full p-4">
                <HStack>
                    <Text
                        className="text-typography-0 text-2xl font-semibold"
                    >
                        {landmark.name}
                    </Text>
                </HStack>
                <VStack space="sm" className="h-fit w-full">
                    <Text className="text-white text-2xs flex flex-row items-center">
                        <Ionicons name="location-outline" size={16} color="#808080" className="text-typography-500" />
                        {landmark.address}
                    </Text>
                    <Text className="text-white text-2xs flex flex-row items-center">
                        <MaterialCommunityIcons name="scooter" size={16} color="#808080" className="text-typography-500" />
                        {landmark.region}
                    </Text>
                    <Text className="text-white text-2xs flex flex-row items-center">
                        <AntDesign name="star" size={16} color="#FFC53C" />
                        {landmark.rating}
                    </Text>
                </VStack>
            </VStack>
        )
    }
    return (
        <Center
            className="relative w-full min-w-64 aspect-square rounded-2xl overflow-hidden shadow-hard-2"
            // navigation to the landmark detail page, use router
            onTouchEnd={() => router.push(`/landmark/${landmark.id}`)}
            {...props}
        >
            <Image
                alt={landmark.name}
                source={{ uri: landmark.image }}
                className={twMerge(
                    "w-full h-full object-cover",
                    "absolute top-0 left-0",
                )}
            />
            <LinearGradient
                // Background Linear Gradient
                colors={['transparent', 'rgba(0,0,0,0.5)']}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: '50%',
                    zIndex: 0,
                }}
            />
            <VStack className="justify-between items-center w-full h-full">
                <Toolbar />
                <Footer />
            </VStack>
        </Center>
    );
}
