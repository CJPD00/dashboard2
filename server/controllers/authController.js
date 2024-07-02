import { createToken, decodeToken } from "../services/jwtServices.js";
import User from "../models/user.js";
import moment from "moment";

//refrescar el token solo si el refresh token no ha expirado
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh token is required",
      code: 401,
    });
  } else {
    const refreshTokenExpired = moment().isAfter(moment.unix(refreshToken.exp));
    if (refreshTokenExpired) {
      return res.status(401).json({
        message: "Refresh token has expired",
        code: 401,
      });
    }
    try {
      const decoded = decodeToken(refreshToken);
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({
          message: "User not found",
          code: 401,
        });
      }
      const token = createToken(user);
      return res.status(200).json({
        token,
        refreshToken,
        code: 200,
      });
    } catch (error) {
      return res.status(401).json({
        message: error.message,
        code: 401,
      });
    }
  }
};
export default refreshToken;
