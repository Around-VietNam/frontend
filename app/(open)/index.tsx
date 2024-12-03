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
import { Toast, ToastTitle, useToast } from '@/components/ui/toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession({

});
const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: 'https://github.com/settings/connections/applications/' + Api.github.clientId,
};

export default function OpenScreen() {
    const router = useRouter();
    const SCHEME = Constants.manifest2.scheme;
    const toast = useToast();

    // get account info
    const [request, response, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: Api.github.clientId,
            clientSecret: Api.github.clientSecret,
            scopes: ['identity'],
            redirectUri: "exp://192.168.1.6:8081/home-screen",
        },
        discovery,
    );

    const login = async () => {
        try {
            const result = await promptAsync();
            if (result.type === 'success') {
                const { code } = result.params;
                // Exchange the code for an access token
                const response = await fetch(discovery.tokenEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        client_id: Api.github.clientId,
                        client_secret: Api.github.clientSecret,
                        code,
                    }),
                });
                const data = await response.json();
                const { access_token } = data;
                await AsyncStorage.setItem('accessToken', access_token);
                toast.show({
                    render: () => (
                        <Toast>
                            <ToastTitle>
                                Đăng nhập thành công
                            </ToastTitle>
                        </Toast>
                    ),
                    placement: 'top',
                    duration: 2000,
                });
                router.push(App.routes.dashboard as any);
            }
        } catch (error) {
            toast.show({
                render: () => (
                    <Toast>
                        <ToastTitle>
                            Đăng nhập thất bại
                        </ToastTitle>
                    </Toast>
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
                    onPress={login}
                >

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

