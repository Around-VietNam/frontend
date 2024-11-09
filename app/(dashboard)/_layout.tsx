import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import LandmarkDetailsScreen from './landmark/[id]';
import { useNavigation } from 'expo-router';
import { View } from '@/components/ui/view';
import Ionicons from '@expo/vector-icons/Ionicons';

const Stack = createStackNavigator();
function CustomHeader() {
  const navigation = useNavigation();
  return (
    <View className='flex-row justify-between items-center w-full bg-transparent h-36 z-50 px-8'>
      <TouchableOpacity onPress={() => navigation.goBack()} className='flex justify-center items-center bg-white/75 rounded-full p-2'>
        <Ionicons name="chevron-back-outline" size={24} color="black" />
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
