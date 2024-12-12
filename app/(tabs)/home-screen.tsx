import ParallaxScrollView from '@/components/ParallaxScrollView';
import { LandmarkViewCard } from '@/components/landmark';
import { mockLandmarks } from '@/mock';

import { DashboardHeader } from '@/components/global/DashboardHeader';
import { OpenWidgets, SituationWidget } from '@/components/widgets';
import { Box } from '@/components/ui/box';
import React from 'react';
import Animated, { useSharedValue, useAnimatedStyle, Easing, withSpring } from 'react-native-reanimated';
import { pickPrimaryColor } from "@/utils"
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  const height = useSharedValue(0);
  const [currentPrimaryColor, setCurrentPrimaryColor] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    height.value = withSpring(196, {
      damping: 10,
      stiffness: 100,
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      width: '100%',
    };
  });

  React.useEffect(() => {
    const fetchPrimaryColor = async () => {
      const color = await pickPrimaryColor("https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg");
      setCurrentPrimaryColor(color)

      Promise.resolve(color)
    };
    fetchPrimaryColor().then((color) => {
      console.log("Primary color: ", color)
    }).catch((error) => {
      console.error("Error fetching primary color: ", error)
    })
  }, []);

  return (

    <LinearGradient
      colors={[currentPrimaryColor || Colors.dark.background, Colors.dark.background, Colors.dark.background]}
      style={{
        flex: 1,
      }}
    >
      <ParallaxScrollView
        header={<DashboardHeader />}
      >
        <OpenWidgets />
        {
          mockLandmarks.map((landmark) => (
            <LandmarkViewCard
              key={landmark.id}
              landmark={landmark}
            />
          ))
        }
      </ParallaxScrollView>
    </LinearGradient >
  );
}