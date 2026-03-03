import React from "react";
import Typography from "./common/Typography";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  SendHorizontal,
  Twitter,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full mt-32 bg-black text-[#FAFAFA]">
      <Typography
        variant="div"
        className="w-full mx-auto max-w-[1170px] px-4  py-12
               grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10"
      >
        {/* first column */}
        <div>
          <Typography
            variant="div"
            className="font-inter font-bold text-2xl mb-4"
          >
            Exclusive
          </Typography>
          <ul className="space-y-3">
            <li>
              <Link to="" className="font-popinns font-medium text-xl">
                Subscribe
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="font-popinns font-normal text-[16px] leading-6"
              >
                Get 10% off your first order
              </Link>
            </li>
            <div className="flex items-center border border-[#F5F5F5] rounded mt-4 h-12 overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 font-popinns font-normal text-[16px] leading-6 bg-transparent outline-none text-[#F5F5F5] placeholder-[#aaa] border-none"
              />
              <span className="px-3 cursor-pointer">
                <SendHorizontal size={20} className="text-[#F5F5F5]" />
              </span>
            </div>
          </ul>
        </div>

        {/* second column */}
        <div>
          <Typography
            variant="div"
            className="font-popinns font-medium text-xl mb-4"
          >
            Support
          </Typography>
          <ul className="space-y-3 font-popinns font-normal text-[16px] leading-6">
            <li>
              111 Bijoy sarani, Dhaka,
              <br />
              DH 1515, Bangladesh.
            </li>
            <li>
              <Link to="">exclusive@gmail.com</Link>
            </li>
            <li>+88015-88888-9999</li>
          </ul>
        </div>

        {/* third column */}
        <div>
          <Typography
            variant="div"
            className="font-popinns font-medium text-xl mb-4"
          >
            Account
          </Typography>
          <ul className="font-popinns font-normal text-[16px] space-y-3">
            <li>
              <Link to="">My Account</Link>
            </li>
            <li>
              <Link to="">Login</Link> / <Link to="">Register</Link>
            </li>
            <li>
              <Link to="">Cart</Link>
            </li>
            <li>
              <Link to="">Wishlist</Link>
            </li>
            <li>
              <Link to="">Shop</Link>
            </li>
          </ul>
        </div>

        {/* fourth column */}
        <div>
          <Typography
            variant="div"
            className="font-popinns font-medium text-xl mb-4"
          >
            Quick Link
          </Typography>
          <ul className="font-popinns font-normal text-[16px] space-y-3">
            <li>
              <Link to="">Privacy Policy</Link>
            </li>
            <li>
              <Link to="">Terms of Use</Link>
            </li>
            <li>
              <Link to="">FAQ</Link>
            </li>
            <li>
              <Link to="">Contact</Link>
            </li>
          </ul>
        </div>

        {/* fifth column */}
        <div className="max-w-[400px]">
          <h3 className="font-popinns font-medium text-xl mb-4">
            Download App
          </h3>
          <p className="font-popinns font-normal text-[16px]">
            Save $3 with App New User Only
          </p>
          <div className="flex gap-3 mt-3 items-start">
            <div className="w-20">
              <img
                src="/footer3.jpg"
                alt="QR"
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="flex flex-col gap-2">
              <img
                src="/footer2.png"
                alt="Google Play"
                className="h-10 object-contain"
              />
              <img
                src="/footer1.png"
                alt="App Store"
                className="h-10 object-contain"
              />
            </div>
          </div>
          <Typography variant="div" className="flex space-x-6 mt-3">
            <Link to="">
              <Facebook />
            </Link>
            <Link to="">
              <Twitter />
            </Link>
            <Link to="">
              <Instagram />
            </Link>
            <Link to="">
              <Linkedin />
            </Link>
          </Typography>
        </div>
      </Typography>
    </footer>
  );
};

export default Footer;
