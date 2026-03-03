import { useContext, useState } from "react";

import Button from "./common/Button";
import Input from "./common/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/Authcontext";
import { ThemeContext } from "../context/ThemeProvider";

const Signup = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { setuser } = useContext(UserContext);
  const [Form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = {
      username: Form.name,
      email: Form.email,
      password: Form.password,
    };
    console.log(input);

    try {
      const res = await axios.post("https://fakestoreapi.com/users", input);
      console.log("✅ User created:", res.data);
      setuser({ id: res.data.id });
      localStorage.setItem("id", res.data.id);
      navigate("/login");
    } catch (error) {
      console.error(" Signup failed:", error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-400"
      Theme={theme}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 dark:bg-black"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 dark:text-white" >
          Sign Up
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2 dark:text-white">Name</label>
          <Input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none dark:text-white"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2 dark:text-white">Email</label>
          <Input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none dark:text-white"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2 dark:text-white">
            Password
          </label>
          <Input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none dark:text-white"
            required
          />
        </div>

        {/* Submit Button */}
        <Button
          title="Sign Up"
          type="submit"
          //   onClick={(e) => handleSubmit(e)}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
        ></Button>

        {/* Redirect to Login */}
        <p className="text-center text-gray-600 mt-4 dark:text-white">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
