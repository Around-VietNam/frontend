import { VStack } from '@/components/ui/vstack';
import { StyleSheet } from 'react-native';

import { Button } from '@/components/ui/button';
import { ButtonText } from '@/components/ui/button';
import { GoogleIcon } from '@/components/icons';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { App } from '@/constants/App';
import React from 'react';
import { Api } from '@/constants/Api';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession({
    skipRedirectCheck: true,
});

const redirectUri = AuthSession.makeRedirectUri();
// const discovery = {
//     authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
//     tokenEndpoint: 'https://oauth2.googleapis.com/token',
//     revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
// };

export default function OpenScreen() {
    const router = useRouter();

    const discovery = AuthSession.useAutoDiscovery('https://accounts.google.com');
    const [tokenResponse, setTokenResponse] = React.useState<AuthSession.TokenResponse | null>(null);
    const [decodedIdToken, setDecodedIdToken] = React.useState<any | null>(null);

    const [request, response, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: Api.google.ios.clientId as string,
            scopes: ['openid', 'profile'],
            redirectUri,
        },
        discovery,
    );

    const loginWithGoogle = async () => {
        const result = await promptAsync();
    }

    React.useEffect(() => {
        if(response?.type === 'success') {
            const { code } = response.params;
        }
    }, [response]);

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

