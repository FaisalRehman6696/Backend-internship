import React from "react";
import Typography from "./common/Typography";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Countdown from "react-countdown";

const SaleSection = ({ slideRef }) => {
  const targetDate = Date.now() + 3 * 24 * 60 * 60 * 1000;
  return (
    <>
      <div className=" mt-20 max-w-[1170]">
        <span className="p-2 rounded-r-lg bg-[#DB4444]"></span>
        <span className="text-[#DB4444] ml-3 font-semibold font-popinns text-[16px] leading-5">
          Today's
        </span>

        <div className="flex flex-wrap md:flex-row items-center mt-12 gap-4  justify-between w-full">
          {/* Title */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-30 ">
            <Typography
              variant="h5"
              className="font-inter font-semibold text-[36px] leading-12"
            >
              Flash Sales
            </Typography>

            {/* Timer */}
            <Countdown
              date={targetDate}
              renderer={({ days, hours, minutes, seconds }) => (
                <div className="flex items-center gap-6 ">
                  {/* Days */}
                  <div className="flex flex-col items-center">
                    <span className="font-popinns font-medium text-xs">
                      Days
                    </span>
                    <span className="font-inter font-bold text-3xl">
                      {days}
                    </span>
                  </div>

                  <span className="text-[#E07575] text-2xl">:</span>

                  {/* Hours */}
                  <div className="flex flex-col items-center">
                    <span className="font-popinns font-medium text-xs">
                      Hours
                    </span>
                    <span className="font-inter font-bold text-3xl">
                      {hours}
                    </span>
                  </div>

                  <span className="text-[#E07575] text-2xl">:</span>

                  {/* Minutes */}
                  <div className="flex flex-col items-center">
                    <span className="font-popinns font-medium text-xs">
                      Minutes
                    </span>
                    <span className="font-inter font-bold text-3xl">
                      {minutes}
                    </span>
                  </div>

                  <span className="text-[#E07575] text-2xl">:</span>

                  {/* Seconds */}
                  <div className="flex flex-col items-center">
                    <span className="font-popinns font-medium text-xs">
                      Seconds
                    </span>
                    <span className="font-inter font-bold text-3xl">
                      {seconds}
                    </span>
                  </div>
                </div>
              )}
            />
          </div>

          <div className="flex item justify-between gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-[#F5F5F5] rounded-full cursor-pointer">
              <ArrowLeft
                className=" w-4 h-4 "
                onClick={() => slideRef.current.slickPrev()}
              />
            </div>
            <div className="flex items-center w-8 h-8 justify-center bg-[#F5F5F5] rounded-full cursor-pointer">
              <ArrowRight
                className=" w-4 h-4 "
                onClick={() => slideRef.current.slickNext()}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaleSection;
