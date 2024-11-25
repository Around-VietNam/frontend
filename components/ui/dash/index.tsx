import { ViewProps } from "react-native"
import { View } from "../view"

interface Props extends ViewProps { }
export function Dash({ children, ...props }: Props) {
    return (
        <View className="w-12 h-2 rounded-full"
            style={{
                backgroundColor: '#ccc'
            }}
            {...props}
        />
    )
}

