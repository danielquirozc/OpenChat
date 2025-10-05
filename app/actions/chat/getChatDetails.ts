"use server";

import { getCurrentUser } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";

export async function getChatDetails({ chatID }: { chatID: number }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;
  const chats = await prisma.user_chat.findUnique({
    where: {
      user_id_chat_id: {
        chat_id: chatID,
        user_id: currentUser.userID,
      }
    },
    select: {
      chat: {
        select: {
          id: true,
          user_chat: {
            where: { user_id: { not: currentUser.userID } }, // excluye a ti mismo
            select: {
              user: {
                select: {
                  id: true,
                  username: true,
                  avatar: true, // solo lo que necesites
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
  const { id, user_chat } = chats?.chat || {};
  const chatDetails = {
    chatID: id,
    contact: user_chat[0].user,
  }
  return chatDetails;
}
