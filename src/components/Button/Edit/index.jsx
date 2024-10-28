import Modal from "../../../utils/Modal";


export default function ButtonEdit({ row }) {
  const modal = new Modal();
  /**
   * Abre o Modal de alterção das licenças.
   * @param {Row} - Os dados da linha, para todas as vezes que `Modal` for aberto.
   * @returns Uma função que abre o `Modal`, com as informações daquela linha acionada.
   */
  const openModal = (row) => () => {
    const requirementDateFormatted = convertDateFormat(row.original.data_requerimento);
    const emitterDateFormatted = convertDateFormat(row.original.data_emissao);
    const dueDateFormatted = convertDateFormat(row.original.data_vencimento);
    const protocolDateFormatted = convertDateFormat(row.original.data_protocolo_orgao);
    const observationsFormatted = row.original.observacoes.trim();

    modal.inputs = {
      myIdInput: row.original.id,
      areaInput: row.original.area,
      unitInput: row.original.unidade,
      subunitInput: row.original.sub_unidade,
      requirementDateInput: requirementDateFormatted,
      controlInput: row.original.controle,
      emitterInput: row.original.orgao_emissor,
      typeInput: row.original.tipo,
      specificationInput: row.original.especificacao,
      licenseNumberInput: row.original.numero_licenca,
      fceiInput: row.original.fcei_sinfat,
      sinfatInput: row.original.num_processo_sinfat,
      sgpeInput: row.original.sgpe,
      seiInput: row.original.num_processo_sei,
      emitterDateInput: emitterDateFormatted,
      dueDateInput: dueDateFormatted,
      previsionInput: row.original.previsao,
      provideDocInput: row.original.providenciar_doc,
      requirementInput: row.original.requerimento,
      protocolDateInput: protocolDateFormatted,
      newLicenseIssuedInput: row.original.emitida_nova_licenca,
      responsibleSectorInput: row.original.setor_responsavel,
      processSituationInput: row.original.situacao_processo,
      updatedSaInput: row.original.atualizado_sa,
      observationsInput: observationsFormatted,
    };

    modal.showMe();
  };
  /**
   * Converte o formato de `date` para que ao receber a `date` do endpoint, ele consiga ser apresentada ao usuário no formulário.
   * @param {string} inputDate - a string `date` no formato "DD/MM/YYYY".
   * @returns {string} a string `date` convertida ao formato "YYYY-MM-DD".
   */
  function convertDateFormat(inputDate) {
    const dateParts = inputDate.split("/");
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  }

  return (
    <button
      onClick={openModal(row)}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-sm font-semibold ring-1 ring-inset ring-gray-300"
    >
      Editar
    </button>
  );
}