import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "./common/Sidebar";
import Topbar from "./common/Topbar";
import { Link, NavLink } from "react-router-dom";
import { fetchOrder, updateStatus } from "../services/orderServices";
import { toast } from "react-toastify";
const Order = () => {
  const [isopen, seIsOpen] = useState(false);
  const toggleSidebar = () => {
    seIsOpen(!isopen);
  };
  const handleStatus = useCallback(async (_id, status) => {
    try {
      const res = await updateStatus(_id, status);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }, []);
  const [list, setlist] = useState([]);
  const getOrder = useCallback(async () => {
    try {
      const res = await fetchOrder();
      console.log(res.data);
      setlist(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [list]);
  useEffect(() => {
    getOrder();
  }, []);
  return (
    <div>
      <Sidebar isopen={isopen} />
      <main
        className={`content px-3 py-2 flex-1 transition-all duration-300 bg-slate-60 ${
          isopen ? "ml-60" : "ml-0"
        }  bg-slate-300 min-h-screen`}
      >
        <Topbar toggleSidebar={toggleSidebar} />

        <div className="container-fluid">
          <div className="flex justify-between items-center mt-5 mb-5">
            {/* Left side breadcrumb */}
            <ol className="breadcrumb flex space-x-2">
              <li
                className="breadcrumb-item active  text-2xl font-bold"
                aria-current="page"
              >
                Order
              </li>
            </ol>

            {/* Right side breadcrumb */}
            <ol className="breadcrumb flex space-x-2 text-gray-500">
              <li className="breadcrumb-item">
                <Link to="/admindashboard" className="text-blue-500">
                  Dashboard /
                </Link>
              </li>
              <li className="breadcrumb-item active">Order</li>
            </ol>
          </div>

          {/* Category Table */}
          <div className="bg-white shadow rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-4">Order List</h4>

            {/* Wrapping the table in a container to handle overflow */}
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto text-sm">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="px-4 py-2">#</th>

                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">apartment</th>
                    <th className="px-4 py-2">phone</th>
                    <th className="px-4 py-2">city</th>
                    <th className="px-4 py-2">streetAddress</th>
                    <th className="px-4 py-2">total amoumt</th>

                    <th className="px-4 py-2">createdAt</th>
                    <th className="px-4 py-2">order status</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(list) && list.length > 0 ? (
                    list.map((rs, index) => {
                      const {
                        _id,
                        name,
                        total,
                        apartment,
                        phone,
                        city,
                        streetAddress,
                        status,
                        createdAt,
                      } = rs;

                      return (
                        <tr key={_id} className="border-t">
                          <td className="px-4 py-2">{index + 1}</td>
                          <td className="px-4 py-2">
                            {rs.userId?.addressId.name}
                          </td>
                          <td className="px-4 py-2">
                            {rs.userId?.addressId.apartment}
                          </td>
                          <td className="px-4 py-2">
                            {rs.userId?.addressId.phone}
                          </td>
                          <td className="px-4 py-2">
                            {rs.userId?.addressId.city}
                          </td>
                          <td className="px-4 py-2">
                            {rs.userId?.addressId.streetAddress}
                          </td>
                          <td className="px-4 py-2">${total}</td>
                          <td className="px-4 py-2">
                            {new Date(createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4 flex">
                            <select
                              value={status}
                              onChange={(e) =>
                                handleStatus(_id, e.target.value)
                              }
                              className="border rounded px-2 py-1 bg-white outline-none cursor-pointer"
                            >
                              <option value="Pending" className="">
                                Pending
                              </option>
                              <option value="Processing" className="">
                                Processing
                              </option>
                              <option value="shipped" className="">
                                shipped
                              </option>
                              <option value="Delivered" className="">
                                Delivered
                              </option>
                              <option value="Cancelled" className="">
                                Cancelled
                              </option>
                            </select>
                          </td>
                          <td className="px-4 py-2 space-x-2">
                            <NavLink to={`/vieworder/${_id}`}>
                              <button className=" cursor-pointer bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">
                                view
                              </button>
                            </NavLink>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Order;
