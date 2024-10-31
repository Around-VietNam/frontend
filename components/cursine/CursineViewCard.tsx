import { Cursine } from "@/types";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { Center } from "../ui/center";
import { Image } from "../ui/image";
import { twMerge } from "tailwind-merge";
import { HStack } from "../ui/hstack";
import { Button } from "../ui/button";
import { Ionicons } from "@expo/vector-icons";
import { VStack } from "../ui/vstack";
import { Text } from "../ui/text";
import { View } from "../ui/view";
import { BlurView } from "expo-blur";

interface Props extends ViewProps {
    cursine: Cursine;
}
export function CursineViewCard({ cursine, ...props }: Props) {
    const Toolbar = () => {
        // like (heart icon) button and (share icon) button
        return (
            <HStack className="w-full p-4">
                <BlurView intensity={50} style={{
                    borderRadius: 999,
                }}>
                    <Button
                        size="lg"
                        className="rounded-full p-4"
                        variant="glass"
                    >
                        <Ionicons name="heart-outline" size={24} color="white" />
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
                        {cursine.name}
                    </Text>
                </HStack>
                <HStack>
                    <Text className="text-white text-2xs flex flex-row items-center">
                        <Ionicons name="location-outline" size={16} color="gray" className="text-typography-500" />
                        {cursine.location}
                    </Text>
                </HStack>
            </VStack>
        )
    }
    return (
        <Center
            className="relative w-full min-w-64 aspect-square rounded-2xl overflow-hidden"
            {...props}
        >
            <Image
                alt={cursine.name}
                source={{ uri: cursine.image }}
                className={twMerge(
                    "w-full h-full object-cover",
                    "absolute top-0 left-0",
                )}
            />
            <VStack className="justify-between items-center w-full h-full">
                <Toolbar />
                <Footer />
            </VStack>
        </Center>
    );
}
