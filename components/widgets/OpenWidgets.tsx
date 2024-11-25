import React from 'react';
import { ScrollView, Dimensions, StyleSheet } from 'react-native';
import { VStack } from "../ui/vstack";
import { SituationWidget } from './SituationWidget';
import { TrafficWidget } from "./TrafficWidget";
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { View } from 'react-native';

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

    return (
        <VStack className="w-full flex-1 justify-center items-center shadow-soft-1" >
            <Carousel
                ref={carouselRef}
                width={360}
                height={180}
                data={data}
                renderItem={({ item, index }) => (
                    <View
                        className='flex-1 justify-center items-center'
                        key={index}
                    >
                        {item}
                    </View>
                )}
            />
        </VStack>
    );
}
