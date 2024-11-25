import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';


export function MyTabBar({ state, descriptors, navigation }: any) {
  return (
    <View style={{
      ...styles.tabBar,
    }}>
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
        } else if (route.name === 'landmark-screen') {
          iconName = isFocused ? 'map' : 'map-outline';
        } else if (route.name === 'cursine-screen') {
          iconName = isFocused ? 'fast-food' : 'fast-food-outline';
        } else if (route.name === 'favorite-screen') {
          iconName = isFocused ? 'heart' : 'heart-outline';
        } else if (route.name === 'map-screen') {
          iconName = isFocused ? 'locate' : 'locate-outline';
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
            <TabBarIcon name={iconName as any} color={isFocused ? '#000' : '#8C8C8C'} size={24} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}


const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    flexDirection: 'row',
    alignContent: 'center',
    gap: 16,
    justifyContent: 'space-between',
    left: '50%',
    transform: [{ translateX: '-50%' }],
    bottom: 16,

    padding: 8,
    borderRadius: 999,
    backgroundColor: '#181718',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  customButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
    height: 48,
    width: 48,
  },
  customButtonActive: {
    backgroundColor: '#fff',
  },
});