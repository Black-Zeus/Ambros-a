import { View, Dimensions } from 'react-native';
import { MenuButton } from '@/components/atoms/buttons/MenuButton';
import { homeMenuItems } from './homeMenuItems';

const { width } = Dimensions.get('window');

interface HomeMenuGridProps {
  onMenuPress: (id: string) => void;
}

export const HomeMenuGrid = ({ onMenuPress }: HomeMenuGridProps) => {
  // Detectar tipo de dispositivo
  const isTabletOrDesktop = width >= 768;
  const isMobile = width < 768;

  // Separar items especiales (fullWidth) del resto
  const fullWidthItems = homeMenuItems.filter(item => item.fullWidth);
  const regularItems = homeMenuItems.filter(item => !item.fullWidth);

  return (
    <View className="flex-1" style={{ paddingHorizontal: '5%' }}>
      {/* Items regulares en grid responsivo */}
      <View 
        className="mb-3"
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: isTabletOrDesktop ? width * 0.05 : 12, // 5% del ancho en tablet/desktop, 12px en móvil
        }}
      >
        {regularItems.map((item) => (
          <View
            key={item.id}
            style={{
              width: isMobile 
                ? '100%' 
                : `${(100 - 5) / 2}%`, // En tablet/desktop: 47.5% cada columna (100% - 5% gap) / 2
            }}
          >
            <MenuButton 
              item={item} 
              onPress={onMenuPress}
            />
          </View>
        ))}
      </View>

      {/* Items de ancho completo */}
      <View style={{ gap: 12 }}>
        {fullWidthItems.map((item) => (
          <View key={item.id} style={{ width: '100%' }}>
            <MenuButton 
              item={item} 
              onPress={onMenuPress}
            />
          </View>
        ))}
      </View>
    </View>
  );
};