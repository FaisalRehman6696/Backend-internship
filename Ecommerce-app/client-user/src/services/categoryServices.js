import axios from "axios";
export const getCategory = async () => {
  try {
    const res = await axios.get("http://localhost:8000/getcategory");
    return res.data;
  } catch (error) {
    throw error;
  }
};
export default getCategory;
