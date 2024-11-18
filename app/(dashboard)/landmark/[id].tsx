import { StyleSheet, View } from 'react-native';
import React from 'react';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from "expo-router";

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Area, Header, Main } from '@/components/screen';
import { LandmarkContext } from '@/contexts/LandmarkContext';
import { Toast, ToastDescription, ToastTitle, useToast } from '@/components/ui/toast';
import { Text } from '@/components/ui/text';
import { Api } from '@/constants/Api';
import { Image } from '@/components/ui/image';
import { ScrollView } from '@/components/ui/scroll-view';
import { Landmark, SpecialDish } from '@/types';
import { VStack } from '@/components/ui/vstack';
import Field from '@/components/ui/field';
import BottomToolbar from '@/components/screen/BottomToolbar';
import { Button, ButtonText } from '@/components/ui/button';
import { UserReviewCard, UserReviewInput } from '@/components/user';
import { mockLandmarkFeedbacks, mockLandmarks, mockSpecialDishes, mockUsers } from '@/mock';
import { SpecialDishViewCard } from '@/components/special-dish';
import { HStack } from '@/components/ui/hstack';
import { ModalBody, ModalContent, ModalHeader, Modal, ModalBackdrop, ModalFooter } from '@/components/ui/modal';
import { Heading } from '@/components/ui/heading';

const AROUND_VIETNAM_API = Api.aroundvietnam.url;

export default function LandmarkDetailsScreen() {
  const { id } = useLocalSearchParams();
  const toast = useToast();
  const [toastId, setToastId] = React.useState(0)
  const [landmark, setLandmark] = React.useState<Landmark | null>(null);
  const [specialDishes, setSpecialDishes] = React.useState<SpecialDish[]>([]);
  const [showAllReviews, setShowAllReviews] = React.useState(false);

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
      setLandmark(mockLandmarks[0]);
      setSpecialDishes(mockSpecialDishes);
    }
  }, [id]);

  const UserReviewArea = () => {
    return (
      <Area
        title="Đánh giá"
        more={
          <Button variant='link' onPress={() => setShowAllReviews(true)}>
            <ButtonText className='text-typography-500'>
              Tất cả bình luận
            </ButtonText>
          </Button>
        }
      >
        {mockLandmarkFeedbacks.slice(0, 5).map((feedback, index) => (
          <UserReviewCard
            key={index}
            comment={feedback.comments}
            rating={feedback.stars}
            created_at={feedback.createdAt}
            user={mockUsers[0]}
          />
        ))}
        <UserReviewInput />
        <Modal
          isOpen={showAllReviews}
          onClose={() => setShowAllReviews(false)}
          size='full'
          className='justify-end'
        >
          <ModalBackdrop />
          <ModalContent className={'h-3/4'}>
            <ModalHeader>
              <VStack className='items-center w-full'>
                <View style={styles.handle} />
                <Heading size='lg' className='text-typography-900 text-lg'>
                  Tất cả bình luận
                </Heading>
              </VStack>
            </ModalHeader>
            <ModalBody>
              <ScrollView>
                {mockLandmarkFeedbacks.map((feedback, index) => (
                  <UserReviewCard
                    key={index}
                    comment={feedback.comments}
                    rating={feedback.stars}
                    created_at={feedback.createdAt}
                    user={mockUsers[0]}
                  />
                ))}
              </ScrollView>
            </ModalBody>
            <ModalFooter>
              <UserReviewInput />
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Area>
    )
  }
  React.useEffect(() => {
    if (id) {
      fetchLandmark();
    }
  }, [id, fetchLandmark]);

  return (
    <LandmarkContext.Provider value={{
      landmark: landmark,
    }}>
      <ParallaxScrollView
        footer={
          <BottomToolbar>
            <Button size='lg' className='w-full'>
              <ButtonText>
                Tìm đường đi
              </ButtonText>
            </Button>
          </BottomToolbar>
        }
      >
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1547643857-081e66b3ea2e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          alt={landmark?.name || 'Landmark Image'}
          className='rounded-3xl w-full h-auto aspect-[1/1] object-cover'
        />
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
            <ScrollView horizontal>
              <HStack space='sm'>
                {
                  specialDishes.map((dish, index) => (
                    <SpecialDishViewCard
                      key={index}
                      specialDish={dish}
                    />
                  ))
                }
              </HStack>
            </ScrollView>

          </Area>
          <Area
            title="Vị trí"
          >
          </Area>
          <UserReviewArea />

        </Main>
      </ParallaxScrollView>
    </LandmarkContext.Provider>
  );
}

const styles = StyleSheet.create({
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginVertical: 8,
  },
});
