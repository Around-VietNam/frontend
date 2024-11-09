import { StyleSheet } from 'react-native';
import React from 'react';

import { useLocalSearchParams } from "expo-router";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Area, Header, Main } from '@/components/screen';
import { LandmarkContext } from '@/contexts/LandmarkContext';
import { Toast, ToastDescription, ToastTitle, useToast } from '@/components/ui/toast';
import { Text } from '@/components/ui/text';
import { Api } from '@/constants/Api';
import { Image } from '@/components/ui/image';
import { Landmark } from '@/types';
import { VStack } from '@/components/ui/vstack';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Center } from '@/components/ui/center';
import Field from '@/components/ui/field';

const AROUND_VIETNAM_API = Api.aroundvietnam.url;

export default function LandmarkDetailsScreen() {
  const { id } = useLocalSearchParams();
  const toast = useToast();
  const [toastId, setToastId] = React.useState(0)
  const [landmark, setLandmark] = React.useState<Landmark | null>(null);

  const fetchLandmark = React.useCallback(async () => {
    try {
      const response = await fetch(`${AROUND_VIETNAM_API}/landmarks/${id}`);
      const data = await response.json();
      setLandmark(data);
    } catch (error) {
      const newId = Math.random()
      setToastId(newId)
      toast.show({
        id: newId.toString(),
        placement: "top",
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = "toast-" + id
          return (
            <Toast nativeID={uniqueToastId} action="error" variant="solid">
              <ToastTitle>Hello!</ToastTitle>
              <ToastDescription>
                Failed to fetch landmark
              </ToastDescription>
            </Toast>
          )
        }
      });
      setLandmark({
        id: 1,
        name: 'Landmark Name',
        image: 'https://images.unsplash.com/photo-1547643857-081e66b3ea2e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Vietnam, officially the Socialist Republic of Vietnam, is a country at the eastern edge of mainland Southeast Asia, with an area of about 331,000 square',
        address: '123 Landmark St.',
        rating: 4.5,
        createdAt: new Date(),
        region: 'Region',
        updatedAt: new Date(),
      });

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
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1547643857-081e66b3ea2e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          alt={landmark?.name || 'Landmark Image'}
          className='rounded-3xl w-full h-auto aspect-[1/1] object-cover'
        />
        <VStack space="sm" className="p-4 shadow-hard-2">
          <Text className="text-typography-500 text-base">
            {landmark?.name || 'Landmark Name'}
          </Text>
          <Text className="text-typography-500 text-sm">
            {landmark?.address || '123 Landmark St.'}
          </Text>
        </VStack>
        <Header
          title={landmark?.name || 'Landmark Name'}
          badge='Du lịch'
          more={
            <VStack space="sm">
              <Field
                icon={<Ionicons name="location-outline" size={16} color="#808080" className="text-typography-500" />}
                label="Address"
                value={landmark?.address || '123 Landmark St.'}
              />
              <Field
                icon={<MaterialCommunityIcons name="scooter" size={16} color="#808080" className="text-typography-500" />}
                label="Region"
                value={landmark?.region || 'Region'}
              />
              <Field
                icon={<AntDesign name="star" size={16} color="#FFC53C" />}
                label="Rating"
                value={landmark?.rating || 4.5}
              />

            </VStack>
          }
        />
        <Main>
          <Text className='text-typography-500 text-base'>
            {landmark?.description} + {id}
          </Text>
          <Area
            title="Ẩm thực"
          >
          </Area>
          <Area
            title="Vị trí"
          >
          </Area>


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
