"use client";
import { useSidebarCollapsed } from "@/stores/useSidebarCollapsed";
import { MenuIcon } from "lucide-react";

export default function MobileHeader() {
  const { toggleCollapsed } = useSidebarCollapsed();
  return (
    <header className="flex md:hidden items-center border-b border-gray-300 sticky top-0 z-50 bg-white">
      <button
        onClick={() => toggleCollapsed()}
        type="button"
        className="border-r border-gray-300 p-1 text-gray-600"
      >
        <MenuIcon strokeWidth={1} className="w-8 h-8" />
      </button>
    </header>
  );
}
