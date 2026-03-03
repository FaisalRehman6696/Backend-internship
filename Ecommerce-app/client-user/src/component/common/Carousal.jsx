import Typography from "./Typography";
import { ArrowRight } from "lucide-react";

const Carousal = () => {
  return (
    <div className="bg-black flex flex-col-reverse md:flex-row  h-auto md:h-[344px] w-full sm:px-10 md:px-16 py-8 md:py-0">
      {/* Left Side (Text Section) */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-10 sm:px-0 space-y-4 md:space-y-6">
        <div className="flex items-center font-inter font-semibold text-[#FAFAFA] gap-3">
          <img
            src="/apple-logo.png"
            alt="apple"
            className="w-8 h-8 md:w-10 md:h-10 invert "
          />
          <Typography variant="span" className="text-sm md:text-base">
            iPhone 14 Series
          </Typography>
        </div>

        <div className="flex flex-col font-inter font-semibold text-2xl sm:text-3xl md:text-5xl text-[#FAFAFA] gap-1 md:gap-2">
          <Typography variant="h5">Up to 10%</Typography>
          <Typography variant="h5">Off Voucher</Typography>
        </div>

        <div className="flex items-center">
          <Typography
            variant="h5"
            className="py-1 cursor-pointer border-b border-[#FAFAFA] font-popinns font-medium text-[14px] md:text-[16px] text-[#FAFAFA]"
          >
            Shop Now
          </Typography>
          <ArrowRight className="text-[#FAFAFA] ml-1 w-4 h-4 md:w-5 md:h-5" />
        </div>
      </div>

      {/* Right Side (Image Section) */}
      <div className="w-full md:w-1/2 flex justify-center items-center ">
        <img
          src="/carousal.jpg"
          alt="iPhone 14"
          className="w-[80%] md:w-[496px] h-auto mt-6 md:mt-0 object-contain "
        />
      </div>
    </div>
  );
};

export default Carousal;
