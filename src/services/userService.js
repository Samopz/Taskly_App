import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { logger } from "../utils/logger.js";

const getUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    logger.info("User found");
    return user;
  } catch (error) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    logger.info("Users found");
    return users;
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
};

const updateUser = async (userId, updateData) => {
  const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
  logger.info("User updated successfully");
  return user;
};

const updatePassword = async (userId, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 12);
  const user = await User.findByIdAndUpdate(
    userId,
    { password: hashedPassword },
    { new: true }
  );
  logger.info("Password updated successfully");
  return user;
};

const resetPassword = async (email, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 12);
  const user = await User.findOneAndUpdate(
    { email },
    { password: hashedPassword },
    { new: true }
  );
  logger.info("Password reset successfully");
  return user;
};

const deleteProfile = async (userId) => {
  await User.findByIdAndDelete(userId);
  logger.info("User deleted successfully");
  return { message: "User deleted successfully" };
};

export default {
  getUser,
  getAllUsers,
  updateUser,
  updatePassword,
  resetPassword,
  deleteProfile,
};
