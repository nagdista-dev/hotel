import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    const { userId } = req.auth;
    if (!userId) {
      res.json({ success: false, message: "not authorized" });
    } else {
      const user = await User.findById(userId);
      req.user = user;
      next();
    }
  } catch (error) {
    console.log(error.message)
  }
};

export default protect;
