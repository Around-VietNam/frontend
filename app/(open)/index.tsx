import { VStack } from '@/components/ui/vstack';
import { Platform, StyleSheet } from 'react-native';

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
import Constants from 'expo-constants';
import { useToast } from '@/components/ui/toast';

WebBrowser.maybeCompleteAuthSession({
    skipRedirectCheck: true,
});
const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: 'https://github.com/settings/connections/applications/Ov23liJU5zY9Kh6GgBBJ',
};

export default function OpenScreen() {
    const router = useRouter();
    const useProxy = Constants.appOwnership === 'expo' && Platform.OS !== 'web';
    const SCHEME = Constants.manifest2.scheme;
    const toast = useToast();

    const [tokenResponse, setTokenResponse] = React.useState<AuthSession.TokenResponse | null>(null);
    const [decodedIdToken, setDecodedIdToken] = React.useState<any | null>(null);

    const [request, response, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: 'Ov23liJU5zY9Kh6GgBBJ',
            clientSecret: 'f5b49e1bd5fc46f24591ce757fb940785bed2dc4',
            scopes: ['identity'],
            redirectUri: AuthSession.makeRedirectUri({
                native: `${SCHEME}://redirect`,
            }),
        },
        discovery,
    );

    const loginWithGoogle = async () => {
        try {
            await promptAsync();
            router.push("/(dashboard)/home");
        } catch (error) {
            toast.show({
                render: () => (
                    <Text>
                        Đăng nhập thất bại
                    </Text>
                ),
                placement: 'top',
            });
        }
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

