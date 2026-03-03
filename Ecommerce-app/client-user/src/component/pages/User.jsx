import React from "react";
import Navbar from "../Navbar";
import Carousalsection from "../Carousalsection";
import Product from "../Product";
import Category from "../Category";
import BestSelling from "../BestSelling";
import OurProducts from "../OurProducts";
import NewArrival from "../NewArrival";
import CategoryImage from "../CategoryImage";
import Footer from "../Footer";

const User = () => {
  return (
    <div>
      <Navbar />
      <Carousalsection />
      <Product />
      <Category />
      <BestSelling />
      <CategoryImage />
      <OurProducts />
      <NewArrival />
      <Footer />

      {/*
       
        
    
    
        
     
     
      
      
      */}
    </div>
  );
};

export default User;
