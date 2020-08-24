import React, { useEffect, useState } from "react";
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    await axios
      .get("http://localhost:9000/orders")
      .then(function (response) {
        setOrders(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container">
      {orders.map((order) => (
        <p key={order._id}>
          Tisch: {order.TableId}, Customer: {order.CustomerId}
        </p>
      ))}
    </div>
  );
};

export default Order;
