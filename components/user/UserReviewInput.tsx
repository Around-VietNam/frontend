import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { HStack } from "../ui/hstack";
import { Avatar, AvatarFallbackText, AvatarImage } from "../ui/avatar";
import { Input, InputField } from "../ui/input";
import React from "react";
import { ScrollView, TextInputProps } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { Ionicons } from "@expo/vector-icons";
import { IInputProps } from "@gluestack-ui/input/lib/types";

interface Props extends TextInputProps {
    // Add props here
    func: any;
}
export function UserReviewInput(props: Props) {
    const { account } = useAuth();
    const [avatarSrc, setAvatarSrc] = React.useState<string | undefined>(account?.avatar_url);

    const scrollViewRef = React.useRef<ScrollView>(null);

    const submit = (e: any) => {
        e.persist();
        props.func(props.value);
    }

    React.useEffect(() => {
        if (account?.avatar_url) {
            setAvatarSrc(account.avatar_url);
        }
    }, [account]);

    return (
        <HStack className="w-full p-4 items-center">
            <Avatar size="sm">
                <AvatarImage source={{
                    uri: avatarSrc,
                }} />
            </Avatar>
            <Input
                variant="rounded"
                className="flex-1 border-0"
            >
                <InputField
                    placeholder="Viết đánh giá ..."
                    className="w-full"
                    {...props}
                />
            </Input>
            <Button onPress={submit} className="p-2 h-fit w-fit" size="lg">
                <Ionicons name="send" size={14} />
            </Button>
        </HStack>
    );
}