import { useState, type PropsWithChildren, type ReactElement } from 'react';
import { RefreshControl, StyleSheet, useColorScheme, ViewStyle } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  AnimatedProps
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { VStack } from './ui/vstack';

type Props = PropsWithChildren<{
  header?: ReactElement;
  footer?: ReactElement;
  staticElements?: ReactElement;
  containerStyle?: AnimatedProps<ViewStyle>;
  contentContainerStyle?: AnimatedProps<ViewStyle>;
  headerContainerStyle?: AnimatedProps<ViewStyle>;
  onRefresh?: () => void;
}>;

export default function ParallaxScrollView({
  children,
  header,
  footer,
  staticElements,
  containerStyle,
  contentContainerStyle,
  headerContainerStyle,
  ...props
}: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const [refreshing, setRefreshing] = useState(false);

  return (
    <ThemedView style={[styles.container, containerStyle as any]} {...props}>
      {staticElements}
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              props.onRefresh?.();
              setRefreshing(false);
            }}
          />
        }
      >
        <ThemedView style={[styles.header, headerContainerStyle as any]}>{header}</ThemedView>
        <VStack style={[styles.content, contentContainerStyle as any]} space='lg'>
          {children}
        </VStack>
      </Animated.ScrollView>
      {footer}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 'auto',
    overflow: 'hidden',
    marginHorizontal: 16,
  },
  content: {
    flex: 1,
    paddingBottom: 64,
    overflowX: 'hidden',
    overflowY: 'auto',
  },
});
