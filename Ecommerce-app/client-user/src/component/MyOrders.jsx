import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getOrderById } from "../services/orderServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchRefundStatus, refundPayment } from "../services/userServices";

const ProfileOrders = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  if (!token) {
    navigate("/");
  }
  const [orders, setOrders] = useState([]);

  const [statusset, setStatusSet] = useState("All");
  const handleOrders = async () => {
    try {
      const res = await getOrderById();
      console.log(res.data);
      setOrders(res.data);
      res.data.map(async (order) => {
        if (order.status === "Delivered") {
          const orderId = order._id;
          const res = await fetchRefundStatus(orderId);
          console.log(res.data);
          setRefundStatusMap((preStatusMap) => ({
            ...preStatusMap,
            [orderId]: res.data,
          }));
        }
      });
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };
  useEffect(() => {
    handleOrders();
  }, []);
  const filterStatus =
    statusset === "All"
      ? orders
      : orders.filter((itm) => itm.status === statusset);

  const [reason, setReason] = useState("");
  const [selectorderid, setSelectOrderId] = useState(null);
  const [openmodal, setOpenModal] = useState(false);
  const [RefundStatusMap, setRefundStatusMap] = useState({});

  const handleRefund = async () => {
    try {
      const res = await refundPayment(selectorderid, reason);
      console.log(res.data);
      // setUpdateRefund(res.data.refundStatus);
      toast.success(res.message);
      setOpenModal(false);
      setReason("");
      setSelectOrderId(null);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-10 p-4">
        <div className="flex justify-between items-center justify-items-center">
          <h2 className="text-2xl font-bold mb-6">My Orders</h2>
          <select
            onChange={(e) => setStatusSet(e.target.value)}
            value={statusset}
            className="cursor-pointer border border-black/30 focus:outline-none rounded-md px-3 py-2"
          >
            <option value="All" className="cursor-pointer">
              All
            </option>
            <option value="Pending" className="cursor-pointer">
              Pending
            </option>
            <option value="Cancelled" className="cursor-pointer">
              Cancelled
            </option>
            <option value="Shipped" className="cursor-pointer">
              Shipped
            </option>
            <option value="Delivered" className="cursor-pointer">
              Delivered
            </option>
            <option value="Processing" className="cursor-pointer">
              Processing
            </option>
          </select>
        </div>
        <div className="space-y-6">
          {filterStatus?.map((order) => (
            <React.Fragment key={order._id}>
              <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl border border-black/30 p-6">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-black/30 pb-3">
                  <div>
                    <p className="font-semibold text-gray-800">
                      Order ID: {order._id}
                    </p>
                    <p className="text-sm text-gray-500">
                      Date: {new Date(order.createdAt).toLocaleDateString()} |{" "}
                      <span className="capitalize">{order.payment}</span>
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Product Details */}
                <div className="mt-4 space-y-3">
                  {order?.products?.map((item) => (
                    <React.Fragment key={item.productId._id}>
                      <div className="flex items-center justify-between bg-[#F5F5F5] p-3 rounded-lg">
                        <div className="flex items-center gap-4">
                          <img
                            src={`http://localhost:8000/${item.productId.imageUrl}`}
                            alt={item.productId.name}
                            className="w-16 h-16 object-cover rounded-lg border border-black/30"
                          />
                          <div>
                            <h3 className="font-medium text-gray-800">
                              {item.productId.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity} × ${item.productId.price}
                            </p>
                          </div>
                        </div>
                        <p className="font-semibold text-gray-800">
                          ${(item.productId.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </React.Fragment>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center mt-5 border-t border-black/30 pt-3">
                  <div className="text-gray-600 text-sm">
                    Payment:{" "}
                    <span className="font-medium capitalize">
                      {order.paymentMethod || "N/"}
                    </span>
                  </div>
                  <div className="text-gray-800 font-semibold text-lg">
                    Total: ${order.total}
                  </div>
                </div>
                {order.status === "Delivered" && (
                  <button
                    disabled={RefundStatusMap[order._id]?.refundStatus === "processing"}
                    onClick={() => {
                      setOpenModal(true), setSelectOrderId(order._id);
                    }}
                    className="mt-4 font-inter cursor-pointer w-full md:w-auto px-5 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                  >
                    {RefundStatusMap[order._id]?.refundStatus === "processing"
                      ? "Processing...."
                      : "Refund"}
                  </button>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
        {openmodal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity- flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded-lg w-[90%] md:w-[400px] shadow-lg">
              <h2 className="text-lg font-semibold mb-3">Request Refund</h2>

              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Write your reason here..."
                required
                className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  onClick={() => handleRefund(selectorderid)}
                  className="px-4 py-2 bg-[#DB4444] text-white rounded cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProfileOrders;
