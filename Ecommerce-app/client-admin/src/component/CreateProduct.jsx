import React, { useEffect, useState } from "react";
import Sidebar from "./common/Sidebar";
import Topbar from "./common/Topbar";
import { addProduct } from "../services/productService.js";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getCategory } from "../services/categoryService.js";

const CreateProduct = () => {
  const [category, setCategory] = useState([]);

  const handlecategory = async () => {
    try {
      const res = await getCategory();
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handlecategory();
  }, []);

  const [isopen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isopen);
  };
  const [form, setform] = useState({
    name: "",
    description: "",
    category: "",
    price: "",

    productType: "",
    imageUrl: "",
    images: [],
  });

  const handleImage = (e) => {
    const file = e.target.files;
    setform({ ...form, imageUrl: file });
  };
  const handleArrayImages = (e) => {
    setform({ ...form, images: [...e.target.files] });
  };
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const SubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("price", form.price);

    formData.append("productType", form.productType);
    formData.append("imageUrl", form.imageUrl[0]);
    form.images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      const res = await addProduct(formData);
      setform({
        name: "",
        description: "",
        category: "",
        price: "",

        productType: "",
        imageUrl: "",
        images: [],
      });
      toast.success(res.message);
    } catch (error) {
      toast.error(error.response.data?.message);
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
              <li className="breadcrumb-item active  text-2xl font-bold">
                Create Product
              </li>
            </ol>

            {/* Right side breadcrumb */}
            <ol className="breadcrumb flex space-x-2 text-gray-500">
              <li className="breadcrumb-item">
                <Link to="/admindashboard" className="text-blue-500">
                  Dashboard /
                </Link>
              </li>
              <li className="breadcrumb-item active">Create Product</li>
            </ol>
          </div>

          {/* Form starts here */}
          <div className="p-8 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.2)] bg-white">
            <form onSubmit={SubmitForm}>
              {/* Product Name */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={form.name}
                  className="w-full px-4 py-2 border rounded-lg outline-none"
                  placeholder="Enter product name"
                  required
                />
              </div>
              {/* Description */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  onChange={handleChange}
                  value={form.description}
                  className="w-full px-4 py-2 border rounded-lg  outline-none"
                  placeholder="Enter product Description"
                  required
                />
              </div>
              {/* Category */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Category
                </label>
                <select
                  name="category"
                  onChange={handleChange}
                  value={form.category}
                  required
                  className="w-full px-4 py-2 border rounded-lg  outline-none"
                >
                  <option value="">Select Category</option>
                  {category.length > 0 &&
                    category.map((item) => (
                      <option key={item._id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Price */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  onChange={handleChange}
                  value={form.price}
                  required
                  className="w-full px-4 py-2 border rounded-lg  outline-none"
                  placeholder="Enter price"
                />
              </div>

              {/* Product Type */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Product Type
                </label>
                <select
                  name="productType"
                  onChange={handleChange}
                  value={form.productType}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">Select Type</option>
                  <option value="All">All</option>
                  <option value="Featured">Featured</option>
                  <option value="New">New</option>
                </select>
              </div>

              <div className="mb-4 flex gap-10">
                <div className="flex flex-col w-full">
                  <label className="block text-gray-700 font-bold mb-2 ">
                    Product thumbnail
                  </label>

                  <input
                    type="file"
                    name="imageUrl"
                    onChange={handleImage}
                    className="w-full px-4  py-2 cursor-pointer border rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-gray-700"
                    required
                  />
                </div>
                <div className="flex-col w-full">
                  <label className="block text-gray-700 font-bold mb-2">
                    Product Images
                  </label>
                  <input
                    type="file"
                    name="images"
                    onChange={handleArrayImages}
                    required
                    multiple
                    className="w-full px-4 py-2 cursor-pointer border rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-gray-700"
                  />
                </div>
              </div>
              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
          {/* Form ends here */}
        </div>
      </main>
    </div>
  );
};

export default CreateProduct;
