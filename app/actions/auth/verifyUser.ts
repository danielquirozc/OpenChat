'use server'

import { AppError } from "@/lib/errors/AppError";
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
export async function verifyUser({ username, password }: { username: string; password: string }) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    throw new AppError("No se encontro el usuario.", 401);
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatch) {
    throw new AppError("Contraseña incorrecta.", 401);
  }

  return user;
}