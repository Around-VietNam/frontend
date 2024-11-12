import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { HStack } from "../ui/hstack";
import { Avatar, AvatarFallbackText, AvatarImage } from "../ui/avatar";
import { Input, InputField, } from "../ui/input";

interface Props extends ViewProps {
    // Add props here
}
export function UserReviewInput(props: Props) {
    return (
        <HStack className="w-full py-4 items-center">
            <Avatar size="sm">
                <AvatarFallbackText>
                    N/A
                </AvatarFallbackText>
                <AvatarImage />
            </Avatar>
            <Input
                variant="rounded"
                className="w-full border-0"
                {...props}
            >
                <InputField placeholder="Viết đánh giá ..." className="w-full" />
            </Input>
        </HStack>
    );
}