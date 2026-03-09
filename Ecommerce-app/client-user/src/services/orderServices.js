import api from "../utils/apiRequest";

export const saveOrder = async (data) => {
  try {
   
    const res = await api.post(`/createorder`, {
      data,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getOrderById = async () => {
  try {
    const res = await api.get(`/getorderbyuserid`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getCancelOrder = async () => {
  try {
    const res = await api.get(`/getcancelorder`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getAddress = async () => {
  try {
    const res = await api.get(`/getaddress`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default { saveOrder, getOrderById, getCancelOrder };
