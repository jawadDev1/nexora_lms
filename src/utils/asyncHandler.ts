import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { PrismaClientValidationError } from "@/lib/prisma-client/runtime/library";
import { getServerSession, Session } from "next-auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export function authAsyncHandler<TArgs extends any[], TResult>(
  role: "User" | "Admin",
  fn: (args: TArgs[0] & { user: Session["user"] }) => Promise<TResult>
): (args: TArgs[0]) => Promise<TResult> {
  return async (args: TArgs[0]): Promise<TResult> => {
    try {
      const session = await getServerSession(authOptions);

      if (!session || session.user.role !== role) {
        throw new Error("Unauthorized");
      }

      // Inject `user` into the args object
      return await fn({ ...args, user: session.user });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
        throw new Error(error.message);
      }

      throw new Error("Something went wrong");
    }
  };
}
