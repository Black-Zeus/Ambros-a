
import { Text } from 'react-native';

interface MysticTextProps {
  children: React.ReactNode;
}

export const MysticText = ({ children }: MysticTextProps) => (
  <Text className="text-primary-500 text-center italic text-base leading-6 px-5">
    {children}
  </Text>
);