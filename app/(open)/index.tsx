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

const redirectUri = AuthSession.makeRedirectUri({
    scheme: 'aroundvietnam',
});
const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: 'https://github.com/settings/connections/applications/Ov23liJU5zY9Kh6GgBBJ',
};

export default function OpenScreen() {
    const router = useRouter();

    const [tokenResponse, setTokenResponse] = React.useState<AuthSession.TokenResponse | null>(null);
    const [decodedIdToken, setDecodedIdToken] = React.useState<any | null>(null);

    const [request, response, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: 'Ov23liJU5zY9Kh6GgBBJ',
            clientSecret: 'f5b49e1bd5fc46f24591ce757fb940785bed2dc4',
            scopes: ['identity'],
            redirectUri
        },
        discovery,
    );

    const loginWithGoogle = async () => {
        const result = await promptAsync();
    }

    React.useEffect(() => {
        if (response?.type === 'success') {
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
                    disabled={!request}
                    onPress={loginWithGoogle}
                >

                    <GoogleIcon />
                    <ButtonText >
                        Bắt đầu
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

