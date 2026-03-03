import React, { useEffect, useState } from "react";
import Sidebar from "./common/Sidebar";
import Topbar from "./common/Topbar";
import { Link, NavLink } from "react-router-dom";

import {
  deleteProduct,
  editProduct,
  fetchProducts,
} from "../services/productService";
import { toast } from "react-toastify";
import { getCategory } from "../services/categoryService";

const Product = () => {
  const [isopen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isopen);
  };
  const [list, setlist] = useState([]);
  const getProduct = async () => {
    try {
      const res = await fetchProducts();
      setlist(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  const deleteProductById = async (_id) => {
    try {
      const res = await deleteProduct(_id);
      setlist((prev) => prev.filter((item) => item._id !== _id));
      toast.success(res.message);
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };
  const [editData, seteditData] = useState({
    name: "",
    category: "",
    price: "",
    productType: "",
    imageUrl: "",
  });

  const [editModalOpen, seteditModalOpen] = useState(false);
  const handleUpdateProduct = async () => {
    try {
      console.log({ editData})
      const formData = new FormData();
      formData.append("name", editData.name);
      formData.append("category", editData.category);
      formData.append("price", editData.price);
      formData.append("productType", editData.productType);
      if (editData.newImage instanceof File) {
        formData.append("imageUrl", editData.newImage);
      }
      console.log({ formData });
      const res = await editProduct(editData, formData);
      toast.success(res.message);
      seteditModalOpen(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleEdit = (rs) => {
    seteditData(rs);
    seteditModalOpen(true);
  };
  const handleEditChange = (e) => {
    console.log({name : e.target.name , value : e.target.value})
    seteditData({ ...editData, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    seteditData({ ...editData, newImage: file });
  };
  const [categorylist, setCategoryList] = useState([]);

  const handlecategory = async () => {
    try {
      const res = await getCategory();
      setCategoryList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handlecategory();
  }, []);

  return (
    <div>
      <Sidebar isopen={isopen} />
      <div>
        <main
          className={`content px-3 py-2 flex-1 transition-all duration-300 bg-slate-60 ${
            isopen ? "ml-60" : "ml-0"
          } bg-slate-300 min-h-screen`}
        >
          <Topbar toggleSidebar={toggleSidebar} />

          <div className="container-fluid">
            <div className="flex justify-between items-center mt-5 mb-5">
              {/* Left side breadcrumb */}
              <ol className="breadcrumb flex space-x-2">
                <li
                  className="breadcrumb-item active  text-2xl font-bold"
                 
                >
                  Product
                </li>
              </ol>

              {/* Right side breadcrumb */}
              <ol className="breadcrumb flex space-x-2 text-gray-500">
                <li className="breadcrumb-item">
                  <Link to="/admindashboard" className="text-blue-500">
                    Dashboard /
                  </Link>
                </li>
                <li className="breadcrumb-item active">
                  Product
                </li>
              </ol>
            </div>

            {/* Top Section */}

            <div className="bg-white shadow rounded-lg p-3 mb-6">
              <NavLink
                to="/createproduct "
                className="inline-block bg-blue-600 text-white px-3 py-2 font-semibold hover:bg-blue-700 transition duration-300 rounded-lg"
              >
                Add New Product
              </NavLink>
            </div>

            <div className="bg-white shadow rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-4">Product List</h4>

              {/* Scrollable wrapper */}
              <div className="overflow-x-auto">
                <table className="table-auto min-w-full text-sm">
                  <thead className="bg-gray-100 text-left">
                    <tr className="shrink-0">
                      <th className="px-6 py-3">#</th>
                      <th className="px-6 py-3">Image</th>
                      <th className="px-6 py-3 shrink-0 flex">Product Name</th>
                      <th className="px-6 py-3">Category</th>
                      <th className="px-6 py-3">Price</th>
                      {/*  <th className="px-6 py-3">Status</th>*/}
                      <th className="px-6 py-3">Product Type</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(list) && list.length > 0 ? (
                      list.map((rs, index) => {
                        if (!rs) return null;
                        const {
                          _id,
                          imageUrl,
                          name,
                          category,
                          price,
                          productType,
                        } = rs;
                        return (
                          <React.Fragment key={_id}>
                            <tr className="border-t">
                              <td className="px-6 py-3">{index + 1}</td>
                              <td className="px-6 py-3">
                                <img
                                  src={`http://localhost:8000/${imageUrl}`}
                                  alt={imageUrl}
                                  className="h-10 w-10 rounded object-cover"
                                />
                              </td>
                              <td className="px-6 py-3">{name}</td>
                              <td className="px-6 py-3">
                                {category?.name || ""}
                              </td>
                              <td className="px-6 py-3">${price}</td>

                              <td className="px-6 py-3">{productType}</td>
                              <td className="px-6 py-3 space-x-2 flex ">
                                <button
                                  onClick={() => handleEdit(rs)}
                                  className="bg-yellow-400 cursor-pointer text-white px-3 py-1 rounded hover:bg-yellow-500"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => deleteProductById(_id)}
                                  className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          </React.Fragment>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-4">
                          No data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {editModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto p-6">
                  <button
                    className="cursor-pointer absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
                    onClick={() => seteditModalOpen(false)}
                  >
                    &times;
                  </button>
                  <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
                    Update Product
                  </h2>

                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block mb-1 text-sm font-semibold text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                        placeholder="Category Name"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block mb-1 text-sm font-semibold text-gray-700">
                        Category
                      </label>
                      <select
                        name="category"
                        onChange={handleEditChange}
                        value={editData.category?.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                      >
                        <option value="">Select a Category</option>
                        {categorylist.length > 0 &&
                          categorylist.map((item) => (
                            <option key={item._id} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block mb-1 text-sm font-semibold text-gray-700">
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={editData.price}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                        placeholder="Price"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-semibold text-gray-700">
                        Product Type
                      </label>
                      <input
                        type="text"
                        name="productType"
                        value={editData.productType}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                        placeholder="Product Type (e.g. Physical/Digital)"
                      />
                    </div>

                    {/* Image Preview */}
                    <div>
                      <label className="block mb-1 text-sm font-semibold text-gray-700">
                        Image
                      </label>
                      <img
                        src={
                          editData.newImage instanceof File
                            ? URL.createObjectURL(editData.newImage)
                            : `http://localhost:8000/${editData.imageUrl}`
                        }
                        alt="Category"
                        className="h-24 w-24 object-cover rounded-lg border"
                      />
                    </div>

                    {/* File Upload */}
                    <div>
                      <label className="block mb-1 text-sm font-semibold text-gray-700">
                        Upload New Image
                      </label>
                      <input
                        type="file"
                        name="newImage"
                        onChange={handleImageChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 cursor-pointer"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleUpdateProduct}
                      className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold transition duration-200"
                    >
                      Update Product
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Product;
