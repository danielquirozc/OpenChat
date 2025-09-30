"use client";

import { UserPublicData } from "@/types/UserPublicData";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import { useMessages } from "@/hooks/useMessages";

type ChatProps = {
  contact: UserPublicData | null;
  chatID: number;
};

export default function Chat({ contact, chatID }: ChatProps) {
  if (!contact) return null;
  const { messages, sendMessage, isConnected } = useMessages({ chatID });
  
  return (
    <div className="flex flex-col items-center bg-gray-200 w-full min-h-screen">
      <div className="flex items-center bg-white text-gray-600 shadow w-full font-medium p-3">
        {contact.avatar && (
          <img
            src={contact.avatar}
            className="w-9 h-9 rounded-full mr-2"
            alt={contact.username}
          />
        )}
        <h2 className="text-lg">{contact.username}</h2>
      </div>
      <MessageList messages={messages} receiverID={contact.id} />
      {isConnected ? <SendMessageForm sendMessage={sendMessage} /> : (
        <div className="flex justify-center items-center w-full h-full">
          <p className="text-gray-500">Conectando con el servidor...</p>
        </div>
      )}
    </div>
  );
}
