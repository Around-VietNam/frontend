import React from 'react';
import { Stack } from 'expo-router';

export default function OpenLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="index" />
        </Stack>
    );
}
