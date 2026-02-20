import {
  AngledCanvas,
  ExempleTemplate,
  FloatingLayers,
  GlowSpotlight,
  MinimalSlate,
  PerspectiveStack,
  SplitGradient,
} from '@/components/templates/index';
import { AppWindowMac, LucideIcon } from 'lucide-react';

type BaseField = {
  name: string;
  label: string;
  description?: string;
};

export type ImageField = BaseField & {
  type: 'image';
};

export type IconField = BaseField & {
  type: 'icon';
};

export type ColorField = BaseField & {
  type: 'color';
};

export type ComboboxField = BaseField & {
  type: 'combobox';
  options: string[];
  placeholder?: string;
};

export type TextField = BaseField & {
  type: 'text';
  placeholder?: string;
  defaultValue?: string;
};

export type TextareaField = BaseField & {
  type: 'textarea';
  placeholder?: string;
};

export type SelectField = BaseField & {
  type: 'select';
  placeholder?: string;
  options?: string[];
};

export type TemplateField =
  | TextField
  | TextareaField
  | SelectField
  | ComboboxField
  | ColorField
  | IconField
  | ImageField;

export type Template = {
  id: string;
  name: string;
  categoryId: number;
  fields: TemplateField[];
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
  // {
  //   id: 2,
  //   name: 'mobile',
  //   icon: Smartphone,
  // },
];

