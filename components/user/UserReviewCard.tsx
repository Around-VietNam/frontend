import { AntDesign } from "@expo/vector-icons";
import { ViewProps } from "react-native";

import { User } from "@/types";

import { VStack } from "../ui/vstack";
import { HStack } from "../ui/hstack";
import { Text } from "../ui/text";
import { Avatar, AvatarFallbackText, AvatarImage, } from "../ui/avatar";

interface Props extends ViewProps {
    comment: string;
    rating: number;
    created_at: string;
    user: User;
}
export function UserReviewCard(props: Props) {
    const review = {
        content: props.comment,
        vote: props.rating,
        created_at: props.created_at,
        user: {
            name: props.user.name,
            avatar: props.user.avatar,
        }
    }

    return (
        <VStack className="w-full" space="md">
            <HStack className="w-full justify-between">
                <HStack space="md">
                    <Avatar>
                        <AvatarFallbackText>
                            {review.user.name}
                        </AvatarFallbackText>
                        <AvatarImage
                            source={{
                                uri: review.user.avatar,
                            }}
                        />
                    </Avatar>
                    <VStack className="justify-center">
                        <Text className="text-base font-semibold text-typography-900">
                            {review.user.name}
                        </Text>
                        {
                            review?.vote && (
                                <HStack>
                                    {
                                        Array(review.vote).fill(0).map((_, index) => (
                                            <AntDesign name="star" size={16} color="#FFC53C" key={index} />
                                        ))
                                    }
                                </HStack>
                            )
                        }
                    </VStack>
                </HStack>
                <Text className="text-2xs text-typography-500">
                    {review.created_at}
                </Text>
            </HStack>
            <VStack>
                <Text>
                    {review.content}
                </Text>
            </VStack>
        </VStack>
    )

}