import React from 'react';
import { Slot } from 'expo-router';
import { Image, StyleSheet, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';

import { VStack } from '@/components/ui/vstack';
import { FacebookIcon, GoogleIcon } from '@/components/icons';
import { ButtonText } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ThemedView } from '@/components/ThemedView';
import { App } from '@/constants/App';
import Carousel from 'react-native-reanimated-carousel';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';

const coverImages = [
    require('@/assets/images/ninh-binh.jpg'),
    require('@/assets/images/ba-na-hill.jpg'),
];

export default function OpenLayout() {
    const { width, height } = useWindowDimensions();

    return (
        <GluestackUIProvider mode='dark'>
            <VStack style={styles.container}>
                <ThemedView style={styles.carousel}>
                    <Carousel
                        width={width}
                        height={height * 1.1}
                        data={[...coverImages.keys()]}
                        autoPlay
                        loop
                        autoPlayInterval={3000}
                        renderItem={({ item }) => (
                            <Image
                                source={coverImages[item]}
                                style={styles.image}
                                resizeMode='cover'
                            />
                        )}
                    />
                </ThemedView>
                <VStack style={styles.welcomeContainer}>
                    <Text size='sm' className='text-typography-900 font-md'>Version {App.version}</Text>
                    <Text size='4xl' className='text-typography-900 font-semibold capitalize text-center'>{App.name}</Text>
                    <Text
                        size='md'
                        className='text-typography-900 font-extralight' style={{
                            textAlign: 'center',
                            paddingHorizontal: 16,
                        }}
                    >
                        {App.welcomeText}
                    </Text>
                </VStack>
                <Slot />
                
            </VStack>
        </GluestackUIProvider>
    );
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 0,
        paddingVertical: 16,
        backgroundColor: '#3f51b5',
        height: '100%',
        width: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
    },

    // Welcome Styles
    welcomeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 64,
        paddingHorizontal: 16,
    },

    // Carousel Styles
    carousel: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: -1,
    },

    stepContainer: {
        backgroundColor: 'transparent',
        gap: 8,
        marginBottom: 8,
    },
});

