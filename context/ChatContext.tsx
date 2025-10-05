"use client";
import { getChat } from "@/app/actions/chat/getChat";
import { getChatDetails } from "@/app/actions/chat/getChatDetails";
import { getChats } from "@/app/actions/chat/getChats";
import { currentActiveChats } from "@/types/CurrentActiveChats";
import { createContext, useContext, useEffect, useState } from "react";

type ChatContextType = {
  setChatCollection: (chats: currentActiveChats[]) => void;
  chatCollection: currentActiveChats[];
  openChatByContact: (contactID: number) => Promise<void>;
  currentChat: currentActiveChats | null;
  setCurrentChat: (chat: currentActiveChats | null) => void;
};

const ChatContext = createContext<ChatContextType>({
  setChatCollection: () => {},
  chatCollection: [],
  currentChat: null,
  openChatByContact: async () => { },
  setCurrentChat: () => {},
});

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chatCollection, setChatCollection] = useState<currentActiveChats[]>([]);
  const [currentChat, setCurrentChat] = useState<currentActiveChats | null>(null);

  const fetchOpenedChats = async () => {
    const openedChats = await getChats();    
    setChatCollection(openedChats);
  };

  useEffect(() => {    
    fetchOpenedChats();
  }, []);

  const openChatByContact = async (contactID: number) => {
    const chatExists = chatCollection.filter((chat) => chat.contact.id === contactID);
    if (chatExists.length > 0) {
      setCurrentChat(chatExists[0]);
      return;
    };
    const chat = await getChat({ contactID });
    if (!chat) return;
    const chatDetails = await getChatDetails({ chatID: chat.id });
    if (!chatDetails) return;
    setCurrentChat(chatDetails);
    setChatCollection((prevChats) => [...prevChats, chatDetails]);
  };

  return (
    <ChatContext.Provider
      value={{
        chatCollection,
        setChatCollection,
        openChatByContact,
        currentChat,
        setCurrentChat
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
