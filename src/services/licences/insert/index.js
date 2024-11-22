import api, { header } from "../../api";

const createLicences = async (authorization, body) => {
  try {
    const response = await api.post("licencas", body, header(authorization));
    return response.data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};

export default createLicences;
