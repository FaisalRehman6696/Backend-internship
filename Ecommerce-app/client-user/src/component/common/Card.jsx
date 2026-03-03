import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import Typography from "./Typography";
import { Eye, Heart, Star } from "lucide-react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddCard } from "../../counter/cardSlice";
import { toast } from "react-toastify";
import { handleToken } from "../../utils/verifyRequest";

const Card = ({ items }) => {
  const { _id, name, imageUrl, price, average, feedbackId } = items;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDispatch = () => {
    try {
      const decodeToken = handleToken();
      dispatch(AddCard({ _id, name, imageUrl, price }));
      toast.success(`${name} added to cart!`);
    } catch (error) {
      sessionStorage.removeItem("token");
      toast.error(error.message);
    }
  };
  const Addfavourite = () => {
    localStorage.setItem("OnClick");
  };
  const checkToken = () => {
    try {
      const decodeToken = handleToken();
      navigate(`/productdetail/${_id}`);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div
      key={_id}
      className="flex flex-col w-full sm:w-[250px]  md:w-[270px]  relative rounded-t-sm"
    >
      <div className="absolute top-2 right-2 left-2 flex  justify-between ">
        <Typography
          variant="span"
          className="font-popinns w-fit h-fit p-1 text-xs  inline-flex items-center justify-center bg-[#DB4444] text-white rounded"
        >
          -40%
        </Typography>
        <div className="flex flex-col gap-3">
          <span className="p-1 rounded-full bg-white">
            <Heart
              onClick={Addfavourite}
              className="w-5 h-5  cursor-pointer truncate"
            />
          </span>
          <span className="p-1 rounded-full bg-white">
            <Eye className="w-5 h-5 cursor-pointer" />
          </span>
        </div>
      </div>

      <div className="bg-[#F5F5F5] rounded-t-sm" onClick={checkToken}>
        <img
          src={`http://localhost:8000/${imageUrl}`}
          alt="img"
          className="cursor-pointer"
        />
      </div>

      <button
        onClick={handleDispatch}
        className="w-full h-10 items-center bg-black font-popinns font-medium text-[#FFFFFF] text-[16px] leading-6 cursor-pointer hover:opacity-95 rounded-b-sm  flex justify-center "
      >
        Add To Card
      </button>

      <div className="font-popinns font-medium text-[16px] leading-6 py-4">
        {name}
      </div>
      <div className="flex gap-2 py-1">
        <div className="font-popinns font-medium text-[16px] leading-6 text-[#DB4444] ">
          ${price}
        </div>

        <div className="font-popinns font-medium text-[16px] leading-6 opacity-50 line-through">
          $10
        </div>
      </div>

      <div className="flex gap-3 py-2">
        <span className="flex gap-1">
          {[...Array(5)].map((_, index) => {
            const value = index + 1;
            return (
              <span key={index}>
                {value <= average ? (
                  <FaStar color="gold" />
                ) : (
                  <FaRegStar color="gold" />
                )}
              </span>
            );
          })}
        </span>
        <span className="font-popinns text-sm font-semibold opacity-50">
          ({feedbackId.length})
        </span>
      </div>
    </div>
  );
};

export default Card;
