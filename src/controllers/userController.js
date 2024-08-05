import userService from "../services/userService.js";

const getUser = async (req, res) => {
  try {
    const userId = req.body.id;
    const user = await userService.getUser(userId);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      users: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Invalid User",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.body.id;
    const updateData = req.body;
    const user = await userService.updateUser(userId, updateData);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const userId = req.body.id;
    const { newPassword } = req.body;
    const user = await userService.updatePassword(userId, newPassword);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await userService.resetPassword(email, newPassword);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await userService.deleteProfile(userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getUser,
  getAllUsers,
  updateUser,
  updatePassword,
  resetPassword,
  deleteProfile,
};
