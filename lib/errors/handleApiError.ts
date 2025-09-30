import { ApiErrorType } from "@/types/ApiError";
import { AppError } from "./AppError";
import { formatZodError } from "./formatZodError";
import { ZodError } from "zod";

export function handleApiError(error: unknown): Response {
  if (error instanceof AppError) {
    return new Response(
      JSON.stringify({ type: ApiErrorType.AppError, message: error.message }),
      { status: error.statusCode }
    );
  }

  if (error instanceof ZodError) {
    const formatted = formatZodError(error);
    return new Response(
      JSON.stringify({ type: ApiErrorType.ValidationError, errors: formatted }),
      { status: 422 }
    );
  }

  return new Response(
    JSON.stringify({
      type: ApiErrorType.ServerError,
      message: "Un error inesperado ha ocurrido",
    }),
    { status: 500 }
  );
}
