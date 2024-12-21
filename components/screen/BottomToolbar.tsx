import React from 'react';
import { ViewProps } from 'react-native';

import { View } from '@/components/ui/view';

interface BottomToolbarProps extends ViewProps {
    children?: React.ReactNode;
}
const BottomToolbar = ({ children, ...props }: BottomToolbarProps) => {
    return (
        <View className={'absolute bottom-0 w-full h-fit z-10' + props.className}>
            {children}
        </View>
    );
};

export default BottomToolbar;
