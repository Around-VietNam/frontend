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
                "flex flex-1 gap-1 w-fit h-fit",
                direction === "row" ? "flex-row" : "flex-col",
                "items-center self-start",
                classNames?.wrapper
            )}
            style={{
                alignSelf: "flex-start",
            }}
        >
            {icon}
            <Text className={twMerge(
                "text-2xs flex-1 flex-wrap break-words",
                classNames?.value,
            )}>
                {value}
            </Text>
        </View>
    );
};

export default Field;
