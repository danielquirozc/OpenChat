import * as jwt from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface TokenPayload {
  userID: number;
  [key: string]: any;
}

export function createToken(
  payload: TokenPayload,
  expiresIn?: string
): Promise<string> {
  return new jwt.SignJWT(payload)
    .setExpirationTime(expiresIn || "1h")
    .setProtectedHeader({ alg: "HS256" })
    .sign(new TextEncoder().encode(JWT_SECRET));
}
