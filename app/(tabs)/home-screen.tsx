import ParallaxScrollView from '@/components/ParallaxScrollView';
import { LandmarkViewCard } from '@/components/landmark';
import { View, TouchableOpacity } from 'react-native';
import { mockLandmarks } from '@/mock';
import { DashboardHeader } from '@/components/global/DashboardHeader';
import { OpenWidget } from '@/components/widgets';
import React from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Center } from '@/components/ui/center';
import { Text } from '@/components/ui/text';

export default function HomeScreen() {
  const height = useSharedValue(0);
  const [queueLandmarks, setQueueLandmarks] = React.useState(mockLandmarks);

  const CarouselLandmarks = () => {
    const currentIndex = useSharedValue(0);

    const handleNext = () => {
      currentIndex.value = (currentIndex.value + 1) % queueLandmarks.length;
    };

    const renderItem = (item: any, index: number) => {
      const animatedStyle = useAnimatedStyle(() => {
        const position = (index - currentIndex.value + queueLandmarks.length) % queueLandmarks.length;

        const translateY = position === 0 ? 0 : 64;
        const scale = position === 0 ? 1 : 0.95;
        const zIndex = position === 0 ? 999 : 1;
        const opacity = position < 2 ? 1 : 0.05;

        return {
          transform: [{ translateY: withSpring(translateY) }, { scale: withSpring(scale) }],
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: withSpring(opacity),
          zIndex,
        };
      });

      return (
        <Animated.View key={item.id} style={animatedStyle}>
          <LandmarkViewCard landmark={item} onClick={handleNext} />
        </Animated.View>
      );
    };

    return (
      <View
        style={{
          width: '100%',
          height: 640,
          position: 'relative',
          alignItems: 'center',
        }}
      >

        {queueLandmarks.map((item, index) => renderItem(item, index))}
      </View>
    );
  };

  React.useEffect(() => {
    height.value = withSpring(3600, {
      damping: 10,
      stiffness: 100,
    });
  }, []);

  return (
    <LinearGradient
      colors={['#B8BD75', '#1A1A1A', '#1A1A1A']}
      style={{
        flex: 1,
        zIndex: 500,
      }}
    >
      <ParallaxScrollView
       staticElements={<DashboardHeader />} 
       containerStyle={{
        backgroundColor: 'transparent',
      }}
      contentContainerStyle={{
        marginHorizontal: 16,
      }}
      >
        <Center className="w-full h-fit">
          <OpenWidget />
        </Center>
        <CarouselLandmarks />
      </ParallaxScrollView>
    </LinearGradient>
  );
}
