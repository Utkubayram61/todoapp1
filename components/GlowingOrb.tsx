import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface GlowingOrbProps {
  size: number;
  color: string;
  glowColor: string;
  style?: object;
  pulseDuration?: number;
}

export default function GlowingOrb({
  size,
  color,
  glowColor,
  style,
  pulseDuration = 2500,
}: GlowingOrbProps) {
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.5);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: pulseDuration, easing: Easing.inOut(Easing.sine) }),
        withTiming(1, { duration: pulseDuration, easing: Easing.inOut(Easing.sine) })
      ),
      -1,
      true
    );
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.9, { duration: pulseDuration, easing: Easing.inOut(Easing.sine) }),
        withTiming(0.4, { duration: pulseDuration, easing: Easing.inOut(Easing.sine) })
      ),
      -1,
      true
    );
  }, []);

  const orbStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <Animated.View style={[styles.container, { width: size * 2.5, height: size * 2.5 }, style, orbStyle]}>
      <Animated.View
        style={[
          styles.glow,
          glowStyle,
          {
            width: size * 2.5,
            height: size * 2.5,
            borderRadius: size * 1.25,
            backgroundColor: glowColor,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.orb,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
          },
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    opacity: 0.3,
  },
  orb: {
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
});
