import { Api } from '@/constants/Api';
import { useLocation } from '@/contexts/location';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import React from 'react';
import { View } from 'react-native';
import { Center } from '../ui/center';
import WebView from 'react-native-webview';



interface Props { }

export function Minimap({ }: Props) {
    const { location } = useLocation();
    const [mapLongitude, setMapLongitude] = React.useState<number>(location?.coords.longitude || 106.6881);
    const [mapLatitude, setMapLatitude] = React.useState<number>(location?.coords.latitude || 10.7629);
    const [mapZoom, setMapZoom] = React.useState<number>(12);
    const webRef = React.useRef<any>();

    const getMapTemplate = React.useCallback(() => {
        return `
            <div>
                <style>
                        html, body {
                            margin: 0;
                        }

                        #map {
                            height: 100%;
                            width: 100%;
                        }
                </style>
                
                <div id='map' class='map'></div>

                <!-- load TomTom Maps Web SDK from CDN -->
                <link rel='stylesheet' type='text/css' href='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/maps/maps.css'/>
                <script src='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/maps/maps-web.min.js'></script>

                <script>
                    // create the map
                    tt.setProductInfo('TomTom Maps React Native Demo', '1.0');
                    let map = tt.map({
                        key: '${Api.tomtom.key}',
                        container: 'map',
                        center: [${mapLongitude}, ${mapLatitude}],
                        zoom: ${mapZoom}
                    });
                    
                    map.on('dragend', function() {
                        let center = map.getCenter();
                        window.ReactNativeWebView.postMessage(center.lng.toFixed(3) + ", " + center.lat.toFixed(3));
                    })
                </script>
            </div>
            `;
    }, []);

    return (
        <Center className='w-16 h-16'>
            <WebView
                ref={(ref) => (webRef.current = ref)}
                source={{ html: getMapTemplate() }}
                onMessage={(event) => {
                    const [longitude, latitude] = event.nativeEvent.data.split(', ');
                    setMapLongitude(Number(longitude));
                    setMapLatitude(Number(latitude));
                }}
                onError={(error) => console.error(error)}
            />
        </Center>
    );
}