import { cookies } from "next/headers";
import { verifyToken } from "./verifyToken";

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      return null;
    }

    const currentUser = await verifyToken(token);
    return currentUser;
  } catch (error) {
    console.error("Error al obtener usuario actual:", error);
    return null;
  }
}

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("No autenticado");
  }

  return user;
}