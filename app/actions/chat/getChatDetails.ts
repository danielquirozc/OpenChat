"use server";

import { getCurrentUser } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma/prisma";

export async function getChatDetails({ chatID }: { chatID: number }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;
  const chats = await prisma.user_chat.findUnique({
    where: {
      user_id_chat_id: {
        chat_id: chatID,
        user_id: currentUser.userID,
      },
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
    },
  });
  if (!chats) return null;
  const { id, user_chat, message } = chats?.chat || {};
  const chatDetails = {
    chatID: id,
    contact: user_chat[0].user,
    lastMessage: message[0] || null,
  };
  return chatDetails;
}
