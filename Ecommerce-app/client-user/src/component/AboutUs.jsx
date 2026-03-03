import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Typography from "./common/Typography";
import {
  BookCheck,
  BriefcaseBusiness,
  CircleDollarSign,
  Dessert,
  Headset,
  Instagram,
  Linkedin,
  Package,
  TruckElectric,
  Twitter,
} from "lucide-react";
const totalQuantity = [
  {
    name: "Seller Active Our site",
    Icon: <Package />,
    total: 3.3,
  },
  {
    name: "Monthly Product Sale",
    Icon: <CircleDollarSign />,
    total: 4.7,
  },
  {
    name: "Customer Active in Our Site",
    Icon: <Dessert />,
    total: 45.3,
  },
  {
    name: "Annual Gross Salel In Our Site ",
    Icon: <BriefcaseBusiness />,
    total: 25,
  },
];
const owner = [
  {
    image: "owner1.png",
    name: "Tom Cruise",
    post: "Founde & Chairman",
    twitter: <Twitter />,
    instagram: <Instagram />,
    linkidin: <Linkedin />,
  },
  {
    image: "owner2.png",
    name: "Emma Watson",
    post: "Managing Director",
    twitter: <Twitter />,
    instagram: <Instagram />,
    linkidin: <Linkedin />,
  },
  {
    image: "owner3.png",
    name: "Will Smith",
    post: "Product Designer",
    twitter: <Twitter />,
    instagram: <Instagram />,
    linkidin: <Linkedin />,
  },
];
const AboutUs = () => {
  const path = window.location.pathname.split("/").filter(Boolean);
  return (
    <div>
      <Navbar />
      <div className="w-full max-w-6xl mx-auto mt-20 px-4">
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
      <div className="w-full mt-10 md:mt-20 overflow-hidden">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-0">
          {/* Text Section: Centered/Padded on the left */}
          <div className="w-full md:w-1/2 px-4 sm:px-10 md:pl-20 lg:pl-48 space-y-6 md:space-y-8">
            <Typography
              variant="h5"
              className="font-inter font-semibold text-4xl md:text-[54px] leading-tight"
            >
              Our Story
            </Typography>

            <div className="space-y-4">
              <p className="font-popinns font-normal text-base text-[16px] leading-7 text-gray-800">
                Launched in 2015, Exclusive is South Asia’s premier online
                shopping marketplace with an active presence in Bangladesh.
                Supported by a wide range of tailored marketing, data, and
                service solutions, Exclusive has 10,500 sellers and 300 brands
                and serves 3 million customers across the region.
              </p>

              <p className="font-popinns font-normal text-base leading-7 text-gray-800">
                Exclusive has more than 1 Million products to offer, growing at
                a very fast pace. Exclusive offers a diverse assortment in
                categories ranging from consumer electronics to fashion.
              </p>
            </div>
          </div>

          {/* Image Section: Takes full width on mobile, and hits the right edge on desktop */}
          <div className="w-full md:w-1/2 h-[300px] md:h-[600px]">
            <img
              src="./about1.jpg"
              alt="About Exclusive"
              className="w-full h-full object-cover rounded-l-sm md:rounded-none"
            />
          </div>
        </div>
      </div>

      <div className=" w-full max-w-[1170px] mx-auto px-4  mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-[22px] md:py-24 mx-auto justify-items-center w-full">
          {Array.isArray(totalQuantity) && totalQuantity.length > 0 ? (
            totalQuantity.map((items) => {
              const { name, Icon, total } = items;
              return (
                <React.Fragment key={name}>
                  <div className="flex flex-col justify-center items-center rounded-[4px] hover:bg-[#DB4444] hover:text-[#F5F5F5] group w-[270px] h-[230px] border border-black/30 gap-6 cursor-pointer">
                    <span className="flex items-center justify-center bg-[#F5F5F5] rounded-full w-20 h-20">
                      <span className="flex rounded-full text-white  items-center justify-center w-10 h-10 bg-black group:hover:bg-white hover:text-[#F5F5F5]">
                        {Icon}
                      </span>
                    </span>
                    <span className="font-inter text-3xl font-bold">
                      {total}K
                    </span>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 py-12 md:py-24 justify-items-center w-full px-4">
          {Array.isArray(owner) && owner.length > 0 ? (
            owner.map((items) => {
              // Note: Fixed typo 'linkidin' to 'linkedin' if you change your data source later
              const { image, name, post, twitter, instagram, linkidin } = items;
              return (
                <div
                  key={name}
                  className="flex flex-col w-full max-w-[370px] gap-6"
                >
                  {/* Image Container: Now scales with the screen */}
                  <div className="flex items-end justify-center bg-[#F5F5F5] rounded-[4px] aspect-[370/430] w-full overflow-hidden">
                    <img
                      src={image}
                      alt={name}
                      className="w-[80%] h-[90%] object-contain object-bottom transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col text-left gap-2">
                    <h3 className="font-inter text-2xl md:text-3xl font-medium truncate">
                      {name}
                    </h3>
                    <p className="font-popinns font-normal leading-6 text-base">
                      {post}
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-4 mt-2">
                      <span className="w-6 h-6 cursor-pointer hover:opacity-70 transition-opacity">
                        {twitter}
                      </span>
                      <span className="w-6 h-6 cursor-pointer hover:opacity-70 transition-opacity">
                        {instagram}
                      </span>
                      <span className="w-6 h-6 cursor-pointer hover:opacity-70 transition-opacity">
                        {linkidin}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="col-span-full text-gray-500">No data found</p>
          )}
        </div>

        <div className="flex-wrap flex md:flex-row justify-center w-full items-center gap-20 md:mt-10">
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
      <Footer />
    </div>
  );
};

export default AboutUs;
