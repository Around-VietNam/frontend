import { View, type ViewProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type LinearThemedViewProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
    direction?: 'vertical' | 'horizontal';
    fullHeight?: boolean;
    fullWidth?: boolean;
};

export function LinearThemedView(props: LinearThemedViewProps) {
    const {
        style,
        lightColor,
        darkColor,
        direction = 'vertical',
        fullHeight = true,
        fullWidth = true,
        ...otherProps
    } = props;
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

    return <View
        style={[
            { backgroundColor },
            defaultStyle.container,
            direction === 'vertical' ? { flexDirection: 'column' } : { flexDirection: 'row' },
            fullHeight ? { flex: 1 } : {},
            fullWidth ? { width: '100%' } : {},
            style,
        ]}
        {...otherProps}
    />;
}

const defaultStyle = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        padding: 16,
    },
});