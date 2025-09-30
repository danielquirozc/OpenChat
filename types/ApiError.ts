import { formatZodError } from "@/lib/errors/formatZodError";

type formatZodErrorType = ReturnType<typeof formatZodError>;

export type ApiError =
  | { type: "validation_error"; errors: formatZodErrorType }
  | { type: "app_error"; message: string }
  | { type: "server_error"; message: string };

export enum ApiErrorType {
  ValidationError = "validation_error",
  AppError = "app_error",
  ServerError = "server_error",
}