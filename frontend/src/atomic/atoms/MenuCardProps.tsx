import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface MenuCardProps {
    /** Ícono del menú (emoji o texto) */
    icon: string;
    /** Título principal de la tarjeta */
    title: string;
    /** Descripción o subtítulo */
    description: string;
    /** Función que se ejecuta al presionar la tarjeta */
    onPress: () => void;
    /** Estilo de la tarjeta: 'primary' | 'secondary' | 'full-width' */
    variant?: 'primary' | 'secondary' | 'full-width';
    /** Desabilitar la tarjeta */
    disabled?: boolean;
    /** Estilo adicional personalizado */
    customStyle?: string;
}

const MenuCard: React.FC<MenuCardProps> = ({
    icon,
    title,
    description,
    onPress,
    variant = 'secondary',
    disabled = false,
    customStyle = '',
}) => {
    // Clases base para todas las variantes
    const baseClasses = `
    bg-gradient-to-br backdrop-blur-sm rounded-2xl p-5 
    flex-row items-center min-h-[70px] border-2 
    shadow-mystical relative overflow-hidden m-2
    ${disabled ? 'opacity-50' : 'active:scale-[0.98]'}
  `;

    // Clases específicas por variante
    const variantClasses = {
        primary: `
      from-ambrosia-gold/15 to-ambrosia-gold-dark/10 
      border-ambrosia-gold/50 shadow-mystical-lg
    `,
        secondary: `
      from-ambrosia-gold/10 to-ambrosia-gold-dark/5 
      border-ambrosia-gold/30
    `,
        'full-width': `
      from-ambrosia-bronze-dark/20 to-ambrosia-bronze/15 
      border-ambrosia-bronze-dark/40
    `,
    };

    // Clases para el ícono
    const iconClasses = `
    w-12 h-12 rounded-xl mr-5 flex items-center justify-center
    bg-ambrosia-gold/10 border border-ambrosia-gold/30
  `;

    // Clases para el contenido de texto
    const titleClasses = `
    font-cinzel text-lg font-medium text-ambrosia-gold 
    mb-1 drop-shadow-sm
  `;

    const descriptionClasses = `
    font-crimson text-sm text-ambrosia-gold-dark 
    opacity-80 leading-5
  `;

    return (
        <TouchableOpacity
            className={`${baseClasses} ${variantClasses[variant]} ${customStyle}`}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
        >
            {/* Efecto de hover/brillo - se puede animar con Reanimated */}
            <View className="absolute inset-0 bg-gradient-to-r from-transparent via-ambrosia-gold/5 to-transparent opacity-0" />

            {/* Contenedor del ícono */}
            <View className={iconClasses}>
                <Text className="text-xl text-ambrosia-gold">
                    {icon}
                </Text>
            </View>

            {/* Contenido de texto */}
            <View className="flex-1">
                <Text className={titleClasses}>
                    {title}
                </Text>
                <Text className={descriptionClasses}>
                    {description}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default MenuCard;