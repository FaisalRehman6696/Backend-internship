import express from "express";
import {
  getUser,
  userSignup,
  signInGoogle,
  userLogin,
  verifyEmail,
  updatePassword,
  testController,
  verifyCode,
} from "../controller/userController.js";
import { auth } from "../middleware/authMiddleware.js";

import {
  CreateProduct,
  DeleteProductById,
  getProductByCategory,
  GetProducts,
  getProductsById,
  updateProductById,
} from "../controller/productController.js";
import { upload } from "../middleware/uploadMiddleware.js";
import {
  AddCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../controller/categoryController.js";
import {
  createOrder,
  getAddress,
  getCancelOrder,
  getOrder,
  getOrderById,
  getOrderByUserId,
  updateStatus,
  verifyPayment,
  refundPaymentRequest,
  fetchRefundStatus,
} from "../controller/orderController.js";
import productFeedback from "../controller/feedbackController.js";
const router = express.Router();

// User routes
router.post("/signup", userSignup);
router.post("/google-login", signInGoogle);
router.post("/user-login", userLogin);
router.post("/verifyemail", verifyEmail);
router.post("/updatepassword", updatePassword);
router.get("/testcontroller", testController);
router.get("/getorderbyuserid", auth, getOrderByUserId);
router.get("/getuser", auth, getUser);
router.get("/getaddress", auth, getAddress);
router.get("/getproductbycategory/:_id", auth, getProductByCategory);
router.post("/verifycode", verifyCode);
router.post("/productfeedback", auth, productFeedback);
router.post("/verifypayment", verifyPayment);
router.post("/refundpayment", auth, refundPaymentRequest);
router.get("/refundstatus/:orderId", auth, fetchRefundStatus);

// admin routes
router.post("/addcategory", upload.single("image"), AddCategory);
router.post(
  "/createproduct",
  upload.fields([
    { name: "imageUrl", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  CreateProduct
);

router.get("/getproducts",  GetProducts);
router.delete("/deleteProductby/:_id", DeleteProductById);
router.put(
  "/updateproductby/:_id",
  upload.single("imageUrl"),
  updateProductById
);
router.get("/getcategory", getCategory);
router.delete("/deletecategory/:_id", deleteCategory);
router.put("/updatecategory/:_id", upload.single("newImage"), updateCategory);
router.get("/getproductsby/:id", auth, getProductsById);
router.post("/createorder", auth, createOrder);
router.get("/getorder",auth, getOrder);
router.get("/getorderby/:_id", getOrderById);
router.put("/updatestatus/:_id", updateStatus);
router.get("/getcancelorder", auth, getCancelOrder);

export default router;
