import { VStack } from '@/components/ui/vstack';
import { StyleSheet } from 'react-native';

import { Button } from '@/components/ui/button';
import { ButtonText } from '@/components/ui/button';
import { FacebookIcon, GoogleIcon } from '@/components/icons';
import { Text } from '@/components/ui/text';
import { Divider } from '@/components/ui/divider';
import { HStack } from '@/components/ui/hstack';
import { router } from 'expo-router';
import { App } from '@/constants/App';

export default function OpenScreen() {
    return (
        <VStack className='flex-1 px-4'>
            <VStack
                className='justify-center items-center w-full flex-1 py-4'
                space='md'
            >
                <VStack
                    space='md'
                    className='justify-center items-center w-full h-fit'
                >
                    <Button
                        size='lg'
                        variant='solid'
                        action='primary'
                        className='w-full'
                        onPress={() => router.replace(App.routes.login as any)}
                    >
                        <ButtonText>
                            Đăng nhập
                        </ButtonText>
                    </Button>
                    <Button
                        size='lg'
                        variant='outline'
                        action='primary'
                        className='w-full'
                    >
                        <ButtonText className='text-white'>
                            Đăng ký
                        </ButtonText>
                    </Button>
                </VStack>
                <VStack
                    className='justify-center items-center w-full h-fit'
                >
                    <HStack className='justify-center items-center w-full' space='md'>
                        <Divider className='w-32 bg-white' />
                        <Text size='sm' className='text-typography-900 font-md'>Hoặc</Text>
                        <Divider className='w-32 bg-white' />
                    </HStack>
                    <VStack
                        space='md'
                        className='justify-center items-center w-full'
                    >
                        <Button
                            size='lg'
                            variant='outline'
                            action='primary'
                            className='w-full'
                        >
                            <FacebookIcon />
                            <ButtonText className='text-white'>
                                Đăng nhập với Facebook
                            </ButtonText>
                        </Button>
                        <Button
                            size='lg'
                            variant='outline'
                            action='primary'
                            className='w-full'
                        >
                            <GoogleIcon />
                            <ButtonText >
                                Đăng nhập với Google
                            </ButtonText>
                        </Button>
                        <Text
                            size='sm'
                            className='font-light text-center w-full'
                        >
                            Với việc đăng nhập bạn đã đồng ý với các
                            <Text className='font-semibold'> Điều khoản </Text>
                            và
                            <Text className='font-semibold'> Chính sách </Text>
                            của chúng tôi
                        </Text>
                    </VStack>
                </VStack>
            </VStack>
        </VStack>
    );
}

const styles = StyleSheet.create({

});

