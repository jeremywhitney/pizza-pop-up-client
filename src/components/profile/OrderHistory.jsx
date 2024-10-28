import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";
import Button from "../shared/Button";

export const OrderHistory = () => {
  const { data: auth } = useAuth();
  const orders = auth?.user?.orders || [];

  const [sortDirection, setSortDirection] = useState("desc");

  const sortedOrders = [...orders].sort((a, b) => {
    return sortDirection === "asc" ? a.id - b.id : b.id - a.id;
  });

  const handleSort = () => {
    setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusStyle = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes("completed")) {
      return "bg-green-100 text-green-800";
    }
    if (statusLower.includes("pending")) {
      return "bg-yellow-100 text-yellow-800";
    }
    if (
      statusLower.includes("in_process") ||
      statusLower.includes("in process")
    ) {
      return "bg-blue-100 text-blue-800";
    }
    return "";
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Order History</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">
                <div className="flex items-center">
                  Order Number
                  <Button
                    variant="secondary"
                    size="sm"
                    className="ml-2"
                    onClick={handleSort}
                  >
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </div>
              </th>
              <th className="text-left py-3 px-4">Order Date</th>
              <th className="text-left py-3 px-4">Payment</th>
              <th className="text-left py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <button
                    onClick={() => {}}
                    className="text-red-600 hover:underline"
                  >
                    #{order.id}
                  </button>
                </td>
                <td className="py-3 px-4">{formatDate(order.created_date)}</td>
                <td className="py-3 px-4">{order.payment.merchant_name}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
