import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Profile from "./common/Profile";
import { getCancelOrder } from "../services/orderServices";

const MyCancellation = ({ user }) => {
  const path = window.location.pathname.split("/").filter(Boolean);
  const [orders, setOrders] = useState([]);
  const cancelOrder = async () => {
    try {
      const res = await getCancelOrder();
      console.log(res.data);
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    cancelOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex w-full max-w-6xl mx-auto mt-20 px-4 justify-between">
        <ol className=" flex space-x-1 md:space-x-3 font-popinns font-normal text-xs md:text-sm">
          <Link to="/" className="opacity-50">
            Home
          </Link>
          <li className="opacity-50">/</li>
          <li className=" flex items-center cursor-pointer">{path[0]}</li>
        </ol>

        <div className="flex justify-center items-center text-center font-popinns font-normal text-sm leading-5">
          Welcome! <span className="text-[#DB4444]">{user?.name}</span>
        </div>
      </div>

      <div className="flex-col flex md:flex-row w-full mx-auto gap-28 max-w-[1170px] px-4">
        <Profile />
        <div className="w-full md:w-[710px] mx-auto mt-10">
          <h2 className="text-xl font-bold text-[#DB4444] mb-4">
            My Cancelations
          </h2>
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow p-4 rounded mb-4">
              <p>Order#: {order._id}</p>
              <p>Status: {order.status}</p>
              <ul className="list-disc ml-5">
                {/* {order.items.map((item) => (
                  <li key={item.product}>
                    {item.name} x {item.quantity} — Rs {item.price} each
                  </li>
                ))}*/}
              </ul>
              <p className="font-bold mt-2">Total: $ {order.total}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default MyCancellation;
