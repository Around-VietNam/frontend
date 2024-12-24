import ParallaxScrollView from "@/components/ParallaxScrollView";
import openAi from "@/utils/openai";
import { useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import { IMessage, GiftedChat } from "react-native-gifted-chat";

export default function AssistantChatScreen() {
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
        try {
            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, messages),
            );

            const userMessage = messages[0].text;
            const aiResponse = await openAi.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "assistant",
                        content: "Bạn là một trợ lý hỗ trợ cho ứng dung Around Vietnam, đề xuất các địa điểm mà Around Vietnam có thể cung cấp thông tin.",
                        name: "Around Vietnam",
                    },
                    {
                        role: "user",
                        content: userMessage,
                    }
                ],
            });


            const botMessage: IMessage = {
                _id: Math.random().toString(36).substring(7),
                text: aiResponse.choices[0].message.content || 'Sorry, I do not understand',
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
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'white',
                height: '100%',
                width: '100%',
                paddingBottom: 128,
            }}
        >
            <GiftedChat
                messages={messages}
                onSend={onSend}
                user={{
                    _id: 1,
                }}
            />
        </View>
    );
}