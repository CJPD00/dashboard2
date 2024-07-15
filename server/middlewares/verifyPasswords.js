export const verifyPasswords = async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "Las contraseñas no coinciden",
      code: 400,
    });
  }
  next();
};
