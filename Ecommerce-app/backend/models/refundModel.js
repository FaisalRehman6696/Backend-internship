import mongoose from "mongoose";

const refundSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  paymentIntent: String,
  amount: Number,
  reason: String,
  refundStatus: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Refund", refundSchema);
