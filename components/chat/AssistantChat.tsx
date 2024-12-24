import React, { useState, useCallback, useEffect } from 'react'
import { View } from 'react-native'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, ModalBackdrop } from '../ui/modal'
import { Button, ButtonText } from '../ui/button'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { getAIResponse } from '@/utils/openai'
import { Text } from '../ui/text'
import { Skeleton } from '../ui/skeleton'

export function AssistantChat() {
    const [messages, setMessages] = useState<IMessage[]>([])
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = useCallback(async (messages: IMessage[] = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        );

        const userMessage = messages[0].text;
        const aiResponse = await getAIResponse(userMessage);

        const botMessage: IMessage = {
            _id: Math.random().toString(36).substring(7),
            text: aiResponse || 'Sorry, I do not understand',
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'AI Assistant',
                avatar: 'https://placeimg.com/140/140/tech',
            },
        };

        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, [botMessage]),
        );
    }, []);

    return (
        <>
            <Button className='bg-background-500 p-3 w-fit h-fit' onPress={() => setIsOpen(true)}>
                <MaterialCommunityIcons name="robot-love" size={16} color="white" />
            </Button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size='lg'>
                <ModalBackdrop />
                <ModalContent className={'h-1/2 rounded-[24]'}>
                    <ModalHeader>
                        <Text className='text-lg font-semibold'>
                            AI Assistant
                        </Text>
                    </ModalHeader>
                    <ModalBody
                        className='p-4 bg-red-500 w-full h-full flex relative'
                    >
                        <View style={{
                            flex: 1,
                            backgroundColor: 'white',
                            borderRadius: 24,
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                        }}>
                            <GiftedChat
                                messages={[
                                    {
                                        _id: 1,
                                        text: 'Hello developer',
                                        createdAt: new Date(),
                                        user: {
                                            _id: 2,
                                            name: 'React Native',
                                            avatar: 'https://placeimg.com/140/140/any',
                                        },
                                    }
                                ]}
                                onSend={() => { }}
                                user={{
                                    _id: 1,
                                }}
                            />
                        </View>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>

    )
}