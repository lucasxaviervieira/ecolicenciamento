/* eslint-disable @typescript-eslint/no-explicit-any */
import { createColumnHelper } from "@tanstack/react-table";

import { isValue } from "../../../utils/functions";

import { License } from "../../../utils/licenseType";

import { ButtonAgenda, ButtonEdit } from "../../Button";
import { Link } from "react-router-dom";

export const clientColumnOrder = [
  "button",
  "id",
  "area",
  "unidade",
  "sub_unidade",
  "data_requerimento",
  "controle",
  "orgao_emissor",
  "tipo",
  "especificacao",
  "numero_licenca",
  "fcei_sinfat",
  "num_processo_sinfat",
  "sgpe",
  "num_processo_sei",
  "data_emissao",
  "data_vencimento",
  "dias_para_vencer",
  "previsao",
  "providenciar_doc",
  "datalimite",
  "requerimento",
  "data_protocolo_orgao",
  "emitida_nova_licenca",
  "situacao_licenca",
  "situacao_processo",
  "atualizado_sa",
  "tempo_tramitacao",
  "setor_responsavel",
  "observacoes",
  "agenda",
];

const columnHelper = createColumnHelper<License>();

/**
 * Gera uma matriz de definições de coluna para uma tabela.
 * Cada definição de coluna inclui uma função de acessório para extrair o valor do objeto da linha,
 * bem como componentes de célula e cabeçalho para renderizar a coluna na tabela.
 * @returns Uma matriz de definições de coluna para a tabela.
 */
export default function genColumns() {
  const columns = [
    columnHelper.accessor((row) => row.id, {
      id: "id",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>ID</span>,
    }),
    columnHelper.accessor((row) => row.area, {
      id: "area",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Área</span>,
    }),
    columnHelper.accessor((row) => row.unidade, {
      id: "unidade",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Unidade</span>,
    }),
    columnHelper.accessor((row) => row.sub_unidade, {
      id: "sub_unidade",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Subunidade</span>,
    }),
    columnHelper.accessor((row) => row.data_requerimento, {
      id: "data_requerimento",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Data de Requerimento</span>,
      sortingFn: "datetime",
    }),
    columnHelper.accessor((row) => row.controle, {
      id: "controle",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Controle</span>,
    }),
    columnHelper.accessor((row) => row.orgao_emissor, {
      id: "orgao_emissor",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Orgão Emissor</span>,
    }),
    columnHelper.accessor((row) => row.tipo, {
      id: "tipo",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Tipo</span>,
      // filterFn: "arrIncludesAll",
    }),
    columnHelper.accessor((row) => row.especificacao, {
      id: "especificacao",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Especificação</span>,
    }),
    columnHelper.accessor((row) => row.numero_licenca, {
      id: "numero_licenca",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Número da Licença</span>,
    }),
    columnHelper.accessor((row) => row.fcei_sinfat, {
      id: "fcei_sinfat",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>FCEI/SINFAT</span>,
    }),
    columnHelper.accessor((row) => row.num_processo_sinfat, {
      id: "num_processo_sinfat",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Processo do SINFAT</span>,
    }),
    columnHelper.accessor((row) => row.sgpe, {
      id: "sgpe",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>SGPE</span>,
    }),
    columnHelper.accessor((row) => row.num_processo_sei, {
      id: "num_processo_sei",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Processo SEI</span>,
    }),
    columnHelper.accessor((row) => row.data_emissao, {
      id: "data_emissao",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Data de Emissão</span>,
      sortingFn: "datetime",
    }),
    columnHelper.accessor((row) => row.data_vencimento, {
      id: "data_vencimento",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Data de Vencimento</span>,
      sortingFn: "datetime",
    }),
    columnHelper.accessor((row) => row.previsao, {
      id: "previsao",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Previsão</span>,
    }),
    columnHelper.accessor((row) => row.requerimento, {
      id: "requerimento",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Requerimento</span>,
    }),
    columnHelper.accessor((row) => row.data_protocolo_orgao, {
      id: "data_protocolo_orgao",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Data de Protocolo</span>,
      sortingFn: "datetime",
    }),
    columnHelper.accessor((row) => row.emitida_nova_licenca, {
      id: "emitida_nova_licenca",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Nova Licença Emitida?</span>,
    }),
    columnHelper.accessor((row) => row.situacao_processo, {
      id: "situacao_processo",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Situação do Processo</span>,
    }),
    columnHelper.accessor((row) => row.atualizado_sa, {
      id: "atualizado_sa",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Atualizado na SA?</span>,
    }),
    columnHelper.accessor((row) => row.tempo_tramitacao, {
      id: "tempo_tramitacao",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Tempo de Tramitação</span>,
    }),
    columnHelper.accessor((row) => row.observacoes, {
      id: "observacoes",
      cell: (props) => (
        <Link
          to={`/observacoes/${props.row.original.id}`}
          target="_blank"
          className="text-xs hover:underline"
        >
          {isValue(props.row.original.observacoes)}
        </Link>
      ),
      header: () => <span>Observações</span>,
    }),
    columnHelper.accessor((row) => row.providenciar_doc, {
      id: "providenciar_doc",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Providenciar Doc.</span>,
    }),
    columnHelper.accessor((row) => row.datalimite, {
      id: "datalimite",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Data Limite</span>,
      sortingFn: "datetime",
    }),
    columnHelper.accessor((row) => row.situacao_licenca, {
      id: "situacao_licenca",
      cell: (info) => <p className="font-bold">{info.getValue()}</p>,
      header: () => <span>Situação da Licença</span>,
    }),
    columnHelper.accessor((row) => row.setor_responsavel, {
      id: "setor_responsavel",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Setor Responsável</span>,
    }),
    columnHelper.accessor((row) => row.dias_para_vencer, {
      id: "dias_para_vencer",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Dias para Vencer</span>,
    }),
    columnHelper.accessor((row) => row.button, {
      id: "button",
      header: () => <span>#</span>,
      cell: (props) => <ButtonEdit row={props.row} />,
    }),
    columnHelper.accessor((row) => row.button, {
      id: "agenda",
      header: () => <span>Agenda</span>,
      cell: (props) => <ButtonAgenda row={props.row.original.id} />,
    }),
  ];
  return columns;
}
