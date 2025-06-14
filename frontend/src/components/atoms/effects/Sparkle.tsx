import { useEffect } from 'react';
import { Animated } from 'react-native';
import type { DimensionValue } from 'react-native';

interface SparkleProps {
  top: number;
  left: DimensionValue;
  delay?: number;
}

export const Sparkle = ({ top, left, delay = 0 }: SparkleProps) => {
  const scaleValue = new Animated.Value(0);
  const opacityValue = new Animated.Value(0);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay * 1000),
        Animated.parallel([
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(opacityValue, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleValue, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(opacityValue, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [delay]);

  return (
    <Animated.View
      className="absolute w-1 h-1 bg-primary-500 rounded-full"
      style={{
        top,
        left,
        transform: [{ scale: scaleValue }],
        opacity: opacityValue,
      }}
    />
  );
};