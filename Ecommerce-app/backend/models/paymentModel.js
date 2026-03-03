import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  paymentIntentId: String,
  amount: Number,
  currency: { type: String, required: true },
  status: {
    type: String,
    required: true,
  },
});
export default mongoose.model("Payment", paymentSchema);
