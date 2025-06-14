import type { ImageSourcePropType } from 'react-native';

export type MenuPriority = 'primary' | 'secondary' | 'tertiary';

export interface MenuItem {
  id: string;
  icon: ImageSourcePropType; // Cambio: ahora es ImageSourcePropType
  title: string;
  description: string;
  priority: MenuPriority;
  fullWidth?: boolean;
}