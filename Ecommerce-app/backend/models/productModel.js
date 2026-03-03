import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  price: Number,
  status: { type: String, enum: ["Active", "inActive"] },
  productType: String,
  imageUrl: { type: String, require: true },
  images: [{ type: String, require: true }],
  feedbackId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }],
});
export default mongoose.model("Product", productSchema);
