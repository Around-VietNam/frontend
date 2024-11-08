import { ReactNode } from "react";
import { ViewProps } from "react-native";

import { View } from "../ui/view";
import { VStack } from "../ui/vstack";
import { Text } from "../ui/text";

interface Props extends ViewProps {
    labels: ReactNode[];
    title: ReactNode;
}
export function Header({ labels, title, ...props }: Props) {
    return (
        <VStack {...props} space="md">
            <View>
                <Text>
                    {title}
                </Text>
            </View>
            <View>
                <VStack space="sm">
                    {labels.map((label, index) => (
                        <Text key={index}>
                            {label}
                        </Text>
                    ))}
                </VStack>
            </View>
        </VStack>
    );
}