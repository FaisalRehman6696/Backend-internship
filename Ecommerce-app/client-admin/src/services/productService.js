import axios from "axios";
import api from "../utils/apiRequest";

export const addProduct = async (formData) => {
  try {
    const res = await axios.post(
      `http://localhost:8000/createproduct`,
      formData
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const res = await api.get("/getproducts");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (_id) => {
  try {
    const res = await axios.delete(
      `http://localhost:8000/deleteproductby/${_id}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const editProduct = async (editData, formData) => {
  try {
    const res = await axios.put(
      `http://localhost:8000/updateproductby/${editData._id}`,
      formData
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default { addProduct, fetchProducts, editProduct };
