import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  photo: String,
  googleId: String,
  addressId: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  Code: Number,
  codeExpire: Date,
});

export default mongoose.model("User", signupSchema);
