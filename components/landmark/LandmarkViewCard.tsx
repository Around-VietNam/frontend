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
import { Platform } from "react-native";

interface Props extends ViewProps {
    landmark: Landmark;
}
export function LandmarkViewCard({ landmark, ...props }: Props) {
    // get platform
    const platform = Platform.OS;
    
    const Toolbar = () => {
        // like (heart icon) button and (share icon) button
        return (
            <HStack className="w-full p-4">
                {platform === 'ios' ? (
                    <View className="w-fit h-fit overflow-hidden rounded-full">
                        <BlurView experimentalBlurMethod="dimezisBlurView" intensity={25} style={{
                            borderRadius: 99,
                        }} >
                            <Button
                                size="lg"
                                className="rounded-full p-4 bg-background-0/25"
                                variant="glass"
                            >
                                <Ionicons name="heart-outline" size={24} color="white" />
                            </Button>
                        </BlurView>
                    </View>
                ) : (
                    <BlurButton
                        className="rounded-full p-4 bg-background-0/25"
                        size="lg"
                        variant="glass"
                    >
                        <Ionicons name="heart-outline" size={24} color="white" />
                    </BlurButton>
                )}
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
            className="relative w-full min-w-64 aspect-square rounded-3xl overflow-hidden shadow-hard-2"
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
