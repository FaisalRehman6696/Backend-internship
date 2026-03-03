import React, { useState } from "react";
import Sidebar from "./common/Sidebar";
import Topbar from "./common/Topbar";

const ViewProfile = () => {
  const [isopen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isopen);
  };

  return (
    <div>
      <Sidebar isopen={isopen} />
      <main
        className={`content px-3 py-2 flex-1 transition-all duration-300 bg-slate-60 ${
          isopen ? "ml-60" : "ml-0"
        }  bg-slate-300 min-h-screen`}
      >
        <Topbar toggleSidebar={toggleSidebar} />

        <div className=" px-10 ">
          <div className="bg-white shadow rounded-lg p-4">
            <h4 className="text-lg font-semibold">Admin Profile</h4>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewProfile;
