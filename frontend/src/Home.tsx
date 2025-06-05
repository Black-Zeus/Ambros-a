import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

export const Home = () => {
  return (
    <SafeAreaView className="flex flex-1 bg-secondary-900">
      <View className="flex-1 px-6 py-8">
        {/* Header */}
        <View className="items-center mb-8">
          <Text className="text-4xl font-bold text-ambrosia-gold mb-2">
            ✨ Ambrosía App
          </Text>
          <Text className="text-secondary-400 text-center text-base">
            🏛️ Bienvenido al mundo dorado
          </Text>
        </View>

        {/* Content Area */}
        <View className="flex-1 justify-center items-center">
          <View className="bg-secondary-800 rounded-3xl p-8 w-full border border-ambrosia-gold/20">
            <Text className="text-ambrosia-cream text-xl text-center mb-6 font-semibold">
              🌟 Panel Principal
            </Text>
            
            <TouchableOpacity className="bg-primary-500 rounded-2xl py-4 px-6 mb-4 shadow-mystical">
              <Text className="text-white text-center font-bold text-base">
                🚀 Acción Dorada
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="border-2 border-ambrosia-gold rounded-2xl py-4 px-6 mb-4 bg-ambrosia-gold/10">
              <Text className="text-ambrosia-gold text-center font-bold text-base">
                ⚡ Poder Ambrosía
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-ambrosia-bronze rounded-2xl py-4 px-6 mb-4">
              <Text className="text-ambrosia-cream text-center font-bold text-base">
                🏆 Bronce Místico
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-secondary-700 rounded-2xl py-4 px-6 border border-ambrosia-bronze/50">
              <Text className="text-ambrosia-bronze text-center font-semibold text-base">
                🔮 Configuración
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View className="items-center mt-8">
          <Text className="text-secondary-500 text-sm">
            💎 Ambrosía Demo v2.0.0 ⚜️
          </Text>
          <Text className="text-ambrosia-gold/60 text-xs mt-1">
            🌙 Creado con magia dorada
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};