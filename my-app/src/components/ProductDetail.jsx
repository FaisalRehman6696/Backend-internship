import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const getProduct = async () => {
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
    console.log({ res });
    setProduct(res.data);
  };
  useEffect(() => {
    getProduct();
  }, []);
  let star = product.rating?.rate;
  console.log(star);


  return (
    <div>
      <Navbar />

      <div className="parent">
        <div className="detail-main">
          <div className="detail-img">
            <img src={product.image} alt="product" className="detail-image" />
          </div>
          <div className="detail-right">
            <h2 className="title">{product.title}</h2>
            <div className="detail-description">{product.description}</div>
            <h3 className="description">Price: ${product.price}</h3>
            <span>
              {[...Array(5)].map((_, index) => {
                const value = index + 1;
                return (
                  <span key={index}>
                    {value <= Math.floor(star) ? (
                      <FaStar color="gold" />
                    ) : value - star < 1 ? (
                      <FaStarHalfAlt color="gold" />
                    ) : (
                      <FaRegStar color="gold" />
                    )}
                  </span>
                );
              })}
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
