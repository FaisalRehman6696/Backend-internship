import axios from "axios";
import api from "../utils/apiRequest";

export const getCategory = async () => {
  try {
    const res = await api.get(`/getcategory`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const DeleteCategory = async (_id) => {
  try {
    const res = await axios.delete(
      `http://localhost:8000/deletecategory/${_id}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const addCategory = async (formData) => {
  try {
    const res = await axios.post(`http://localhost:8000/addcategory`, formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const editCategory = async (editData, formData) => {
  try {
    const res = await axios.put(
      `http://localhost:8000/updatecategory/${editData._id}`,
      formData
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default { addCategory, getCategory, DeleteCategory };
