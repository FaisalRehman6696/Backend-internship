import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./common/Sidebar";
import Topbar from "./common/Topbar";
import { NavLink } from "react-router-dom";
import { addCategory } from "../services/categoryService";
import { toast } from "react-toastify";

const CreateCategory = () => {
  const imageRef = useRef();
  const [isopen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isopen);
  };
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    const file = e.target.files;
    setForm({ ...form, image: file[0] });
  };
  const SubmitForm = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("image", form.image);
      const res = await addCategory(formData);
      toast.success(res.message);
      setForm({
        name: "",
        description: "",
        image: "",
      });
      imageRef.current.value = "";
    ;
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
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

        <div className="container-fluid px-10 ">
          <div className="flex justify-between items-center mt-5 mb-5">
            {/* Left side breadcrumb */}
            <ol className="breadcrumb flex space-x-2">
              <li
                className="breadcrumb-item active  text-2xl font-bold"
                aria-current="page"
              >
                Add New Category
              </li>
            </ol>

            {/* Right side breadcrumb */}
            <ol className="breadcrumb flex space-x-2 text-gray-500">
              <li className="breadcrumb-item">
                <NavLink to="/admindashboard" className="text-blue-500">
                  Dashboard /
                </NavLink>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Create Category
              </li>
            </ol>
          </div>
          {/* Form starts here */}
          <div className=" p-8 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.2)] bg-white">
            <form onSubmit={SubmitForm}>
              {/* Name Field */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={form.name}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter category name"
                />
              </div>

              {/* Description Field */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  onChange={handleChange}
                  value={form.description}
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter description"
                ></textarea>
              </div>

              {/* Choose Image Field */}
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Choose Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImage}
                  ref={imageRef}
                
                  className="cursor-pointer w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-gray-700"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 justify-end flex"
              >
                Create Category
              </button>
            </form>
          </div>
          {/* Form ends here */}
        </div>
      </main>
    </div>
  );
};

export default CreateCategory;
