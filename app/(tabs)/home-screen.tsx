import ParallaxScrollView from '@/components/ParallaxScrollView';
import { LandmarkViewCard } from '@/components/landmark';
import { mockLandmarks } from '@/mock';

import { DashboardHeader } from '@/components/global/DashboardHeader';
import { OpenWidget } from '@/components/widgets';
import React from 'react';
import Animated, { useSharedValue, useAnimatedStyle, Easing, withSpring } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { Center } from '@/components/ui/center';

export default function HomeScreen() {
  const height = useSharedValue(0);
  const [currentPrimaryColor, setCurrentPrimaryColor] = React.useState<string | null>(null);

  React.useEffect(() => {
    height.value = withSpring(196, {
      damping: 10,
      stiffness: 100,
    });
  }, []);

  return (

    <LinearGradient
      colors={["#B8BD75", Colors.dark.background, Colors.dark.background]}
      style={{
        flex: 1,
      }}
    >
      <ParallaxScrollView
        header={<DashboardHeader />}
      >
        <Center className='w-full h-fit'>
          <OpenWidget />
        </Center>
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