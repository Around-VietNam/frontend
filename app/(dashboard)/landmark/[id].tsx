import { StyleSheet } from 'react-native';

import { useLocalSearchParams } from "expo-router";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Text } from '@/components/ui/text';

export default function LandmarkDetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <ParallaxScrollView
    >
      <Text>
        {id}
      </Text>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
