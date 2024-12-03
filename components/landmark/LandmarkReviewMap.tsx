import { Landmark } from "@/types";
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

interface Props extends ViewProps {
    landmark: Landmark;
}
export function LandmarkReviewMap({ landmark, ...props }: Props) {
    const [showModal, setShowModal] = React.useState(false);
    const pan = useRef(new Animated.ValueXY()).current;
    const { location } = useLocation();

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [null, { dy: pan.y }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: (e, gestureState) => {
                if (gestureState.dy > 100) {
                    setShowModal(false);
                } else {
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false,
                    }).start();
                }
            },
        })
    ).current;
    // get platform
    const platform = Platform.OS;

    const Footer = () => {
        return (
            <VStack className="w-full" space="md">
                <Button onPress={() => {
                    setShowModal(false);
                    router.push(`/landmark/${landmark.id}`)
                }} className="w-full" size="lg">
                    <ButtonText>
                        Xem chi tiết
                    </ButtonText>
                </Button>
            </VStack>
        )
    }
    return (
        <Center>
            <Pressable onPress={() => setShowModal(!showModal)}>
                <HStack className="rounded-full bg-background-0 h-fit p-1 w-fit" space="sm">
                    <Image
                        alt={landmark.name}
                        source={{ uri: landmark.image }}
                        className={twMerge(
                            "w-8 h-8 object-cover rounded-full shadow-hard-2",
                        )}
                    />
                </HStack>
            </Pressable>
            <Modal
                isOpen={showModal}
                closeOnOverlayClick={true}
                onClose={() => setShowModal(false)}
                className='justify-end'
                size="full"
            >
                <ModalBackdrop />
                <ModalContent
                    className={'rounded-3xl'}
                >
                    <ModalHeader className="flex justify-center w-full">
                        <Dash />
                    </ModalHeader>
                    <ModalBody>
                        <VStack className="w-full flex-1" space="md">
                            <Image
                                alt={landmark.name}
                                source={{ uri: landmark.image }}
                                className={twMerge(
                                    "w-full h-64 object-cover rounded-3xl shadow-hard-2",
                                )}
                            />
                            <Text
                                className="text-typography-900 text-2xl font-semibold"
                            >
                                {landmark.name}
                            </Text>
                            <Text className="text-typography-900 text-2xs flex flex-row items-center gap-1">
                                <Ionicons name="location-outline" size={16} color="#808080" className="text-typography-500" />
                                {landmark.address}
                            </Text>
                            <Text className="text-typography-900  text-2xs flex flex-row items-center gap-1">
                                <MaterialCommunityIcons name="scooter" size={16} color="#808080" className="text-typography-500" />
                                {haversineDistance(location?.coords.latitude!, location?.coords.longitude!, landmark.latitude!, landmark.longitude!).toFixed(2) + ' km' || '0 km'}
                            </Text>
                            <Text className="text-typography-900  text-2xs flex flex-row items-center gap-1">
                                <AntDesign name="star" size={16} color="#FFC53C" />
                                {landmark.rating}
                            </Text>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Footer />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Center>
    );
}
