import api from "../utils/apiRequest";

export const saveOrder = async (data) => {
  try {
   
    const res = await api.post("http://localhost:8000/createorder", {
      data,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getOrderById = async () => {
  try {
    const res = await api.get(`http://localhost:8000/getorderbyuserid`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getCancelOrder = async () => {
  try {
    const res = await api.get(`http://localhost:8000/getcancelorder`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getAddress = async () => {
  try {
    const res = await api.get(`http://localhost:8000/getaddress`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default { saveOrder, getOrderById, getCancelOrder };
