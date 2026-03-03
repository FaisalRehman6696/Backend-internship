import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  streetAddress: { type: String, required: true },
  apartment: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});
export default mongoose.model("Address", addressSchema);
