import React, { useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  withSequence,
  Easing,
  interpolate,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface ShootingStarProps {
  delay?: number;
}

export default function ShootingStar({ delay = 0 }: ShootingStarProps) {
  const progress = useSharedValue(0);

  const startX = Math.random() * width * 0.5;
  const startY = Math.random() * height * 0.3;
  const angle = -35;
  const distance = 300;

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, {
            duration: 1200,
            easing: Easing.out(Easing.quad),
          }),
          withTiming(0, { duration: 0 }),
          withDelay(
            Math.random() * 8000 + 4000,
            withTiming(0, { duration: 0 })
          )
        ),
        -1,
        false
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const rad = (angle * Math.PI) / 180;
    const x = startX + progress.value * distance * Math.cos(rad);
    const y = startY + progress.value * distance * Math.sin(rad);
    const opacity = interpolate(progress.value, [0, 0.1, 0.8, 1], [0, 1, 0.8, 0]);

    return {
      transform: [
        { translateX: x },
        { translateY: y },
        { rotate: `${angle}deg` },
      ],
      opacity,
    };
  });

  return (
    <Animated.View style={[styles.shootingStar, animatedStyle]} pointerEvents="none" />
  );
}

const styles = StyleSheet.create({
  shootingStar: {
    position: 'absolute',
    width: 80,
    height: 1.5,
    borderRadius: 1,
    backgroundColor: '#FFFFFF',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    top: 0,
    left: 0,
  },
});
