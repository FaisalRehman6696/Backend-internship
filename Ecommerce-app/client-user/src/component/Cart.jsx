import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AddCard, RemoveCard } from "../counter/cardSlice";
import Navbar from "./Navbar";
import Typography from "./common/Typography";
import Footer from "./Footer";

const Cart = () => {
  const path = window.location.pathname.split("/").filter(Boolean);
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.card?.product);
  const cartItem = selector?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <div className=" ">
      <Navbar />
      <div className=" w-full max-w-6xl mx-auto mt-20 px-4">
        <ol className=" flex space-x-1 md:space-x-3 font-popinns font-normal text-xs md:text-sm">
          <Link to="/" className="opacity-50">
            Home
          </Link>
          <li className="opacity-50">/</li>
          <li className=" flex items-center"> {path[0]}</li>
        </ol>
      </div>
      {/* Table Wrapper for Horizontal Scroll on Mobile */}
      {/* 1. Added overflow-x-auto wrapper for the table */}
      <div className="w-full max-w-6xl mx-auto mt-10 md:mt-20 px-4 overflow-x-auto">
        <table className="w-full min-w-[600px] text-left border-separate border-spacing-y-4">
          <thead>
            <tr className="border-b">
              <th className="font-popinns font-normal text-sm p-4">Product</th>
              <th className="font-popinns font-normal text-sm p-4">Price</th>
              <th className="font-popinns font-normal text-sm p-4">Quantity</th>
              <th className="font-popinns font-normal text-sm p-4">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(selector) && selector.length > 0 ? (
              selector.map((rs) => {
                const { _id, name, imageUrl, price, quantity } = rs;
                return (
                  <tr key={_id} className="shadow-sm border rounded-lg">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          className="w-12 h-12 object-contain bg-[#F5F5F5] p-1"
                          src={`http://localhost:8000/${imageUrl}`}
                          alt={name}
                        />
                        <span className="font-popinns font-normal text-sm truncate max-w-[150px]">
                          {name}
                        </span>
                      </div>
                    </td>
                    <td className="font-popinns font-normal text-sm p-4">
                      ${price}
                    </td>
                    <td className="p-4">
                      <div className="w-[72px] h-10 border-[1.5px] border-black/20 rounded-[4px] flex items-center justify-center gap-2">
                        <span className="font-popinns font-normal text-sm">
                          {quantity}
                        </span>
                        <div className="flex flex-col">
                          <button onClick={() => dispatch(AddCard({ _id }))}>
                            <ChevronUp className="w-3 h-3 cursor-pointer" />
                          </button>
                          <button onClick={() => dispatch(RemoveCard({ _id }))}>
                            <ChevronDown className="w-3 h-3 cursor-pointer" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="font-popinns font-normal text-sm p-4">
                      ${Math.floor(price * quantity)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-20 font-popinns text-gray-400"
                >
                  Your cart is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 2. Action Buttons Section */}
      <div className="w-full max-w-6xl mx-auto px-4 mt-8">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button className="font-popinns font-medium text-base w-full sm:w-56 h-14 border rounded-[4px] border-black/30 hover:bg-gray-50 cursor-pointer">
            Return to shop
          </button>
          <button className="cursor-pointer font-popinns font-medium text-base w-full sm:w-56 h-14 border rounded-[4px] border-black/30 hover:bg-gray-50">
            Update cart
          </button>
        </div>

        {/* 3. Coupon and Total Section */}
        <div className="flex flex-col lg:flex-row justify-between mt-16 lg:mt-20 gap-10">
          {/* Coupon Input */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:max-w-[527px]">
            <input
              className="px-4 outline-none border rounded-[4px] flex-grow h-14 font-popinns text-base"
              placeholder="Coupon Code"
            />
            <button className="bg-[#DB4444] cursor-pointer text-white rounded-[4px] px-8 h-14 font-popinns font-medium hover:bg-[#c13a3a] transition-colors">
              Apply Coupon
            </button>
          </div>

          {/* Cart Total Box */}
          <div className="w-full lg:w-[470px] border rounded-[4px] p-6 sm:p-8 space-y-6">
            <h5 className="font-popinns font-medium text-xl">Cart Total</h5>

            <div className="flex justify-between border-b border-black/20 pb-4">
              <span className="font-popinns">Subtotal:</span>
              <span>${cartItem}</span>
            </div>

            <div className="flex justify-between border-b border-black/20 pb-4">
              <span className="font-popinns">Shipping:</span>
              <span className="text-green-600">Free</span>
            </div>

            <div className="flex justify-between font-medium text-lg">
              <span>Total:</span>
              <span>${cartItem}</span>
            </div>

            <Link
              to={selector?.length > 0 ? "/checkout" : ""}
              className="block"
            >
              <button className="w-full font-popinns cursor-pointer h-14 bg-[#DB4444] text-white rounded-[4px] font-medium hover:bg-[#c13a3a] transition-colors">
                Proceed to checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
