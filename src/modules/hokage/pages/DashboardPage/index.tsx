import {
  Users,
  BookOpen,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  PieChart,
  BarChart3,
  Activity,
} from "lucide-react";
import { getDashboardStats } from "../../services/dashboard.services";
import { StatsCard } from "../../components/dashboard/StatsCard";
import DashboardSkeleton from "../../components/dashboard/DashboardSkelaton";
import { ChartCard } from "../../components/dashboard/ChartCard";
import { UserGrowthChart } from "../../components/dashboard/UserGrowthChart";
import { RevenueChart } from "../../components/dashboard/RevenueChart";
import { OrderStatusChart } from "../../components/dashboard/OrderStatusChart";
import { CourseLevelChart } from "../../components/dashboard/CourseLevelChart";
import { RecentOrders } from "../../components/dashboard/RecentOrders";

const DashboardPage = async () => {
  const result = await getDashboardStats("");

  if(!result.success || !result.data) return <DashboardSkeleton />

  const stats = result.data;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          icon={<Users />}
        />
        <StatsCard
          title="Total Courses"
          value={stats.totalCourses.toLocaleString()}
          icon={<BookOpen />}
        />
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders.toLocaleString()}
          icon={<ShoppingCart />}
        />
        <StatsCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={<DollarSign />}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="User Growth">
          <UserGrowthChart data={stats.userGrowth} />
        </ChartCard>
        <ChartCard title="Revenue Trend">
          <RevenueChart data={stats.revenueByMonth} />
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Order Status Distribution">
          <OrderStatusChart data={stats.ordersByStatus} />
        </ChartCard>
        <ChartCard title="Courses by Level">
          <CourseLevelChart data={stats.coursesByLevel} />
        </ChartCard>
      </div>

      {/* Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrders orders={stats.recentOrders} />
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <ChartCard title="Quick Stats">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-700">
                <div className="flex items-center">
                  <TrendingUp className="text-green-500 mr-3" size={20} />
                  <span className="text-light-gray">Conversion Rate</span>
                </div>
                <span className="text-white font-semibold">
                  {(
                    (stats.totalOrders / Math.max(stats.totalUsers, 1)) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-700">
                <div className="flex items-center">
                  <PieChart className="text-primary mr-3" size={20} />
                  <span className="text-light-gray">Avg. Course Price</span>
                </div>
                <span className="text-white font-semibold">
                  $
                  {stats.totalRevenue > 0
                    ? (
                        stats.totalRevenue / Math.max(stats.totalOrders, 1)
                      ).toFixed(2)
                    : "0"}
                </span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-700">
                <div className="flex items-center">
                  <BarChart3 className="text-blue-500 mr-3" size={20} />
                  <span className="text-light-gray">Success Rate</span>
                </div>
                <span className="text-white font-semibold">
                  {stats.totalOrders > 0
                    ? (
                        ((stats.ordersByStatus.find((s) => s.status === "PAID")
                          ?.count || 0) /
                          stats.totalOrders) *
                        100
                      ).toFixed(1)
                    : "0"}
                  %
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <Activity className="text-purple-500 mr-3" size={20} />
                  <span className="text-light-gray">Active Courses</span>
                </div>
                <span className="text-white font-semibold">
                  {stats.totalCourses}
                </span>
              </div>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};


export default DashboardPage;