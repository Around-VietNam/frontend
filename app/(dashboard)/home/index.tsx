import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LandmarkViewCard } from '@/components/landmark';
import { SpecialDishViewCard } from '@/components/special-dish';
import { UserReviewCard } from '@/components/user/UserReviewCard';
import { HStack } from '@/components/ui/hstack';
import { CategoryBadge } from '@/components/badge';
import { Text } from '@/components/ui/text';
import { DashboardHeader } from '@/components/global/DashboardHeader';
import { SearchInput } from '@/components/global/SearchInput';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      header={<DashboardHeader />}
    >
      <SearchInput />
      <Text>Special Dishes</Text>


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
