import { Users, BookOpen, ShoppingCart, DollarSign } from "lucide-react";
import { getDashboardStats } from "../../services/dashboard.services";
import { StatsCard } from "../../components/dashboard/StatsCard";
import DashboardSkeleton from "../../components/dashboard/DashboardSkelaton";
import { ChartCard } from "../../components/dashboard/ChartCard";
import { UserGrowthChart } from "../../components/dashboard/UserGrowthChart";
import { RevenueChart } from "../../components/dashboard/RevenueChart";
import { CourseLevelChart } from "../../components/dashboard/CourseLevelChart";
import { RecentOrders } from "../../components/dashboard/RecentOrders";

const DashboardPage = async () => {
  const result = await getDashboardStats("");

  if (!result.success || !result.data) return <DashboardSkeleton />;

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="User Growth">
          <UserGrowthChart data={stats.userGrowth} />
        </ChartCard>
        <ChartCard title="Revenue Trend">
          <RevenueChart data={stats.revenueByMonth} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Courses by Level">
          <CourseLevelChart data={stats.coursesByLevel} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrders orders={stats.recentOrders} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
