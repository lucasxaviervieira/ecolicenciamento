import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.91.79:8080/",
});

export const header = (bearerToken) => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  };
};

export default api;
