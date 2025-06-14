import { View } from 'react-native';
import { SparkleStars } from './SparkleStars';

interface StarColumnProps {
  side: 'left' | 'right';
  baseDelay?: number;
}

export const StarColumn = ({ side, baseDelay = 0 }: StarColumnProps) => {
  // Configuración de estrellas para cada lado
  const leftStars = [
    { top: 5, left: 20, delay: 0, size: 16, type: 'sparkle' as const },
    { top: 25, left: 10, delay: 0.5, size: 12, type: 'star' as const },
    { top: 45, left: 25, delay: 1.2, size: 10, type: 'sparkle' as const },
    { top: 15, left: 35, delay: 0.8, size: 14, type: 'star' as const },
    { top: 35, left: 5, delay: 1.5, size: 8, type: 'sparkle' as const },
    { top: 10, left: 0, delay: 2.0, size: 10, type: 'star' as const },
  ];

  const rightStars = [
    { top: 5, left: 15, delay: 0.3, size: 16, type: 'star' as const },
    { top: 25, left: 25, delay: 0.7, size: 12, type: 'sparkle' as const },
    { top: 45, left: 10, delay: 1.5, size: 10, type: 'star' as const },
    { top: 15, left: 0, delay: 0.2, size: 14, type: 'sparkle' as const },
    { top: 35, left: 30, delay: 1.8, size: 8, type: 'star' as const },
    { top: 10, left: 40, delay: 1.3, size: 10, type: 'sparkle' as const },
  ];

  const stars = side === 'left' ? leftStars : rightStars;

  return (
    <View style={{ 
      width: 60, 
      height: 70, 
      position: 'relative'
    }}>
      {stars.map((star, index) => (
        <SparkleStars 
          key={`${side}-star-${index}`}
          top={star.top} 
          left={star.left} 
          delay={star.delay + baseDelay} 
          size={star.size} 
          starType={star.type}
        />
      ))}
    </View>
  );
};