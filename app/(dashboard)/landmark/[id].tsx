import { StyleSheet } from 'react-native';
import React from 'react';

import { useLocalSearchParams } from "expo-router";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Header, Main } from '@/components/screen';
import { LandmarkContext } from '@/contexts/LandmarkContext';

export default function LandmarkDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [landmark, setLandmark] = React.useState(null);

  const fetchLandmark = React.useCallback(async () => {
    try {
      const response = await fetch(`https://api.example.com/landmarks/${id}`);
      const data = await response.json();
      setLandmark(data);
    } catch (error) {
      console.error('Failed to fetch landmark:', error);
    }
  }, [id]);

  React.useEffect(() => {
    if (id) {
      fetchLandmark();
    }
  }, [id, fetchLandmark]);

  return (
    <LandmarkContext.Provider value={{
      landmark: landmark,
    }}>
      <ParallaxScrollView>
        <Header
          title="Landmark Details"
          labels={[
            'Landmark',
            'Details',
          ]}
        />
        <Main>

        </Main>

      </ParallaxScrollView>
    </LandmarkContext.Provider>
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
