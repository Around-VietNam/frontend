import { Image, StyleSheet, Platform } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { DashboardHeader } from '../(dashboard)/components/DashboardHeader';
import { SearchInput } from '../(dashboard)/components/SearchInput';
import { LandmarkViewCard } from '@/components/landmark';
import { mockLandmarks } from '@/mock';

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