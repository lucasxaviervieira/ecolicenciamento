/* eslint-disable react/prop-types */
import Modal from "../../../utils/Modal";
import { useAuth } from "../../../hooks/useAuth";
import getFieldsModalEdit from "../../../services/fields";


export default function ButtonEdit({ row }) {
  const modal = new Modal();
  /**
   * Abre o Modal de alterção das licenças.
   * @param {Row} - Os dados da linha, para todas as vezes que `Modal` for aberto.
   * @returns Uma função que abre o `Modal`, com as informações daquela linha acionada.
   */

  const { token } = useAuth();

  const getIdForDescription = (description, list) => {
    const item = list.find((entry) => entry.descricao === description);
    return item ? item.id : null;
  }

  const openModal = (row) => () => {

    const fetchFieldsModalEdit = async () => {
      try {
        const newData = await getFieldsModalEdit(token, row.original.id);

        modal.inputs = {
          myIdInput: row.original.id,
          areaInput: getIdForDescription(row.original.area, newData.areas),
          unitInput: getIdForDescription(row.original.unidade, newData.unidades),
          subunitInput: getIdForDescription(row.original.subUnidade, newData.subUnidades),
          requirementDateInput: row.original.dataRequerimento,
          controlInput: getIdForDescription(row.original.controle, newData.controles),
          emitterInput: getIdForDescription(row.original.orgaoEmissor, newData.orgaoEmissors),
          typeInput: getIdForDescription(row.original.tipo, newData.tipos),
          specificationInput: getIdForDescription(row.original.especificacao, newData.especificacaos),
          licenseNumberInput: row.original.numLicenca,
          fceiInput: row.original.fceiSinfat,
          sinfatInput: row.original.numProcessoSinfat,
          sgpeInput: row.original.sgpe,
          seiInput: row.original.processoSei,
          emitterDateInput: row.original.dataEmissao,
          dueDateInput: row.original.dataVencimento,
          previsionInput: getIdForDescription(row.original.previsao, newData.previsoes),
          provideDocInput: row.original.providenciarDoc,
          requirementInput: getIdForDescription(row.original.requerimento, newData.simnaos),
          protocolDateInput: row.original.dataProcotoloOrgao,
          newLicenseIssuedInput: getIdForDescription(row.original.emitidaNovaLicenca, newData.simnaos),
          responsibleSectorInput: getIdForDescription(row.original.setorResponsavel, newData.setores),
          processSituationInput: getIdForDescription(row.original.situacaoProcesso, newData.situcoesProcessos),
          updatedSaInput: getIdForDescription(row.original.atualizadoSa, newData.simnaos),
          observationsInput: row.original.observacoes.trim(),
        };

        modal.showMe();

      } catch (error) {
        console.error("Erro ao buscar campos:", error);
      }
    };
    fetchFieldsModalEdit();
  };

  return (
    <button
      onClick={openModal(row)}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-sm font-semibold ring-1 ring-inset ring-gray-300"
    >
      Editar
    </button>
  );
}