'use server'

import { verifyToken } from "@/lib/auth/verifyToken";
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers";
import { createChat } from "./createChat";

type getChatArgs = {
  contactID: number
}

export async function getChat({ contactID }: getChatArgs) {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;
  if (!token) return null;
  const currentUser = await verifyToken(token);
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
    return newChat
  }

  return chat
}