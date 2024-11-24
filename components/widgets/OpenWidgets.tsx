import { ViewProps } from "react-native";
import { VStack } from "../ui/vstack";
import Carousel from "react-native-reanimated-carousel";
import { SituationWidget } from './SituationWidget';

interface Props extends ViewProps { }
const widgets = [
    <SituationWidget />,
];

export function OpenWidgets({ ...props }: Props) {
    return (
        <VStack className="w-full h-64">
            <Carousel
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 24,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                }}
                width={640}
                data={[...widgets.keys()]}
                autoPlay
                loop
                autoPlayInterval={5e3}
                renderItem={({ item }) => (
                    widgets[item]
                )}
            />
        </VStack>
    );
}