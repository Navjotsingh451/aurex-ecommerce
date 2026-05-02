import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authcontext";

function OrderHistory() {
  const { userInfo } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get(
        "http://localhost:45690/api/orders/myorders",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setOrders(data);
    };

    fetchOrders();
  }, [userInfo]);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border border-gray-800 p-4 mb-4"
        >
          <p>Order ID: {order._id}</p>
          <p>Total: ₹{order.totalPrice}</p>
          <p>
            Paid: {order.isPaid ? "Yes" : "No"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;