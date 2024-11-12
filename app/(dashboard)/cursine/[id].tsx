import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';

import { useLocalSearchParams } from "expo-router";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Area, Header, Main } from '@/components/screen';
import { SpecialDishContext } from '@/contexts';
import { Toast, ToastDescription, ToastTitle, useToast } from '@/components/ui/toast';
import { Text } from '@/components/ui/text';
import { Api } from '@/constants/Api';
import { Image } from '@/components/ui/image';
import { SpecialDish } from '@/types';
import { VStack } from '@/components/ui/vstack';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Field from '@/components/ui/field';
import BottomToolbar from '@/components/screen/BottomToolbar';
import { Button, ButtonText } from '@/components/ui/button';
import { UserReviewCard, UserReviewInput } from '@/components/user';
import { Heading } from '@/components/ui/heading';
import { ModalBackdrop, ModalContent, ModalHeader, ModalBody, ModalFooter, Modal} from '@/components/ui/modal';
import { mockLandmarkFeedbacks, mockUsers } from '@/mock';

const AROUND_VIETNAM_API = Api.aroundvietnam.url;

export default function SpecialDishDetailsScreen() {
  const { id } = useLocalSearchParams();
  const toast = useToast();
  const [toastId, setToastId] = React.useState(0)
  const [specialDish, setSpecialDish] = React.useState<SpecialDish | null>(null);
  const [showAllReviews, setShowAllReviews] = React.useState(false);

  const fetchSpecialDish = React.useCallback(async () => {
    try {
      const response = await fetch(`${AROUND_VIETNAM_API}/specialDishs/${id}`);
      const data = await response.json();
      setSpecialDish(data);
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
                Failed to fetch special dish
              </ToastDescription>
            </Toast>
          )
        }
      });
      setSpecialDish({
        id: 1,
        name: 'SpecialDish Name',
        image: 'https://images.unsplash.com/photo-1547643857-081e66b3ea2e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Vietnam, officially',
        createdAt: new Date(),
        updatedAt: new Date(),
        maxPrice: 100000,
        minPrice: 50000,
        specialty: 'Specialty',
      });

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
      fetchSpecialDish();
    }
  }, [id, fetchSpecialDish]);

  return (
    <SpecialDishContext.Provider value={{
      specialDish: specialDish,
    }}>
      <ParallaxScrollView
        footer={
          <BottomToolbar>
            <Button size='lg' className='w-full'>
              <ButtonText>
                Tìm nhà hàng gần nhất
              </ButtonText>
            </Button>
          </BottomToolbar>
        }
      >
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1547643857-081e66b3ea2e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          alt={specialDish?.name || 'SpecialDish Image'}
          className='rounded-3xl w-full h-auto aspect-[1/1] object-cover'
        />
        <Header
          title={specialDish?.name || 'SpecialDish Name'}
          badge='Ẩm thực'
          more={
            <VStack space="sm">
              <Field
                icon={<MaterialCommunityIcons name="silverware-fork-knife" size={16} color="#FFC53C" />}
                label="Specialty"
                value={specialDish?.specialty || 'Specialty'}
              />
              <Field
                icon={<Ionicons name="pricetag-outline" size={16} color="#FFC53C" />}
                label="Price"
                value={`${specialDish?.minPrice || 50000} - ${specialDish?.maxPrice || 100000} VND`}
              />
            </VStack>
          }
        />
        <Main>
          <Text className='text-typography-500 text-base'>
            {specialDish?.description} + {id}
          </Text>
          <Area
            title="Ẩm thực"
          >
          </Area>
          <Area
            title="Nhà hàng "
          >

          </Area>
          <UserReviewArea />

        </Main>
      </ParallaxScrollView>
    </SpecialDishContext.Provider>
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
