import { StyleSheet, Image, Platform } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { LandmarkViewCard } from '@/components/landmark';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';

export default function LandmarkScreen() {
  return (
    <ParallaxScrollView
      header={
        <VStack
          className='bg-black w-full h-96'
        >
          <Text>Landmark</Text>
        </VStack>
      }
    >

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
