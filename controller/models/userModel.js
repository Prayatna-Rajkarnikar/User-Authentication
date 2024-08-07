import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  name: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const userAuth = mongoose.model("UserModel", userModel);

export default userAuth;
