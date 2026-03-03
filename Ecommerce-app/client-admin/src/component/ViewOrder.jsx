import React, { useEffect, useState } from "react";
import { fetchOrderById } from "../services/orderServices";

import { NavLink, useParams } from "react-router-dom";
import Sidebar from "./common/Sidebar";
import Topbar from "./common/Topbar";

const ViewOrder = () => {
  const [isOpen, setisOpen] = useState(false);
  const toggleSidebar = () => {
    setisOpen(!isOpen);
  };
  const { _id } = useParams();

  const [list, setlist] = useState([]);
  const getOrderById = async () => {
    try {
      const res = await fetchOrderById(_id);
      console.log(res.data);
      setlist(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrderById();
  }, []);

  return (
    <div>
      <Sidebar isOpen={isOpen} />
      <main
        className={`content px-3 py-2 flex-1 transition-all duration-300 bg-slate-60 ${
          isOpen ? "ml-60" : "ml-0"
        } bg-slate-300 min-h-screen`}
      >
        <Topbar toggleSidebar={toggleSidebar} />

        <div className="container-fluid ">
          <div className="flex justify-between items-center mt-5 mb-5">
            <ol className="breadcrumb flex space-x-2">
              <li
                className="breadcrumb-item active  text-2xl font-bold"
                aria-current="page"
              >
                Order Detail
              </li>
            </ol>

            {/* Right side breadcrumb */}
            <ol className="breadcrumb flex space-x-2 text-gray-500">
              <li className="breadcrumb-item" aria-current="page">
                <NavLink to="/admindashboard" className="text-blue-500">
                  Dashboard /
                </NavLink>
              </li>
              <li className="breadcrumb-item active">Order</li>
            </ol>
          </div>

          {/* Users */}

          <div className="container mx-auto px-4 mt-6">
            {/* Customer Info */}
            <NavLink to="/order">
              {" "}
              <button className="cursor-pointer mb-7 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-500">
                Back to Orders
              </button>
            </NavLink>

            <div className="bg-white shadow rounded-lg p-6 mb-4">
              <h2 className="text-xl font-semibold mb-2">
                Customer Information
              </h2>
              <p>
                <span className="font-semibold">Full Name:</span>{" "}
                {list.products?.map((item) => (
                  <span key={item.productId}>{item.productId.name}</span>
                ))}
              </p>
              <p>
                <span className="font-semibold">Created At:</span>{" "}
                {new Date(list.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Product Info */}

            <div className=" bg-white shadow rounded-lg p-6 mb-4">
              <h2 className="text-xl font-semibold mb-2">
                Product Information
              </h2>
              <div className="flex justify-between">
                <div className="">
                  <p>
                    <span className="font-semibold">Category:</span>
                    {list.products?.productId?.category?.name}
                  </p>
                  <p>
                    <span className="font-semibold">Total Product: </span>
                    {list.products?.length}
                  </p>

                  <p>
                    <span className="font-semibold">Total:</span> {list?.total}
                  </p>
                </div>
                <div className="">
                  {list?.products?.map((imag, index) => (
                    <React.Fragment key={index}>
                      <div className="flex gap-20 items-center">
                        <img
                          src={`http://localhost:8000/${imag?.productId?.imageUrl}`}
                          alt=""
                          className="h-10 w-10 rounded object-cover"
                        />
                        <span className="font-semibold w-40">
                          {imag?.productId?.name}
                        </span>

                        <span>
                          <b>Qty:</b> {imag?.quantity}
                        </span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-700 mb-4">
                Order Summary
              </h2>
              <div className="flex justify-between mb-2">
                <span className="text-blue-600 font-medium">Subtotal:</span>
                <span className="text-blue-600"> {list.total}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-blue-600 font-medium">
                  Delivery Charges:
                </span>
                <span className="text-blue-600"> {list.deliverycharges}</span>
              </div>
              <div className="flex justify-between mt-4 text-lg font-semibold">
                <span>Total:</span>
                <span>{list.total}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewOrder;
