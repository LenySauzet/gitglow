import { DEFAULT_COLOR } from "@/components/Input/ColorInput";
import {
  templateDefinitions,
  type TemplateDefinition,
} from "@/data/template-definitions";
import { create } from "zustand";

function getDefaultValuesForTemplate(
  definition: TemplateDefinition | null
): Record<string, string | string[] | boolean> {
  const values: Record<string, string | string[] | boolean> = {};
  if (definition?.fields) {
    for (const field of definition.fields) {
      if (field.type === "icon") {
        values[field.name] = [];
      } else if (field.type === "color") {
        values[field.name] = DEFAULT_COLOR;
      } else if (field.type === "select") {
        values[field.name] = field.defaultValue ?? "";
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
  return values;
}

const minimalSlateDefinition = templateDefinitions.find(
  (t) => t.id === "minimal-slate"
) ?? null;

type CoverState = {
  templateId: string | null;
  setTemplate: (templateId: TemplateDefinition["id"]) => void;
  values: Record<string, string | string[] | boolean>;
  setValues: (values: Record<string, string | string[] | boolean>) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  reset: () => void;
  resetValuesToTemplateDefaults: () => void;
  resetPreview: () => void;
  animation: boolean;
  setAnimation: (animation: boolean) => void;
  lightMode: boolean;
  setLightMode: (lightMode: boolean) => void;
  font: string;
  setFont: (font: string) => void;
  showSettings: boolean;
  setShowSettings: (showSettings: boolean) => void;
};

export const useCover = create<CoverState>((set) => ({
  templateId: null,
  setTemplate: (templateId: TemplateDefinition["id"]) => {
    const definition =
      templateDefinitions.find((t) => t.id === templateId) ?? null;
    const values = getDefaultValuesForTemplate(definition);
    return set({ templateId, values });
  },
  values: getDefaultValuesForTemplate(minimalSlateDefinition),
  setValues: (values: Record<string, string | string[] | boolean>) =>
    set({ values }),
  zoom: 100,
  setZoom: (zoom: number) => set({ zoom }),
  reset: () =>
    set({ templateId: null, zoom: 100, values: {}, font: "", showSettings: true }),
  resetValuesToTemplateDefaults: () =>
    set((state) => {
      const definition =
        state.templateId != null
          ? templateDefinitions.find((t) => t.id === state.templateId) ?? null
          : minimalSlateDefinition;
      return {
        values: getDefaultValuesForTemplate(definition),
        font: "",
      };
    }),
  resetPreview: () =>
    set({
      templateId: null,
      values: {},
      zoom: 100,
      font: "",
    }),
  animation: true,
  setAnimation: (animation: boolean) => set({ animation }),
  lightMode: false,
  setLightMode: (lightMode) => set({ lightMode }),
  font: "",
  setFont: (font) => set({ font }),
  showSettings: true,
  setShowSettings: (showSettings) => set({ showSettings }),
}));
