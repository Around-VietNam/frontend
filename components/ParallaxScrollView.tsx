import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
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
}>;

export default function ParallaxScrollView({
  children,
  header,
  footer,
  ...props
}: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);


  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <ThemedView style={styles.header}>{header}</ThemedView>
        <VStack style={styles.content} space='lg'>
          {children}
        </VStack>
      </Animated.ScrollView>
      {footer}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 'auto',
    overflow: 'hidden',
    marginHorizontal: 16,
    marginTop: 32,
  },
  content: {
    flex: 1,
    paddingBottom: 64,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
});
