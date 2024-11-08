import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export function MyTabBar({ state, descriptors, navigation }: any) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const includeRoutes = ['home/index', 'landmark/index', 'cursine/index', 'favorite/index'];

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
        if (route.name === 'home/index') {
          iconName = isFocused ? 'home' : 'home-outline';
        } else if (route.name === 'landmark/index') {
          iconName = isFocused ? 'map' : 'map-outline';
        } else if (route.name === 'cursine/index') {
          iconName = isFocused ? 'fast-food' : 'fast-food-outline';
        } else if (route.name === 'favorite/index') {
          iconName = isFocused ? 'heart' : 'heart-outline';
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
    </View>
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