import { ReactNode } from "react";
import { ViewProps } from "react-native";

import { View } from "../ui/view";
import { VStack } from "../ui/vstack";

interface Props extends ViewProps {
    labels: ReactNode[];
    title: ReactNode;
}
export function Header({ labels, title, ...props }: Props) {
    return (
        <VStack {...props} space="md">
            <View>
                {title}
            </View>
            <View>
                {labels}
            </View>
        </VStack>
    );
}