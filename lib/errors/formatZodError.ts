import { ZodError } from "zod";
export function formatZodError(error: ZodError) {
  return error.issues.map((issue) => ({
    path: issue.path[0],
    message: issue.message,
  }));
}