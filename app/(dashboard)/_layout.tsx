import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import LandmarkDetailsScreen from './landmark/[id]';
import { useNavigation } from 'expo-router';
import { View } from '@/components/ui/view';
import { Text } from '@/components/ui/text';

const Stack = createStackNavigator();
function CustomHeader() {
  const navigation = useNavigation();
  return (
    <View className='flex-row justify-between items-center w-full bg-black h-64 z-50'>
      <TouchableOpacity onPress={() => navigation.goBack()} className='flex-row items-center'>
        <Text className='text-2xl font-semibold text-typography-900'>Back</Text>
      </TouchableOpacity>
    </View>
  );
}


export default function Layout() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <CustomHeader />,
        headerTransparent: true,
      }}
    >
      <Stack.Screen name="Landmark Detail" component={LandmarkDetailsScreen} />
    </Stack.Navigator>
  );
}
