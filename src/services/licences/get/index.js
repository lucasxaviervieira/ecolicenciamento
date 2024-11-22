import api, { header } from "../../api";

function transformLicencesData(data) {
  const dataList = Array.isArray(data) ? data : [data];

  return dataList.map((row) => ({
    id: String(row.id),
    area: row.area.descricao,
    unidade: row.unidade.descricao,
    subUnidade: row.subUnidade.descricao,
    dataRequerimento: row.dataRequerimento,
    controle: row.controle.descricao,
    orgao: row.orgao.descricao,
    tipo: row.tipo.descricao,
    especificacao: row.especificacao.descricao,
    previsao: row.previsao.descricao,
    requerimento: row.requerimento.descricao,
    emitidaNovaLicenca: row.emitidaNovaLicenca.descricao,
    situacaoProcesso: row.situacaoProcesso.descricao,
    atualizadoSa: row.atualizadoSa.descricao,
    situacaoLicenca: row.situacaoLicenca.descricao,
    setorResponsavel: row.setorResponsavel.descricao,
    numLicenca: row.numLicenca,
    fceiSinfat: String(row.fceiSinfat),
    numProcessoSinfat: row.numProcessoSinfat,
    sgpe: row.sgpe,
    processoSei: row.processoSei,
    dataEmissao: row.dataEmissao,
    dataVencimento: row.dataVencimento,
    dataProcotoloOrgao: row.dataProcotoloOrgao,
    observacoes: row.observacoes,
    providenciarDoc: row.providenciarDoc,
    dataLimite: row.dataLimite,
    tempoTramitacao: String(row.tempoTramitacao),
    diasParaVencer: String(row.diasParaVencer),
    ativo: row.ativo,
    atualizadoEm: row.atualizadoEm,
  }));
}

const getLicences = async (authorization, licenseId = null) => {
  try {
    const path = licenseId ? `licencas/${licenseId}` : "licencas";
    const response = await api.get(path, header(authorization));
    const transformedData = transformLicencesData(response.data);
    return transformedData;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};

export default getLicences;
