import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link, NavLink } from "react-router-dom";
import { getUser } from "../services/userServices";
import Profile from "./common/Profile";

const Myaccount = () => {
  const path = window.location.pathname.split("/").filter(Boolean);
  const [user, setUser] = useState({});

  const handleUser = async () => {
    try {
      const res = await getUser();
      console.log(res.data);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleUser();
  }, []);
  const data = user?.name?.split(" ");
  return (
    <div>
      <Navbar />
      <div className="flex w-full max-w-6xl mx-auto mt-20 px-4 justify-between">
        <ol className=" flex space-x-1 md:space-x-3 font-popinns font-normal text-xs md:text-sm">
          <Link to="/" className="opacity-50">
            Home
          </Link>
          <li className="opacity-50">/</li>
          <li className=" flex items-center cursor-pointer">{path[0]}</li>
        </ol>

        <div className="flex justify-center items-center text-center font-popinns font-normal text-sm leading-5">
          Welcome! <span className="text-[#DB4444]">{user.name}</span>
        </div>
      </div>
      <div className="flex-col flex md:flex-row w-full mx-auto gap-28 max-w-[1170px] px-4">
        <Profile user={user} />
        {/*right side */}
        <div className="flex flex-wrap ">
          <div className="w-full md:w-[710px] md:py-24 ">
            <span className="text-[#DB4444] font-medium text-xl ">
              Your Profile
            </span>
            <div className="w-full max-w-4xl mx-auto space-y-6 md:space-y-8 mt-4">
              {/* First Name & Last Name Row */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-16">
                <div className="flex flex-col w-full gap-2">
                  <label className="font-popinns font-normal text-base leading-6 text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={data?.[0] || ""}
                    readOnly
                    className="bg-[#F5F5F5] outline-none h-[50px] rounded-[4px] px-4 w-full focus:ring-1 focus:ring-gray-300 transition-all"
                  />
                </div>

                <div className="flex flex-col w-full gap-2">
                  <label className="font-popinns font-normal text-base leading-6 text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={data?.[1] || ""}
                    readOnly
                    className="bg-[#F5F5F5] outline-none h-[50px] rounded-[4px] px-4 w-full focus:ring-1 focus:ring-gray-300 transition-all"
                  />
                </div>
              </div>

              {/* Email & Address Row */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-16">
                <div className="flex flex-col w-full gap-2">
                  <label className="font-popinns font-normal text-base leading-6 text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email || ""}
                    readOnly
                    className="bg-[#F5F5F5] outline-none h-[50px] rounded-[4px] px-4 w-full"
                  />
                </div>

                <div className="flex flex-col w-full gap-2">
                  {/* Uncomment and use if needed, or leave as a spacer for desktop alignment */}
                  <label className="font-popinns font-normal text-base leading-6 text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    className="bg-[#F5F5F5] outline-none h-[50px] rounded-[4px] px-4 w-full"
                  />
                </div>
              </div>
            </div>

            {/* <div className="flex mt-10 justify-end gap-8 w-full">
              <button className=" h-14 cursor-pointer   rounded-[4px]  font-popinns font-medium text-[16px] leading-6">
                Cancel
              </button>
              <button className="w-52 cursor-pointer bg-[#DB4444] text-white rounded-[4px]  font-popinns font-medium text-[16px] leading-6">
                Save Changes
              </button>
            </div>*/}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Myaccount;
