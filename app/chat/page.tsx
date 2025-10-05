'use client'
import Chat from "@/components/Chat/Chat";
import ChatPlaceholder from "@/components/Chat/ChatPlaceholder";
import { useChatContext } from "@/context/ChatContext";

export default function ChatConversation() {
  const { currentChat } = useChatContext()
  return (
    <div className="flex w-full font-sans">
      {currentChat ? (
        <Chat contact={currentChat.contact || null} chatID={currentChat.chatID} />
      ) : (
        <ChatPlaceholder />
      )}
    </div>
  );
}
