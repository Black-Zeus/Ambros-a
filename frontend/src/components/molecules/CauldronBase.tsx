import { View, Image } from 'react-native';
import { CauldronEffects } from './CauldronEffects';

export const CauldronBase = () => (
  <View className="relative mb-4">
    {/* Contenedor del caldero con la imagen real */}
    <View 
      className="relative items-center justify-center"
      style={{
        width: 160,
        height: 125,
      }}
    >
      {/* Imagen del caldero */}
      <Image
        source={require('@/assets/images/general/Cauldron.png')}
        style={{
          width: 160,
          height: 125,
          resizeMode: 'contain',
        }}
        // Añadir sombra dorada sutil
        className="shadow-mystical"
      />
    </View>

    {/* Efectos generados dinámicamente */}
    <CauldronEffects />
  </View>
);