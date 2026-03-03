import feedback from "../models/feedbackModel.js";
import orderModel from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";
export const productFeedback = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await orderModel.findOne({ userId });
    console.log(user);
    if (!user) {
      return errorResponse(res, 400, "Please first Order Product");
    }
    const { id, input, starrating } = req.body;
    if (!id || !input || !starrating) {
      return errorResponse(res, 400, "fields are required");
    }
    const userFeedback = new feedback({
      userId,
      productId: id,
      comment: input,
      starrating,
    });
    await userFeedback.save();
    const productData = await Product.findById(id);
    if (!productData) {
      return errorResponse(res, 500, "Product not found");
    }

    productData.feedbackId.push(userFeedback._id);
    await productData.save();
    return successResponse(res, "Feedback Save Sucessfuly");
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "internal server error");
  }
};
export default productFeedback;
