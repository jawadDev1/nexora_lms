"use server";

import { db } from "@/lib/db";
import { IServiceReturn } from "@/types/common";
import { authAsyncHandler } from "@/utils/asyncHandler";

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
  ordersByStatus: Array<{ status: string; count: number }>;
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
      // Get total counts
      const [totalUsers, totalCourses, totalOrders] = await Promise.all([
        db.user.count(),
        db.course.count(),
        db.order.count(),
      ]);

      // Calculate total revenue
      const revenueData = await db.order.findMany({
        where: { payment_status: "PAID" },
        include: { Course: true },
      });

      const totalRevenue = revenueData.reduce((sum, order) => {
        const coursePrice = order.Course?.price || 0;
        const discount = order.Course?.discount || 0;
        const finalPrice = coursePrice - (coursePrice * discount) / 100;
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

      // User growth by month (last 6 months)
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      const usersByMonth = await db.user.groupBy({
        by: ["created_at"],
        where: {
          created_at: { gte: sixMonthsAgo },
        },
        _count: { id: true },
      });

      // Process user growth data
      const userGrowth = processMonthlyData(usersByMonth, "_count");

      // Orders by status
      const ordersByStatus = await db.order.groupBy({
        by: ["payment_status"],
        _count: { id: true },
      });

      // Courses by level
      const coursesByLevel = await db.course.groupBy({
        by: ["level"],
        _count: { id: true },
      });

      // Revenue by month
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
          ordersByStatus: ordersByStatus.map((item) => ({
            status: item.payment_status,
            count: item._count.id,
          })),
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

function processMonthlyData(data: any[], countField: string) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthlyData: { [key: string]: number } = {};

  // Initialize last 6 months
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthKey = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    monthlyData[monthKey] = 0;
  }

  // Process actual data
  data.forEach((item) => {
    const date = new Date(item.created_at);
    const monthKey = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    if (monthlyData.hasOwnProperty(monthKey)) {
      monthlyData[monthKey] += item[countField].id || item[countField] || 1;
    }
  });

  return Object.entries(monthlyData).map(([month, users]) => ({
    month,
    users,
  }));
}

function processRevenueByMonth(orders: any[]) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthlyRevenue: { [key: string]: number } = {};

  // Initialize last 6 months
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthKey = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    monthlyRevenue[monthKey] = 0;
  }

  // Process orders
  orders.forEach((order) => {
    const date = new Date(order.created_at);
    const monthKey = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

    if (monthlyRevenue.hasOwnProperty(monthKey) && order.Course) {
      const coursePrice = order.Course.price || 0;
      const discount = order.Course.discount || 0;
      const finalPrice = coursePrice - (coursePrice * discount) / 100;
      monthlyRevenue[monthKey] += finalPrice;
    }
  });

  return Object.entries(monthlyRevenue).map(([month, revenue]) => ({
    month,
    revenue,
  }));
}
