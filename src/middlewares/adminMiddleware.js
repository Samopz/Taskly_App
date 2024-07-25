import userModel from "../models/userModel.js";

export const adminMiddleware = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(403).send({
        success: false,
        message: "Access Denied. No creditials provided!",
      });
    }

    if (user.userType !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Only Admin Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Un-Authorized Access",
      error,
    });
  }
};
