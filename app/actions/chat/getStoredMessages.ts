"use server";

import { prisma } from "@/lib/prisma/prisma";

export async function getStoredMessages({ chatID }: { chatID: number }) {
  const messages = await prisma.message.findMany({
    where: {
      chat_id: chatID,
    },
    orderBy: {
      created_at: "asc",
    },
  });
  return messages;
}
