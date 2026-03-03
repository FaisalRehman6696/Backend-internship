import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProductByCategory } from "../services/productServices";
import { Eye, Heart } from "lucide-react";
import { FaRegStar, FaStar } from "react-icons/fa";

const ProductByCategory = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [product, setProduct] = useState([]);
  const handleProduct = async () => {
    try {
      const res = await fetchProductByCategory(_id);
      setProduct(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleProduct();
  }, [_id]);

  return (
    <div>
      <Navbar />
      <div className="w-full max-w-[1170px] mx-auto px-4 mt-20">
        <span className="p-2 rounded-r-lg bg-[#DB4444]"></span>
        <span className="text-[#DB4444] ml-3 font-semibold font-popinns text-[16px] leading-5">
          Just For you
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-16 gap-[30px] justify-items-center">
          {Array.isArray(product) && product.length > 0
            ? product.map((item) => {
                const { _id, name, imageUrl, price, average, feedbackId } =
                  item;
                return (
                  <React.Fragment key={_id}>
                    <div className="w-full  max-w-[270px] relative mt-10 rounded-[4px]">
                      <div className="absolute top-2 right-2 left-2 flex  justify-end">
                        <div className="flex flex-col gap-3">
                          <span className="p-1 rounded-full bg-white">
                            <Heart className="w-5 h-5  cursor-pointer" />
                          </span>
                          <span className="p-1 rounded-full bg-white">
                            <Eye className="w-5 h-5 cursor-pointer" />
                          </span>
                        </div>
                      </div>
                      <div className="bg-[#F5F5F5]">
                        <div className="">
                          <Link to={`/productdetail/${_id}`}>
                            <img
                              src={`http://localhost:8000/${imageUrl}`}
                              alt="w-full object-contain"
                            />
                          </Link>
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
                  </React.Fragment>
                );
              })
            : null}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductByCategory;
