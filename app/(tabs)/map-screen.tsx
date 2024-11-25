import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, TouchableOpacity, Pressable, View, useWindowDimensions } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { Map } from '@/components/map/Map';
import { VStack } from '@/components/ui/vstack';
import { useNavigation } from 'expo-router';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useLocation } from '@/contexts/location';
import React from 'react';
import { Marker, Region } from 'react-native-maps';
import { LandmarkReviewMap } from '@/components/landmark';
import { mockLandmarks } from '@/mock';

export default function MapScreen() {
    const navigation = useNavigation();
    const { width, height } = useWindowDimensions();
    const { location } = useLocation();

    const [region, setRegion] = React.useState<Region>({
        latitude: location?.coords.latitude || 21.028511,
        longitude: location?.coords.longitude || 105.804817,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const Header = () => {
        return (
            <HStack className='justify-between items-center w-fit h-fit z-50 p-4 absolute top-8 left-4'>
                <Button
                    onPress={() => navigation.goBack()}
                    className='bg-white rounded-full p-2 items-center justify-center'
                >
                    <Ionicons name="chevron-back-outline" size={24} color="black" />
                </Button>
            </HStack>
        )
    }
    const Toolbar = () => {
        return (
            <VStack
                className='justify-between items-center h-fit w-fit absolute right-4 top-8 p-4 rounded-xl z-50'
            >
                <Button
                    className='bg-white rounded-full p-2 items-center justify-center'
                    onPress={() => {
                        if (!location) return;
                        setRegion({
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        })
                    }}
                >
                    <Ionicons name="paper-plane-sharp" size={24} color="black" />
                </Button>

            </VStack>
        )
    }

    React.useEffect(() => {
    }, [region]);

    return (
        <ThemedView
            style={{
                flex: 1,
                backgroundColor: 'transparent',
            }}
        >
            <Header />
            <Map
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                }}
                region={region}
                onRegionChangeComplete={setRegion}
            >
                {/* <Marker
                    coordinate={{
                        latitude: location?.coords.latitude! + 0.01,
                        longitude: location?.coords.longitude!,
                    }}
                    title="Hanoi"
                    description="Vietnam"
                >
                    <LandmarkReviewMap
                        landmark={mockLandmarks[0]}
                    />

                </Marker> */}
                {
                    mockLandmarks.map((landmark, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: location?.coords.latitude! + Math.random() * 0.01,
                                longitude: location?.coords.longitude! + Math.random() * 0.01,
                            }}
                            title={landmark.name}
                            description={landmark.address}
                        >6
                            <LandmarkReviewMap
                                landmark={landmark}
                            />
                        </Marker>
                    ))
                }
            </Map>
            <Toolbar />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
});
