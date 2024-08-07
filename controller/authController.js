import bcrypt from "bcryptjs";
import UserAuth from "./models/userModel.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, userName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserAuth({
      name,
      userName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    console.log("user", name);
    res.status(200).json({ message: "Registered Successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to register user" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await UserAuth.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "Invalid userName" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login Successfull", token });
  } catch (error) {
    res.status(400).json({ message: "Failed to login user" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { userName, oldpassword, newPassword } = req.body;
    const user = await UserAuth.findOne({ userName });

    if (!user) {
      return res.status(400).json({ message: "Invalid Username" });
    }

    const isMatch = await bcrypt.compare(oldpassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password does not match" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();
    res.status(200).json({ message: "Password reset successfull" });
  } catch (error) {
    res.status(400).json({ message: "Failed to reset password" });
  }
};

export const getUser = async (req, res) => {
  try {
    const users = await UserAuth.find({}, "-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch users" });
  }
};
