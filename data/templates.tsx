import {
  AngledCanvas,
  DualDeviceSymmetry,
  ExempleTemplate,
  FloatingLayers,
  GlowSpotlight,
  MinimalSlate,
  MultiDeviceGrid,
  PerspectiveStack,
  SplitGradient,
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
  'minimal-slate': MinimalSlate,
  'perspective-stack': PerspectiveStack,
  'glow-spotlight': GlowSpotlight,
  'angled-canvas': AngledCanvas,
  'floating-layers': FloatingLayers,
  'split-gradient': SplitGradient,
  'dual-device-symmetry': DualDeviceSymmetry,
  'multi-device-grid': MultiDeviceGrid,
  'single-device-hero': ExempleTemplate,
  'triple-device-showcase': ExempleTemplate,
};

export const templates: Template[] = templateDefinitions.map((def) => {
  const Component = COMPONENT_MAP[def.id];
  return {
    ...def,
    component: Component ? <Component /> : null,
  };
});
