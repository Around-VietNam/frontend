import React from 'react';
import { Slot } from 'expo-router';

import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { App } from '@/constants/App';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Logo } from '@/components/icons';
import { ImageBackground } from '@/components/ui/image-background';

const openCoverImage = require('@/assets/images/open-cover.png');

export default function OpenLayout() {
    return (
        <VStack className='box-content w-full flex-1 justify-center' space='lg'>
            <ImageBackground
                source={openCoverImage}
                style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                }}
            />
            <VStack className='flex-grow-[12] w-full justify-between relative'>
                <HStack className='z-50 my-16 mx-6 items-center' space='sm'>
                    <Logo size={32} />
                    <Text size='2xl' className='text-white font-semibold capitalize'>{App.name}</Text>
                </HStack>
                <VStack className='absolute -z-50 h-full w-full' >
                </VStack>
                <VStack className='w-full items-center justify-start p-8' space='md'>
                    <Text
                        size='sm'
                        className='font-light text-center border border-white rounded-lg px-2 p-1 text-white w-fit '
                    >
                        Version {App.version}
                    </Text>
                    <Text size='4xl' className='text-white font-bold text-center px-4'>{App.headline}</Text>
                    <Text
                        size='md'
                        className='text-white font-light'
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        {App.welcomeText}
                    </Text>
                </VStack>
            </VStack>
            <Box className='w-full flex-grow-[1]'>
                <Slot />
            </Box>
        </VStack>
    );
}
