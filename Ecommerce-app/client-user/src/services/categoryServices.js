import axios from "axios";
const API = import.meta.env.VITE_API_URL;
export const getCategory = async () => {
  try {
    const res = await axios.get(`${API}/getcategory`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export default getCategory;
