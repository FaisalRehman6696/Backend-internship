import React from "react";
import Typography from "./common/Typography";
import { BookCheck, Headset, TruckElectric } from "lucide-react";

const NewArrival = () => {
  return (
    <div className=" w-full max-w-[1170px] mx-auto px-4 mt-20 ">
      <span className="p-2 rounded-r-lg bg-[#DB4444]"></span>
      <span className="text-[#DB4444] ml-3 font-semibold font-popinns text-[16px] leading-5">
        Featured
      </span>

      <div className="flex gap-16 items-center mt-12  justify-between w-full">
        {/* Title */}
        <Typography
          variant="h5"
          className="font-inter font-semibold text-[36px] leading-12"
        >
          New Arrival
        </Typography>

        {/* Timer */}
      </div>

      <div className=" flex flex-col md:flex-row  gap-6 my-32 w-full">
        <div className="w-full md:w-1/2 h-[400px] sm:h-[600px] bg-black flex  items-end relative overflow-hidden">
          <img
            src="/new1.png"
            alt=""
            className="w-full h-full object-contain"
          />
          <div className="absolute text-[#FAFAFA] left-8 bottom-12 space-y-2 cursor-pointer">
            <div className="font-inter font-semibold text-2xl">
              Play Station 5
            </div>
            <div className="font-popinns text-[14px] leading-5 w-60">
              Black and White version of the PS5 coming out on sale.
            </div>
            <div className="text-[#FFFFFF] border-b w-[74px] border-b-[#FFFFFF]">
              Shop Now
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col mt-6 md:mt-0 ">
          <div className="bg-black mb-8 relative h-[284px] overflow-hidden">
            <img
              src="/new4.jpg"
              alt=""
              className="w-full h-full object-cover  transform scale-x-[-1]"
            />
            <div className="absolute  text-[#FAFAFA] left-8 bottom-12 space-y-2 cursor-pointer">
              <div className="font-inter font-semibold text-2xl">
                Women’s Collections
              </div>
              <div className="font-popinns text-[14px] leading-5 w-60">
                Featured woman collections that give you another vibe.
              </div>
              <div className="text-[#FFFFFF] border-b w-[74px] border-b-[#FFFFFF]">
                Shop Now
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 overflow-hidden">
            <Typography variant="span" className=" bg-black relative">
              <img
                src="/new3.png"
                alt=""
                className="flex object-center object-cover justify-center"
              />
              <div className="absolute text-[#FAFAFA] left-6 bottom-8 space-y-2 overflow-hidden">
                <div className="font-inter font-semibold text-2xl">
                  Speakers
                </div>
                <div className="font-popinns text-[14px] leading-5 ">
                  Amazon wireless speakers
                </div>
                <div className="text-[#FFFFFF] border-b w-[74px] border-b-[#FFFFFF] cursor-pointer">
                  Shop Now
                </div>
              </div>
            </Typography>
            <Typography variant="span" className="bg-black relative">
              <img src="/new2.png" alt="" className=" " />
              <div className="absolute text-[#FAFAFA] left-6 bottom-8 space-y-2 ">
                <div className="font-inter font-semibold text-2xl">Perfume</div>
                <div className="font-popinns text-[14px] leading-5 w-60">
                  GUCCI INTENSE OUD EDP
                </div>
                <div className="text-[#FFFFFF] border-b w-[74px] border-b-[#FFFFFF] cursor-pointer">
                  Shop Now
                </div>
              </div>
            </Typography>
          </div>
        </div>
      </div>

      <div className="flex-wrap flex md:flex-row justify-center w-full items-center gap-20">
        <div className="flex flex-col justify-center items-center w-[250px] h-40 space-y-3">
          <div className="bg-[#2F2E30]/30 rounded-full w-20 h-20 flex justify-center items-center ">
            <div className="text-[#FAFAFA] bg-[#2F2E30] rounded-full w-14 h-14  flex justify-center items-center">
              <TruckElectric className="w-[31px] h-20" />
            </div>
          </div>
          <div className="font-popinns font-semibold text-[20px] leading-6 w-full mt-3">
            FREE AND FAST DELIVERY
          </div>
          <div className="font-popinns  text-[14px] leading-5">
            Free delivery for all orders over $140
          </div>
        </div>
        <div className="flex flex-col w-[250px] h-40 space-y-3 justify-center items-center">
          <div className="bg-[#2F2E30]/30 rounded-full w-20 h-20 flex justify-center items-center">
            <div className="text-[#FAFAFA] bg-[#2F2E30] rounded-full w-14 h-14  flex justify-center items-center">
              <Headset className="w-[31px] h-20" />
            </div>
          </div>
          <div className="font-popinns font-semibold text-[20px] leading-6 w-full mt-3">
            24/7 CUSTOMER SERVICE
          </div>
          <div className="font-popinns  text-[14px] leading-5">
            Friendly 24/7 customer support
          </div>
        </div>

        <div className="flex flex-col w-[260px] h-40 space-y-3 justify-center items-center">
          <div className="bg-[#2F2E30]/30 rounded-full w-20 h-20 flex justify-center items-center">
            <div className="text-[#FAFAFA] bg-[#2F2E30] rounded-full w-14 h-14  flex justify-center items-center">
              <BookCheck className="w-[31px] h-20" />
            </div>
          </div>
          <div className="font-popinns font-semibold text-[20px] leading-6 w-full mt-3 ">
            MONEY BACK GUARANTEE
          </div>
          <div className="font-popinns  text-[14px] leading-5">
            We return money within 30 day
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
