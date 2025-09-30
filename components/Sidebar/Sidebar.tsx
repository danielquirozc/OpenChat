"use client";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { useState } from "react";
import Filters from "./Filters";
import OpenedChats from "./OpenedChats";

export default function Sidebar() {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <aside className={`p-5 ${openSidebar ? "min-w-1/5" : null} border-r border-gray-300 min-h-screen`}>
      <div className="inline-flex items-center justify-start w-full text-xl font-bold">
        {openSidebar && (<div className="">
          <span className={`text-[#47428D]`}>Open</span>
          <span>Chat</span>
        </div>)}
        <button
          onClick={() => setOpenSidebar(!openSidebar)}
          className={`text-gray-500 inline-block bg-gray-200 p-1 rounded ${openSidebar ? "ml-auto" : "m-auto"}`}
        >
          {!openSidebar ? (
            <PanelRightClose
              className="m-auto"
              size={20}
            />
          ) : (
            <PanelRightOpen
              className="m-auto"
              size={20}
            />
          )}
        </button>
      </div>
      {openSidebar && <Filters />}
      <OpenedChats sidebarIsOpen={openSidebar} />
    </aside>
  );
}
