"use server";

import { verifyToken } from "@/lib/auth/verifyToken";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function getChats() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;
  if (!token) return [];
  const currentUser = await verifyToken(token);
  if (!currentUser) return [];
  const chats = await prisma.user_chat.findMany({
    where: {
      user_id: currentUser.userID,
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
  const mappedChats = chats.map(({ chat }) => ({
    chatID: chat.id,
    contact: chat.user_chat[0].user,
  }));

  return mappedChats;
}
