import { AppWindowMac, Smartphone } from "lucide-react";

export const categories = [

{
  id: 1,
  name: 'Interface',
  icon: AppWindowMac,
},
{
  id: 2,
  name: 'mobile',
  icon: Smartphone,
},
] as const;

export const templates = [
  { id: 'angled-canvas', name: 'Angled Canvas', categoryId: 1 },
  { id: 'dual-device-symmetry', name: 'Dual Device Symmetry', categoryId: 2 },
  { id: 'floating-layers', name: 'Floating Layers', categoryId: 1 },
  { id: 'glow-spotlight', name: 'Glow Spotlight', categoryId: 1 },
  { id: 'minimal-slate', name: 'Minimal Slate', categoryId: 1 },
  { id: 'multi-device-grid', name: 'Multi Device Grid', categoryId: 2 },
  { id: 'perspective-stack', name: 'Perspective Stack', categoryId: 1 },
  { id: 'single-device-hero', name: 'Single Device Hero', categoryId: 2 },
  { id: 'split-gradient', name: 'Split Gradient', categoryId: 1 },
  { id: 'triple-device-showcase', name: 'Triple Device Showcase', categoryId: 2 },
] as const;

export type TemplateId = (typeof templates)[number]['id'];

export const getTemplateImage = (id: TemplateId) => `/templates/${id}.svg`;
