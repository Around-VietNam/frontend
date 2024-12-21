import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { HStack } from "../ui/hstack";
import { Avatar, AvatarFallbackText, AvatarImage } from "../ui/avatar";
import { Input, InputField, } from "../ui/input";
import React from "react";
import { ScrollView } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { Ionicons } from "@expo/vector-icons";

interface Props extends ViewProps {
    // Add props here
}
export function UserReviewInput(props: Props) {
    const { account } = useAuth();
    const [avatarSrc, setAvatarSrc] = React.useState<string | undefined>(account?.avatar_url);

    const scrollViewRef = React.useRef<ScrollView>(null);

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
                {...props}
            >
                <InputField placeholder="Viết đánh giá ..." className="w-full" />
            </Input>
            <Button onPress={() => { /* handle send action */ }} className="p-2 h-fit w-fit" size="lg">
                <Ionicons name="send" size={14}  />
            </Button>
        </HStack>
    );
}