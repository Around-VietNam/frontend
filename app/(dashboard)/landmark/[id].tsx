import { StyleSheet, View, KeyboardAvoidingView, Platform, Image, Dimensions } from 'react-native';
import React from 'react';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from "expo-router";

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Area, Header, Main } from '@/components/screen';
import { LandmarkContext } from '@/contexts/LandmarkContext';
import { useToast } from '@/components/ui/toast';
import { Text } from '@/components/ui/text';
import { Api } from '@/constants/Api';
import { ScrollView } from '@/components/ui/scroll-view';
import { Landmark, Dish, LandmarkFeedback, User } from '@/types';
import { VStack } from '@/components/ui/vstack';
import Field from '@/components/ui/field';
import BottomToolbar from '@/components/screen/BottomToolbar';
import { Button, ButtonText } from '@/components/ui/button';
import { UserReviewCard, UserReviewInput } from '@/components/user';
import { mockLandmarkFeedbacks, mockLandmarks, mockDishes, mockUsers } from '@/mock';
import { SpecialDishViewCard } from '@/components/special-dish';
import { HStack } from '@/components/ui/hstack';
import { useMutation, useQuery } from 'react-query';

import {
  ModalBody,
  ModalContent,
  ModalHeader,
  Modal,
  ModalBackdrop,
  ModalFooter
} from '@/components/ui/modal';
import { Heading } from '@/components/ui/heading';
import { useLocation } from '@/contexts/location';
import { Skeleton, SkeletonText } from '@/components/ui/skeleton';
import { MinimapV2 } from '@/components/map';
import { Marker } from 'react-native-maps';
import { LandmarkReviewMap } from '@/components/landmark';
import { Center } from '@/components/ui/center';
import { useAuth } from '@/hooks/useAuth';
import { AssistantChat } from '@/components/chat/AssistantChat';
import { GiftedChat } from 'react-native-gifted-chat';

const AROUND_VIETNAM_API = Api.aroundvietnam.url;

const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;  // deg2rad below
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    0.5 - Math.cos(dLat) / 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    (1 - Math.cos(dLon)) / 2;

  return R * 2 * Math.asin(Math.sqrt(a));
}

