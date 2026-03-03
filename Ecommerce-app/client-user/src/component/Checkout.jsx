import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Typography from "./common/Typography";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { getAddress, saveOrder } from "../services/orderServices";
import { toast } from "react-toastify";
import { clearCard } from "../counter/cardSlice";
import { persistor } from "../app/store";
const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selector = useSelector((state) => state.card?.product);

  const total = selector.reduce(
    (accu, item) => accu + item.price * item.quantity,
    0
  );
  const [selectpayment, setSelectPayment] = useState("");
  const path = window.location.pathname.split("/").filter(Boolean);
  const [form, setForm] = useState({
    name: "",
    streetAddress: "",
    apartment: "",
    city: "",
    phone: "",
    email: "",
  });
  console.log(form);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      const data = {
        form,
        items: selector,
        total,
        paymentMethod: selectpayment,
      };
      const res = await saveOrder(data);

      console.log(res.data);

      if (selectpayment === "cash") {
        navigate("/")
        toast.success("Order Placed sucessfuly");

        dispatch(clearCard());
        await persistor.flush();
        return;
      }
      if (selectpayment === "bank") {
        navigate("/paymentform", {
          state: {
            clientSecret: res.data.clientSecret,
          },
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  const handleAddress = async () => {
    try {
      const res = await getAddress();
      setForm(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleAddress();
  }, []);
  return (
    <div className="className">
      <Navbar />
      <div className=" w-full max-w-[1170px] mx-auto mt-20 px-4">
        <ol className=" flex space-x-1 md:space-x-3 font-popinns font-normal text-xs md:text-sm">
          <Link to="/" className="opacity-50">
            Home
          </Link>
          <li className="opacity-50">/</li>
          <li className=" flex items-center"> {path[0]}</li>
        </ol>
        <Typography
          variant="h5"
          className="font-inter font-medium text-4xl leading-7 mt-16"
        >
          Billing Detail
        </Typography>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md:gap-6  w-full  mx-auto max-w-[1170px] px-4  ">
        <div className="md:w-[470px] md:h-[766px] mb-40">
          <div className="flex flex-col h-[82px] gap-2 mt-10">
            <label className="font-popinns font-normal text-[16px] opacity-40 leading-6">
              First Name <span className="text-[#DB4444]">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form?.name}
              onChange={handleChange}
              className="bg-[#F5F5F5] outline-none h-[50px] rounded-[4px] px-4"
            />
          </div>
          <div className="flex flex-col h-[82px] gap-2 mt-10">
            <label className="font-popinns font-normal text-[16px] opacity-40 leading-6">
              Street Adress <span className="text-[#DB4444]">*</span>
            </label>
            <input
              type="text"
              name="streetAddress"
              value={form?.streetAddress}
              onChange={handleChange}
              className="bg-[#F5F5F5] outline-none h-[50px] rounded-[4px] px-4"
            />
          </div>
          <div className="flex flex-col h-[82px] gap-2 mt-10">
            <label className="font-popinns font-normal text-[16px] opacity-40 leading-6">
              Apartment, floor, etc. (optional)
            </label>
            <input
              type="text"
              name="apartment"
              value={form?.apartment}
              onChange={handleChange}
              className="bg-[#F5F5F5] outline-none h-[50px] rounded-[4px] px-4"
            />
          </div>
          <div className="flex flex-col h-[82px] gap-2 mt-10">
            <label className="font-popinns font-normal text-[16px] opacity-40 leading-6">
              Town/City <span className="text-[#DB4444]">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={form?.city}
              onChange={handleChange}
              className="bg-[#F5F5F5] outline-none h-[50px] rounded-[4px] px-4"
            />
          </div>
          <div className="flex flex-col h-[82px] gap-2 mt-10">
            <label className="font-popinns font-normal text-[16px] opacity-40 leading-6">
              Phone Number <span className="text-[#DB4444]">*</span>
            </label>
            <input
              type="text"
              name="phone"
              value={form?.phone}
              onChange={handleChange}
              className="bg-[#F5F5F5] outline-none h-[50px] rounded-[4px] px-4"
            />
          </div>
          <div className="flex flex-col h-[82px] gap-2 mt-10">
            <label className="font-popinns font-normal text-[16px] opacity-40 leading-6">
              Email Address <span className="text-[#ce4141]">*</span>
            </label>
            <input
              type="text"
              name="email"
              value={form?.email}
              onChange={handleChange}
              className="bg-[#F5F5F5] outline-none h-[50px] rounded-[4px] px-4"
            />
          </div>
          <div className="flex gap-2 mt-6">
            <input
              type="checkbox"
              className="w-6 h-6 bg-[#DB4444] text-[#F5F5F5] accent-[#DB4444] px-4"
            />
            <label className="font-popinns font-normal text-[16px]  leading-6">
              Save this information for faster check-out next time
            </label>
          </div>
        </div>

        <div className="flex justify-between w-full md:w-[527px] h-full md:h-[600px] mt-16">
          <div className="w-full md:w-[422px] space-y-8">
            {Array.isArray(selector) && selector.length > 0
              ? selector.map((rs) => {
                  const { id, name, imageUrl, price, quantity } = rs;

                  return (
                    <React.Fragment key={id}>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                          <img
                            src={`http://localhost:8000/${imageUrl}`}
                            alt=""
                            className="w-[54px]"
                          />
                          <span>{name.slice(0, 5)}</span>
                        </div>
                        <div className="">${price * quantity}</div>
                      </div>
                    </React.Fragment>
                  );
                })
              : null}

            <div className="space-y-4 w-full">
              <div className="flex justify-between space-y-4 border-b border-black/50 ">
                <span className="font-popinns font-medium text-[16px] ">
                  Subtotal:
                </span>
                <span>${total}</span>
              </div>
              <div className="flex justify-between space-y-4  border-b border-black/50">
                <span className="font-popinns font-medium text-[16px] ">
                  Shipping :
                </span>
                <span className="font-popinns font-normal text-[16px] leading-6">
                  $Free
                </span>
              </div>
              <div className="flex justify-between space-y-4 ">
                <span className="font-popinns font-medium text-[16px] ">
                  Total:
                </span>
                <span>${total}</span>
              </div>
            </div>
            <div className=" space-y-4">
              <div className="flex justify-between">
                <span className="flex gap-4">
                  <span
                    onClick={() => setSelectPayment("bank")}
                    value={form?.selectpayment}
                    onChange={handleChange}
                    className="flex border w-6 h-6 justify-center items-center  rounded-full cursor-pointer "
                  >
                    <span
                      className={`flex w-4 h-4 rounded-full gap-5 ${
                        selectpayment === "bank" ? " w-4 h-4 bg-black" : ""
                      }`}
                    ></span>
                  </span>
                  <span className="font-popinns font-normal text-[16px] leading-6">
                    Bank
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <img
                    src="/paymentImg4.png"
                    alt=""
                    className="w-[37px] h-[16px]"
                  />
                  <img
                    src="/paymentImg3.png"
                    alt=""
                    className="w-[37.8px] h-[11px]"
                  />
                  <img
                    src="/paymentImg2.png"
                    alt=""
                    className="w-[39px] h-[25px]"
                  />
                  <img
                    src="/paymentImg1.png"
                    alt=""
                    className="w-[39px] h-[18px]"
                  />
                </span>
              </div>
              <div>
                {" "}
                <span className="flex gap-4">
                  <span
                    onClick={() => setSelectPayment("cash")}
                    value={form?.selectpayment}
                    onChange={handleChange}
                    className="flex border w-6 h-6 justify-center items-center  rounded-full cursor-pointer "
                  >
                    <span
                      className={`flex w-4 h-4 rounded-full gap-5 ${
                        selectpayment === "cash" ? " w-4 h-4 bg-black" : ""
                      }`}
                    ></span>
                  </span>
                  <span className="font-popinns font-normal text-[16px] leading-6">
                    Cash On Delievery
                  </span>
                </span>
                <div className="space-y-4 mt-4">
                  <div className="flex gap-4 justify-between  ">
                    <input
                      className="flex px-4 outline-none justify-center items-center rounded-[4px] md:w-[300px] h-14 font-popinns font-normal text-[16px] border max-[360px]:w-full"
                      placeholder="Coupon Code"
                    />
                    <button className="flex justify-center items-center cursor-pointer rounded-[4px] md:w-[211px] bg-[#DB4444] text-[#FAFAFA] h-14 font-popinns font-normal p-4  border ">
                      Apply Coupon
                    </button>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="flex w-full justify-center items-center cursor-pointer rounded-[4px] md:w-[190px] bg-[#DB4444] text-[#FAFAFA] h-14 font-popinns font-normal   border "
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
