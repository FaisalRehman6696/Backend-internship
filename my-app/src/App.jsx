import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import OpenModal from "./components/OpenModal";
import User from "./components/pages/User";
import ProductDetail from "./components/ProductDetail";
import ShopingCard from "./components/ShopingCard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<User />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/modal" element={<OpenModal />} />
      <Route path="/detail/:id" element={<ProductDetail />} />
      <Route path="/shopingcard" element={<ShopingCard/>} />

    </Routes>
  );
};

export default App;
