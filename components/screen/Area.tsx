import { ViewProps } from "react-native";
import { ReactNode } from "react";

import { View } from "../ui/view";
import { VStack } from "../ui/vstack";
import { Text } from "../ui/text";
import { HStack } from "../ui/hstack";

interface Props extends ViewProps {
    title: ReactNode;
    more?: ReactNode;
}
export function Area({ ...props }: Props) {
    return (
        <VStack {...props} space="md">
            <HStack className="w-full justify-between items-center">
                {typeof props.title === 'string' ? (
                    <Text className="text-typography-900 font-semibold text-lg">
                        {props.title}
                    </Text>
                ) : props.title
                }
                {typeof props.more === 'string' ? (
                    <Text className="text-typography-500 text-md">
                        {props.more}
                    </Text>
                ) : props.more
                }
            </HStack>
            {props.children}
        </VStack>
    );
} 