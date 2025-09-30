
import Filters from "./Filters";
import OpenedChats from "./OpenedChats";

export default function Sidebar() {
  return (
    <aside className="p-5 max-w-1/4 border-r border-gray-300 min-h-screen">
      <div className="flex items-center text-xl font-bold">
        <span className="text-[#47428D]">Open</span>
        <span>Chat</span>
      </div>
      <Filters />
      <OpenedChats />
    </aside>
  );
}