import axios from "axios";
import api from "../utils/apiRequest";
const API = import.meta.env.VITE_API_URL;
export const fetchProducts = async () => {
  try {
    const res = await axios.get(`${API}/getproducts`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const fetchProductsById = async (id) => {
  try {
    const res = await api.get(`/getproductsby/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const fetchProductByCategory = async (_id) => {
  try {
    const res = await api.get(`/getproductbycategory/${_id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default {
  fetchProducts,
  fetchProductsById,
  fetchProductByCategory,
};
