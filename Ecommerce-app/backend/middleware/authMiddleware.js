import jwt, { decode } from "jsonwebtoken";
import { errorResponse } from "../utils/apiResponse.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return errorResponse(res, 401, "Please Login");
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodeToken;
    next();
  } catch (error) {
    return errorResponse(res, 401, "invalid token");
  }
};
