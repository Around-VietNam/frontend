import ParallaxScrollView from '@/components/ParallaxScrollView';
import { LandmarkViewCard } from '@/components/landmark';
import { mockLandmarks } from '@/mock';

import { DashboardHeader } from '@/components/global/DashboardHeader';
import { SearchInput } from '@/components/global/SearchInput';
import { OpenWidgets, SituationWidget } from '@/components/widgets';
import { Box } from '@/components/ui/box';
import React from 'react';
import Animated, { useSharedValue, useAnimatedStyle, Easing, withSpring } from 'react-native-reanimated';

export default function HomeScreen() {
  const height = useSharedValue(0);

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

  return (
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
  );
}