import { verifyUser } from "@/app/actions/auth/verifyUser";
import { createToken } from "@/lib/auth/createToken";
import { handleApiError } from "@/lib/errors/handleApiError";
import { UserValidator } from "@/lib/validators/user";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();
  const cookiesStore = await cookies();
  try {
    const dataParsed = UserValidator.parse(body);
    const user = await verifyUser(dataParsed);
    const token = await createToken({ userID: user.id });
    cookiesStore.set("authToken", token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
    });
  } catch (error) {
    return handleApiError(error);
  }
  
  return new Response(JSON.stringify({ message: "Login exitoso" }), {
    status: 200,
  });
}
