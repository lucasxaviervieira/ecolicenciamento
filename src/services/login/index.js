import api from "../api";

const authUser = async (loginInfo) => {
  try {
    const response = await api.post("/login", loginInfo);
    return response.data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};

export default authUser;
