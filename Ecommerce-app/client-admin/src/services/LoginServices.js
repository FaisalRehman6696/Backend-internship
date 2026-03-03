import axios from "axios";

export const adminLogin = async (input) => {
  try {
    const res = await axios.post(`http://localhost:8000/user-login`, input);
    return res.data;
  } catch (error) {
    throw error;
  }
};
