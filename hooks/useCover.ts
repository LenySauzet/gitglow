import { DEFAULT_COLOR } from "@/components/Input/ColorInput";
import {
  templateDefinitions,
  type TemplateDefinition,
} from "@/data/template-definitions";
import { create } from "zustand";

type CoverState = {
  templateId: string | null;
  setTemplate: (templateId: TemplateDefinition["id"]) => void;
  values: Record<string, string | string[] | boolean>;
  setValues: (values: Record<string, string | string[] | boolean>) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  reset: () => void;
  animation: boolean;
  setAnimation: (animation: boolean) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
};

export const useCover = create<CoverState>((set) => ({
  templateId: null,
  setTemplate: (templateId: TemplateDefinition["id"]) => {
    const definition =
      templateDefinitions.find((t) => t.id === templateId) ?? null;
    const values: Record<string, string | string[] | boolean> = {};
    if (definition?.fields) {
      for (const field of definition.fields) {
        if (field.type === "icon") {
          values[field.name] = [];
        } else if (field.type === "color") {
          values[field.name] = DEFAULT_COLOR;
        } else {
          values[field.name] =
            field.type === "text" &&
            "defaultValue" in field &&
            field.defaultValue != null
              ? field.defaultValue
              : "";
        }
      }
    }
    return set({ templateId, values });
  },
  values: {},
  setValues: (values: Record<string, string | string[] | boolean>) =>
    set({ values }),
  zoom: 100,
  setZoom: (zoom: number) => set({ zoom }),
  reset: () => set({ templateId: null, zoom: 100, values: {} }),
  animation: true,
  setAnimation: (animation: boolean) => set({ animation }),
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
}));
