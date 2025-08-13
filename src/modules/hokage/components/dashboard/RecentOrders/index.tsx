interface Order {
  id: string;
  user: { name: string; email: string };
  course: { title: string; price: number };
  payment_status: string;
  created_at: Date;
}

interface RecentOrdersProps {
  orders: Order[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-500/20 text-green-400";
      case "PENDING":
        return "bg-yellow-500/20 text-yellow-400";
      case "FAILED":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-gray-700">
      <h3 className="text-white text-lg font-semibold mb-4">Recent Orders</h3>
      <div className="space-y-4">
        {orders.slice(0, 8).map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0"
          >
            <div className="flex-1">
              <p className="text-white font-medium">{order.user.name}</p>
              <p className="text-light-gray text-sm">{order.course.title}</p>
              <p className="text-light-gray text-xs">
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white font-semibold">${order.course.price}</p>
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(
                  order.payment_status
                )}`}
              >
                {order.payment_status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
