import React from "react";
import { useContext } from "react";
import counterContext from "./context";
import Button from "./Button";

const Navbar = () => {
  const context = useContext(counterContext);
  return (
    <div>
      <Button />
      <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
            MyApp
          </h1>

          {/* Links (desktop only) */}
          <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <li className="cursor-pointer hover:text-blue-600">Home</li>
            <li className="cursor-pointer hover:text-blue-600">About</li>
            <li className="cursor-pointer hover:text-blue-600">Courses</li>
            <li className="cursor-pointer hover:text-blue-600">Contact</li>
          </ul>

          {/* Buttons */}
          <div className="flex space-x-3">
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
              Login
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Signup
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
