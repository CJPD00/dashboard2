import jwtDecode from "jwt-decode";

export const willExpire = (token) => {
  const decoded = jwtDecode(token);
  const now = Date.now() / 1000;
  return decoded.exp < now;
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");

  // If token is not valid or expired, return null
  if (!accessToken || accessToken === "null") {
    return null;
  }

  // If token will expire in next 10 minutes, return null
  return willExpire(accessToken) ? null : accessToken;
};

export const getRefreshToken = () => {
  const refreshToken = localStorage.getItem("refreshToken");

  // If token is not valid or expired, return null
  if (!refreshToken || refreshToken === "null") {
    return null;
  }

  // If token will expire in next 10 minutes, return null
  return willExpire(refreshToken) ? null : refreshToken;
};

export const refreshAccessToken = async (refreshToken) => {
  const response = await fetch("/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });
  const data = await response.json();
  if (data.accessToken) {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
  } else {
    logout();
  }
  return data;
};
