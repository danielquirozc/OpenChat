import { create } from "zustand";

export interface SidebarCollapsedState {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

export const useSidebarCollapsed = create<SidebarCollapsedState>((set) => ({
  collapsed: false,
  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed }))
}));