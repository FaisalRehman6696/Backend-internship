import React, { useEffect, useState } from "react";
import OpenModal from "./OpenModal";
import Card from "./common/Card";

import Typography from "./common/Typography";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../redux/counter/CounterSlice";

const Product = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const openModal = (item) => {
    console.log({ item });
    setIsOpen(true);
    setSelectedProduct(item);
  };
  const closeModal = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  const dispatch = useDispatch();
  const data = useSelector((state) => state.products);
  console.log(data);
  const [product, setProduct] = useState();
  // const getProduct = async () => {
  //   const res = await axios.get("https://fakestoreapi.com/products");
  //   console.log(res.data);
  //   setproduct(res.data);
  // };
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  useEffect(() => {
    setProduct(data.items);
  }, [data.items]);
  return (
    <section className="sec">
      <Typography variant="h1" className="feature">
        Products
      </Typography>
      <div className="card">
        {Array.isArray(product) && product.length > 0 ? (
          product.map((item) => {
            return <Card key={item.id} item={item} openModal={openModal} />;
          })
        ) : (
          <p>data not found</p>
        )}
      </div>
      <OpenModal
        isOpen={isOpen}
        selectedProduct={selectedProduct}
        closeModal={closeModal}
      />
    </section>
  );
};

export default Product;
