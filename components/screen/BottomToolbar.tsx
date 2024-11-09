import React from 'react';
import { View, ViewProps } from 'react-native';

interface BottomToolbarProps extends ViewProps {
    children?: React.ReactNode;
}
const BottomToolbar = ({ children, ...props }: BottomToolbarProps) => {
    return (
        <View className='absolute top-0 w-full p-4 z-10' >
            {children}
        </View>
    );
};

export default BottomToolbar;
