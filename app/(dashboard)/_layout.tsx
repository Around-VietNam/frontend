import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import { View } from '@/components/ui/view';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack } from 'expo-router';

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

    <Stack
      screenOptions={{
        header: () => <CustomHeader />,
        headerTransparent: true,
      }}
    >

    </Stack>
  );
}
