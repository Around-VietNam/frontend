import { Image, StyleSheet, Platform } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { LandmarkViewCard } from '@/components/landmark';
import { mockLandmarks } from '@/mock';
import { DashboardHeader } from '@/components/global/DashboardHeader';
import { SearchInput } from '@/components/global/SearchInput';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      header={<DashboardHeader />}
    >
      <SearchInput />
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