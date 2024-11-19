import { VStack } from '@/components/ui/vstack';
import { StyleSheet } from 'react-native';

import { Button } from '@/components/ui/button';
import { ButtonText } from '@/components/ui/button';
import { GoogleIcon } from '@/components/icons';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';

export default function OpenScreen() {
    const router = useRouter();
    
    const loginWithGoogle = async () => {
        router.replace('/(dashboard)/home');
    }

    return (
        <VStack className='px-4'>
            <VStack
                space='md'
                className='justify-center items-center w-full'
            >
                <Button
                    size='lg'
                    variant='solid'
                    action='primary'
                    className='w-full'
                    onPress={loginWithGoogle}
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
    );
}

const styles = StyleSheet.create({

});

