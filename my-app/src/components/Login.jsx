import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "./common/Button";

import Input from "./common/Input";
import { UserContext } from "../context/Authcontext";
import { ThemeContext } from "../context/ThemeProvider";

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const { setuser } = useContext(UserContext);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const userId = localStorage.getItem("id");

  const input = {
    username: form.username,
    password: form.password,
  };
  console.log(input);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://fakestoreapi.com/users/${userId}`,
        input
      );
      setuser({ id: res.data, isLogin: true });

      console.log("✅ Login success:", res.data);

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-400"
      theme={theme}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 dark:bg-black"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 dark:text-white">
          Login
        </h2>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2  dark:text-white">
            Username
          </label>
          <Input
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none  dark:text-white"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2  dark:text-white">
            Password
          </label>
          <Input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none  dark:text-white"
            required
          />
        </div>

        {/* Submit Button */}
        <Button
          title="Login"
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition  dark:text-white"
        ></Button>

        {/* Redirect to Signup */}
        <p className="text-center text-gray-600 mt-4  dark:text-white">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-blue-500 hover:underline dark:text-blue-500"
          >
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
