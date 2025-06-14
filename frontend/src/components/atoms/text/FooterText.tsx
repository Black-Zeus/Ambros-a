
import { Text } from 'react-native';

interface FooterTextProps {
  children: React.ReactNode;
}

export const FooterText = ({ children }: FooterTextProps) => (
  <Text className="font-crimson text-secondary-500 text-xs text-center opacity-70">
    {children}
  </Text>
);