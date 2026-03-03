import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  AddToCard,
  DecreasQuantity,
  IncreasQuantity,
} from "../redux/counter/CardSlice";

const ShopingCard = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.items.card);

  useEffect(() => {
    dispatch(AddToCard());
  }, []);

  return (
    <div>
      <Navbar />

      <table className="table">
        <thead>
          <tr className="table-head">
            <th className="image">Image</th>
            <th className="title">Title</th>
            <th className="price">Price</th>
            <th className="items">Items</th>
            <th className="total">Total</th>
          </tr>
        </thead>

        {Array.isArray(data) && data.length > 0
          ? data.map((rs) => {
              const { id, title, image, price, quantity } = rs;
              console.log(rs);

              return (
                <React.Fragment key={id}>
                  <tbody className="tbody">
                    <tr className="table-data">
                      <td className="table-img">
                        <img className="table-img1" src={image} alt="" />
                      </td>
                      <td>{title.slice(0, 12)}</td>
                      <td>${price}</td>
                      <td>
                        <button onClick={() => dispatch(DecreasQuantity(id))}>
                          -
                        </button>
                        <span>{quantity}</span>
                        <button onClick={() => dispatch(IncreasQuantity(id))}>
                          +
                        </button>
                      </td>
                      <td>${price * quantity}</td>
                    </tr>
                  </tbody>
                </React.Fragment>
              );
            })
          : null}
      </table>

      <Footer />
    </div>
  );
};

export default ShopingCard;
