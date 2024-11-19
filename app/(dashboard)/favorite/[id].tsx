import { Image, StyleSheet, Platform } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { DashboardHeader } from '@/components/global/DashboardHeader';
import { SearchInput } from '@/components/global/SearchInput';

export default function FavoriteScreen() {
  return (
    <ParallaxScrollView
      header={<DashboardHeader />}
    >
      <SearchInput />
    
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
