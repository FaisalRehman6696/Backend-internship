import React, { useEffect, useState } from "react";
import Typography from "./common/Typography";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Eye, Heart } from "lucide-react";
import { FaRegStar, FaStar } from "react-icons/fa";

import { Link } from "react-router-dom";
import { fetchProducts } from "../services/productServices";
import { toast } from "react-toastify";

const OurProducts = () => {
  const [products, setProducts] = useState([]);
  const FetchProduct = async () => {
    try {
      const res = await fetchProducts();
      setProducts(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    FetchProduct();
  }, []);
  return (
    <div className=" w-full max-w-[1170px] mx-auto px-4 mt-20  ">
      <span className="p-2 rounded-r-lg bg-[#DB4444]"></span>
      <span className="text-[#DB4444] ml-3 font-semibold font-popinns text-[16px] leading-5">
        Our Products
      </span>

      <div className="flex gap-16 items-center mt-12  justify-between ">
        {/* Title */}
        <span className="font-inter font-semibold text-[24px] md:text-[36px] leading-12">
          Explore Our Products
        </span>

        {/* Timer */}

        <div className="flex justify-between gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-[#F5F5F5] rounded-full cursor-pointer">
            <ArrowLeft className=" w-4 h-4 " />
          </div>
          <div className="flex items-center w-8 h-8 justify-center bg-[#F5F5F5] rounded-full cursor-pointer">
            <ArrowRight className=" w-4 h-4 " />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16 justify-items-center">
        {Array.isArray(products) && products.length > 0 ? (
          products.slice(0, 4).map((items) => {
            const { _id, name, price, average, feedbackId, images } = items;
            return (
              <React.Fragment key={_id}>
                <div className="w-full h-[350px] max-w-[270px] relative ">
                  <div className="absolute top-2 right-2 left-2 flex  justify-between">
                    <Typography
                      variant="span"
                      className="font-popinns w-fit h-fit p-1 text-xs  inline-flex items-center justify-center bg-[#00FF66] text-white rounded"
                    >
                      New
                    </Typography>
                    <div className="flex flex-col gap-3">
                      <Typography
                        variant="span"
                        className="p-1 rounded-full bg-white"
                      >
                        <Heart className="w-5 h-5  cursor-pointer" />
                      </Typography>
                      <Typography
                        variant="span"
                        className="p-1 rounded-full bg-white"
                      >
                        <Eye className="w-5 h-5 cursor-pointer" />
                      </Typography>
                    </div>
                  </div>
                  <div className="bg-[#F5F5F5]">
                    <div className="">
                      <img src={`http://localhost:8000/${images}`} alt="" />
                    </div>
                  </div>

                  <div className="font-popinns font-medium text-[16px] leading-6 py-4">
                    {name}
                  </div>
                  <div className="flex gap-2 items-center py-1">
                    <div className="font-popinns font-medium text-[16px] leading-6 text-red-700 ">
                      ${price}
                    </div>

                    <Typography variant="span" className="flex gap-1">
                      {[...Array(5)].map((_, index) => {
                        const value = index + 1;
                        return (
                          <Typography variant="span" key={index}>
                            {value <= average ? (
                              <FaStar color="gold" />
                            ) : (
                              <FaRegStar color="gold" />
                            )}
                          </Typography>
                        );
                      })}
                    </Typography>
                    <Typography
                      variant="span"
                      className="font-popinns text-sm font-semibold opacity-50"
                    >
                      ({feedbackId.length})
                    </Typography>
                  </div>
                </div>
              </React.Fragment>
            );
          })
        ) : (
          <p>no data found</p>
        )}
      </div>
      <div className="flex flex-1 justify-center mt-30 w-full">
        <button className="w-60 h-14 bg-[#DB4444] rounded-xs hover:bg-[#df3333] cursor-pointer items-center text-[#FAFAFA] font-popinns font-medium text-[16px]">
          <Link to="/viewallproducts">View All Products</Link>
        </button>
      </div>
    </div>
  );
};

export default OurProducts;
