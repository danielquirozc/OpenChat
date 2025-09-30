'use server'

import { verifyToken } from "@/lib/auth/verifyToken"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"

type storeMessageArgs = {
  content: string
  chatID: number
}

export async function storeMessage({ content, chatID }: storeMessageArgs) {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;
  if (!token) return null;
  const currentUser = await verifyToken(token);
  if (!currentUser) return null;
  const newMessage = await prisma.message.create({
    data: {
      chat_id: chatID,
      sender_id: currentUser.userID,
      content: content,
    },
  });
  return newMessage
}