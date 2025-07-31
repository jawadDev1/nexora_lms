import { PrismaClientValidationError } from "@/lib/prisma-client/runtime/library";

export function asyncHandler<TArgs extends any[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>
): (...args: TArgs) => Promise<TResult> {
  return async (...args: TArgs): Promise<TResult> => {
    try {
      return await fn(...args);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error ::", error.message);
        throw new Error(error.message);
      } else if (error instanceof PrismaClientValidationError) {
        console.error("Prisma validation error:", error.message);
        throw new Error(error.message);
      }

      throw new Error("Something went wrong");
    }
  };
}
