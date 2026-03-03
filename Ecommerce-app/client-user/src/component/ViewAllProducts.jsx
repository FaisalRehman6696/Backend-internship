import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import Typography from "./common/Typography";
import { Eye, Heart } from "lucide-react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { fetchProducts } from "../services/productServices";
import { handleToken } from "../utils/verifyRequest";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ViewAllProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const getProducts = async () => {
    try {
      const res = await fetchProducts();
      console.log(res.data);
      setProducts(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  const checkToken = (_id) => {
    try {
      const decode = handleToken();
      navigate(`/productdetail/${_id}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-full max-w-[1170px] mx-auto px-4 mt-20">
        <Typography
          variant="span"
          className="p-2 rounded-r-lg bg-[#DB4444]"
        ></Typography>
        <Typography
          variant="span"
          className="text-[#DB4444] ml-3 font-semibold font-popinns text-[16px] leading-5"
        >
          Just For you
        </Typography>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-16 gap-[30px] justify-items-center">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((items) => {
              const { _id, name, price, average, feedbackId, imageUrl } = items;
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
                        <Typography
                          variant="span"
                          className="p-1 rounded-full bg-white"
                        >
                          <Eye className="w-5 h-5 cursor-pointer" />
                        </Typography>
                      </div>
                    </div>
                    <div className="bg-[#F5F5F5]">
                      <div className="cursor-pointer" onClick={()=>checkToken(_id)}>
                        <img
                          src={`http://localhost:8000/${imageUrl}`}
                          alt="w-full object-contain "
                        />
                      </div>
                    </div>

                    <div className="font-popinns font-medium text-[16px] leading-6 py-4">
                      {name}
                    </div>
                    <div className="flex gap-2 py-1">
                      <div className="font-popinns font-medium text-[16px] leading-6 text-red-700 ">
                        $300
                      </div>

                      <div className="font-popinns font-medium text-[16px] leading-6 opacity-50 line-through">
                        ${price}
                      </div>
                    </div>

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
      <Footer />
    </div>
  );
};

export default ViewAllProducts;
