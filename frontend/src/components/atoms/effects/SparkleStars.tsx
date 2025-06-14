import { useEffect } from 'react';
import { Animated, Text } from 'react-native';
import type { DimensionValue } from 'react-native';

interface SparkleStarsProps {
  top: number;
  left: DimensionValue;
  delay?: number;
  size?: number;
  starType?: 'star' | 'sparkle';
}

export const SparkleStars = ({ 
  top, 
  left, 
  delay = 0, 
  size = 12,
  starType = 'star' 
}: SparkleStarsProps) => {
  const scaleValue = new Animated.Value(0);
  const opacityValue = new Animated.Value(0);
  const rotateValue = new Animated.Value(0);

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
          Animated.timing(rotateValue, {
            toValue: 1,
            duration: 1600, // Rotación más lenta para efecto suave
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

  const rotation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const starIcon = starType === 'star' ? '⭐' : '✨';

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top,
        left,
        transform: [
          { scale: scaleValue },
          { rotate: rotation }
        ],
        opacity: opacityValue,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontSize: size,
          color: '#FFD700',
          textShadowColor: 'rgba(255, 215, 0, 0.6)',
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 4,
        }}
      >
        {starIcon}
      </Text>
    </Animated.View>
  );
};