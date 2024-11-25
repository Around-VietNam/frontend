import ParallaxScrollView from '@/components/ParallaxScrollView';
import { LandmarkViewCard } from '@/components/landmark';
import { mockLandmarks } from '@/mock';

import { DashboardHeader } from '@/components/global/DashboardHeader';
import { SearchInput } from '@/components/global/SearchInput';
import { SituationWidget } from '@/components/widgets';
import { Box } from '@/components/ui/box';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      header={<DashboardHeader />}
    >
      <Box
        className={'w-full h-64 bg-secondary-500 absolute'}
      />
      <SituationWidget />
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