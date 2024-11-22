import api, { header } from "../api";

const getFieldsModalEdit = async (authorization) => {
  try {
    const response = await api.get("campos", header(authorization));
    return response.data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};

export default getFieldsModalEdit;
