import type { MenuItem } from '@/types/app/menu.types';

export const homeMenuItems: MenuItem[] = [
  {
    id: 'search',
    icon: require('@/assets/images/icons/buscar.png'),
    title: 'Buscador de Recetas',
    description: 'Busca hechizos por nombre, ingredientes o etiquetas',
    priority: 'primary'
  },
  {
    id: 'categories',
    icon: require('@/assets/images/icons/receta.png'),
    title: 'Recetas por Categoría',
    description: 'Explora pociones, infusiones y hechizos dulces',
    priority: 'primary'
  },
  {
    id: 'create',
    icon: require('@/assets/images/icons/hoja.png'),
    title: 'Crear Receta',
    description: 'Inscribe un nuevo hechizo culinario',
    priority: 'primary'
  },
  {
    id: 'herbolario',
    icon: require('@/assets/images/icons/recetario.png'),
    title: 'Herbolario',
    description: 'Biblioteca de ingredientes mágicos',
    priority: 'secondary'
  },
  {
    id: 'modify',
    icon: require('@/assets/images/icons/modificar.png'),
    title: 'Modificar Receta',
    description: 'Edita o crea variaciones de recetas',
    priority: 'secondary'
  },
  {
    id: 'tree',
    icon: require('@/assets/images/icons/transmutar.png'),
    title: 'Árbol de Transmutación',
    description: 'Visualiza el linaje de las recetas',
    priority: 'secondary'
  },
  {
    id: 'profile',
    icon: require('@/assets/images/icons/quiensoy.png'),
    title: '¿Quién Soy?',
    description: 'Tu perfil y recetas creadas',
    priority: 'secondary',
    fullWidth: true
  },
  {
    id: 'about',
    icon: require('@/assets/images/icons/druida.png'),
    title: 'El Druida',
    description: 'Acerca del grimorio y su filosofía mágica',
    priority: 'tertiary',
    fullWidth: true
  }
];