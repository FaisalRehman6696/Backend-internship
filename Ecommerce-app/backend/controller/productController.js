import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";

export const CreateProduct = async (req, res) => {
  try {
    const { name, description, category, price, productType } = req.body;

    if (!name || !description || !category || !price || !productType) {
      return errorResponse(res, 400, "fields are required");
    }
    const categoryData = await Category.findOne({ name: category });
    if (!categoryData) {
      return errorResponse(res, 400, "invalid Category");
    }

    const product = new Product({
      name,
      description,
      category: categoryData._id,
      price,
      productType,
      imageUrl: req.files.imageUrl[0].path,
      images: req.files.images.map((file) => file.path),
    });

    await product.save();
    return successResponse(res, "Product created Sucessfuly");
  } catch (error) {
    return errorResponse(res, 500, "internal Server Error");
  }
};

export const GetProducts = async (req, res) => {
  try {
    const product = await Product.find({}).populate("feedbackId");
    if (!product) {
      return errorResponse(res, 404, "Product not found ");
    }
    const result = product.map((product) => {
      const feedback = Array.isArray(product.feedbackId)
        ? product.feedbackId
        : [];
      if (feedback.length === 0) {
        return { ...product._doc, average: 0 };
      }

      const total = feedback.length;
      const average = feedback.reduce(
        (sum, fb) => sum + fb.starrating / total,
        0
      );
      return { ...product._doc, average };
    });
    return successResponse(res, "Product get suucessfuly", result);
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "internal server error");
  }
};
export const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate({
      path: "feedbackId",
      populate: {
        path: "userId",
        model: "User",
        select: "name",
      },
    });
    if (!product) {
      return errorResponse(res, 404, "Product not found ");
    }
    const total = product.feedbackId.length;

    const average = product.feedbackId.reduce(
      (sum, fb) => sum + fb.starrating / total,
      0
    );
    const result = { product, average };
    return successResponse(res, "Product get suucessfuly", result);
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "internal server error");
  }
};
export const getProductByCategory = async (req, res) => {
  try {
    const { _id } = req.params;
    const product = await Product.find({ category: _id }).populate(
      "feedbackId"
    );
    if (!product) {
      return errorResponse(res, 404, "No Product Found");
    }
    const result = product.map((product) => {
      const feedback = Array.isArray(product.feedbackId)
        ? product.feedbackId
        : [];
      if (feedback.length === 0) {
        return { ...product._doc, average: 0 };
      }

      const total = feedback.length;
      const average = feedback.reduce(
        (sum, fb) => sum + fb.starrating / total,
        0
      );
      return { ...product._doc, average };
    });
    return successResponse(res, 200, result);
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "internal server error");
  }
};
export const DeleteProductById = async (req, res) => {
  try {
    const _id = req.params._id;

    if (!_id) {
      return errorResponse(res, 400, "Id required");
    }
    const product = await Product.findByIdAndDelete(_id);
    if (!product) {
      return errorResponse(res, 404, "Product not found");
    }
    // 204 for the del item fromt eh backend
    return successResponse(res, "Product delete successfully");
  } catch (error) {
    return errorResponse(res, 500, "Internal server error");
  }
};
export const updateProductById = async (req, res) => {
  try {
    const { name, category, price, productType } = req.body;
    const _id = req.params._id;

    if (!_id || !name || !category || !price || !productType) {
      return errorResponse(res, 400, "fields are required");
    }
    const categoryData = await Category.findOne({ name: category });

    if (!categoryData) {
      return errorResponse(res, 404, "Category not found");
    }
    const product = await Product.findById(_id);

    if (!product) {
      return errorResponse(res, 400, "product not found");
    }
    (product.name = name), (product.category = categoryData._id);
    (product.price = price), (product.productType = productType);

    if (req.file) {
      product.imageUrl = req.file.path;
    }

    await product.save();
    return successResponse(res, "Product update Successfully");
  } catch (error) {
    return errorResponse(res, 500, "internal server error");
  }
};
export default {
  CreateProduct,
  GetProducts,
  DeleteProductById,
  updateProductById,
  getProductsById,
  getProductByCategory,
};
