import React, { useEffect, useRef, useState } from "react";
import Typography from "./common/Typography";

import {
  Heart,
  LogOut,
  Menu,
  Search,
  ShoppingCart,
  SquareDashedTopSolid,
} from "lucide-react";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCard } from "../counter/cardSlice";
import { handleToken } from "../utils/verifyRequest";
import { toast } from "react-toastify";

const Navbar = ({ id }) => {
  const dispatch = useDispatch();
  const isLogin = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const handleRoute = () => {
    try {
      const decode = handleToken();
      navigate(`/cart`);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const quantity = useSelector((state) => state.card?.product?.length);
  // const selector = useSelector((state) => state.card.product);
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handleclickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleclickOutside);
    return () => {
      document.removeEventListener("mousedown", handleclickOutside);
    };
  }, []);
  const userId = sessionStorage.getItem("userId");

  const Signout = () => {
    sessionStorage.clear();
    dispatch(clearCard());
    navigate("/", { replace: true });
  };
  return (
    <div className="border-b border-black/30">
      <div className="flex justify-between  items-center w-full py-6 mx-auto max-w-[1170px] px-4  ">
        <Typography
          variant="h1"
          className="font-inter text-black font-bold  text-[24px] leading-5 cursor-pointer"
        >
          <NavLink to="/">Exclusive</NavLink>
        </Typography>
        <div className="hidden md:flex ">
          <ul className="flex flex-row gap-6 lg:gap-10 shrink-0  font-popinns text-base font-normal text-black  transition-all duration-300  ">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-[#000000] pb-1" : "pb-1"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-[#000000] pb-1" : "pb-1"
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/About"
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-[#000000] pb-1" : "pb-1"
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-[#000000] pb-1" : "pb-1"
                }
              >
                Sign Up
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex gap-8 md:gap-10 items-center">
          <div className="hidden md:flex bg-[#F5F5F5] px-2 py-1 gap-5 w-60 h-9 items-center rounded-[4px]">
            <input
              type="text"
              className="font-popinns text-xs font-normal opacity-50 w-42  outline-0"
              placeholder="What are you looking for?"
            />
            <Search className="w-5 h-4 cursor-pointer" />
          </div>
          <div>
            <Link to="/wishlist">
              <Heart className=" w-5 h-5 cursor-pointer" />
            </Link>
          </div>
          <div className="relative">
            <div onClick={handleRoute}>
              <ShoppingCart className="w-5 h-5 cursor-pointer" />
            </div>

            {quantity > 0 && (
              <span className="absolute top-[-11px] right-[10px] flex items-center justify-center  bg-[#DB4444] text-[#FAFAFA] rounded-full w-4 h-4 font-popinns font-normal text-xs">
                {quantity}
              </span>
            )}
          </div>
          {isLogin ? (
            <div className="relative inline-block">
              <button
                ref={ref}
                onClick={() => setOpen(!open)}
                // className={
                //   open
                //     ? "bg-[#DB4444] flex items-center justify-center rounded-full cursor-pointer"
                //     : "none"
                // }
              >
                <img
                  src="/userIcon.png"
                  alt=""
                  className="w-5 h-5 cursor-pointer "
                />
              </button>
              {open && (
                <div
                  ref={ref}
                  className="absolute w-38 text-white shadow-lg z-[9999] backdrop-blur-xl bg-[rgba(0,0,0,0.7)] rounded-[4px]  right-0"
                >
                  <ul className="flex flex-col py-4  ">
                    <li className="flex p-2 items-center gap-4 hover:bg-black">
                      <img
                        src="/userIcon.png"
                        alt=""
                        className="w-5 h-5 invert"
                      />
                      <NavLink to="/myaccount">Profile</NavLink>
                    </li>
                    <li className="flex gap-4 p-2 cursor-pointer hover:bg-black">
                      <SquareDashedTopSolid className="w-5 h-5 " />
                      <Link to="/profileorders">My Orders</Link>
                    </li>
                    <li
                      onClick={() => Signout(userId)}
                      className="flex gap-4 p-2 cursor-pointer hover:bg-black"
                    >
                      <LogOut className="w-5 h-5 " /> Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            ""
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden cursor-pointer"
          >
            <Menu className="w-6 h-6 cursor-pointer" />
          </button>
        </div>
      </div>
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-60" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-6  gap-6 font-popinns text-base font-normal text-black  ">
          <li>
            <NavLink to="/"> Home</NavLink>
          </li>
          <li>
            <NavLink to="/contact"> Contact</NavLink>
          </li>
          <li>
            <NavLink to="/about"> About</NavLink>
          </li>
          <li>
            <NavLink to="/signup"> Sign Up</NavLink>
          </li>
          <Typography
            variant="p"
            className="flex md:hidden bg-[#FEFAF1] px-2 mb-2 py-2 gap-5"
          >
            <input
              type="text"
              className="font-popinns text-xs font-normal opacity-50 w-full  outline-0"
              placeholder="What are you looking for?"
            />
            <Search className="w-5 h-4 cursor-pointer" />
          </Typography>{" "}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
