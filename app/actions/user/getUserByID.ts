"use server";

import { prisma } from "@/lib/prisma/prisma";

export async function getUserByID({ userID }: { userID: number }) {
  const results = await prisma.user.findUnique({
    where: { id: userID },
    select: {
      id: true,
      username: true,
      avatar: true,
      created_at: true,
    },
  });

  return results;
}
