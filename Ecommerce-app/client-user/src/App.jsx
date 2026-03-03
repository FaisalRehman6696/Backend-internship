import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./component/Navbar";
import Carousalsection from "./component/Carousalsection";
import User from "./component/pages/User";
import ProductDetail from "./component/ProductDetail";
import Cart from "./component/Cart";
import Checkout from "./component/Checkout";
import Signup from "./component/Signup";
import Login from "./component/Login";
import Myaccount from "./component/Myaccount";
import ForgotPassword from "./component/ForgotPassword";
import UpdatePassword from "./component/UpdatePassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewAllProducts from "./component/ViewAllProducts";
import ProfileOrders from "./component/MyOrders";
import MyCancellation from "./component/MyCancellation";
import ProductByCategory from "./component/ProductByCategory";
import CodeVerify from "./component/CodeVerify";
import WishList from "./component/WishList";
import AboutUs from "./component/AboutUs";
import ContactUs from "./component/ContactUs";
import PaymentForm from "./component/PaymentForm";
import Loader from "./component/Loader";
import ProtectedRoute from "./component/common/protectedRoutes";

const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [location]);
  if (loading) {
    return <Loader />;
  }
  return (
    <>
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
        <Route element={<ProtectedRoute />}>
          <Route path="/navbr" element={<Navbar />} />
          <Route path="/carousalsection" element={<Carousalsection />} />
          <Route path="/productdetail/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/myaccount" element={<Myaccount />} />
          <Route path="/viewallproducts" element={<ViewAllProducts />} />
          <Route path="/profileorders" element={<ProfileOrders />} />
          <Route path="/mycancelation" element={<MyCancellation />} />
          <Route
            path="/productbycategory/:_id"
            element={<ProductByCategory />}
          />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/paymentform" element={<PaymentForm />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/About" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/updatepassword" element={<UpdatePassword />} />
        <Route path="/codeverify" element={<CodeVerify />} />
        <Route path="/" element={<User />} />
      </Routes>
    </>
  );
};

export default App;
