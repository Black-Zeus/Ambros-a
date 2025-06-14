
import { View, ScrollView, StatusBar } from 'react-native';
import { AppTitle } from '@/components/atoms/text/AppTitle';
import { AppFooter } from '@/components/molecules/AppFooter';
import { HomeCauldronSection } from './HomeCauldronSection';
import { HomeMenuGrid } from './HomeMenuGrid';

export const HomePage = () => {
  const handleMenuPress = (id: string) => {
    // Aquí irían las navegaciones más adelante
    console.log(`Navegando a: ${id}`);
  };

  return (
    <View className="flex-1 bg-secondary-950">
      <StatusBar barStyle="light-content" backgroundColor="#1A0F0A" />
      
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-4 pt-12 pb-6">
          {/* Header - App Title */}
          <View className="items-center mb-6 pt-8">
            <AppTitle>AMBROSÍA</AppTitle>
          </View>

          {/* Sección del Caldero */}
          <HomeCauldronSection />

          {/* Grid de opciones del menú */}
          <HomeMenuGrid onMenuPress={handleMenuPress} />

          {/* Footer */}
          <AppFooter />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomePage;