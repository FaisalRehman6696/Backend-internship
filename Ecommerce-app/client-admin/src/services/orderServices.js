import axios from "axios";
import api from "../utils/apiRequest";

export const fetchOrder = async () => {
  try {
    const res = await api.get(`/getorder`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const fetchOrderById = async (_id) => {
  try {
    const res = await axios.get(`http://localhost:8000/getorderby/${_id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const updateStatus = async (_id, status) => {
  try {
    const res = await axios.put(`http://localhost:8000/updatestatus/${_id}`, {
      status,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default { fetchOrder, fetchOrderById, updateStatus };
