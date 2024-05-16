import User from "../models/user.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        code: 404,
      });
    }
    res.status(200).json({ user, code: 200 });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
