import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { BlurView } from 'expo-blur';
import { Center } from '../ui/center';


export function MyTabBar({ state, descriptors, navigation }: any) {
  return (
    <Center style={{
      ...styles.wrapper,
    }}>
      <BlurView style={{
        ...styles.tabBar,
      }} intensity={75} tint="light">
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;


          // if (!includeRoutes.includes(route.name)) return null;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          let iconName;
          if (route.name === 'home-screen') {
            iconName = isFocused ? 'home' : 'home-outline';
          } else if (route.name === 'favorite-screen') {
            iconName = isFocused ? 'heart' : 'heart-outline';
          } else if (route.name === 'map-screen') {
            iconName = isFocused ? 'map' : 'map-outline';
          } else if (route.name === 'assistant-chat-screen') {
            iconName = isFocused ? 'chatbubble' : 'chatbubble-outline';
          }

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.customButton, isFocused && styles.customButtonActive]}
            >
              <TabBarIcon name={iconName as any} color={isFocused ? '#fff' : '#8C8C8C'} size={24} />
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </Center>
  );
}


const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    gap: 16,
    left: '50%',
    transform: [{ translateX: '-50%' }],
    bottom: 32,
    overflow: 'hidden',

    borderRadius: 999,
    backgroundColor: 'rgba(39, 38, 37, 0.25)',
    borderColor: 'rgba(38, 38, 37, 0.05)',

  },
  tabBar: {
    flexDirection: 'row',
    alignContent: 'center',
    gap: 16,
    justifyContent: 'space-between',
    padding: 8,
    borderRadius: 999,
  },
  customButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
    height: 48,
    width: 48,
  },
  customButtonActive: {
    backgroundColor: 'rgba(130, 130, 130, 0.5)'
  }
});