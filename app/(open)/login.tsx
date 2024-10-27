import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Image, StyleSheet, useWindowDimensions } from 'react-native';
import { Input, InputField } from '@/components/ui/input';



export default function LoginScreen() {
    const { width, height } = useWindowDimensions();

    return (
        <VStack className='h-fit w-full' space='md'>
            <Input
                variant="outline"
                size="lg"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
            >
                <InputField placeholder="Tài khoản" type='text'/>
            </Input>
            <Input
                variant="outline"
                size="lg"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
            >
                <InputField placeholder="Mật khẩu" type='password'/>
            </Input>
        </VStack>
    );
}

const styles = StyleSheet.create({

});

