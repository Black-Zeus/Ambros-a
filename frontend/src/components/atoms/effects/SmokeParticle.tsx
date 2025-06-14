import { useEffect } from 'react';
import { Animated } from 'react-native';

interface SmokeParticleProps {
  delay?: number;
  size?: number;
  horizontalOffset?: number;
}

export const SmokeParticle = ({ delay = 0, size = 8, horizontalOffset = 0 }: SmokeParticleProps) => {
  const translateY = new Animated.Value(0);
  const translateX = new Animated.Value(0);
  const opacityValue = new Animated.Value(0.6);
  const scaleValue = new Animated.Value(1);

  useEffect(() => {
    // Crear movimiento serpenteante
    const createSerpentineAnimation = () => {
      return Animated.loop(
        Animated.sequence([
          // Subir mientras serpentea
          Animated.parallel([
            // Movimiento vertical (subir)
            Animated.timing(translateY, {
              toValue: -60,
              duration: 4000,
              useNativeDriver: true,
            }),
            // Movimiento horizontal serpenteante (izquierda-derecha-izquierda)
            Animated.sequence([
              Animated.timing(translateX, {
                toValue: -15 + horizontalOffset,
                duration: 1300,
                useNativeDriver: true,
              }),
              Animated.timing(translateX, {
                toValue: 15 + horizontalOffset,
                duration: 1400,
                useNativeDriver: true,
              }),
              Animated.timing(translateX, {
                toValue: -10 + horizontalOffset,
                duration: 1300,
                useNativeDriver: true,
              }),
            ]),
            // Desvanecer gradualmente
            Animated.sequence([
              Animated.delay(1000), // Mantener opacidad inicial
              Animated.timing(opacityValue, {
                toValue: 0,
                duration: 3000,
                useNativeDriver: true,
              }),
            ]),
            // Crecer ligeramente mientras sube
            Animated.timing(scaleValue, {
              toValue: 1.5,
              duration: 4000,
              useNativeDriver: true,
            }),
          ]),
          // Reset rápido para repetir
          Animated.parallel([
            Animated.timing(translateY, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true,
            }),
            Animated.timing(translateX, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true,
            }),
            Animated.timing(opacityValue, {
              toValue: 0.6,
              duration: 0,
              useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
              toValue: 1,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
        ])
      );
    };

    // Iniciar animación con delay
    const delayedAnimation = Animated.sequence([
      Animated.delay(delay * 1000),
      createSerpentineAnimation(),
    ]);

    delayedAnimation.start();

    return () => delayedAnimation.stop();
  }, [delay, horizontalOffset]);

  return (
    <Animated.View
      className="absolute rounded-full bg-primary-500"
      style={{
        width: size,
        height: size,
        top: -30,
        left: 80 - size/2, // Centro del caldero
        transform: [
          { translateY },
          { translateX },
          { scale: scaleValue }
        ],
        opacity: opacityValue,
      }}
    />
  );
};