import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./component/common/Sidebar";
import Topbar from "./component/common/Topbar";
import AdminDashboard from "./pages/AdminDashboard";
import Product from "./component/Product";
import CreateProduct from "./component/CreateProduct";
import { ToastContainer } from "react-toastify";

import Category from "./component/Category";
import CreateCategory from "./component/CreateCategory";
import ViewProfile from "./component/ViewProfile";
import Order from "./component/Order";
import ViewOrder from "./component/ViewOrder";
import Login from "./component/Login";
import { useEffect } from "react";
import ProtectedRoutes from "./component/common/protectedRoutes";

const App = () => {
  const location = useLocation();
  useEffect(() => {}, [location]);
  return (
    <>
      {" "}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/topbar" element={<Topbar />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/product" element={<Product />} />
          <Route path="/createproduct" element={<CreateProduct />} />
          <Route path="/category" element={<Category />} />
          <Route path="/createcategory" element={<CreateCategory />} />
          <Route path="/viewprofile" element={<ViewProfile />} />
          <Route path="/order" element={<Order />} />
          <Route path="/vieworder/:_id" element={<ViewOrder />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
