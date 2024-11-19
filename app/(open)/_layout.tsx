import React from 'react';
import { Slot } from 'expo-router';
import { Image, StyleSheet, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';

import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Center } from '@/components/ui/center';
import { App } from '@/constants/App';
import Carousel from 'react-native-reanimated-carousel';
import { Box } from '@/components/ui/box';
import { ThemedView } from '@/components/ThemedView';

const coverImages = [
    require('@/assets/images/ha-long-bay.jpg'),
    require('@/assets/images/ba-na-hill.jpg'),
];

export default function OpenLayout() {
    return (
        <VStack className='box-content w-full flex-1 p-4 justify-center' space='lg'>
            <ThemedView className='flex-grow-[12] w-full relative'>
                <Carousel
                    style={{
                        width: '100%',
                        height: "100%",
                        borderRadius: 24,
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                    }}
                    width={640}
                    data={[...coverImages.keys()]}
                    autoPlay
                    loop
                    autoPlayInterval={5e3}
                    renderItem={({ item }) => (
                        <Image
                            source={coverImages[item]}
                            style={styles.image}
                            resizeMode='cover'
                        />
                    )}
                />
                <Center className='absolute top-8 w-full'>
                    <Text
                        size='sm'
                        className='font-light text-center bg-white/50 rounded-lg px-2 p-1 text-white w-fit '
                    >
                        {App.version}
                    </Text>
                </Center>

            </ThemedView>
            <VStack className='flex-grow-[1] w-full items-center justify-start p-0' space='md'>
                <Text size='4xl' className='text-typography-900 font-semibold capitalize text-center'>{App.name}</Text>
                <Text
                    size='md'
                    className='text-typography-900 font-light'
                    style={{
                        textAlign: 'center',
                    }}
                >
                    {App.welcomeText}
                </Text>
            </VStack>
            <Box className='w-full flex-grow-[1]'>
                <Slot />
            </Box>
        </VStack>
    );
}
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',

        // decrease brightness
        opacity: 0.9,
    },
});

