import React from "react";
import { ViewProps } from "react-native";

import { View } from "../view";
import { twMerge } from "tailwind-merge";
import { Text } from "../text";


interface Props extends ViewProps {
    icon: React.ReactNode;
    label: React.ReactNode;
    value?: React.ReactNode;
    direction?: "row" | "column";
    classNames?: {
        icon?: string;
        label?: string;
        value?: string;
        wrapper?: string;
    }
}

const Field: React.FC<Props> = ({ ...props }) => {
    const { icon, value, direction = "row", classNames } = props;

    return (
        <View
            className={twMerge(
                "flex gap-1",
                direction === "row" ? "flex-row" : "flex-col",
                "items-center",
                classNames?.wrapper
            )}
        >
            {icon}
            <Text className={classNames?.value}>
                {value}
            </Text>
        </View>
    );
};

export default Field;
