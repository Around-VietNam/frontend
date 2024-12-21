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
import { Dish } from '@/types';
import { VStack } from '@/components/ui/vstack';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Field from '@/components/ui/field';
import BottomToolbar from '@/components/screen/BottomToolbar';
import { Button, ButtonText } from '@/components/ui/button';
import { UserReviewCard, UserReviewInput } from '@/components/user';
import { Heading } from '@/components/ui/heading';
import { ModalBackdrop, ModalContent, ModalHeader, ModalBody, ModalFooter, Modal } from '@/components/ui/modal';
import { mockDishes, mockLandmarkFeedbacks, mockUsers } from '@/mock';
import { HStack } from '@/components/ui/hstack';

const AROUND_VIETNAM_API = Api.aroundvietnam.url;

export default function SpecialDishDetailsScreen() {
  const { id } = useLocalSearchParams();
  const toast = useToast();
  const [toastId, setToastId] = React.useState(0)
  const [specialDish, setSpecialDish] = React.useState<Dish | null>(null);
  const [showAllReviews, setShowAllReviews] = React.useState(false);

  const fetchSpecialDish = React.useCallback(async () => {
    try {
      const response = await fetch(`${AROUND_VIETNAM_API}/specialDishs/${id}`);
      const data = await response.json();
      setSpecialDish(data);
    } catch (error) {
      // const newId = Math.random()
      // setToastId(newId)
      // toast.show({
      //   id: newId.toString(),
      //   placement: "top",
      //   duration: 3000,
      //   render: ({ id }) => {
      //     const uniqueToastId = "toast-" + id
      //     return (
      //       <Toast nativeID={uniqueToastId} action="error" variant="solid">
      //         <ToastTitle>Hello!</ToastTitle>
      //         <ToastDescription>
      //           Failed to fetch special dish
      //         </ToastDescription>
      //       </Toast>
      //     )
      //   }
      // });
      setSpecialDish(mockDishes[Number(id) - 1]);
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
        {/* {mockLandmarkFeedbacks.slice(0, 5).map((feedback, index) => (
          <UserReviewCard
            key={index}
            comment={feedback.comments}
            rating={feedback.stars}
            created_at={feedback.createdAt}
            user={mockUsers[0]}
          />
        ))} */}
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
            <HStack className='w-full p-6 justify-between bg-black'>
              <Button className='w-36'>
                <ButtonText>
                  Tìm nhà hàng 
                </ButtonText>
              </Button>
            </HStack>
            {/* <Center className='w-full h-fit bg-background-0 shadow-soft-1 rounded-full'>
            <UserReviewInput />
          </Center> */}
          </BottomToolbar>
        }
      >
        <Image
          source={{
            uri: specialDish?.image || 'https://via.placeholder.com/300',
          }}
          alt={specialDish?.name || 'Dish Image'}
          className='rounded-[24] w-full h-auto aspect-[1/1] object-cover'
        />
        <Header
          title={specialDish?.name || 'Đang tải...'}
          badge='Ẩm thực'
          more={
            <VStack space="sm">
              <Field
                icon={<MaterialCommunityIcons name="silverware-fork-knife" size={16} color="#FFC53C" />}
                label="Specialty"
                value={specialDish?.special || 'Đang tải...'}
              />
              <Field
                icon={<Ionicons name="pricetag-outline" size={16} color="#FFC53C" />}
                label="Price"
                value={`${specialDish?.price || 0} VND`}
              />
            </VStack>
          }
          className='p-4'
        />
        <Main>
          <Text className='text-typography-500 text-base'>
            {specialDish?.description}
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
