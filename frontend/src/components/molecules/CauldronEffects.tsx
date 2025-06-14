import { View } from 'react-native';
import type { DimensionValue } from 'react-native';
import { SmokeParticle } from '@/components/atoms/effects/SmokeParticle';
import { Sparkle } from '@/components/atoms/effects/Sparkle';
import type { ReactElement } from 'react';

export const CauldronEffects = () => {
  // Generar partículas de humo aleatoriamente
  const generateSmokeParticles = (): ReactElement[] => {
    const particles: ReactElement[] = [];
    const smokeCount = Math.floor(Math.random() * 3) + 2; // Entre 2 y 4 partículas
    
    for (let i = 0; i < smokeCount; i++) {
      // Cada partícula tiene un offset inicial diferente para variar el serpenteo
      const randomOffset = (Math.random() - 0.5) * 20; // Entre -10 y +10
      
      particles.push(
        <SmokeParticle 
          key={`smoke-${i}`}
          delay={Math.random() * 3} // Delay aleatorio entre 0 y 3 segundos
          size={Math.floor(Math.random() * 8) + 6} // Tamaño entre 6 y 13
          horizontalOffset={randomOffset} // Offset para variar el patrón
        />
      );
    }
    return particles;
  };

  // Generar chispas mágicas aleatoriamente
  const generateSparkles = (): ReactElement[] => {
    const sparkles: ReactElement[] = [];
    const sparkleCount = Math.floor(Math.random() * 4) + 3; // Entre 3 y 6 chispas
    
    for (let i = 0; i < sparkleCount; i++) {
      // Posiciones alrededor del caldero (160px de ancho)
      const leftValue: DimensionValue = Math.floor(Math.random() * 120) + 20; // Entre 20 y 140 píxeles
      
      sparkles.push(
        <Sparkle 
          key={`sparkle-${i}`}
          top={Math.floor(Math.random() * 30) - 35} // Entre -35 y -5
          left={leftValue}
          delay={Math.random() * 3} // Delay aleatorio entre 0 y 3 segundos
        />
      );
    }
    return sparkles;
  };

  return (
    <>
      {/* Partículas de humo generadas dinámicamente */}
      {generateSmokeParticles()}
      
      {/* Chispas mágicas generadas dinámicamente */}
      {generateSparkles()}
    </>
  );
};