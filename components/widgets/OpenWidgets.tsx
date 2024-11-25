import React from 'react';
import { ScrollView, Dimensions, StyleSheet } from 'react-native';
import { VStack } from "../ui/vstack";
import { SituationWidget } from './SituationWidget';
import { TrafficWidget } from "./TrafficWidget";
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate, Extrapolate, Extrapolation } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface Props {
    // Add props here if needed
}

const widgets = [
    <SituationWidget key="situation" />,
    <TrafficWidget key="traffic" />,
];

export function OpenWidgets({ ...props }: Props) {
    const scrollX = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollX.value = event.contentOffset.x;
    });

    return (
        <VStack className="w-full h-32 justify-center items-center p-4 shadow-soft-1 overflow-visible">
            <Animated.ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                style={styles.scrollView}
            >
                {widgets.map((widget, index) => {
                    const animatedStyle = useAnimatedStyle(() => {
                        const scale = interpolate(
                            scrollX.value,
                            [(index - 1) * width, index * width, (index + 1) * width],
                            [0.8, 1, 0.8],
                            Extrapolation.CLAMP
                        );
                        return {
                            transform: [{ scale }],
                        };
                    });

                    return (
                        <Animated.View key={index} style={[styles.item, animatedStyle]}>
                            {widget}
                        </Animated.View>
                    );
                })}
            </Animated.ScrollView>
        </VStack>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        width: '100%',
        height: '100%',
        overflow: 'visible',
    },
    item: {
        width: width, // Đặt chiều rộng của item bằng chiều rộng của màn hình
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible',
    },
});