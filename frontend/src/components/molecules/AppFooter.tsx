
import { View } from 'react-native';
import { FooterText } from '@/components/atoms/text/FooterText';
import { AppSubtitle } from '@/components/atoms/text/AppSubtitle';

export const AppFooter = () => (
  <View className="items-center mt-8 pt-4">
    <View className="w-16 h-0.5 bg-primary-500/30 mb-4" />    
    <AppSubtitle>🏛️ Grimorio de Hechizos Culinarios 🏛️</AppSubtitle>
    <FooterText> 💎 Versión 1.0.0 - Creado con magia antigua 💎 </FooterText>
  </View>
);