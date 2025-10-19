import mongoose from "mongoose";

const UserQuerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// ✅ use the same name both places:
export default mongoose.models.UserQuery ||
  mongoose.model("UserQuery", UserQuerySchema);
