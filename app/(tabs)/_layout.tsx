import React from 'react';
import { Tabs } from 'expo-router';
import { MyTabBar } from '../../components/global/DashboardTabs';

export default function DashboardRootLayout() {
  return (
    <Tabs
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      
      <Tabs.Screen name="home-screen" />
      <Tabs.Screen name="favorite-screen" />
      <Tabs.Screen name="map-screen" />
      <Tabs.Screen name="assistant-chat-screen" />
    </Tabs>
  );
}
