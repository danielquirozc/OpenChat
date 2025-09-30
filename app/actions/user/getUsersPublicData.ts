"use server"
import { prisma } from "@/lib/prisma"

export async function getUsersPublicData() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      avatar: true,
      created_at: true
    }
  })
  
  return users
}