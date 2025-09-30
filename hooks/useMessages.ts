'use client';
import { getStoredMessages } from "@/app/actions/chat/getStoredMessages";
import { message } from "@/prisma/generated";
import { useEffect, useState, useCallback } from "react";
import { useSocket } from "./useSocket";
import { storeMessage } from "@/app/actions/chat/storeMessage";

type useMessagesArgs = {
  chatID: number;
};

export function useMessages({ chatID }: useMessagesArgs) {
  const [messages, setMessages] = useState<message[]>([]);
  const [currentChatID, setcurrentChatID] = useState<number | null>(null);
  const [isSending, setIsSending] = useState(false);
  const { socket, emit, on, } = useSocket();

  useEffect(() => {
    setcurrentChatID(chatID);
  }, [chatID]);

  useEffect(() => {
    if (!currentChatID || !socket) return;

    const fetchStoredMessages = async () => {
      const storedMessages = await getStoredMessages({ chatID: currentChatID });
      setMessages(storedMessages);
    };

    fetchStoredMessages();

    // Join con confirmación
    emit(`room:join`, { chat_id: currentChatID });

    // Listener para mensajes nuevos
    const handleNewMessage = (newMessage: message) => {
      console.log("📨 Mensaje recibido:", newMessage);

      setMessages((prevMessages) => {
        return [...prevMessages, newMessage];
      });
    };

    const unsubscribe = on(`message:new`, handleNewMessage);

    return () => {
      console.log("🧹 Limpiando listeners y dejando sala");
      emit(`room:leave`, { chat_id: currentChatID });
      unsubscribe();
    };
  }, [currentChatID, socket]);

  const sendMessage = useCallback(
    async ({ content }: { content: string }) => {
      if (!socket?.connected) {
        console.error("❌ Socket no conectado");
        alert("No hay conexión. Intenta de nuevo.");
        return;
      }

      if (!currentChatID) {
        console.error("❌ No hay chat activo");
        return;
      }

      if (isSending) {
        console.warn("⚠️ Ya hay un mensaje enviándose");
        return;
      }

      setIsSending(true);

      try {
        console.log("💾 Guardando mensaje en BD...");
        const newMessage = await storeMessage({
          content,
          chatID: currentChatID,
        });

        if (!newMessage) {
          console.error("❌ Error al guardar mensaje en BD");
          alert("Error al guardar el mensaje");
          return;
        }
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        emit(`message:new`, newMessage);
      } catch (error) {
        console.error("❌ Error en sendMessage:", error);
        alert("Error al enviar el mensaje");
      } finally {
        setIsSending(false);
      }
    },
    [socket, currentChatID, isSending, emit]
  );

  return { messages, setMessages, sendMessage, isSending };
}
