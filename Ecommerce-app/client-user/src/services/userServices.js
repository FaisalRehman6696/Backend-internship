import axios from "axios";
import api from "../utils/apiRequest";
const API = import.meta.env.VITE_API_URL;
export const handleSignUp = async (input) => {
  try {
    const res = await axios.post(`${API}/signup`, input);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const handleLogin = async (input) => {
  try {
    const res = await axios.post(`${API}/user-login`, input);

    return res.data;
  } catch (error) {
    throw error;
  }
};
export const handleFrogotPass = async (email) => {
  try {
    const res = await axios.post(`${API}/verifyemail`, {
      email,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
export const handleCode = async (email, code) => {
  try {
    console.log(code);
    const res = await axios.post(`${API}/verifycode`, {
      email,
      code,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const handleUpdatePassword = async (email, password) => {
  try {
    const res = await axios.post(`${API}/updatepassword`, {
      email,
      password,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getUser = async () => {
  try {
    const res = await api.get(`/getuser`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const refundPayment = async (selectorderid, reason) => {
  try {
    console.log(selectorderid, reason);
    const res = await api.post(`/refundpayment`, { selectorderid, reason });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const fetchRefundStatus = async (orderId) => {
  try {
    console.log(orderId);
    const res = await api.get(`/refundstatus/${orderId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
