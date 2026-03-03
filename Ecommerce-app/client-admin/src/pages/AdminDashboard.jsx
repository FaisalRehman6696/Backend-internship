import React, { useEffect, useState } from "react";
import Sidebar from "../component/common/Sidebar";
import Topbar from "../component/common/Topbar";
import { Link, useNavigate } from "react-router-dom";
import SalesChart from "../component/salesChart";
import { handleToken } from "../utils/verifyRequest";
import { toast } from "react-toastify";
const data = [
  { month: "Jan", sales: 10 },
  { month: "Feb", sales: 20 },
  { month: "Mar", sales: 15 },
  { month: "Apr", sales: 30 },
  { month: "May", sales: 40 },
];
const AdminDashboard = () => {
  const [isopen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isopen);
  };
  const navigate = useNavigate();

  // const checkToken = () => {
  //   try {
  //     const decode = handleToken();
  //     navigate("/");
  //   } catch (error) {
  //     sessionStorage.removeItem("token");
  //     toast.error(error);
  //     navigate("/login");
  //   }
  // };
  // useEffect(() => {
  //   checkToken();
  // }, []);

  return (
    <div>
      <Sidebar isopen={isopen} />
      <div>
        <main
          className={`content px-3 py-2 flex-1 transition-all duration-300 bg-slate-60 ${
            isopen ? "ml-60" : "ml-0"
          } bg-slate-300 min-h-screen`}
        >
          <Topbar toggleSidebar={toggleSidebar} />

          <div className="container-fluid ">
            <div className="mt-4 mb-5">
              <ol></ol>
              <ol className="breadcrumb flex space-x-2 text-gray-500 justify-end">
                <li className="breadcrumb-item">
                  <Link to="/admindashboard" className="text-blue-500 ">
                    Dashboard /
                  </Link>
                </li>
                <li className="breadcrumb-item active">Home</li>
              </ol>
            </div>
            {/* Users */}
            <div className="bg-white shadow rounded-lg p-4">
              <h4 className="text-lg font-semibold">Users Statistics</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mt-4">
              <SalesChart data={data} />
              {/*{" "}
              {[
                { label: "Pending", value: 10 },
                { label: "Active", value: 20 },
                { label: "Freeze", value: 5 },
                { label: "Volunteer", value: 15 },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white shadow rounded-lg p-6 text-center"
                >
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <h5 className="text-gray-600">{stat.label}</h5>
                </div>
              ))}*/}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
