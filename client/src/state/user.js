import { config } from "../config";

//funcion para hacer sigup al server
export const signup = async (data) => {
  const response = await fetch(config.baseUrl + "/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const dataResponse = await response.json();
  return dataResponse;
};

//funcion para hacer login al server
export const login = async (data) => {
  const response = await fetch(config.baseUrl + "/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const dataResponse = await response.json();
  return dataResponse;
};

export const updateUser = async (id, token, user) => {
  const response = await fetch(config.baseUrl + `/user/updateUser/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(user),
  });
  const dataResponse = await response.json();
  return dataResponse;
};
