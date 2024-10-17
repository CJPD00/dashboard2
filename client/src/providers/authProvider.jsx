import { useState, useEffect, createContext } from "react";
import { jwtDecode } from "jwt-decode";
import {
  getAccessToken,
  getRefreshToken,
  logout,
  refreshAccessToken,
} from "../state/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    user: null,
    isLoading: true,
  });
  const [refreshUser, setRefreshUser] = useState(false);
  //const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  useEffect(() => {
    checkUserLogin(setUser);
  }, []);

  // useEffect(() => {
  //   if (refreshUser) {
  //     refreshAccessToken(refreshToken);
  //     setRefreshUser(false);
  //   }
  // }, [refreshUser, refreshToken]);

  return (
    <AuthContext.Provider
      value={user}
      setUser={setUser}
      //setRefreshUser={setRefreshUser}
    >
      {children}
    </AuthContext.Provider>
  );
};

const checkUserLogin = (setUser) => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  if (!accessToken) {
    if (!refreshToken) {
      logout();
      setUser({ user: null, isLoading: false });
    } else {
      refreshAccessToken(refreshToken);
    }
  } else {
    const decoded = jwtDecode(accessToken);
    setUser({ user: decoded, isLoading: false });
  }
};

export default AuthProvider;
