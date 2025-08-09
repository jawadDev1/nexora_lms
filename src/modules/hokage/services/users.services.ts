import { db } from "@/lib/db";
import { authAsyncHandler } from "@/utils/asyncHandler";
import { ICourseAnalyticsReturn, IHokageCourseReturn } from "../types";
import { IHokageUserTable, IHokageUserTableReturn } from "../types/users";
import redis from "@/lib/redis";

export const getHokageUsers = authAsyncHandler(
  "Admin",
  async (): IHokageUserTableReturn => {
    const cachedUsers: IHokageUserTable[] | null = await redis.get(
      "hokage_table_users"
    );

    if (cachedUsers) {
      return {
        success: true,
        message: "users fetched successfully",
        data: cachedUsers,
      };
    }

    const users = await db.user.findMany({
      where: { NOT: { role: "Admin" } },
      select: {
        name: true,
        id: true,
        email: true,
        created_at: true,
        _count: { select: { enrollments: true } },
      },
    });

    const modifiedUsers = users.map((user) => ({
      ...user,
      enrollments: user._count.enrollments,
    }));

    await redis.set("hokage_table_users", modifiedUsers)

    return {
      success: true,
      message: "users fetched successfully",
      data: modifiedUsers,
    };
  }
);


export const deleteUser = authAsyncHandler('Admin', async({userId}: {userId: string}) => {
    if(!userId) {
        throw new Error("User id is required");
    };

    const user = await db.user.delete({where: {id: userId}});

    await redis.del("hokage_table_users")

    return {success: true, message: "user deleted successfully"};
})


export const getUsersAnalytics = authAsyncHandler(
  "Admin",
  async (): Promise<ICourseAnalyticsReturn> => {
    const usersByMonth = await db.$queryRaw<
      { month: string; count: number }[]
    >`
SELECT 
  TO_CHAR("created_at", 'Mon YYYY') AS month,
  COUNT(*) AS count
FROM "User"
GROUP BY month
ORDER BY MIN("created_at");
`;


    const formatted = usersByMonth.map((row) => ({
      month: row.month,
      count: Number(row.count),
    }));

    return {
      success: true,
      message: "course analytics fetched successfully",
      data: formatted,
    };
  }
);
