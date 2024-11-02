import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Link, LinkText } from '@/components/ui/link';
import { Image, StyleSheet } from 'react-native';
import { Input, InputField } from '@/components/ui/input';
import { FormControl } from '@/components/ui/form-control';
import React from 'react';
import { ButtonText, Button } from '@/components/ui/button';

import { App } from '@/constants/App';
import { useRouter } from 'expo-router';



export default function LoginScreen() {
    const router = useRouter()
    const [isInvalid, setIsInvalid] = React.useState(false)
    const [inputValue, setInputValue] = React.useState("12345")

    const handleSubmit = () => {
        router.replace(App.routes.dashboard as any)
        if (inputValue.length < 6) {
            setIsInvalid(true)
        } else {
            setIsInvalid(false)
        }
    }

    return (
        <VStack className='h-fit w-full' space='md'>
            <FormControl
                isInvalid={isInvalid}
                size="md"
                isDisabled={false}
                isReadOnly={false}
                isRequired={false}
                className='w-full flex flex-col gap-4 justify-center items-center'
            >
                <Input
                    variant="outline"
                    size="lg"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                    style={styles.input}
                >
                    <InputField placeholder="Tài khoản" type='text' />
                </Input>
                <Input
                    variant="outline"
                    size="lg"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                    style={styles.input}
                >
                    <InputField placeholder="Mật khẩu" type='password' />
                </Input>
                <Button
                    size='lg'
                    variant='solid'
                    action='primary'
                    className='w-full'
                    onPress={handleSubmit}
                >
                    <ButtonText>
                        Đăng nhập
                    </ButtonText>
                </Button>
            </FormControl>
            <VStack className='justify-center items-center w-full'>
                <Text>
                    Đã có tài khoản? <Link href={App.routes.dashboard as any}>
                        <LinkText className='font-semibold'>
                            Đăng nhập
                        </LinkText>
                    </Link>
                </Text>
            </VStack>
        </VStack>
    );
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 48,
        borderColor: 'white',
        borderRadius: 9999,
    }
});

