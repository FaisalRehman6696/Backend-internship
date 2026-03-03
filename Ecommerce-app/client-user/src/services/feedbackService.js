import api from "../utils/apiRequest";

export const handleFeedback = async (id, input, starrating) => {
  try {
    const res = await api.post(`/productfeedback`, {
      id,
      input,
      starrating,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export default handleFeedback;
