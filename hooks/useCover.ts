import { Template, templates } from "@/data/templates";
import { create } from "zustand";

type CoverState = {
  template: Template | null;
  setTemplate: (templateId: Template['id']) => void;
  values: Record<string, string>;
  setValues: (values: Record<string, string>) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  reset: () => void;
};

export const useCover = create<CoverState>((set) => ({
  template: null,
  setTemplate: (templateId: Template['id']) => set({ template: templates.find((template) => template.id === templateId) }),
  values: {},
  setValues: (values: Record<string, string>) => set({ values }),
  zoom: 100,
  setZoom: (zoom: number) => set({ zoom }),
  reset: () => set({ template: null, zoom: 100, values: {} }),
}));
