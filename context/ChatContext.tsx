"use client";
import { getChats } from "@/app/actions/chat/getChats";
import { openedChats } from "@/components/Sidebar/OpenedChats";
import { createContext, useContext, useEffect, useState } from "react";

type ChatContextType = {
  setChatCollection: (chats: openedChats[]) => void;
  chatCollection: openedChats[];
  setChatID: (id: number) => void;
  chatID: number | null;
  updateChatCollection: () => void
};

const ChatContext = createContext<ChatContextType>({
  setChatCollection: () => {},
  chatCollection: [],
  setChatID: () => {},
  chatID: null,
  updateChatCollection: () => {}
});

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chatID, setChatID] = useState<number | null>(null);
  const [chatCollection, setChatCollection] = useState<openedChats[]>([]);

  const fetchOpenedChats = async () => {
    const openedChats = await getChats();
    setChatCollection(openedChats);
  };

  useEffect(() => {
    fetchOpenedChats();
  }, []);

  const updateChatCollection = () => {
    fetchOpenedChats()
  };

  return (
    <ChatContext.Provider
      value={{
        chatCollection,
        setChatCollection,
        setChatID,
        chatID,
        updateChatCollection
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
