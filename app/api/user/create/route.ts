import { createUser } from "@/app/actions/auth/createUser";
import { createToken } from "@/lib/auth/createToken";
import { handleApiError } from "@/lib/errors/handleApiError";
import { UserValidator } from "@/lib/validators/user";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();
  const cookiesStore = await cookies();
  try {
    const dataParsed = UserValidator.parse(body);
    const newUser = await createUser(dataParsed.username, dataParsed.password);
    const token = await createToken({ userID: newUser.data.id });
    cookiesStore.set("authToken", token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
    });
  } catch (error) {
    return handleApiError(error);
  }
  return new Response(JSON.stringify({ message: "Usuario creado con exito" }), {
    status: 201,
  });
}
