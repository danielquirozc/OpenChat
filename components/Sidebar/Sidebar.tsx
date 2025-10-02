"use client";
import Filters from "./Filters";
import OpenedChats from "./OpenedChats";
import { useSidebarCollapsed } from "@/stores/useSidebarCollapsed";

export default function Sidebar() {
  const { collapsed } = useSidebarCollapsed();
  return (
    <aside className={`p-5 duration-300 ${collapsed ? "transform -translate-x-full" : "transform translate-x-0"} shadow-2xl absolute md:static z-50 bg-white border-r border-gray-300 min-h-full`}>
      <div className="inline-flex items-center justify-start w-full text-xl font-bold">
        <div>
          <span className={`text-[#47428D]`}>Open</span>
          <span>Chat</span>
        </div>
      </div>
      <Filters />
      <OpenedChats />
    </aside>
  );
}
