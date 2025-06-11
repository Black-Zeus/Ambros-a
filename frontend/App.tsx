import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Importar las fuentes
import {
  Cinzel_400Regular,
  Cinzel_500Medium,
  Cinzel_600SemiBold,
  Cinzel_700Bold,
} from '@expo-google-fonts/cinzel';

import {
  CrimsonText_400Regular,
  CrimsonText_600SemiBold,
  CrimsonText_700Bold,
} from '@expo-google-fonts/crimson-text';

import HomePage from './src/features/home/HomePage';
import './global.css';

// Prevenir que la splash screen se oculte automáticamente
SplashScreen.preventAutoHideAsync();

export default function App() {
  // Cargar las fuentes
  let [fontsLoaded, fontError] = useFonts({
    // Fuentes Cinzel
    Cinzel_400Regular,
    Cinzel_500Medium,
    Cinzel_600SemiBold,
    Cinzel_700Bold,
    
    // Fuentes Crimson Text
    CrimsonText_400Regular,
    CrimsonText_600SemiBold,
    CrimsonText_700Bold,
    
    // Alias para tu app (esto es lo que usarás en Tailwind)
    'Cinzel': Cinzel_600SemiBold,        // Para títulos principales
    'CinzelBold': Cinzel_700Bold,        // Para títulos destacados
    'CinzelRegular': Cinzel_400Regular,  // Para subtítulos
    'CinzelMedium': Cinzel_500Medium,    // Para subtítulos medios
    'Crimson': CrimsonText_400Regular,   // Para texto normal
    'CrimsonBold': CrimsonText_700Bold,  // Para texto destacado
    'CrimsonSemiBold': CrimsonText_600SemiBold, // Para captions
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Ocultar splash screen cuando las fuentes estén listas
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Mostrar nada mientras cargan las fuentes (splash screen se mantiene)
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Si hay error con las fuentes, continúa con fuentes del sistema
  if (fontError) {
    console.error('Error cargando fuentes:', fontError);
  }

  return (
    <>
      <HomePage />
      <StatusBar style="light" backgroundColor="#1A0F0A" translucent={false} />
    </>
  );
}