import ParallaxScrollView from '@/components/ParallaxScrollView';
import { LandmarkViewCard } from '@/components/landmark';
import { View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '@/components/ui/text';
import { useQuery } from 'react-query';
import { Landmark, Restaurant, Dish, User } from '@/types';
import { Api } from '@/constants/Api';
import { VStack } from '@/components/ui/vstack';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { twMerge } from 'tailwind-merge';
import { HStack } from '@/components/ui/hstack';
import { Center } from '@/components/ui/center';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FavoriteScreen() {
  const height = useSharedValue(0);
  const { account } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'landmark' | 'restaurant' | 'dish'>('landmark');
  const [favoriteLandmarks, setFavoriteLandmarks] = useState<Landmark[]>([]);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<Restaurant[]>([]);
  const [favoriteDishes, setFavoriteDishes] = useState<Dish[]>([]);

  const {
    data: user,
    isLoading: isUserLoading,
    isSuccess: isUserSuccess,
  } = useQuery<User>({
    queryKey: 'user',
    queryFn: async () => {
      const data = await fetch(`${Api.aroundvietnam.url}/users/${'bestback'}`, {
        headers: {
          Authorization: `Bearer ${Api.aroundvietnam.key}`,
        },
      });

      return await data.json();
    },
    onSuccess: (data) => {
      console.log(data);
      setFavoriteLandmarks(data.favoriteLandmarks!);
      setFavoriteRestaurants(data.favoriteRestaurants!);
      setFavoriteDishes(data.favoriteDishes!);
    }
  });

  const CarouselLandmarks = () => {
    if (!user) return null;

    const currentIndex = useSharedValue(0);

    const handleNext = () => {
      currentIndex.value = (currentIndex.value + 1) % favoriteLandmarks.length;
    };

    const renderItem = (item: any, index: number) => {
      const animatedStyle = useAnimatedStyle(() => {
        const position = (index - currentIndex.value + favoriteLandmarks.length) % favoriteLandmarks.length;

        const translateY = position === 0 ? 0 : 64;
        const scale = position === 0 ? 1 : 0.95;
        const zIndex = position === 0 ? 999 : 1;
        const opacity = position < 2 ? 1 : 0.05;

        return {
          transform: [{ translateY: withSpring(translateY) }, { scale: withSpring(scale) }],
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: withSpring(opacity),
          zIndex,
        };
      });

      return (
        <Animated.View key={item.id} style={animatedStyle}>
          <LandmarkViewCard key={item.id} landmark={item} onClick={handleNext} />
        </Animated.View>
      );
    };

    return (
      <View
        style={{
          width: '100%',
          height: 640,
          position: 'relative',
          alignItems: 'center',
        }}
      >
        {favoriteLandmarks.map((item, index) => renderItem(item, index))}
      </View>
    );
  };

  const CarouselRestaurants = () => {
    if (!user) return null;

    const currentIndex = useSharedValue(0);

    const handleNext = () => {
      currentIndex.value = (currentIndex.value + 1) % favoriteRestaurants.length;
    };

    const renderItem = (item: any, index: number) => {
      const animatedStyle = useAnimatedStyle(() => {
        const position = (index - currentIndex.value + favoriteRestaurants.length) % favoriteRestaurants.length;

        const translateY = position === 0 ? 0 : 64;
        const scale = position === 0 ? 1 : 0.95;
        const zIndex = position === 0 ? 999 : 1;
        const opacity = position < 2 ? 1 : 0.05;

        return {
          transform: [{ translateY: withSpring(translateY) }, { scale: withSpring(scale) }],
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: withSpring(opacity),
          zIndex,
        };
      });

      return (
        <Animated.View key={item.id} style={animatedStyle}>
          <LandmarkViewCard key={item.id} landmark={item} onClick={handleNext} />
        </Animated.View>
      );
    };

    return (
      <View
        style={{
          width: '100%',
          height: 640,
          position: 'relative',
          alignItems: 'center',
        }}
      >
        {favoriteRestaurants.map((item, index) => renderItem(item, index))}
      </View>
    );
  };

  const CarouselDishes = () => {
    if (!user) return null;

    const currentIndex = useSharedValue(0);

    const handleNext = () => {
      currentIndex.value = (currentIndex.value + 1) % favoriteDishes.length;
    };

    const renderItem = (item: any, index: number) => {
      const animatedStyle = useAnimatedStyle(() => {
        const position = (index - currentIndex.value + favoriteDishes.length) % favoriteDishes.length;

        const translateY = position === 0 ? 0 : 64;
        const scale = position === 0 ? 1 : 0.95;
        const zIndex = position === 0 ? 999 : 1;
        const opacity = position < 2 ? 1 : 0.05;

        return {
          transform: [{ translateY: withSpring(translateY) }, { scale: withSpring(scale) }],
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: withSpring(opacity),
          zIndex,
        };
      });

      return (
        <Animated.View key={item.id} style={animatedStyle}>
          <LandmarkViewCard key={item.id} landmark={item} onClick={handleNext} />
        </Animated.View>
      );
    };

    return (
      <View
        style={{
          width: '100%',
          height: 640,
          position: 'relative',
          alignItems: 'center',
        }}
      >
        {favoriteDishes.map((item, index) => renderItem(item, index))}
      </View>
    );
  };

  const UserProfile = () => {
    return (
      <VStack className='justify-center items-center flex-1' space='lg'>
        <Avatar>
          <AvatarImage
            source={{
              uri: account?.avatar_url,
            }}
          />
        </Avatar>
        <VStack space='sm'>
          <Heading
            size='2xl'
            className='font-bold capitalize'
          >
            {account?.name}
          </Heading>
          <Text className='text-typography-600'>
            {user?.email}
          </Text>
        </VStack>
      </VStack>
    )
  };

  const Header = () => {
    return (
      <HStack className='justify-between items-center'>
        <Text></Text>
        <HStack
          space='sm'
          className='rounded-2xl p-2 items-center'
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
          }}>
          <MaterialCommunityIcons name='map-marker' size={16} color='white' />
          <Text className='text-white'>
            {user?.location}
          </Text>
        </HStack>
      </HStack>
    )
  }
  React.useEffect(() => {
    height.value = withSpring(3600, {
      damping: 10,
      stiffness: 100,
    });
  }, []);

  return (
    <LinearGradient
      colors={['#B8BD75', '#535629', '#000']}
      // make smooth transition between colors
      style={{
        flex: 1,
        zIndex: 500,
      }}
    >
      <ParallaxScrollView
        containerStyle={{
          backgroundColor: 'transparent',
        }}
        contentContainerStyle={{
          marginHorizontal: 16,
          marginTop: 64,
        }}
      >
        <Header />
        <UserProfile />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 16 }}>
          <Button
            onPress={() => setSelectedTab('landmark')}
            variant={selectedTab === 'landmark' ? 'solid' : 'glass'}
          >
            <ButtonText
              className={twMerge(
                selectedTab === 'landmark' ? 'text-black' : 'text-white',
              )}
            >
              Landmark
            </ButtonText>
          </Button>
          <Button
            onPress={() => setSelectedTab('restaurant')}
            variant={selectedTab === 'restaurant' ? 'solid' : 'glass'}
          >
            <ButtonText
              className={twMerge(
                selectedTab === 'restaurant' ? 'text-black' : 'text-white',
              )}
            >
              Restaurant
            </ButtonText>
          </Button>
          <Button
            onPress={() => setSelectedTab('dish')}
            variant={selectedTab === 'dish' ? 'solid' : 'glass'}
          >
            <ButtonText
              className={twMerge(
                selectedTab === 'dish' ? 'text-black' : 'text-white',
              )}
            >
              Dish
            </ButtonText>
          </Button>
        </View>
        {selectedTab === 'landmark' && <CarouselLandmarks />}
        {selectedTab === 'restaurant' && <CarouselRestaurants />}
        {selectedTab === 'dish' && <CarouselDishes />}
      </ParallaxScrollView>
    </LinearGradient>
  );
}
