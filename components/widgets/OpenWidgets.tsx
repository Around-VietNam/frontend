import React from 'react';
import { ScrollView, Dimensions, StyleSheet } from 'react-native';
import { VStack } from "../ui/vstack";
import { SituationWidget } from './SituationWidget';
import { TrafficWidget } from "./TrafficWidget";
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { View } from 'react-native';
import { HStack } from '../ui/hstack';
import { Button, ButtonText } from '../ui/button';
import { Center } from '../ui/center';

const { width } = Dimensions.get('window');

interface Props {
    // Add props here if needed
}

const data = [
    <TrafficWidget />,
    <SituationWidget />,
]


export function OpenWidgets({ ...props }: Props) {
    const carouselRef = React.useRef<ICarouselInstance>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const Tabs = () => {
        const tabs = ['Giao thông', 'Tình hình'];

        return (
            <HStack className='bg-background-900 w-fit h-fit p-1 rounded-full justify-center items-center' space='md'>
                {
                    tabs.map((tab, index) => (
                        <Button
                            key={index}
                            onPress={() => carouselRef.current?.scrollTo({
                                index,
                                animated: true,
                            })}
                            className={selectedIndex === index ? 'bg-background-0' : 'bg-background-900'}
                        >
                            <ButtonText className={selectedIndex === index ? 'text-typography-900' : 'text-typography-0'}>{tab}</ButtonText>
                        </Button>
                    ))
                }
            </HStack>
        )
    }

    return (
        <VStack className="w-full aspect-square flex-1 justify-center items-center shadow-soft-1 z-50 rounded-3xl" space='md'>
            <Tabs />
            <Carousel
                ref={carouselRef}
                width={360}
                data={data}
                style={{ height: 300 }}
                renderItem={({ item, index }) => (
                    <View
                        className='flex-1 justify-center items-center'
                        key={index}
                    >
                        {item}
                    </View>
                )}
                onSnapToItem={(index) => setSelectedIndex(index)}
            />
        </VStack>
    );
}
