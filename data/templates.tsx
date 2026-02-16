import { ExempleTemplate } from '@/components/templates/index';
import { AppWindowMac, LucideIcon, Smartphone } from 'lucide-react';

type BaseField = {
  name: string;
  label: string;
  description?: string;
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
  | ComboboxField;

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
  {
    id: 2,
    name: 'mobile',
    icon: Smartphone,
  },
];

export const templates: Template[] = [
  {
    id: 'angled-canvas',
    name: 'Angled Canvas',
    categoryId: 1,
    fields: [],
    component: <ExempleTemplate />,
  },
  {
    id: 'dual-device-symmetry',
    name: 'Dual Device Symmetry',
    categoryId: 2,
    fields: [],
    component: <ExempleTemplate />,
  },
  {
    id: 'floating-layers',
    name: 'Floating Layers',
    categoryId: 1,
    fields: [],
    component: <ExempleTemplate />,
  },
  {
    id: 'glow-spotlight',
    name: 'Glow Spotlight',
    categoryId: 1,
    fields: [],
    component: <ExempleTemplate />,
  },
  {
    id: 'minimal-slate',
    name: 'Minimal Slate',
    categoryId: 1,
    fields: [
      {
        name: 'label',
        label: 'Label',
        type: 'text',
        placeholder: 'Enter text',
        defaultValue: 'Example Label',
      },
      {
        name: 'titleMain',
        label: 'Title Main',
        type: 'text',
        placeholder: 'Enter text',
        defaultValue: 'Example Title Main',
      },
      {
        name: 'titleAccent',
        label: 'Title Accent',
        type: 'text',
        placeholder: 'Enter text',
        defaultValue: 'Example Title Accent',
      },
    ],
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
    id: 'perspective-stack',
    name: 'Perspective Stack',
    categoryId: 1,
    fields: [
      {
        name: 'textInput',
        label: 'Text Input',
        type: 'text',
        placeholder: 'Enter text',
      },
      {
        name: 'textareaInput',
        label: 'Textarea Input',
        description: 'This is a textarea input',
        type: 'textarea',
        placeholder: 'Enter text',
      },
      {
        name: 'selectInput',
        label: 'Select Input',
        type: 'select',
        placeholder: 'Select option',
        options: ['Option 1', 'Option 2', 'Option 3'],
      },
    ],
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
    id: 'split-gradient',
    name: 'Split Gradient',
    categoryId: 1,
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
