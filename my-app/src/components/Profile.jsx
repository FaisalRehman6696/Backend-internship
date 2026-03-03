import React, { useContext } from "react";
import Navbar from "./Navbar";
import { UserContext } from "../context/Authcontext";

const Profile = () => {
  const { user, setuser } = useContext(UserContext);
  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <p className="text-gray-600">
              <span className="font-semibold">id:</span>{" "}
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <span className="font-semibold">Username:</span>
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <span className="font-semibold">Email:</span>
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <span className="font-semibold">Phone:</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
