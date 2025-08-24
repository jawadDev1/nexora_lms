"use server";

import { db } from "@/lib/db";
import { IServiceReturn } from "@/types/common";
import { calculatePriceAfterDiscount } from "@/utils";
import { authAsyncHandler } from "@/utils/asyncHandler";
import { processMonthlyData, processRevenueByMonth } from "@/utils/stats";

export interface DashboardStats {
  totalUsers: number;
  totalCourses: number;
  totalOrders: number;
  totalRevenue: number;
  recentOrders: Array<{
    id: string;
    user: { name: string; email: string };
    course: { title: string; price: number };
    payment_status: string;
    created_at: Date;
  }>;
  userGrowth: Array<{ month: string; users: number }>;
  // ordersByStatus: Array<{ status: string; count: number }>;
  coursesByLevel: Array<{ level: string; count: number }>;
  revenueByMonth: Array<{ month: string; revenue: number }>;
}

interface DashboardStatsReturn extends IServiceReturn {
  data: DashboardStats | null;
}

export const getDashboardStats = authAsyncHandler(
  "Admin",
  async (): Promise<DashboardStatsReturn> => {
    try {
      const [totalUsers, totalCourses, totalOrders] = await Promise.all([
        db.user.count(),
        db.course.count(),
        db.order.count(),
      ]);

      const revenueData = await db.order.findMany({
        where: { payment_status: "PAID" },
        include: { Course: true },
      });

      const totalRevenue = revenueData.reduce((sum, order) => {
        const coursePrice = order.Course?.price || 0;
        const discount = order.Course?.discount || 0;
        const finalPrice = calculatePriceAfterDiscount(coursePrice, discount);
        return sum + finalPrice;
      }, 0);

      // Get recent orders
      const recentOrders = await db.order.findMany({
        take: 10,
        orderBy: { created_at: "desc" },
        include: {
          User: { select: { name: true, email: true } },
          Course: { select: { title: true, price: true } },
        },
      });

      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      const usersByMonth = await db.user.groupBy({
        by: ["created_at"],
        where: {
          created_at: { gte: sixMonthsAgo },
        },
        _count: { id: true },
      });

      const userGrowth = processMonthlyData(usersByMonth, "_count");

      const coursesByLevel = await db.course.groupBy({
        by: ["level"],
        _count: { id: true },
      });

      const ordersByMonth = await db.order.findMany({
        where: {
          payment_status: "PAID",
          created_at: { gte: sixMonthsAgo },
        },
        include: { Course: true },
      });

      const revenueByMonth = processRevenueByMonth(ordersByMonth);

      return {
        success: true,
        message: "fetched successfully",
        data: {
          totalUsers,
          totalCourses,
          totalOrders,
          totalRevenue,
          recentOrders: recentOrders.map((order) => ({
            id: order.id,
            user: order.User,
            course: order.Course,
            payment_status: order.payment_status,
            created_at: order.created_at,
          })),
          userGrowth,
          coursesByLevel: coursesByLevel.map((item) => ({
            level: item.level,
            count: item._count.id,
          })),
          revenueByMonth,
        },
      };
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      //   throw new Error("Failed to fetch dashboard statistics");
      return { success: false, message: "failed", data: null };
    }
  }
);



