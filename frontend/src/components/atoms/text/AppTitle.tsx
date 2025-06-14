import { View, Text } from 'react-native';
import { StarColumn } from '@/components/atoms/effects/StarColumn';

interface AppTitleProps {
  children: React.ReactNode;
}

export const AppTitle = ({ children }: AppTitleProps) => (
  <View style={{ 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 15,
    marginBottom: 12,
  }}>
    
    {/* COLUMNA 1: Estrellas Izquierda */}
    <StarColumn side="left" baseDelay={0} />
    
    {/* COLUMNA 2: Título Central */}
    <View style={{ 
      flex: 1, 
      alignItems: 'center',
      marginHorizontal: 10
    }}>
      <Text 
        className="font-cinzel-bold text-primary-500 text-center"
        style={{
          fontSize: 26,
          letterSpacing: 2,
          textShadowColor: 'rgba(0, 0, 0, 0.8)',
          textShadowOffset: { width: 2, height: 2 },
          textShadowRadius: 4,
        }}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.6}
      >
        {children}
      </Text>
    </View>
    
    {/* COLUMNA 3: Estrellas Derecha */}
    <StarColumn side="right" baseDelay={0} />
    
  </View>
);
