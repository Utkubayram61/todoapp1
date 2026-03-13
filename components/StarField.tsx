import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 3 + 0.5,
    opacity: Math.random() * 0.7 + 0.3,
    delay: Math.random() * 3000,
    duration: Math.random() * 2000 + 1500,
  }));
}

function TwinklingStar({ star }: { star: Star }) {
  const opacity = useSharedValue(star.opacity);

  useEffect(() => {
    opacity.value = withDelay(
      star.delay,
      withRepeat(
        withSequence(
          withTiming(0.1, { duration: star.duration, easing: Easing.inOut(Easing.sine) }),
          withTiming(star.opacity, { duration: star.duration, easing: Easing.inOut(Easing.sine) })
        ),
        -1,
        true
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.star,
        animatedStyle,
        {
          left: star.x,
          top: star.y,
          width: star.size,
          height: star.size,
          borderRadius: star.size / 2,
          backgroundColor: star.size > 2.5 ? '#FFD700' : '#FFFFFF',
        },
      ]}
    />
  );
}

interface StarFieldProps {
  starCount?: number;
}

export default function StarField({ starCount = 150 }: StarFieldProps) {
  const stars = useRef(generateStars(starCount)).current;

  return (
    <View style={styles.container} pointerEvents="none">
      {stars.map((star) => (
        <TwinklingStar key={star.id} star={star} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  star: {
    position: 'absolute',
  },
});
