import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  comment: { type: String, required: true },
  starrating: Number,
  createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model("Feedback", feedbackSchema);
