import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';

import { useLocalSearchParams, useRouter } from "expo-router";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Area, Header, Main } from '@/components/screen';
import { SpecialDishContext } from '@/contexts';
import { Toast, ToastDescription, ToastTitle, useToast } from '@/components/ui/toast';
import { Text } from '@/components/ui/text';
import { Api } from '@/constants/Api';
import { Image } from '@/components/ui/image';
import { Dish, DishFeedback, User } from '@/types';
import { VStack } from '@/components/ui/vstack';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Field from '@/components/ui/field';
import BottomToolbar from '@/components/screen/BottomToolbar';
import { Button, ButtonText } from '@/components/ui/button';
import { UserReviewCard, UserReviewInput } from '@/components/user';
import { Heading } from '@/components/ui/heading';
import { ModalBackdrop, ModalContent, ModalHeader, ModalBody, ModalFooter, Modal } from '@/components/ui/modal';
import { mockDishes, mockLandmarkFeedbacks, mockRestaurants, mockUsers } from '@/mock';
import { HStack } from '@/components/ui/hstack';
import { useMutation, useQuery } from 'react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { RestaurantViewCard } from '@/components/restaurant/RestaurantViewCard';

const AROUND_VIETNAM_API = Api.aroundvietnam.url;

export default function SpecialDishDetailsScreen() {
  const { id } = useLocalSearchParams();
  const toast = useToast();
  const [toastId, setToastId] = React.useState(0)
  const [showAllReviews, setShowAllReviews] = React.useState(false);
  const [nearestRestaurant, setNearestRestaurant] = React.useState(mockRestaurants[1]);
  const router = useRouter();

  const {
    mutate: addSpecialDishToFavorite,
    data: specialDishFavorite,
    isSuccess: isSpecialDishFavoriteSuccess,
  } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${AROUND_VIETNAM_API}/users/${'bestback'}/favorite-dishes/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      return response.json();
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const {
    data: user,
    isLoading: isUserLoading,
    isSuccess: isUserSuccess,
  } = useQuery<User>({
    queryKey: 'user',
    queryFn: async () => {
      const data = await fetch(`${AROUND_VIETNAM_API}/users/${'bestback'}`, {
        headers: {
          Authorization: `Bearer ${Api.aroundvietnam.key}`,
        },
      });

      return await data.json();
    }
  });



  const {
    mutate: removeSpecialDishFromFavorite,
  } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${AROUND_VIETNAM_API}/users/${'bestback'}/favorite-dishes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          landmarkId: id,
        }),
      });

      return response.json();
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const { data: specialDish,
    isLoading: isSpecialDishLoading,
    isSuccess: isSpecialDishSuccess,
  } = useQuery({
    queryKey: ['specialDish', id],
    queryFn: async () => {
      try {
        const response = await fetch(`${AROUND_VIETNAM_API}/dishes/${id}`);
        const data = await response.json();
        return data;
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
        return mockDishes[Number(id) - 1];
      }
    }
  });

  const {
    data: feedbacks,
    isLoading: isFeedbacksLoading,
    isSuccess: isFeddbacksSuccess,
  } = useQuery<DishFeedback[]>({
    queryKey: ['feedbacks', id],
    queryFn: async () => {
      try {
        const response = await fetch(`${AROUND_VIETNAM_API}/dishes/${id}/feedbacks`);
        const data = await response.json();
        return data;
      } catch (error) {
        return mockLandmarkFeedbacks;
      }
    }
  });

  const UserReviewArea = () => {
    if (isFeedbacksLoading) {
      return (
        <Skeleton className='w-full h-auto aspect-[2/1] rounded-3xl' />
      )
    }

    if (!feedbacks) {
      return (
        <Text className='text-typography-500'>
          Chưa có bình luận nào
        </Text>
      )
    }

    return (
      <Modal
        isOpen={showAllReviews}
        onClose={() => setShowAllReviews(false)}
        size='full'
        className='justify-end'
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled
        >
          <ModalBackdrop />
          <ModalContent className={'h-3/4 rounded-[24]'}>
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
                <VStack space='md'>
                  {feedbacks.length > 0 && feedbacks.map((feedback, index) => (
                    <UserReviewCard
                      key={index}
                      comment={feedback.comment}
                      rating={feedback.rating || 0}
                      create_at={feedback.create_at.toString()}
                      username={feedback.username || 'Anonymous'}
                    />
                  ))}
                </VStack>
              </ScrollView>
            </ModalBody>
            <ModalFooter>
              <UserReviewInput
                func={() => setShowAllReviews(false)}
              />
            </ModalFooter>
          </ModalContent>
        </KeyboardAvoidingView>
      </Modal>
    )
  }

  if (isSpecialDishLoading) {
    return (
      <Skeleton
        className='w-full h-full rounded-[24]'
      />
    );
  }

  if (!isSpecialDishSuccess || !isFeddbacksSuccess) {
    return (
      <VStack className='w-full h-full justify-center items-center'>
        <Text className='text-typography-500 text-lg'>
          Đã xảy ra lỗi khi tải dữ liệu
        </Text>
      </VStack>
    );
  }


  return (
    <SpecialDishContext.Provider value={{
      specialDish: specialDish,
    }}>
      <ParallaxScrollView
        footer={
          <BottomToolbar>
            <HStack className='w-full p-6 justify-between bg-black'>
              <Button className='w-32' onPress={() => router.push(`/(tabs)/map-screen?lat=${nearestRestaurant?.latitude}&long=${nearestRestaurant?.longitude}`)}>
                <ButtonText className='flex-1'>
                  Mở bản đồ
                </ButtonText>
              </Button>
              <HStack space='md'>
                <Button
                  className='bg-transparent p-3 w-fit h-fit'
                  onPress={() => {
                    if (user?.favoriteDishes?.some((favoriteDish) => favoriteDish.id === specialDish?.id)) {
                      removeSpecialDishFromFavorite()
                    } else {
                      addSpecialDishToFavorite()
                    }
                  }}
                >
                  <FontAwesome
                    name={user?.favoriteDishes?.some((favoriteDish) => favoriteDish.id === specialDish?.id) ? 'heart' : 'heart-o'}
                    size={16}
                    color={user?.favoriteDishes?.some((favoriteDish) => favoriteDish.id === specialDish?.id) ? 'red' : '#fff'}
                  />
                </Button>
                <Button className='bg-background-500 p-3 w-fit h-fit' onPress={() => setShowAllReviews(true)}>
                  <FontAwesome name='comment' size={16} color='#fff' />
                </Button>
              </HStack>
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
                value={specialDish?.special ? 'Yes' : 'No'}
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
            title="Nhà hàng "
          >
            <ScrollView horizontal>
              <HStack space='md'>
                {mockRestaurants.map((restaurant, index) => (
                  <RestaurantViewCard key={index} restaurant={restaurant} />
                ))}
              </HStack>
            </ScrollView>

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
