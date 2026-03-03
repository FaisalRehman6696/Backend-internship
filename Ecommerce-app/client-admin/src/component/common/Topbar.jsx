import { User } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Topbar = ({ toggleSidebar, isopen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const Signout = () => {
    sessionStorage.clear();
    window.location.reload();
    navigate("/login");
  };
  return (
    <div className="flex justify-between items-center py-4 transition-all duration-300 ">
      {/* Left menu icon */}
      <button
        className={`px-4 text-2xl transition-all ease-initial text-black rounded mb-4 cursor-pointer ${
          isopen ? "ml-60 " : ""
        }`}
        onClick={() => toggleSidebar()}
      >
        ☰
      </button>

      {/* Right side dropdown trigger */}
      <div className="relative">
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="cursor-pointer text-black font-medium px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          <User className="" />
        </div>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt- w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
            <button className="w-full cursor-pointer text-left px-4 py-2 hover:bg-gray-100">
              <Link to="/viewprofile">View Profile</Link>
            </button>
            <button
              onClick={Signout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
