import { Restaurant } from "@/types";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { router } from 'expo-router';

import { Center } from "../ui/center";
import { Image } from "../ui/image";
import { twMerge } from "tailwind-merge";
import { HStack } from "../ui/hstack";
import { BlurButton, Button, ButtonText } from "../ui/button";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { VStack } from "../ui/vstack";
import { Text } from "../ui/text";
import { View } from "../ui/view";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Platform, PanResponder, Animated, Pressable } from "react-native";
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from "../ui/modal";
import React, { useRef } from "react";
import { Dash } from "../ui/dash";
import { useLocation } from "@/contexts/location";
import { haversineDistance } from "@/utils";
import Field from "../ui/field";

interface Props extends ViewProps {
    restaurant: Restaurant;
    showCard?: boolean;
}
export function RestaurantReviewMap({ restaurant, showCard = true, ...props }: Props) {
    const [showModal, setShowModal] = React.useState(false);
    const pan = useRef(new Animated.ValueXY()).current;
    const { location } = useLocation();

    const Toolbar = () => {
        // like (heart icon) button and (share icon) button
        return (
            <HStack className="w-full h-fit py-4 justify-between items-center">
                <Field
                    icon={<Ionicons name="analytics-outline" size={24} color="white" />}
                    label="Khoảng cách"
                    value={haversineDistance(location?.coords.latitude!, location?.coords.longitude!, restaurant.latitude!, restaurant.longitude!).toFixed(2) + ' km' || '0 km'}
                />
                <Button
                    size="md"
                    variant="solid"
                    className="rounded-full h-fit p-4"
                    onPress={() => {
                        setShowModal(false)
                        router.push(`/restaurant/${restaurant.id}` as any)
                    }}
                >
                    <AntDesign name="arrowright" size={24} color="black" />
                </Button>
            </HStack >
        );
    }

    return (
        <Center>
            <Pressable onPress={() => setShowModal(!showModal)}>
                <HStack className="rounded-full bg-background-0 h-fit p-1 w-fit" space="sm">
                    <Image
                        alt={restaurant.name}
                        source={{ uri: restaurant.image }}
                        className={twMerge(
                            "w-8 h-8 object-cover rounded-full shadow-hard-2",
                        )}
                    />
                </HStack>
            </Pressable>
            <Modal
                isOpen={showModal && showCard}
                closeOnOverlayClick={true}
                onClose={() => setShowModal(false)}
                className='justify-end'
                size="lg"
            >
                <ModalBackdrop />
                <ModalContent
                    className={'rounded-[32] justify-center items-center'}
                >
                    <ModalHeader className="flex justify-center items-centerr">
                        <Toolbar />
                    </ModalHeader>
                    <ModalBody>
                        <VStack
                            className="relative w-full h-fit bg-background-0"
                            space="md"
                            // navigation to the restaurant detail page, use router
                            {...props}
                        >
                            <Text
                                className="text-typography-900 text-center text-3xl font-semibold"
                            >
                                {restaurant.name}
                            </Text>
                            <Image
                                alt={restaurant.name}
                                source={{ uri: restaurant.image }}
                                className={twMerge(
                                    "w-full h-auto aspect-square object-cover rounded-[32]",
                                )}
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Text className='text-md font-semibold'>
                            Nhà hàng
                        </Text>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Center>
    );
}
