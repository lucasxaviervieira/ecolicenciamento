import api, { header } from "../../api";

const updateLicences = async (authorization, licenseId, body) => {
  try {
    const path = `licencas/${licenseId}`;
    const response = await api.post(path, body, header(authorization));
    return response.data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};

export default updateLicences;
