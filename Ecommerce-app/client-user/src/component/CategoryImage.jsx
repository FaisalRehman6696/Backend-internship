import React from "react";
import Typography from "./common/Typography";

const CategoryImage = () => {
  return (
    <div className=" w-full max-w-[1170px]  mx-auto px-4  mt-30 ">
      <div className="bg-black items-cente h-full  lg:h-[500px] w-full flex flex-col-reverse md:flex-row ">
        <div className="w-full md:w-1/2 p-6 md:p-14 space-y-8">
          <div className=" text-[#00FF66] font-popinns font-semibold text-[16px] leading-5">
            Categories
          </div>
          <div className="flex flex-col font-inter font-semibold text-xl md:text-5xl text-[#FAFAFA] gap-2">
            <Typography variant="h5">Enhance Your</Typography>
            <Typography variant="h5">Music Experience</Typography>
          </div>

          <div className="text-black">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {[
                { label: "Days", value: "03" },
                { label: "Hours", value: "23" },
                { label: "Minutes", value: "19" },
                { label: "Seconds", value: "56" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center bg-[#FAFAFA] rounded-full justify-center w-14 h-14 sm:w-16 sm:h-16"
                >
                  <span className="font-inter font-bold text-[14px] sm:text-[16px] leading-4">
                    {item.value}
                  </span>
                  <span className="font-popinns font-medium text-xs">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="cursor-pointer flex rounded-[4px] font-popinns font-medium text-[16px] leading-6 items-center justify-center w-44 h-14 text-[#FAFAFA] bg-[#00FF66]">
            Buy Now
          </div>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img
            src="/categoryimg.png"
            alt=""
            className="transform scale-x-[-1] object-contain sm:w-[500px] md:w-[600px] drop-shadow-[0_0_90px_rgba(255,235,235,0.6)]"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryImage;
