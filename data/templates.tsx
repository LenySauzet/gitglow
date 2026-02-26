import {
  AngledCanvas,
  DualDeviceSymmetry,
  FloatingLayers,
  GlowSpotlight,
  MinimalSlate,
  MultiDeviceGrid,
  PerspectiveStack,
  SingleDeviceHero,
  SplitGradient,
  TripleDeviceShowcase,
} from '@/components/Settings';
import type { TemplateDefinition } from '@/data/template-definitions';
import { templateDefinitions } from '@/data/template-definitions';
import { AppWindowMac, LucideIcon, Smartphone } from 'lucide-react';
import React from 'react';

export type {
  BaseField,
  ColorField,
  ComboboxField,
  IconField,
  ImageField,
  SelectField,
  TemplateField,
  TextareaField,
  TextField,
} from '@/data/template-definitions';

export type Template = TemplateDefinition & {
  component: React.ReactNode;
};

export type Category = {
  id: number;
  name: string;
  icon: LucideIcon;
};

export const categories: Category[] = [
  {
    id: 1,
    name: 'Interface',
    icon: AppWindowMac,
  },
  {
    id: 2,
    name: 'Mobile',
    icon: Smartphone,
  },
];

const COMPONENT_MAP: Record<string, React.ComponentType> = {
  'perspective-stack': PerspectiveStack,
  'minimal-slate': MinimalSlate,
  'glow-spotlight': GlowSpotlight,
  'angled-canvas': AngledCanvas,
  'floating-layers': FloatingLayers,
  'split-gradient': SplitGradient,
  'dual-device-symmetry': DualDeviceSymmetry,
  'multi-device-grid': MultiDeviceGrid,
  'single-device-hero': SingleDeviceHero,
  'triple-device-showcase': TripleDeviceShowcase,
};

export const templates: Template[] = templateDefinitions.map((def) => {
  const Component = COMPONENT_MAP[def.id];
  return {
    ...def,
    component: Component ? <Component /> : null,
  };
});
