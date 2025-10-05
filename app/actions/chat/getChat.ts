"use server";

import { getCurrentUser } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma/prisma";
import { createChat } from "./createChat";

type getChatArgs = {
  contactID: number;
};

export async function getChat({ contactID }: getChatArgs) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;
  const chat = await prisma.chat.findFirst({
    where: {
      AND: [
        { user_chat: { some: { user_id: currentUser.userID } } },
        { user_chat: { some: { user_id: contactID } } },
      ],
    },
    include: {
      user_chat: true,
    },
  });

  if (!chat) {
    const newChat = await createChat({ contactID });
    return newChat;
  }

  return chat;
}