export const templates: Template[] = [
  {
    id: 'minimal-slate',
    name: 'Minimal Slate',
    categoryId: 1,
    fields: [
      {
        name: 'accentColor',
        label: 'Accent Color',
        description: 'This is the accent color of the template',
        type: 'color',
      },
      {
        name: 'label',
        label: 'Label',
        type: 'text',
        placeholder: 'Enter text',
        defaultValue: '@GitGlow',
      },
      {
        name: 'titleMain',
        label: 'Title Main',
        type: 'text',
        placeholder: 'Enter text',
        defaultValue: 'Build a',
      },
      {
        name: 'titleAccent',
        label: 'Title Accent',
        type: 'text',
        placeholder: 'Enter text',
        defaultValue: 'Cover Generator',
      },
      {
        name: 'icons',
        label: 'Icons',
        description: 'This is the icons of the template',
        type: 'icon',
      },
      {
        name: 'image',
        label: 'Image',
        description: 'This is the image of the template',
        type: 'image',
      },
    ],
    component: <MinimalSlate />,
  },
  {
    id: 'perspective-stack',
    name: 'Perspective Stack',
    categoryId: 1,
    fields: [
      {
        name: 'accentColor',
        label: 'Accent Color',
        description: 'This is the accent color of the template',
        type: 'color',
      },
      {
        name: 'label',
        label: 'Label',
        type: 'text',
        placeholder: 'Enter text',
        defaultValue: '@GitGlow',
      },
      {
        name: 'titleMain',
        label: 'Title Main',
        type: 'text',
        placeholder: 'Enter text',
        defaultValue: 'Build a',
      },
      {
        name: 'titleAccent',
        label: 'Title Accent',
        type: 'text',
        placeholder: 'Enter text',
        defaultValue: 'Cover Generator',
      },
      {
        name: 'icons',
        label: 'Icons',
        description: 'This is the icons of the template',
        type: 'icon',
      },
      {
        name: 'image',
        label: 'Image',
        description: 'This is the image of the template',
        type: 'image',
      },
    ],
    component: <PerspectiveStack />,
  },
  {
    id: 'glow-spotlight',
    name: 'Glow Spotlight',
    categoryId: 1,
    fields: [
      {
        name: 'accentColor',
        label: 'Accent Color',
        description: 'This is the accent color of the template',
        type: 'color',
      },
      {
        name: 'label',
        label: 'Label',
        type: 'text',
        placeholder: 'Enter text',
        defaultValue: '@GitGlow',
      },
      {
        name: 'titleMain',
        label: 'Title Main',
        type: 'text',
        placeholder: 'Enter text',
        defaultValue: 'Build a',
      },
      {
        name: 'titleAccent',
        label: 'Title Accent',
        type: 'text',
        placeholder: 'Enter text',
        defaultValue: 'Cover Generator',
      },
      {
        name: 'icons',
        label: 'Icons',
        description: 'This is the icons of the template',
        type: 'icon',
      },
      {
        name: 'image',
        label: 'Image',
        description: 'This is the image of the template',
        type: 'image',
      },
    ],
    component: <GlowSpotlight />,
  },
  {
    id: 'angled-canvas',
    name: 'Angled Canvas',
    categoryId: 1,
    fields: [
      {
        name: 'accentColor',
        label: 'Accent Color',
        description: 'This is the accent color of the template',
        type: 'color',
      },
      {
        name: 'label',
        label: 'Label',
        type: 'text',
        placeholder: 'Enter text',
        defaultValue: '@GitGlow',
      },
      {
        name: 'titleMain',
        label: 'Title Main',
        type: 'text',
        placeholder: 'Enter text',
        defaultValue: 'Build a',
      },
      {
        name: 'titleAccent',
        label: 'Title Accent',
        type: 'text',
        placeholder: 'Enter text',
        defaultValue: 'Cover Generator',
      },
      {
        name: 'icons',
        label: 'Icons',
        description: 'This is the icons of the template',
        type: 'icon',
      },
      {
        name: 'image',
        label: 'Image',
        description: 'This is the image of the template',
        type: 'image',
      },
    ],
    component: <AngledCanvas />,
  },
  {
    id: 'floating-layers',
    name: 'Floating Layers',
    categoryId: 1,
    fields: [
      {
        name: 'accentColor',
        label: 'Accent Color',
        description: 'This is the accent color of the template',
        type: 'color',
      },
      {
        name: 'label',
        label: 'Label',
        type: 'text',
        placeholder: 'Enter text',
        defaultValue: '@GitGlow',
      },
      {
        name: 'titleMain',
        label: 'Title Main',
        type: 'text',
        placeholder: 'Enter text',
        defaultValue: 'Build a',
      },
      {
        name: 'titleAccent',
        label: 'Title Accent',
        type: 'text',
        placeholder: 'Enter text',
        defaultValue: 'Cover Generator',
      },
      {
        name: 'icons',
        label: 'Icons',
        description: 'This is the icons of the template',
        type: 'icon',
      },
      {
        name: 'image',
        label: 'Image',
        description: 'This is the image of the template',
        type: 'image',
      },
      {
        name: 'imageSecondary',
        label: 'Image Secondary',
        description: 'This is the secondary image of the template',
        type: 'image',
      },
    ],
    component: <FloatingLayers />,
  },
  {
    id: 'split-gradient',
    name: 'Split Gradient',
    categoryId: 1,
    fields: [
      {
        name: 'accentColor',
        label: 'Accent Color',
        description: 'This is the accent color of the template',
        type: 'color',
      },
      {
        name: 'label',
        label: 'Label',
        type: 'text',
        placeholder: 'Enter text',
        defaultValue: '@GitGlow',
      },
      {
        name: 'titleMain',
        label: 'Title Main',
        type: 'text',
        placeholder: 'Enter text',
        defaultValue: 'Build a',
      },
      {
        name: 'titleAccent',
        label: 'Title Accent',
        type: 'text',
        placeholder: 'Enter text',
        defaultValue: 'Cover Generator',
      },
      {
        name: 'icons',
        label: 'Icons',
        description: 'This is the icons of the template',
        type: 'icon',
      },
      {
        name: 'image',
        label: 'Image',
        description: 'This is the image of the template',
        type: 'image',
      },
    ],
    component: <SplitGradient />,
  },
  {
    id: 'dual-device-symmetry',
    name: 'Dual Device Symmetry',
    categoryId: 2,
    fields: [],
    component: <ExempleTemplate />,
  },
  {
    id: 'multi-device-grid',
    name: 'Multi Device Grid',
    categoryId: 2,
    fields: [],
    component: <ExempleTemplate />,
  },
  {
    id: 'single-device-hero',
    name: 'Single Device Hero',
    categoryId: 2,
    fields: [],
    component: <ExempleTemplate />,
  },
  {
    id: 'triple-device-showcase',
    name: 'Triple Device Showcase',
    categoryId: 2,
    fields: [],
    component: <ExempleTemplate />,
  },
];
