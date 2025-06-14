
import { View } from 'react-native';
import { CauldronBase } from '@/components/molecules/CauldronBase';
import { MysticText } from '@/components/atoms/text/MysticText';

export const HomeCauldronSection = () => (
  <View className="items-center my-8 relative">
    <CauldronBase />
    <MysticText>
      Enciende el fuego, respira hondo...{'\n'}
      Aquí comienza la magia
    </MysticText>
  </View>
);