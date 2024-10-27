import { Image, StyleSheet, useWindowDimensions } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import Carousel from 'react-native-reanimated-carousel';
import { App } from '@/constants/App';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Button, ButtonText } from '@/components/ui/button';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { HStack } from '@/components/ui/hstack';
import { Divider } from '@/components/ui/divider';

const coverImages = [
    require('@/assets/images/ninh-binh.jpg'),
    require('@/assets/images/ba-na-hill.jpg'),
];

export default function OpenScreen() {
    const { width, height } = useWindowDimensions();

    return (
        <VStack
            style={styles.container}
            className='dark'
        >
            <ThemedView style={styles.carousel}>
                <Carousel
                    width={width}
                    height={height}
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
                <Text size='sm' className='text-typography-0 font-md'>Version {App.version}</Text>
                <Text size='4xl' className='text-typography-0 font-semibold capitalize text-center'>{App.name}</Text>
                <Text
                    size='md'
                    className='text-typography-0 font-extralight' style={{
                        textAlign: 'center',
                        paddingHorizontal: 16,
                    }}
                >
                    {App.welcomeText}
                </Text>
            </VStack>
            <HStack
                space='md'
                className='justify-center items-center w-full'
            >
                <Button
                    size='lg'
                    variant='solid'
                    action='primary'
                    className='bg-white'
                >
                    <ButtonText className='text-black'>
                        Đăng nhập
                    </ButtonText>
                </Button>
                <Button
                    size='lg'
                    variant='outline'
                    action='primary'
                    className='border-white outline-white'
                >
                    <ButtonText className='text-white'>
                        Đăng ký
                    </ButtonText>
                </Button>
            </HStack>
            <VStack
                className='justify-center items-center w-full px-4'
            >
                <HStack className='justify-center items-center w-full'>
                    <Divider className='w-full' />
                    <Text size='sm' className='text-typography-0 font-md'>Hoặc</Text>
                    <Divider className='w-full' />
                </HStack>
                <VStack
                    space='md'
                    className='justify-center items-center w-full'
                >
                    <Button
                        size='lg'
                        variant='solid'
                        action='primary'
                        className='bg-white'
                    >
                        <Ionicons name='logo-facebook' size={24} color='black' />
                        <ButtonText className='text-black'>
                            Đăng nhập với Facebook
                        </ButtonText>
                    </Button>
                    <Button
                        size='lg'
                        variant='solid'
                        action='primary'
                        className='bg-white'
                    >
                        <Ionicons name='logo-google' size={24} color='black' />
                        <ButtonText className='text-black'>
                            Đăng nhập với Google
                        </ButtonText>
                    </Button>
                    <Text
                        size='sm'
                        className='text-white font-light text-center w-full'
                    >
                        Với việc đăng nhập bạn đã đồng ý với các
                        <Text className='font-semibold text-white'> Điều khoản </Text>
                        và
                        <Text className='font-semibold text-white'> Chính sách </Text>
                        của chúng tôi
                    </Text>
                </VStack>
            </VStack>

        </VStack>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 0,
        paddingVertical: 16,
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

