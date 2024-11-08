import React from 'react';
import { StyleSheet } from 'react-native';
import {  Tabs } from 'expo-router';
import { MyTabBar } from './Tabs';

export default function DashboardRootLayout() {
  return (
    <Tabs
      tabBar={props=><MyTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="home-screen"/>
      <Tabs.Screen name="landmark-screen"/>
      <Tabs.Screen name="specialDish-screen"/>
      <Tabs.Screen name="favorite-screen"/>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 32,
    bottom: 32,

    padding: 4,
    borderRadius: 999,
    backgroundColor: '#181718',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  customButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
    marginHorizontal: 4,
    height: 66,
  },
  customButtonActive: {
    backgroundColor: '#292929',
  },
});