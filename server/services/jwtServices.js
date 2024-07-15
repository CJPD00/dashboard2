import jwt from "jsonwebtoken";
import moment from "moment";

export const createToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    active: user.active,
    avatar: user.avatar,
    department: user.department,
    iat: moment().unix(),
    exp: moment().add(14, "days").unix(),
  };
  //console.log(process.env.SECRET_JWT_SEED);
  return jwt.sign(payload, process.env.SECRET_JWT_SEED);
};

export const createRefreshToken = (user) => {
  const payload = {
    id: user._id,
    iat: moment().unix(),
    exp: moment().add(30, "days").unix(),
  };
  return jwt.sign(payload, process.env.SECRET_JWT_SEED);
};

export const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT_SEED);
    return decoded;
  } catch (error) {
    return null;
  }
};
