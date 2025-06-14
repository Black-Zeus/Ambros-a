import { TouchableOpacity, View, Text, Image } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import type { MenuItem } from '@/types/app/menu.types';

interface MenuButtonProps {
  item: MenuItem;
  onPress: (id: string) => void;
  fullWidth?: boolean;
}

export const MenuButton = ({ item, onPress, fullWidth }: MenuButtonProps) => {
  const getPriorityStyles = () => {
    switch (item.priority) {
      case 'primary':
        return 'border-primary-500/50 bg-transparent border-2';
      case 'secondary':
        return 'border-primary-500/30 bg-transparent border-2';
      case 'tertiary':
        return 'border-ambrosia-bronze/40 bg-transparent border-2';
      default:
        return 'border-primary-500/30 bg-transparent border-2';
    }
  };

  const getInnerBgStyles = () => {
    switch (item.priority) {
      case 'primary':
        return 'bg-primary-500/15';
      case 'secondary':
        return 'bg-primary-500/10';
      case 'tertiary':
        return 'bg-ambrosia-bronze/20';
      default:
        return 'bg-primary-500/10';
    }
  };

  return (
    <TouchableOpacity
      className={`
        ${getPriorityStyles()}
        rounded-xl overflow-hidden
        active:scale-98 active:opacity-80
      `}
      style={{
        minHeight: 70,
        shadowColor: '#D4AF37',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
      }}
      onPress={() => onPress(item.id)}
      activeOpacity={0.8}
    >
      {/* Contenido interior con background y border radius heredado */}
      <View className={`
        ${getInnerBgStyles()}
        flex-1 rounded-lg m-0.5 p-4 flex-row items-center
      `}>
        {/* Icono como imagen */}
        <View className="w-12 h-14 items-center justify-center mr-4">
          <Image
            source={item.icon}
            style={{
              width: 50,
              height: 50
            }}
            resizeMode="contain"
          />
        </View>

        {/* Contenido */}
        <View className="flex-1">
          <Text className="font-cinzel text-primary-500 text-base mb-1">
            {item.title}
          </Text>
          <Text className="font-crimson text-primary-600 text-sm opacity-80 leading-4">
            {item.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};