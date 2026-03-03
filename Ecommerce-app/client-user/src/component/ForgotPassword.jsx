import React, { useState } from "react";
import { handleFrogotPass } from "../services/userServices";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const handleSubmit = async () => {
    try {
      const res = await handleFrogotPass(email);
      sessionStorage.setItem("email", email);
      if (res.success) {
        toast.success(res.message);

        navigate("/codeverify");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex  items-center w-full mt-20">
        <div className="flex flex-col md:flex-row  md:w-[1305px] gap-10 md:gap-50 md:h-[781px]">
          {/* Left Side - Full Image */}
          <div className="flex w-full h-full bg-[#CBE4E8] ">
            <img
              src="/signupimage.jpg"
              alt="signup"
              className="w-auto md:w-[805px]  md:h-[781px] object-cover  object-center"
            />
          </div>
          {/* Right Form Section */}
          <div className="flex justify-center items-center ">
            <div className="w-full px-4 md:w-[371px] space-y-5">
              <h2 className="font-inter font-medium text-4xl">
                Forgot Password to Exclusive
              </h2>
              <p className="font-popinns font-normal text-[16px] leading-6">
                Enter your details below
              </p>
              <div className="flex flex-col font-popinns font-normal space-y-1 text-[16px] leading-6 mt-6 ">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="outline-none opacity-40  mt-8"
                  placeholder="Email"
                />
                <span className="border w-full opacity-50"></span>
              </div>{" "}
              <div className="flex justify-between items-center mt-10">
                <button
                  onClick={() => handleSubmit()}
                  type="submit"
                  className="w-36 h-14 cursor-pointer bg-[#DB4444] text-white rounded-[4px]  font-popinns font-medium text-[16px] leading-6"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
