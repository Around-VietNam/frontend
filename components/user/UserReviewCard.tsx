import { AntDesign } from "@expo/vector-icons";
import { ViewProps } from "react-native";

import { User } from "@/types";

import { VStack } from "../ui/vstack";
import { HStack } from "../ui/hstack";
import { Text } from "../ui/text";
import { Avatar, AvatarFallbackText, AvatarImage, } from "../ui/avatar";
import Field from "../ui/field";

interface Props extends ViewProps {
    comment: string;
    rating: number;
    create_at: string;
    username: string;
}
export function UserReviewCard(props: Props) {
    const review = {
        comment: props.comment,
        vote: props.rating,
        create_at: props.create_at,
        username: props.username,
    }

    return (
        <VStack className="w-full" space="md">
            <HStack className="w-full justify-between items-center">
                <HStack space="md">
                    <Avatar size="sm">
                        <AvatarFallbackText>
                            {review.username}
                        </AvatarFallbackText>
                        <AvatarImage
                            source={{
                                uri: review.username,
                            }}
                        />
                    </Avatar>
                    <VStack className="justify-center">
                        <Text className="text-base font-semibold text-typography-900">
                            {review.username}
                        </Text>
                        {

                            <HStack>
                                {
                                    Array(Math.floor(review.vote) % 6).fill(0).map((_, index) => (
                                        <AntDesign name="star" size={14} color="#FFC53C" key={index} />
                                    ))
                                }
                            </HStack>
                        }
                    </VStack>
                </HStack>
                <Text className="text-2xs text-typography-500">
                    {new Date(review.create_at).toLocaleDateString()}
                </Text>
            </HStack>
            <VStack>
                <Text>
                    {review.comment}
                </Text>
            </VStack>
        </VStack>
    )

}