import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { adminLogin } from "../services/LoginServices";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await adminLogin(input);

      if (res.success) {
        if (res.data.user.role !== "admin") {
          toast.error("Unauthorized: Access restricted to Admins only.");
          setLoading(false);
          return;
        }

        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("adminRole", res.data.user.role);

        toast.success("Welcome, Admin!");
        navigate("/"); // Go to your admin panel
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Login        </h2>
        <p className="text-center text-gray-500 mb-8">
          Enter detail below
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Admin Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 mt-1 border rounded-md  outline-none"
              placeholder="admin@exclusive.com"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-3 mt-1 border rounded-md  outline-none"
              placeholder="••••••••"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold cursor-pointer transition duration-200"
          >
            {loading ? "Verifying..." : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
