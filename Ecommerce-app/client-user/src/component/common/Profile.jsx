import React from "react";
import { Link, NavLink } from "react-router-dom";

const Profile = ({ user }) => {
  return (
    <>
      <div className="mt-10">
        <div>
          <span className="font-popinns font-medium text-[16px] leading-6">
            Manage My Account
          </span>
          <ol className="flex flex-col gap-2 font-popinns font-normal text-[16px] opacity-50 leading-6 p-9">
            <li>
              <NavLink
                to="/myaccount"
                className={({ isActive }) => (isActive ? "text-[#DB4444]" : "")}
              >
                My Profile
              </NavLink>
            </li>
            <NavLink
              to="/index.html"
              className={({ isActive }) => (isActive ? "text-[#DB4444]" : "")}
            >
              Address Book
            </NavLink>
            <NavLink
              to="/payment"
              className={({ isActive }) => (isActive ? "text-[#DB4444]" : "")}
            >
              My Payment Option
            </NavLink>
          </ol>
          <span className="font-popinns font-medium text-[16px] leading-6">
            My Orders
          </span>
          <ol className=" flex flex-col gap-2 font-popinns font-normal text-[16px] opacity-50 leading-6 p-9">
            <NavLink
              to="/myreturn"
              className={({ isActive }) => (isActive ? "text-[#DB4444]" : "")}
            >
              My Returns
            </NavLink>
            <NavLink
              to="/mycancelation"
              className={({ isActive }) => (isActive ? "text-[#DB4444]" : "")}
              user={user}
            >
              My Cancelations
            </NavLink>
          </ol>
          <span className="font-popinns font-medium text-[16px] leading-6">
            My Wishlist
          </span>
        </div>
      </div>
    </>
  );
};

export default Profile;
