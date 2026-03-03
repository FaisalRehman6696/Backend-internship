import React, { useRef, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { handleCode } from "../services/userServices";
import { toast } from "react-toastify";

const CodeVerify = () => {
  const navigate = useNavigate();
  const inputs = useRef([]);
  // Move to next box automatically
  const handleChange = async (e, i) => {
    const inputValue = e.target.value.replace(/\D/, "");
    console.log(inputValue);
    const newValue = [...value];
    newValue[i] = inputValue;
    setValue(newValue);
    if (inputValue) {
      if (i < 3) {
        inputs.current[i + 1].focus();
      }
    }
  };
  const [value, setValue] = useState([""]);
  console.log(value);

  const handleSubmit = async () => {
    try {
      const code = value.join("");
      console.log(code);
      const email = sessionStorage.getItem("email");
      const res = await handleCode(email, code);
      console.log(res.data);

      if (res.success) {
        navigate("/updatepassword");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // Move back on Backspace
  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && !e.target.value && i > 0) {
      inputs.current[i - 1].focus();
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex  items-center w-full mt-20">
        <div className="flex flex-col md:flex-row  md:w-[1305px] gap-10 md:gap-50 md:h-[781px]">
          {/* Left Side - Full Image */}
          <div className="flex w-full h-full bg-[#CBE4E8]">
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
                Verify Your Email
              </h2>
              <p className="font-popinns font-normal text-[16px] leading-6">
                Enter Code below
              </p>
              <div className="flex flex-col font-popinns font-normal space-y-1 text-[16px] leading-6 mt-6 ">
             
                <div className="flex gap-3 justify-center">
                  {[0, 1, 2, 3].map((i) => (
                    <input
                      key={i}
                      maxLength="1"
                      ref={(cod) => (inputs.current[i] = cod)}
                      onChange={(e) => handleChange(e, i)}
                      onKeyDown={(e) => handleKeyDown(e, i)}
                      className="
            w-14 h-14 text-center text-2xl font-semibold 
            border border-gray-300 rounded-xl 
            focus:outline-none focus:ring-2 focus:ring-blue-500
            bg-white shadow-sm
          "
                    />
                  ))}
                </div>
              </div>{" "}
              <div className="flex justify-between items-center mt-10">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-36 h-14 cursor-pointer bg-[#DB4444] text-white rounded-[4px]  font-popinns font-medium text-[16px] leading-6"
                >
                  Verify
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

export default CodeVerify;