export default function LandmarkDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { location } = useLocation();
  const toast = useToast();
  const { account } = useAuth()
  const [toastId, setToastId] = React.useState(0)

  const {
    mutate: addFavoriteLandmark,
    data: favoriteLandmark,
    isSuccess: isFavoriteLandmarkSuccess,
  } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${AROUND_VIETNAM_API}/users/${'bestback'}/favorite-landmarks/${id}`, {
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

  const { data: landmark, refetch: refetchLandmark } = useQuery<Landmark>({
    queryKey: ['landmark', id],
    queryFn: async () => {
      console.log(`${AROUND_VIETNAM_API}/landmarks/${id}`)
      const response = await fetch(`${AROUND_VIETNAM_API}/landmarks/${id}`);
      const data = await response.json();

      return data;
    },
    onError: (error) => {
      console.log(error)
    },
    enabled: !!id,
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
    mutate: removeFavoriteLandmark,
  } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${AROUND_VIETNAM_API}/users/${'bestback'}/favorite-landmarks/${id}`, {
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

  const [specialDishes, setSpecialDishes] = React.useState<Dish[]>(mockDishes);
  const [showAllReviews, setShowAllReviews] = React.useState(false);
  const [comment, setComment] = React.useState('');

  const router = useRouter();

  const {
    mutate: postFeedback,
  } = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`${AROUND_VIETNAM_API}/landmarks/${id}/feedbacks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          comment: data,
          rating: 5,
          username: 'bestback',
          image: ''
        })
      });

      return response.json();
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const {
    data: feedbacks,
    isLoading: isFeedbacksLoading,
    isError: isFeedbacksError,
    error: feedbacksError,
    isSuccess: isFeedbacksSuccess,
  } = useQuery<LandmarkFeedback[]>({
    queryKey: ['landmark-feedbacks', id],
    queryFn: async () => {
      const response = await fetch(`${AROUND_VIETNAM_API}/landmarks/${id}/feedbacks`);
      const data = await response.json();

      return data.data || [];
    },
    enabled: !!landmark,
  })

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
                  {feedbacks && feedbacks.map((feedback, index) => (
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
                func={postFeedback}
                value={comment}
                onChangeText={setComment}
              />
            </ModalFooter>
          </ModalContent>
        </KeyboardAvoidingView>
      </Modal>
    )
  }

  const LandmarkLocation = () => {
    if (!landmark) return <Skeleton className='w-full h-auto aspect-[2/1] rounded-3xl' />

    return (
      <HStack className='w-full h-auto aspect-[2/1] p-4 bg-background-0 rounded-3xl shadow-soft-1 justify-between' space='md'>
        <VStack className='items-center justify-start flex-1' space='md'>
          <Heading size='lg' className='text-typography-900 flex-1 flex-wrap'>
            # {landmark?.address}
          </Heading>
          <Field
            icon={<MaterialCommunityIcons name="map-marker-distance" size={16} color="#808080" className="text-typography-500" />}
            label={"Distance"}
            value={
              landmark ?
                haversineDistance(location?.coords.latitude!, location?.coords.longitude!, landmark?.latitude || 0, landmark?.longitude || 0).toFixed(2) + ' km'
                :
                <SkeletonText className='w-8 h-4 rounded-lg' />
            }
          />
        </VStack>
        <MinimapV2
          className='h-full w-auto aspect-square rounded-3xl'
          region={{
            latitude: landmark?.latitude || 0,
            longitude: landmark?.longitude || 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.042
          }}
        >
          <Marker
            coordinate={{
              latitude: landmark?.latitude!,
              longitude: landmark?.longitude!,
            }}
            title={landmark?.name}
            description={landmark?.address}
          >
            <LandmarkReviewMap
              landmark={landmark}
              showCard={false}
            />
          </Marker>
        </MinimapV2>
      </HStack>
    )
  }

  const CoverAndHeader = () => {
    return (
      <View className='relative'>
        {
          landmark?.image ?
            <Image
              source={{
                uri: landmark?.image || 'https://via.placeholder.com/300',
              }}
              alt={landmark?.name || 'Landmark Image'}
              style={{
                width: '100%',
                height: Dimensions.get('window').height * 0.95,
                resizeMode: 'cover',
                borderTopLeftRadius: 32,
                borderTopRightRadius: 32,
              }}
            />
            :
            <Skeleton className='aspect-[1/1] h-auto w-full rounded-3xl' />
        }
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            zIndex: 999,
            backgroundColor: "#000",
            shadowColor: "#000",
            shadowOffset: {
              width: -64,
              height: -64,
            },
            width: '200%',
            height: Dimensions.get('window').height * 0.15,
            shadowOpacity: 1,
            shadowRadius: 32,
            elevation: 5,
            overflow: 'visible'
          }}
        />
        <Header
          style={{
            position: 'absolute',
            bottom: 32,
            zIndex: 999,
            width: '100%',
            paddingHorizontal: 16,
            overflow: 'visible'
          }}
          title={
            <VStack>
              <Heading size='4xl' className='text-typography-900 capitalize'>
                {landmark?.name || 'Landmark Name'}
              </Heading>
              {
                landmark?.description ?
                  <Text className='text-typography-500 z-50'>
                    {landmark?.description}
                  </Text>
                  :
                  <SkeletonText className='w-full h-16 rounded-lg' />
              }
            </VStack>
          }
          badge="Du lịch"
        />
      </View>
    )
  }

  if (!landmark) {
    return (
      <Skeleton className='w-full h-full' />
    )
  }

  return (
    <LandmarkContext.Provider value={{
      landmark: landmark,
    }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ParallaxScrollView
          onRefresh={() => refetchLandmark()}
          footer={
            <BottomToolbar>
              <HStack className='w-full p-6 justify-between bg-black'>
                <Button className='w-32' onPress={() => router.push(`/(tabs)/map-screen?lat=${landmark?.latitude}&long=${landmark?.longitude}`)}>
                  <ButtonText className='flex-1'>
                    Mở bản đồ
                  </ButtonText>
                </Button>
                <HStack space='md'>
                  <Button
                    className='bg-transparent p-3 w-fit h-fit'
                    onPress={() => {
                      if (user?.favoriteLandmarks?.some((favoriteLandmark) => favoriteLandmark.id === landmark?.id)) {
                        removeFavoriteLandmark()
                      } else {
                        addFavoriteLandmark()
                      }
                    }}
                  >
                    <FontAwesome
                      name={user?.favoriteLandmarks?.some((favoriteLandmark) => favoriteLandmark.id === landmark?.id) ? 'heart' : 'heart-o'}
                      size={16}
                      color={user?.favoriteLandmarks?.some((favoriteLandmark) => favoriteLandmark.id === landmark?.id) ? 'red' : '#fff'}
                    />
                  </Button>
                  <Button className='bg-background-500 p-3 w-fit h-fit' onPress={() => setShowAllReviews(true)}>
                    <FontAwesome name='comment' size={16} color='#fff' />
                  </Button>
                </HStack>
              </HStack>
            </BottomToolbar>
          }
        >
          <CoverAndHeader />
          <Main style={{
            flex: 1,
            height: '100%',
          }}>
            <LandmarkLocation />
            <Area
              title="Ẩm thực"
            >
              <ScrollView className='overflow-visible'>
                <VStack space='sm'>
                  {
                    specialDishes.map((dish, index) => (
                      <SpecialDishViewCard
                        key={index}
                        specialDish={dish}
                      />
                    ))
                  }
                </VStack>
              </ScrollView>
            </Area>
            <UserReviewArea />
          </Main>
        </ParallaxScrollView>
      </KeyboardAvoidingView >
    </LandmarkContext.Provider >
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
