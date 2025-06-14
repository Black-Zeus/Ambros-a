
import { Text } from 'react-native';

interface AppSubtitleProps {
  children: React.ReactNode;
}

export const AppSubtitle = ({ children }: AppSubtitleProps) => (
  <Text className="font-crimson text-primary-600 text-base text-center italic opacity-90">
    {children}
  </Text>
);