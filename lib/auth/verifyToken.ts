import * as jwt from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function verifyToken(token: string) {
  try {
    const result = await jwt.jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    return result.payload as { userID: number, exp: number } | null;
  } catch {
    return null;
  }
}
