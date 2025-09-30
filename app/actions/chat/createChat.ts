"use server";

import { verifyToken } from "@/lib/auth/verifyToken";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

type createChatArgs = {
  contactID: number;
};

export async function createChat({ contactID }: createChatArgs) {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;
  if (!token) return null;
  const currentUser = await verifyToken(token);
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
