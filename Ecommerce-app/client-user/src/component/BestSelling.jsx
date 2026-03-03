import React, { useEffect, useState } from "react";
import Typography from "./common/Typography";
import { Eye, Heart } from "lucide-react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchProducts } from "../services/productServices";
import { toast } from "react-toastify";

const BestSelling = () => {
  const [products, setProducts] = useState([]);
  console.log(products);
  const FetchProduct = async () => {
    try {
      const res = await fetchProducts();
      setProducts(res.data);
    } catch (error) {
      toast.success(error.response.data.message);
    }
  };
  useEffect(() => {
    FetchProduct();
  }, []);
  return (
    <div className="w-full max-w-[1170px] mx-auto px-4 mt-20">
      <Typography
        variant="span"
        className="p-2 rounded-r-lg bg-[#DB4444]"
      ></Typography>
      <Typography
        variant="span"
        className="text-[#DB4444] ml-3 font-semibold font-popinns text-[16px] leading-5"
      >
        This Month
      </Typography>

      <div className="flex md:gap-16  items-center mt-12  justify-between w-full">
        {/* Title */}
        <Typography
          variant="h5"
          className="font-inter font-semibold text-[20px] md:text-[36px] leading-12"
        >
          Best Selling
        </Typography>

        {/* Timer */}

        <div className="flex justify-center items-center gap-3">
          <button className=" px-8 py-3 bg-[#DB4444] rounded-xs hover:bg-[#df3333] cursor-pointer items-center text-[#FAFAFA] font-popinns font-medium text-[16px]">
            <Link to="/viewallproducts">View All</Link>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-16 gap-[30px] justify-items-center">
        {Array.isArray(products) && products.length > 0 ? (
          products.slice(0, 4).map((items) => {
            const { _id, name, price, average, feedbackId, images } = items;
            return (
              <React.Fragment key={_id}>
                <div className="w-full  max-w-[270px] relative mt-10 rounded-[4px]">
                  <div className="absolute top-2 right-2 left-2 flex  justify-end">
                    <div className="flex flex-col gap-3">
                      <Typography
                        variant="span"
                        className="p-1 rounded-full bg-white"
                      >
                        <Heart className="w-5 h-5  cursor-pointer" />
                      </Typography>
                      <span className="p-1 rounded-full bg-white">
                        <Eye className="w-5 h-5 cursor-pointer" />
                      </span>
                    </div>
                  </div>
                  <div className="bg-[#F5F5F5]">
                    <div className="">
                      <img
                        src={`http://localhost:8000/${images}`}
                        alt="w-full object-contain"
                      />
                    </div>
                  </div>

                  <div className="font-popinns font-medium text-[16px] leading-6 py-4">
                    {name}
                  </div>
                  <Typography variant="div" className="flex gap-2 py-1">
                    <div className="font-popinns font-medium text-[16px] leading-6 text-red-700 ">
                      ${price}
                    </div>

                    <div className="font-popinns font-medium text-[16px] leading-6 opacity-50 line-through">
                      $30
                    </div>
                  </Typography>

                  <div className="flex gap-3 py-2">
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
    </div>
  );
};

export default BestSelling;
