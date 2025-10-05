"use server";

import { getCurrentUser } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma/prisma";

type createChatArgs = {
  contactID: number;
};

export async function createChat({ contactID }: createChatArgs) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;
  const newChat = await prisma.chat.create({
    data: {
      user_chat: {
        create: [{ user_id: currentUser.userID }, { user_id: contactID }],
      },
    },
  });
  return newChat;
}
