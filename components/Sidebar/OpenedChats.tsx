"use client";
import { useChatContext } from "@/context/ChatContext";
import { currentActiveChats } from "@/types/CurrentActiveChats";
import { ArrowRight, UserIcon } from "lucide-react";
import Image from "next/image";

export default function OpenedChats() {
  const { setCurrentChat, chatCollection } = useChatContext();

  return (
    <ul className="flex flex-col mt-5 space-y-2">
      {chatCollection?.map((chat: currentActiveChats) => (
        <li
          key={chat.chatID}
          onClick={() => setCurrentChat(chat)}
          className="flex gap-2 rounded-2xl overflow-hidden border border-gray-300 group items-center p-2 hover:bg-gray-100 cursor-pointer w-full"
        >
          <div className="">
            {chat.contact.avatar ? (
              <Image
                src={chat.contact.avatar}
                alt={chat.contact.username}
                className="w-8 h-8 rounded-full inline-block mr-2"
              />
            ) : (
              <UserIcon className="w-8 h-8 bg-gray-200 p-1 rounded-full text-gray-500 inline-block" />
            )}
          </div>
          <div className="inline-flex flex-1 overflow-hidden flex-col">
            <span className="text-gray-700">{chat.contact.username}</span>
            <span className="text-gray-500 text-sm truncate text-nowrap">
              {chat.lastMessage === null ? "" : chat.lastMessage?.sender_id === chat.contact.id ? "" : "Tu: " }{chat.lastMessage?.content}
            </span>
          </div>
          <div className="">
            <ArrowRight size={20} className="inline-block text-right text-gray-300 group-hover:text-gray-500 duration-300" />
          </div>
        </li>
      ))}
      {chatCollection?.length === 0 && (
        <div className="p-2 text-gray-500">No hay chats abiertos.</div>
      )}
    </ul>
  );
}
