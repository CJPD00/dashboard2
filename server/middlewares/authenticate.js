//import moment from "moment";
import { decodeToken } from "../services/jwtServices.js";

export const ensureAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    //console.log(token);
    if (!token) {
      return res.status(401).json({
        message: "No token provided",
        code: 401,
      });
    }
    const decoded = decodeToken(token);
    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token",
        code: 401,
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
