import { getChat } from "@/app/actions/chat/getChat";
import { getUserByID } from "@/app/actions/user/getUserByID";
import Chat from "@/components/Chat/Chat";

export default async function ChatConversation({
  params,
}: {
  params: Promise<{ contactID: number }>;
}) {
  const { contactID } = await params;
  const contact = await getUserByID({ userID: Number(contactID) });
  const currentChat = await getChat({ contactID: Number(contactID) });

  return (
    <div className="flex w-full font-sans">
      {currentChat && (
        <Chat contact={contact || null} chatID={currentChat.id} />
      )}
    </div>
  );
}
