import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link, NavLink } from "react-router-dom";
import Profile from "./common/Profile";
import { Mail, Phone } from "lucide-react";

const ContactUs = () => {
  const path = window.location.pathname.split("/").filter(Boolean);
  return (
    <div>
      <Navbar />
      <div className=" w-full max-w-6xl mx-auto mt-20 px-4">
        <ol className=" flex space-x-1 md:space-x-3 font-popinns font-normal text-xs md:text-sm">
          <Link to="/" className="opacity-50">
            Home
          </Link>
          <li className="opacity-50">/</li>
          <li className="opacity-50 flex items-center cursor-pointer">
            {" "}
            {path[0]}
          </li>
          <li className="opacity-50">/ </li>
          <li className=""> {name}</li>
        </ol>
      </div>

     <div className="flex flex-col md:flex-row w-full mx-auto max-w-[1170px] px-4 mt-20 gap-10">

  {/* LEFT SIDE */}
  <div className="flex flex-col gap-6 w-full md:w-1/3">
    
    <div className="space-y-4">
      <span className="flex gap-4 items-center">
        <span className="flex w-10 h-10 rounded-full bg-[#DB4444] text-white items-center justify-center">
          <Phone className="w-5 h-5" />
        </span>

        <span className="font-popinns font-medium text-[16px] leading-6">
          Call To Us
        </span>
      </span>

      <p className="font-popinns text-sm">We are available 24/7, 7 days a week.</p>
      <p className="font-popinns text-sm">Phone: +8801611112222</p>
    </div>

    <div className="border-b border-black/30"></div>

    <div className="space-y-4">
      <span className="flex gap-4 items-center">
        <span className="flex w-10 h-10 rounded-full bg-[#DB4444] text-white items-center justify-center">
          <Mail className="w-5 h-5" />
        </span>

        <span className="font-popinns font-medium text-[16px] leading-6">
          Write To Us
        </span>
      </span>

      <p className="font-popinns text-sm">
        Fill out our form and we will contact you within 24 hours.
      </p>
      <p className="font-popinns text-sm">Email: customer@exclusive.com</p>
      <p className="font-popinns text-sm">Email: support@exclusive.com</p>
    </div>
  </div>

  {/* RIGHT SIDE */}
  <div className="w-full md:w-2/3">
    
    {/* INPUTS GRID */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <input
        type="text"
        placeholder="Your Name"
        className="bg-[#F5F5F5] outline-none h-[50px] rounded-[4px] px-4 w-full"
      />
      <input
        type="text"
        placeholder="Your Email"
        className="bg-[#F5F5F5] outline-none h-[50px] rounded-[4px] px-4 w-full"
      />
      <input
        type="text"
        placeholder="Your Phone"
        className="bg-[#F5F5F5] outline-none h-[50px] rounded-[4px] px-4 w-full md:col-span-2"
      />
    </div>

    {/* TEXTAREA */}
    <div className="w-full mt-8">
      <textarea
        placeholder="Message"
        className="outline-none bg-[#F5F5F5] p-4 rounded-[4px] w-full h-[207px]"
      ></textarea>
    </div>

    {/* BUTTON */}
    <div className="flex mt-10 justify-end">
      <button className="w-52 h-14 bg-[#DB4444] text-white rounded-[4px] font-popinns font-medium text-[16px]">
        Save Changes
      </button>
    </div>

  </div>
</div>


      <Footer />
    </div>
  );
};

export default ContactUs;
