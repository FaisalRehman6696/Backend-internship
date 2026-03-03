import React, { useEffect, useRef, useState } from "react";
import Card from "./common/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SaleSection from "./SaleSection";
import { Link } from "react-router-dom";
import { fetchProducts } from "../services/productServices";
const Product = () => {
  const slideRef = useRef(null);
  const settings = {
    dots: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    autoplaySpeed: 1000,

    responsive: [
      {
        breakpoint: 480, // mobile portrait
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768, // For tablets and larger
        settings: {
          slidesToShow: 2,
          gap: 10,
        },
      },
      {
        breakpoint: 1024, // For desktops and larger
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  const [products, setProducts] = useState([]);

  const productList = async () => {
    try {
      const res = await fetchProducts();
      console.log(res.data);
      setProducts(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    productList();
  }, []);
  return (
    <div className=" max-w-[1170px] mx-auto px-4 overflow-hidden">
      <SaleSection slideRef={slideRef} />
      <div className="mt-12 gap-10">
        {Array.isArray(products) && products.length > 0 ? (
          <Slider ref={slideRef} {...settings}>
            {products.map((items) => (
              <Card key={items._id} items={items} />
            ))}
          </Slider>
        ) : (
          <p>no data found</p>
        )}
      </div>
      <div className="flex flex-1 justify-center mt-36 w-full">
        <button className="w-60 h-14 bg-[#DB4444] rounded-xs hover:bg-[#df3333] cursor-pointer items-center text-[#FAFAFA] font-popinns font-medium text-[16px]">
          <Link to="/viewallproducts">View All Products</Link>
        </button>
      </div>
      <div className="border-b border-black/30 mt-20"></div>
    </div>
  );
};
export default Product;
