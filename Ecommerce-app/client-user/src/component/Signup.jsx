import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { hanldeGoogleLogin } from "../firebase";
import { handleSignUp } from "../services/userServices.js";
import { toast } from "react-toastify";
const Signup = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = async () => {
    try {
      const res = await handleSignUp(input);
      if (res.success) {
        toast.success(res.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
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
                Create an account
              </h2>
              <p className="font-popinns font-normal text-[16px] leading-6">
                Enter your details below
              </p>

              <div className="flex flex-col font-popinns font-normal space-y-1 text-[16px] leading-6 mt-6 ">
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  className="outline-none opacity-40  mt-8"
                  placeholder="Name"
                  required
                />
                <span className="border w-full opacity-50"></span>
                <input
                  name="email"
                  onChange={handleChange}
                  type="text"
                  className="outline-none opacity-40  mt-8"
                  placeholder="Email"
                  required
                />
                <span className="border w-full opacity-50"></span>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="outline-none opacity-40  mt-8"
                  placeholder="Password"
                  required
                />
                <span className="border w-full opacity-50"></span>
              </div>
              <button
                onClick={() => handleSubmit()}
                type="submit"
                className="w-full h-14 cursor-pointer bg-[#DB4444] text-white rounded-[4px] mt-10 font-popinns font-medium text-[16px] leading-6"
              >
                Create Account
              </button>
              <button
                onClick={() => hanldeGoogleLogin()}
                className="w-full h-14 border cursor-pointer border-black/40 flex items-center justify-center gap-3 rounded-[4px] mt-4 font-popinns font-medium text-[16px]"
              >
                <img src="/google.png" alt="google" className="w-6 h-6" />
                <span>Sign up with Google</span>
              </button>
              <p className="flex items-center justify-center opacity-70 gap-2 mt-6 font-popinns font-normal text-[16px] leading-6">
                Already have an account?
                <Link to="/login" className="border-b font-medium">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
