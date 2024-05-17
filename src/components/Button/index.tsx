/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Modal as ModalFlow } from "flowbite-react";
import { Link } from "react-router-dom";

import { formatObs, handleClickReload } from "../../utils/functions";

import { Row } from "@tanstack/react-table";

import { License } from "../../utils/licenseType";

import Modal from "../../utils/Modal";
import { InfoIcon } from "../Icons";

export function RealoadFilters() {
  return (
    <button
      onClick={handleClickReload}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md gap-x-1.5 text-sm font-semibold  ring-1 ring-inset ring-gray-300"
    >
      Limpar Filtros
    </button>
  );
}
export function ButtonAgenda({ row }: any) {
  return (
    <Link to={`/agenda/${row}`} target="_blank">
      <button className="bg-cyan-500 hover:bg-cyan-700 text-white py-2 px-4 rounded-md text-sm font-semibold ring-1 ring-inset ring-cyan-300">
        Agenda
      </button>
    </Link>
  );
}

export function ButtonEdit({ row }: any) {
  const modal = new Modal();
  /**
   * Abre o Modal de alterção das licenças.
   * @param {Row<License>} row - Os dados da linha, para todas as vezes que `Modal` for aberto.
   * @returns Uma função que abre o `Modal`, com as informações daquela linha acionada.
   */
  const openModal = (row: Row<License>) => () => {
    const requirementDateFormatted = convertDateFormat(
      row.original.data_requerimento
    );
    const emitterDateFormatted = convertDateFormat(row.original.data_emissao);
    const dueDateFormatted = convertDateFormat(row.original.data_vencimento);
    const protocolDateFormatted = convertDateFormat(
      row.original.data_protocolo_orgao
    );
    const observationsFormatted = formatObs(row.original.observacoes);

    modal.myIdInput = row.original.id;
    modal.areaInput = row.original.area;
    modal.unitInput = row.original.unidade;
    modal.subunitInput = row.original.sub_unidade;
    modal.requirementDateInput = requirementDateFormatted;
    modal.controlInput = row.original.controle;
    modal.emitterInput = row.original.orgao_emissor;
    modal.typeInput = row.original.tipo;
    modal.specificationInput = row.original.especificacao;
    modal.licenseNumberInput = row.original.numero_licenca;
    modal.fceiInput = row.original.fcei_sinfat;
    modal.sinfatInput = row.original.num_processo_sinfat;
    modal.sgpeInput = row.original.sgpe;
    modal.seiInput = row.original.num_processo_sei;
    modal.emitterDateInput = emitterDateFormatted;
    modal.dueDateInput = dueDateFormatted;
    modal.previsionInput = row.original.previsao;
    modal.provideDocInput = row.original.providenciar_doc;
    modal.requirementInput = row.original.requerimento;
    modal.protocolDateInput = protocolDateFormatted;
    modal.newLicenseIssuedInput = row.original.emitida_nova_licenca;
    modal.responsibleSectorInput = row.original.setor_responsavel;
    modal.processSituationInput = row.original.situacao_processo;
    modal.updatedSaInput = row.original.atualizado_sa;
    modal.observationsInput = observationsFormatted;
    modal.showMe();
  };

  /**
   * Converte o formato de `date` para que ao receber a `date` do endpoint, ele consiga ser apresentada ao usuário no formulário.
   * @param {string} inputDate - a string `date` no formato "DD/MM/YYYY".
   * @returns {string} a string `date` convertida ao formato "YYYY-MM-DD".
   */
  function convertDateFormat(inputDate: string): string {
    const dateParts = inputDate.split("/");
    const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    return formattedDate;
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

export default function ModalFlowButton({ onDeleteTask }: any) {
  const [openModal, setOpenModal] = useState(false);

  const deleteTask = () => () => {
    setOpenModal(false);
    onDeleteTask();
  };

  return (
    <>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md text-sm font-semibold ring-1 ring-inset ring-red-300"
        onClick={() => setOpenModal(true)}
      >
        Apagar
      </button>

      <ModalFlow
        show={openModal}
        size="sm"
        onClose={() => setOpenModal(false)}
        popup
      >
        <ModalFlow.Header />
        <ModalFlow.Body>
          <div className="text-center">
            <div className="flex justify-center items-center pb-5">
              <InfoIcon />
            </div>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Deseja deletar essa rotina?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md text-sm font-semibold ring-1 ring-inset ring-red-300"
                onClick={deleteTask()}
              >
                {"Sim, eu quero"}
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-sm font-semibold ring-1 ring-inset ring-blue-300"
                onClick={() => setOpenModal(false)}
              >
                Não, cancele
              </button>
            </div>
          </div>
        </ModalFlow.Body>
      </ModalFlow>
    </>
  );
}
