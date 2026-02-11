'use client';
import { featuresList } from '@/lib/data';
import React, { createContext, useContext, useState } from 'react';

type feature = {
  name: string;
  iconId: string;
  label: string;
  checked: boolean;
};

type Thumbnail = {
  hexColor: string;
  darkMode: boolean;
  selectedImage: string | undefined;
  Url: string | undefined;
  title: string;
  info: string;
  Type: string;
  features: feature[];
  useDefaultIconColor: boolean;
};

const checkedFeaturesNames: string[] = [
  'Next.js',
  'Clerk',
  'React',
  'Shadcn/UI',
  'Tailwind CSS',
  'TypeScript',
  'Prisma',
  'Stripe',
];

const initThumbnail: Thumbnail = {
  hexColor: '#2563eb',
  darkMode: true,
  selectedImage: undefined,
  Url: undefined,
  title: "Full Stack 'E-Commerce'",
  info: '#42',
  Type: 'default',
  features: featuresList.map((feature) => ({
    ...feature,
    checked: checkedFeaturesNames.includes(feature.name),
  })),
  useDefaultIconColor: true,
};

type ThumbnailContextProviderProps = {
  children: React.ReactNode;
};

type ThumbnailContextType = {
  thumbnail: Thumbnail;
  setThumbnail: React.Dispatch<React.SetStateAction<Thumbnail>>;
};

const ThumbnailContext = createContext<ThumbnailContextType | null>(null);

export default function ThumbnailContextProvider({
  children,
}: ThumbnailContextProviderProps) {
  const [thumbnail, setThumbnail] = useState<Thumbnail>(initThumbnail);

  return (
    <ThumbnailContext.Provider
      value={{
        thumbnail,
        setThumbnail,
      }}
    >
      {children}
    </ThumbnailContext.Provider>
  );
}

export function useThumbnail() {
  const context = useContext(ThumbnailContext);

  if (context === null) {
    throw new Error('useTheme must be used within a ThemeContextProvider');
  }

  return context;
}
