import { useLocation } from "@/contexts/location";
import { ViewProps } from "react-native";
import MapView, { Marker, MapViewProps } from "react-native-maps";


interface Props extends MapViewProps { }
export function Map({ children, ...props }: Props) {
    const { location } = useLocation();

    if (!location) return null;


    return (
        <MapView
            initialRegion={{
                latitude: location?.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            showsBuildings={true}
            showsUserLocation={true}
            showsTraffic={true}
            showsScale={true}
            toolbarEnabled={true}
            showsMyLocationButton={true}
            {...props}
        >
            {children}
        </MapView>
    )
}