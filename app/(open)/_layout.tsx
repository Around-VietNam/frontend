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
import { HStack } from '@/components/ui/hstack';
import { Logo } from '@/components/icons';

const coverImages = [
    require('@/assets/images/ha-long-bay.jpg'),
    require('@/assets/images/ba-na-hill.jpg'),
];

export default function OpenLayout() {
    return (
        <VStack className='box-content w-full flex-1 p-4 justify-center' space='lg'>
            <VStack className='flex-grow-[12] w-full justify-between relative'>
                <HStack className='z-50 px-4 py-8 items-center' space='sm'>
                    <Logo size={32} />
                    <Text size='2xl' className='text-white font-semibold capitalize'>{App.name}</Text>
                </HStack>
                <VStack className='absolute w-full h-full -z-50'>
                    <Carousel
                        style={{
                            width: '100%',
                            height: '100%',
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
                </VStack>
                <VStack className='w-full items-center justify-start p-4' space='md'>
                    <Text size='3xl' className='text-white font-bold capitalize text-center'>{App.headline}</Text>
                    <Text
                        size='md'
                        className='text-white font-light'
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        {App.welcomeText}
                    </Text>
                    <Text
                        size='sm'
                        className='font-light text-center border border-white rounded-lg px-2 p-1 text-white w-fit '
                    >
                       Version {App.version}
                    </Text>
                </VStack>
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

