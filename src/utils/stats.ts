import { calculatePriceAfterDiscount } from ".";

export function processMonthlyData(data: any[], countField: string) {
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
      monthlyData[monthKey] += item[countField].id || 1;
    }
  });

  return Object.entries(monthlyData).map(([month, users]) => ({
    month,
    users,
  }));
}

export function processRevenueByMonth(orders: any[]) {
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
      const finalPrice = calculatePriceAfterDiscount(coursePrice, discount);
      monthlyRevenue[monthKey] += finalPrice;
    }
  });

  return Object.entries(monthlyRevenue).map(([month, revenue]) => ({
    month,
    revenue,
  }));
}
