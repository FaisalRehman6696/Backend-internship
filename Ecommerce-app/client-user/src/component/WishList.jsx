import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const WishList = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full max-w-[1170px] mx-auto px-4 mt-20">
        {" "}
        <span className="font-popinns font-bold text-xl text-[#000000]">
          Your Wishlist
        </span>
      </div>
      <Footer />
    </div>
  );
};

export default WishList;
