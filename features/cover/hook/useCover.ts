import { TemplateId } from "@/data/templates";
import { create } from "zustand";
type CoverState = {
  templateId: TemplateId | null;
  setTemplateId: (templateId: TemplateId) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  reset: () => void;
};

export const useCover = create<CoverState>((set) => ({
  templateId: null,
  setTemplateId: (templateId: TemplateId) => set({ templateId }),
  zoom: 100,
  setZoom: (zoom: number) => set({ zoom }),
  reset: () => set({ templateId: null, zoom: 100 }),
}));
