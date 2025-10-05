"use server";

import { getCurrentUser } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma/prisma";

export async function getChats() {
  const currentUser = await getCurrentUser();

  if (!currentUser) return [];
  const chats = await prisma.user_chat.findMany({
    where: {
      user_id: currentUser.userID,
    },
    select: {
      chat: {
        select: {
          id: true,
          message: {
            take: 1,
            orderBy: { created_at: "desc" },
          },
          user_chat: {
            where: { user_id: { not: currentUser.userID } }, // excluye a ti mismo
            select: {
              user: {
                select: {
                  id: true,
                  username: true,
                  avatar: true,
                  created_at: true,
                },
              },
            },
          },
        },
      },
    }
  });
  const mappedChats = chats.map(({ chat }) => ({
    chatID: chat.id,
    contact: chat.user_chat[0].user,
    lastMessage: chat.message[0] || null,
  }));

  return mappedChats;
}
