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
import { SpecialDish } from "@/types";


interface Props extends ViewProps {
    specialDish: SpecialDish;
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
                            "text-typography-0 font-semibold",
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
        <Center
            className={twMerge(
                "relative aspect-square rounded-2xl overflow-hidden",
                size === 'sm' && "w-32",
                size === 'md' && "w-48",
                size === 'lg' && " w-64",
                size === 'full' && "w-full h-full",
            )}
            onTouchEnd={() => router.push(`/cursine/${specialDish.id}`)}
            {...props}
        >
            <Image
                alt={specialDish.name}
                source={{ uri: specialDish.image }}
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
