'use server'

import { getCurrentUser } from "@/lib/auth/auth"
import { verifyToken } from "@/lib/auth/verifyToken"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"

type storeMessageArgs = {
  content: string
  chatID: number
}

export async function storeMessage({ content, chatID }: storeMessageArgs) {
  const currentUser = await getCurrentUser();
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