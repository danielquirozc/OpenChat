"use server";

import { AppError } from "@/lib/errors/AppError";
import { prisma } from "@/lib/prisma/prisma";
import bcrypt from "bcrypt";

export async function createUser(name: string, password: string) {
  const existingUser = await prisma.user.findUnique({
    where: { username: name },
  });

  if (existingUser) {
    throw new AppError("Este nombre de usuario ya esta en uso", 409);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const data = await prisma.user.create({
    data: {
      username: name,
      password_hash: passwordHash,
    },
  });

  return { message: "User created successfully", data };
}
