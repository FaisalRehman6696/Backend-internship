import { ChevronDown, ChevronRight } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousal from "./common/Carousal";
import "../App.css";
import getCategory from "../services/categoryServices";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Carousalsection = () => {
  const settings = {
    dots: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 1000,
  };
  const [category, setCategory] = useState([]);
  const [isopen, setIsOpen] = useState(false);

  const handleSubmit = useCallback(async () => {
    try {
      const res = await getCategory();
      console.log(res.data);
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [category]);
  useEffect(() => {
    handleSubmit();
  }, []);
  return (
    <div className="lg:flex  w-full max-w-[1170px] px-4 mx-auto  h-full  justify-between overflow-hidden">
      <div className="w-full shrink-0 lg:w-[217px] ">
        <div className="lg:border-r-1 border-black/30 h-96 ">
          <ul className="py-10 space-y-4  ">
            {Array.isArray(category) && category.length > 0
              ? category.map((item, index) => {
                  const { _id, name } = item;
                  return (
                    <React.Fragment key={_id}>
                      {" "}
                      {index < 2 ? (
                        <li
                          onClick={() => setIsOpen(!isopen)}
                          className="flex cursor-pointer font-popinns font-normal text-[16px] leading-6 justify-between items-center px-1"
                        >
                          <Link to={`/productbycategory/${_id}`}>
                            <span>{name}</span>
                          </Link>
                          {isopen ? (
                            <ChevronDown className="w-4 h-5" />
                          ) : (
                            <ChevronRight className="w-4 h-5" />
                          )}
                        </li>
                      ) : (
                        <li className=" font-popinns font-normal text-[16px] leading-6 px-1 cursor-pointer">
                          <Link to={`/productbycategory/${_id}`}>{name}</Link>
                        </li>
                      )}
                    </React.Fragment>
                  );
                })
              : null}
          </ul>
        </div>
      </div>
      <div className="mt-10 flex-wrap  lg:w-[892px] h-auto">
        <Slider {...settings} className="relative">
          <div>
            <Carousal />
          </div>
          <div>
            <Carousal />
          </div>
          <div>
            <Carousal />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Carousalsection;
