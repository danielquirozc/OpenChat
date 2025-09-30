'use client'
import { useChatContext } from "@/context/ChatContext";
import { UserPublicData } from "@/types/UserPublicData";
import { ArrowRight, UserIcon } from "lucide-react";
import Link from "next/link";

export type openedChats = {
  chatID: number;
  contact: UserPublicData;
};

export default function OpenedChats({ sidebarIsOpen }: { sidebarIsOpen: boolean }) {
  const { chatCollection } = useChatContext();

  return (
    <ul className="flex flex-col mt-5 space-y-2">
      {chatCollection?.map((chat: openedChats) => (
        <Link
          href={`/chat/${chat.contact.id}`}
          key={chat.chatID}
          className="flex gap-2 rounded-2xl border border-gray-300 group items-center p-2 hover:bg-gray-100 cursor-pointer w-full"
        >
          {chat.contact.avatar ? (
            <img
              src={chat.contact.avatar}
              alt={chat.contact.username}
              className="w-8 h-8 rounded-full inline-block mr-2"
            />
          ) : (
            <UserIcon className="w-8 h-8 bg-gray-200 p-1 rounded-full text-gray-500 inline-block" />
          )}
          <span className={`flex-grow text-gray-700 ${!sidebarIsOpen ? 'hidden' : 'inline-block'}`}>{chat.contact.username}</span>
          <ArrowRight className={`text-right text-gray-300 group-hover:text-gray-500 duration-300 ${!sidebarIsOpen ? 'hidden' : 'inline-block'}`} />
        </Link>
      ))}
      {chatCollection?.length === 0 && (
        <div className="p-2 text-gray-500">No hay chats abiertos.</div>
      )}
    </ul>
  );
}
