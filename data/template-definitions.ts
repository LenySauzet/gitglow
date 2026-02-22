export type BaseField = {
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
  defaultValue?: string;
};

export type TemplateField =
  | TextField
  | TextareaField
  | SelectField
  | ComboboxField
  | ColorField
  | IconField
  | ImageField;

export type TemplateDefinition = {
  id: string;
  name: string;
  categoryId: number;
  fields: TemplateField[];
};

const commonFields: TemplateField[] = [
  {
    name: 'themeColor',
    label: 'Theme Color',
    description: 'This is the theme color of the template',
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
];

export const templateDefinitions: TemplateDefinition[] = [
  {
    id: 'minimal-slate',
    name: 'Minimal Slate',
    categoryId: 1,
    fields: [...commonFields],
  },
  {
    id: 'perspective-stack',
    name: 'Perspective Stack',
    categoryId: 1,
    fields: [...commonFields],
  },
  {
    id: 'glow-spotlight',
    name: 'Glow Spotlight',
    categoryId: 1,
    fields: [...commonFields],
  },
  {
    id: 'angled-canvas',
    name: 'Angled Canvas',
    categoryId: 1,
    fields: [...commonFields],
  },
  {
    id: 'floating-layers',
    name: 'Floating Layers',
    categoryId: 1,
    fields: [
      ...commonFields,
      {
        name: 'imageSecondary',
        label: 'Image Secondary',
        description: 'This is the secondary image of the template',
        type: 'image',
      },
    ],
  },
  {
    id: 'split-gradient',
    name: 'Split Gradient',
    categoryId: 1,
    fields: [...commonFields],
  },
  {
    id: 'dual-device-symmetry',
    name: 'Dual Device Symmetry',
    categoryId: 2,
    fields: [
      ...commonFields,
      {
        name: 'imageSecondary',
        label: 'Image Secondary',
        description: 'This is the secondary image of the template',
        type: 'image',
      },
      {
        name: 'gridOrDot',
        label: 'Grid or Dot',
        description: 'This is the grid or dot of the template',
        type: 'select',
        options: ['grid', 'dot'],
        defaultValue: 'grid',
      },
    ],
  },
  // {
  //   id: 'multi-device-grid',
  //   name: 'Multi Device Grid',
  //   categoryId: 2,
  //   fields: [],
  // },
  // {
  //   id: 'single-device-hero',
  //   name: 'Single Device Hero',
  //   categoryId: 2,
  //   fields: [],
  // },
  // {
  //   id: 'triple-device-showcase',
  //   name: 'Triple Device Showcase',
  //   categoryId: 2,
  //   fields: [],
  // },
];
