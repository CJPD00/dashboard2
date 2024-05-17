
import bcrypt from "bcrypt";

export const verifyPasswords = async (req, res, next) => {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({
            message: "Passwords don't match",
            code: 400,
        });
    }
    next();
}