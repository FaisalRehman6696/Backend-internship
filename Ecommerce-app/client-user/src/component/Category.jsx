import React from "react";
import Typography from "./common/Typography";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Gamepad,
  Headphones,
  Monitor,
  Smartphone,
  Watch,
} from "lucide-react";

const Categories = [
  { name: "Phone", Icon: <Smartphone /> },
  { name: "Computers", Icon: <Monitor /> },
  { name: "Smart Watch", Icon: <Watch /> },
  { name: " Camera", Icon: <Camera /> },
  { name: "Headphones", Icon: <Headphones /> },
  { name: "Gaming", Icon: <Gamepad /> },
];

const Category = () => {
  return (
    <div className=" w-full max-w-[1170px] mx-auto px-4  mt-20 h-full">
      <Typography
        variant="span"
        className="p-2 rounded-r-lg bg-[#DB4444]"
      ></Typography>
      <Typography
        variant="span"
        className="text-[#DB4444] ml-3 font-semibold font-popinns text-[16px] leading-5"
      >
        Categories
      </Typography>

      <div className="flex flex-wrap gap-4 md:gap-16 items-center mt-12  justify-between w-full">
        {/* Title */}
        <Typography
          variant="h5"
          className="font-inter font-semibold text-[20px]  md:text-[36px] leading-12"
        >
          Browse By Categories
        </Typography>

        {/* Timer */}

        <div className="flex  justify-between gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-[#F5F5F5] rounded-full cursor-pointer">
            <ArrowLeft className=" w-4 h-4 " />
          </div>
          <div className="flex items-center w-8 h-8 justify-center bg-[#F5F5F5] rounded-full cursor-pointer">
            <ArrowRight className=" w-4 h-4 " />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4  md:gap-[22px] py-24  justify-items-center w-full">
        {Array.isArray(Categories) && Categories.length > 0 ? (
          Categories.map((items) => {
            const { name, Icon } = items;
            return (
              <React.Fragment key={name}>
                <div className="flex flex-col justify-center items-center rounded-[4px] hover:bg-[#DB4444] hover:text-[#F5F5F5] group w-fu w-[170px] h-36 border border-black/30 gap-6 cursor-pointer">
                  <span className="w-7 h-7 hover:text-[#F5F5F5]">{Icon}</span>
                  <span className="font-popinns font-normal leading-6 text-[16px] ">
                    {name}
                  </span>
                </div>
              </React.Fragment>
            );
          })
        ) : (
          <p>no data found</p>
        )}
      </div>
      <div className="border-b-1 border-black/30"></div>
    </div>
  );
};

export default Category;
