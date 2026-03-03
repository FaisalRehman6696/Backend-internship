import Category from "../models/categoryModel.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";

export const AddCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return errorResponse(res, 400, "fields are required");
    }
    if (!req.file) {
      return errorResponse(res, 400, "image are required");
    }

    const category = new Category({
      name,
      description,
      image: req.file.path,
    });

    await category.save();

    successResponse(res, "Category created Sucessfuly");
  } catch (error) {
    return errorResponse(res, 500, "Internal server error");
  }
};
export const getCategory = async (req, res) => {
  try {
    const category = await Category.find({});

    if (category.length === 0) {
      return errorResponse(res, 404, "Category not found ");
    }
    return successResponse(res, 200, category);
  } catch (error) {
    return errorResponse(res, 500, "internal server error");
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { _id } = req.params;

    const category = await Category.findByIdAndDelete(_id);

    if (!category) {
      return errorResponse(res, 404, "Category not found ");
    }
    return successResponse(res, "Category deleted successfuly");
  } catch (error) {
    return errorResponse(res, 500, "internal server error");
  }
};
export const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { _id } = req.params;

    if (!_id || !name || !description) {
      return errorResponse(res, 400, "fields are required");
    }
    const category = await Category.findById(_id);

    if (!category) {
      return errorResponse(res, 404, "Category not found ");
    }

    const image = req.file ? req.file.path : category.image;

    (category.name = name),
      (category.description = description),
      (category.image = image);
    await category.save();
    return successResponse(res, "Category Update successfuly");
  } catch (error) {
    return errorResponse(res, 500, "internal server error");
  }
};
export default { AddCategory, getCategory, deleteCategory, updateCategory };
