import React, { useEffect, useState } from "react";
import Sidebar from "./common/Sidebar";
import Topbar from "./common/Topbar";
import { NavLink } from "react-router-dom";
import {
  DeleteCategory,
  editCategory,
  getCategory,
} from "../services/categoryService";
import { toast } from "react-toastify";

const Category = () => {
  const [isopen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isopen);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [show, setshow] = useState("");
  console.log(show);
  const [list, setlist] = useState([]);
  const getList = async () => {
    try {
      const res = await getCategory();
      setlist(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getList();
  }, []);

  const deleteList = async (_id) => {
    try {
      const res = await DeleteCategory(_id);
      setlist((prev) => prev.filter((item) => item._id !== _id));
      toast.success(res.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  // thisi is for edit data
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const handleEdit = (rs) => {
    setEditData(rs);
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleUpdateCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editData.name);
      formData.append("description", editData.description);
      if (editData.image instanceof File) {
        formData.append("newImage", editData.image);
      }
      const res = await editCategory(editData, formData);
      toast.success(res.message);
      setEditModalOpen(false);
    } catch (error) {
      toast.error(error.reponse?.data?.message);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditData({ ...editData, image: file });
  };

  return (
    <div>
      <Sidebar isopen={isopen} />
      <div>
        <main
          className={`content px-3 py-2 flex-1 transition-all duration-300 bg-slate-60 ${
            isopen ? "ml-60" : "ml-0"
          }  bg-slate-300 min-h-screen`}
        >
          <Topbar toggleSidebar={toggleSidebar} />

          <div className="container-fluid">
            <div className="flex justify-between items-center mt-5 mb-5">
              {/* Left side breadcrumb */}
              <ol className="breadcrumb flex space-x-2">
                <li
                  className="breadcrumb-item active  text-2xl font-bold"
                  aria-current="page"
                >
                  Category
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
                  Category
                </li>
              </ol>
            </div>

            {/* Top Section */}

            <div className="bg-white shadow rounded-lg p-3 mb-6">
              <NavLink
                to="/createcategory"
                className="inline-block bg-blue-600 text-white px-3 py-2 font-semibold hover:bg-blue-700 transition duration-300 rounded-lg"
              >
                Add New Category
              </NavLink>
            </div>

            {/* Category Table */}
            <div className="bg-white shadow rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-4">Category List</h4>
              <table className="min-w-full table-auto text-sm">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Image</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(list) && list.length > 0 ? (
                    list.map((rs, index) => {
                      if (!rs) return null;
                      const { _id, name, image, description } = rs;

                      return (
                        <tr key={_id} className="border-t">
                          <td className="px-4 py-2">{index + 1}</td>
                          <td className="px-4 py-2">{name}</td>
                          <td
                            className="px-4 py-2 items-center md:flex"
                            style={{ cursor: "pointer" }}
                          >
                            <img
                              src={`http://localhost:8000/${image}`}
                              alt=""
                              className="h-8 w-8 rounded"
                              onClick={() => {
                                setshow(`http://localhost:8000/${image}`);
                                setIsModalOpen(true);
                              }}
                            />
                            {image}
                          </td>
                          <td className="px-4 py-2">{description}</td>
                          <td className="px-4 py-2 space-x-2 flex">
                            <button
                              onClick={() => handleEdit(rs)}
                              className="cursor-pointer bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteList(_id)}
                              className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
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
            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xl mx-4 relative transform transition-all duration-300 ease-in-out">
                  <button
                    className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
                    onClick={() => setIsModalOpen(false)}
                  >
                    &times;
                  </button>
                  <h2 className="text-2xl font-semibold mb-4 text-center text-blue-700">
                    Selected Image
                  </h2>
                  <div className="max-h-[80vh] overflow-auto">
                    <img
                      src={show}
                      alt="Selected"
                      className="w-full h-auto rounded-md shadow-md"
                    />
                  </div>
                </div>
              </div>
            )}

            {editModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg relative">
                  <button
                    className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
                    onClick={() => setEditModalOpen(false)}
                  >
                    &times;
                  </button>
                  <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
                    Edit Category
                  </h2>

                  <div className="space-y-4">
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

                    <div>
                      <label className="block mb-1 text-sm font-semibold text-gray-700">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={editData.description}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                        placeholder="Category Description"
                        rows={3}
                      ></textarea>
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-semibold text-gray-700">
                        Image
                      </label>
                      <img
                        src={
                          editData.image instanceof File
                            ? URL.createObjectURL(editData.image)
                            : `http://localhost:8000/${editData.image}`
                        }
                        alt="Category"
                        className="h-24 w-24 object-cover rounded-lg border"
                      />
                    </div>

                    {/* Optional: File input for new image (not handled in update yet) */}

                    <div>
                      <label className="block mb-1 text-sm font-semibold text-gray-700">
                        Upload New Image
                      </label>
                      <input
                        type="file"
                        name="newImage"
                        onChange={(e) => handleImageChange(e)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                      />
                    </div>

                    <button
                      onClick={handleUpdateCategory}
                      className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold transition duration-200"
                    >
                      Update Category
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

export default Category;
