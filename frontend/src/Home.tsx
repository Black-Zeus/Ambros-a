import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  Dimensions,
  StatusBar 
} from 'react-native';

const { width } = Dimensions.get('window');

// Datos de los elementos del menú
const menuItems = [
  {
    id: 'search',
    icon: '🔍',
    title: 'Buscador de Recetas',
    description: 'Busca hechizos por nombre, ingredientes o etiquetas',
    priority: 'primary'
  },
  {
    id: 'categories',
    icon: '📚',
    title: 'Recetas por Categoría',
    description: 'Explora pociones, infusiones y hechizos dulces',
    priority: 'primary'
  },
  {
    id: 'create',
    icon: '✍️',
    title: 'Crear Receta',
    description: 'Inscribe un nuevo hechizo culinario',
    priority: 'primary'
  },
  {
    id: 'herbolario',
    icon: '🌿',
    title: 'Herbolario',
    description: 'Biblioteca de ingredientes mágicos',
    priority: 'secondary'
  },
  {
    id: 'modify',
    icon: '🧪',
    title: 'Modificar Receta',
    description: 'Edita o crea variaciones de recetas',
    priority: 'secondary'
  },
  {
    id: 'tree',
    icon: '🧬',
    title: 'Árbol de Transmutación',
    description: 'Visualiza el linaje de las recetas',
    priority: 'secondary'
  },
  {
    id: 'profile',
    icon: '👤',
    title: '¿Quién Soy?',
    description: 'Tu perfil y recetas creadas',
    priority: 'secondary',
    fullWidth: true
  },
  {
    id: 'about',
    icon: '🧙‍♂️',
    title: 'El Druida',
    description: 'Acerca del grimorio y su filosofía mágica',
    priority: 'tertiary',
    fullWidth: true
  }
];

// Componente de partícula de humo animada
const SmokeParticle = ({ delay = 0, size = 8 }: { delay?: number; size?: number }) => (
  <View 
    className={`absolute rounded-full bg-primary-500 opacity-60`}
    style={{
      width: size,
      height: size,
      top: -30 + delay * 5,
      left: '50%',
      marginLeft: -size/2,
    }}
  />
);

// Componente de chispa animada
const Sparkle = ({ top, left, delay = 0 }: { top: number; left: number | string; delay?: number }) => (
  <View 
    className="absolute w-1 h-1 bg-primary-500 rounded-full"
    style={{ top, left }}
  />
);

// Componente del caldero con animaciones
const CauldronSection = () => (
  <View className="items-center my-8 relative">
    {/* Caldero principal */}
    <View className="relative mb-4">
      <View 
        className="bg-secondary-800 border-2 border-primary-500 rounded-2xl relative items-center justify-center"
        style={{
          width: 160,
          height: 125,
          shadowColor: '#D4AF37',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 20,
          elevation: 8,
        }}
      >
        {/* Placeholder del contenido del caldero */}
        <View className="w-20 h-20 bg-primary-500/10 border-2 border-dashed border-primary-500 rounded-xl items-center justify-center">
          <Text className="text-primary-500 text-sm text-center opacity-70">
            Imagen
          </Text>
        </View>
      </View>

      {/* Partículas de humo */}
      <SmokeParticle delay={0} size={8} />
      <SmokeParticle delay={1} size={12} />
      <SmokeParticle delay={2} size={6} />

      {/* Chispas mágicas */}
      <Sparkle top={-10} left={30} delay={0} />
      <Sparkle top={-20} left="70%" delay={0.7} />
      <Sparkle top={-5} left="50%" delay={1.4} />
      <Sparkle top={-25} left={20} delay={2.1} />
    </View>

    {/* Texto místico */}
    <Text className="text-primary-500 text-center italic text-base leading-6 px-5">
      Enciende el fuego,{'\n'}
      respira hondo...{'\n'}
      Aquí comienza la magia
    </Text>
  </View>
);

// Componente de elemento del menú
const MenuItem = ({ item }: { item: typeof menuItems[0] }) => {
  const handlePress = () => {
    // Aquí irían las navegaciones más adelante
    console.log(`Navegando a: ${item.id}`);
  };

  const getPriorityStyles = () => {
    switch (item.priority) {
      case 'primary':
        return 'border-primary-500/50 bg-primary-500/15 border-3';
      case 'secondary':
        return 'border-primary-500/30 bg-primary-500/10 border-2';
      case 'tertiary':
        return 'border-ambrosia-bronze/40 bg-ambrosia-bronze/20 border-2';
      default:
        return 'border-primary-500/30 bg-primary-500/10 border-2';
    }
  };

  return (
    <TouchableOpacity
      className={`
        ${getPriorityStyles()}
        ${item.fullWidth ? 'col-span-2' : ''}
        rounded-2xl p-5 flex-row items-center
        active:scale-95 active:opacity-80
      `}
      style={{
        minHeight: 75,
        shadowColor: '#D4AF37',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {/* Icono */}
      <View className="w-12 h-12 bg-primary-500/10 border border-primary-500/30 rounded-xl items-center justify-center mr-5">
        <Text className="text-2xl">{item.icon}</Text>
      </View>

      {/* Contenido */}
      <View className="flex-1">
        <Text className="font-cinzel text-primary-500 text-lg mb-1">
          {item.title}
        </Text>
        <Text className="font-crimson text-primary-600 text-sm opacity-80 leading-5">
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// Componente principal del Home
export const Home = () => {
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
            <Text 
              className="font-cinzel-bold text-primary-500 text-4xl text-center mb-3"
              style={{
                letterSpacing: 3,
                textShadowColor: 'rgba(0, 0, 0, 0.8)',
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 4,
              }}
            >
              ✨ AMBROSÍA ✨
            </Text>
            <Text className="font-crimson text-primary-600 text-base text-center italic opacity-90">
              🏛️ Grimorio de Hechizos Culinarios 🏛️
            </Text>
          </View>

          {/* Sección del Caldero */}
          <CauldronSection />

          {/* Grid de opciones del menú */}
          <View 
            className="flex-1 gap-4"
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            {menuItems.map((item, index) => (
              <View
                key={item.id}
                style={{
                  width: item.fullWidth ? '100%' : width < 640 ? '100%' : '48%',
                }}
              >
                <MenuItem item={item} />
              </View>
            ))}
          </View>

          {/* Footer con espacio adicional */}
          <View className="items-center mt-8 pt-4">
            <View className="w-16 h-0.5 bg-primary-500/30 mb-4" />
            <Text className="font-crimson text-secondary-500 text-xs text-center opacity-70">
              💎 Versión 1.0.0 - Creado con magia antigua 💎
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;