import { Template, templates } from "@/data/templates";
import { create } from "zustand";

type CoverState = {
  template: Template | null;
  setTemplate: (templateId: Template['id']) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  reset: () => void;
};

export const useCover = create<CoverState>((set) => ({
  template: null,
  setTemplate: (templateId: Template['id']) => set({ template: templates.find((template) => template.id === templateId) }),
  zoom: 100,
  setZoom: (zoom: number) => set({ zoom }),
  reset: () => set({ template: null, zoom: 100 }),
}));
