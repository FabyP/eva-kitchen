import React, { useEffect, useState } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";

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
    const socket = socketIOClient("http://localhost:9000/");
    socket.on('event', function(data){
      if(data.order === "updated"){
          fetchOrders();
      }
    });
    fetchOrders();
  }, []);

  return (
    <div className="container">
      {orders.map((order) => (
        <p key={order._id}>
          Tisch: {order.TableId}, Customer: {order.CustomerId} Items: {JSON.stringify(order.OrderItems)} 
        </p>
      ))}
    </div>
  );
};

export default Order;
