import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import { Center } from "../ui/center";
import { Image } from "../ui/image";
import { twMerge } from "tailwind-merge";
import { HStack } from "../ui/hstack";
import { BlurButton, Button } from "../ui/button";
import { Ionicons } from "@expo/vector-icons";
import { VStack } from "../ui/vstack";
import { Text } from "../ui/text";
import { Dish } from "@/types";
import { Pressable } from "react-native";


interface Props extends ViewProps {
    specialDish: Dish;
    size?: 'sm' | 'md' | 'lg' | 'full';
}
export function SpecialDishViewCard({ specialDish, size = 'md', ...props }: Props) {
    const router = useRouter();
    const Toolbar = () => {
        // like (heart icon) button and (share icon) button
        return (
            <HStack className="w-full p-4 relative">
                <BlurButton>
                    <Ionicons name="share-social-outline" size={24} color="white" />
                </BlurButton>
            </HStack>
        );
    }
    const Footer = () => {
        return (
            <VStack className="w-full p-4">
                <HStack>
                    <Text
                        className={twMerge(
                            "text-typography-900 font-semibold",
                            size === 'sm' && "text-2xs",
                            size === 'md' && "text-base",
                            size === 'lg' && "text-lg",
                            size === 'full' && "text-2xl",
                        )}
                    >
                        {specialDish.name}
                    </Text>
                </HStack>
            </VStack>
        )
    }
    return (
        <Pressable onPress={() => router.push(`/cursine/${specialDish.id}`)}>
            <HStack
                className={twMerge(
                    "rounded-2xl overflow-visible shadow-hard-2 p-2 w-full h-20 bg-background-0",
                )}
                {...props}
            >
                <Image
                    alt={specialDish.name}
                    source={{ uri: specialDish.image }}
                    className={twMerge(
                        "w-auto h-full aspect-square rounded-2xl object-cover",
                    )}
                />

                <VStack className="justify-between items-center w-full h-full">
                    <Footer />
                </VStack>

                <Toolbar />
            </HStack>
        </Pressable>
    );
}
