import type { IconType } from '@icons-pack/react-simple-icons';
import * as SimpleIcons from '@icons-pack/react-simple-icons';

// Fonction pour convertir un nom en format de la librairie (Si{Nom})
export const toIconName = (name: string): string => {
  // Supprime les caractères spéciaux et espaces, met en PascalCase
  const cleaned = name
    .replace(/[.\-\/]/g, '') // Retire . - /
    .replace(/\s+/g, '') // Retire les espaces
    .replace(/^./, (c) => c.toUpperCase()); // Première lettre en majuscule
  return `Si${cleaned}`;
};

// Fonction pour récupérer une icône depuis la librairie
export const getIconComponent = (iconId: string): IconType | null => {
  const icon = (SimpleIcons as Record<string, IconType | unknown>)[iconId];
  // Les icônes sont des ForwardRefExoticComponent, on vérifie qu'elles existent et ont $$typeof
  if (icon && typeof icon === 'object' && '$$typeof' in icon) {
    return icon as IconType;
  }
  return null;
};

// Réexporter SimpleIcons pour un accès facile
export { SimpleIcons };
