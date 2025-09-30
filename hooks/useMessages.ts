import { getStoredMessages } from "@/app/actions/chat/getStoredMessages";
import { message } from "@/prisma/generated";
import { useEffect, useState } from "react";
import { useSocket } from "./useSocket";
import { storeMessage } from "@/app/actions/chat/storeMessage";

type useMessagesArgs = {
  chatID: number;
};

export function useMessages({ chatID }: useMessagesArgs) {
  const [messages, setMessages] = useState<message[]>([]);
  const [currentChatID, setcurrentChatID] = useState<number | null>(null);
  const { socket, emit, on } = useSocket()
  
  useEffect(() => {
    setcurrentChatID(chatID);
  }, [chatID]);

  useEffect(() => {
    if (!currentChatID) return;
    const fetchStoredMessages = async () => {
      const storedMessages = await getStoredMessages({ chatID: currentChatID });
      setMessages(storedMessages);
    };
    fetchStoredMessages();

    emit(`room:join`, { chat_id: currentChatID });

    const unsuscribe = on(`message:new`, (newMessage: message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return unsuscribe
  }, [currentChatID]);

  const sendMessage = async ({ content }: { content: string }) => {
    if (!socket || !socket.connected) return;
    if (!currentChatID) return;
    const newMessage = await storeMessage({ content, chatID: currentChatID });
    if (!newMessage) return;
    emit(`message:new`, newMessage)
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return { messages, setMessages, sendMessage };
}