import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number },
      _id: false,
    },
  ],
  status: { type: String, default: "Pending", required: true },
  total: { type: Number },
  paymentMethod: {
    type: String,
    enum: ["cash", "bank"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model("Order", orderSchema);
