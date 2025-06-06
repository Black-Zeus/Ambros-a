import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MenuCard from 'src/atomic/atoms/MenuCardProps'

const { width } = Dimensions.get('window');

const HomePage: React.FC = () => {
  const handleMenuPress = (menuType: string) => {
    console.log(`Navegando a: ${menuType}`);
    // Aquí irá tu lógica de navegación con React Navigation
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-950">
      {/* Textura de pergamino - efecto visual de fondo */}
      <View className="absolute inset-0 opacity-5">
        <View className="w-full h-full bg-gradient-to-br from-primary-400/10 via-transparent to-primary-600/10" />
      </View>

      <ScrollView 
        className="flex-1 relative z-10"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-[90%] mx-auto px-0 py-8">
          
          {/* Header */}
          <View className="items-center mb-8 pt-12">
            <Text className="font-cinzel text-4xl md:text-5xl font-semibold text-ambrosia-gold text-center tracking-wider mb-2 drop-shadow-lg">
              AMBROSÍA
            </Text>
            <Text className="font-crimson text-base text-ambrosia-gold-dark italic opacity-90 text-center">
              El grimorio de los sabores ancestrales
            </Text>
          </View>

          {/* Sección del caldero central */}
          <View className="items-center mb-12 relative">
            {/* Caldero */}
            <View className="relative mb-4">
              <View className="w-40 h-32 md:w-44 md:h-36 bg-gradient-to-br from-secondary-700 via-secondary-800 to-secondary-900 rounded-2xl border-2 border-ambrosia-gold shadow-mystical-lg relative overflow-hidden">
                {/* Contenido del caldero - placeholder para imagen */}
                <View className="absolute inset-4 border-2 border-dashed border-ambrosia-gold/70 rounded-xl flex items-center justify-center">
                  <Text className="font-crimson text-sm text-ambrosia-gold/70 text-center">
                    Imagen
                  </Text>
                </View>
                
                {/* Efecto de brillo interno */}
                <View className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </View>

              {/* Humo mágico - efectos flotantes */}
              <View className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <View className="flex items-center space-y-1">
                  <View className="w-2 h-2 bg-ambrosia-gold rounded-full opacity-60 animate-pulse" />
                  <View className="w-3 h-3 bg-ambrosia-gold rounded-full opacity-50 animate-pulse delay-150" />
                  <View className="w-1.5 h-1.5 bg-ambrosia-gold rounded-full opacity-40 animate-pulse delay-300" />
                </View>
              </View>

              {/* Chispas mágicas */}
              <View className="absolute -top-2 -left-2 w-1 h-1 bg-ambrosia-gold rounded-full animate-pulse" />
              <View className="absolute -top-1 -right-3 w-1.5 h-1.5 bg-ambrosia-gold rounded-full animate-pulse delay-700" />
              <View className="absolute top-2 -left-4 w-1 h-1 bg-ambrosia-gold rounded-full animate-pulse delay-1000" />
              <View className="absolute top-4 -right-2 w-1 h-1 bg-ambrosia-gold rounded-full animate-pulse delay-500" />
            </View>
            
            {/* Texto místico */}
            <Text className="font-crimson text-base md:text-lg text-ambrosia-gold text-center italic leading-6 drop-shadow-sm px-6">
              Enciende el fuego,{'\n'}
              respira hondo...{'\n'}
              Aquí comienza la magia
            </Text>
          </View>

          {/* Grid de opciones del menú */}
          <View className="space-y-6 md:space-y-8 w-full">
            
            {/* FILA 01: Solo Buscador - 90% del ancho total */}
            <View className="w-full">
              <MenuCard
                icon="🔍"
                title="Buscador de Recetas"
                description="Busca hechizos por nombre, ingredientes o etiquetas"
                onPress={() => handleMenuPress('search')}
              />
            </View>

            {/* FILA 02: 2 columnas - Recetas por Categoría + Crear Receta */}
            {/* Cada columna 49% del ancho total, 2% de separación */}
            <View className="md:flex-row md:justify-between w-full space-y-6 md:space-y-0">
              <View className="w-full md:w-[49%]">
                <MenuCard
                  icon="📚"
                  title="Recetas por Categoría"
                  description="Explora pociones, infusiones y hechizos dulces"
                  onPress={() => handleMenuPress('categories')}
                />
              </View>
              <View className="w-full md:w-[49%]">
                <MenuCard
                  icon="✍️"
                  title="Crear Receta"
                  description="Inscribe un nuevo hechizo culinario"
                  onPress={() => handleMenuPress('create')}
                />
              </View>
            </View>

            {/* FILA 03: 2 columnas - Herbolario + Modificar Receta */}
            {/* Cada columna 49% del ancho total, 2% de separación */}
            <View className="md:flex-row md:justify-between w-full space-y-6 md:space-y-0">
              <View className="w-full md:w-[49%]">
                <MenuCard
                  icon="🌿"
                  title="Herbolario"
                  description="Biblioteca de ingredientes mágicos"
                  onPress={() => handleMenuPress('herbolario')}
                />
              </View>
              <View className="w-full md:w-[49%]">
                <MenuCard
                  icon="🧪"
                  title="Modificar Receta"
                  description="Edita o crea variaciones de recetas"
                  onPress={() => handleMenuPress('modify')}
                />
              </View>
            </View>

            {/* FILA 04: 2 columnas - Árbol de Transmutación + ¿Quién Soy? */}
            {/* Cada columna 49% del ancho total, 2% de separación */}
            <View className="md:flex-row md:justify-between w-full space-y-6 md:space-y-0">
              <View className="w-full md:w-[49%]">
                <MenuCard
                  icon="🧬"
                  title="Árbol de Transmutación"
                  description="Visualiza el linaje de las recetas"
                  onPress={() => handleMenuPress('tree')}
                />
              </View>
              <View className="w-full md:w-[49%]">
                <MenuCard
                  icon="👤"
                  title="¿Quién Soy?"
                  description="Tu perfil y recetas creadas"
                  variant="full-width"
                  onPress={() => handleMenuPress('profile')}
                />
              </View>
            </View>

            {/* FILA 05: Solo El Druida - 90% del ancho total */}
            <View className="w-full">
              <MenuCard
                icon="🧙‍♂️"
                title="El Druida"
                description="Acerca del grimorio y su filosofía mágica"
                variant="full-width"
                onPress={() => handleMenuPress('about')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;