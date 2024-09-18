/* eslint-disable @typescript-eslint/no-explicit-any */
import { createColumnHelper } from "@tanstack/react-table";
import { License } from "../../../../utils/licenseType";

const columnHelper = createColumnHelper<License>();

/**
 * Gera uma matriz de definições de coluna para uma tabela.
 * Cada definição de coluna inclui uma função de acessório para extrair o valor do objeto da linha,
 * bem como componentes de célula e cabeçalho para renderizar a coluna na tabela.
 * @returns Uma matriz de definições de coluna para a tabela.
 */
export function genColumns() {
  const columns = [
    columnHelper.accessor((row) => row.orgao_emissor, {
      id: "orgao_emissor",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Orgão Emissor</span>,
    }),
    columnHelper.accessor((row) => row.tipo, {
      id: "tipo",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Tipo</span>,
    }),
    columnHelper.accessor((row) => row.numero_licenca, {
      id: "numero_licenca",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Número Licença</span>,
    }),
    columnHelper.accessor((row) => row.setor_responsavel, {
      id: "setor_responsavel",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Setor Responsável</span>,
    }),
    columnHelper.accessor((row) => row.num_processo_sei, {
      id: "num_processo_sei",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Número SEI</span>,
    }),
    columnHelper.accessor((row) => row.data_vencimento, {
      id: "data_vencimento",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Vencimento</span>,
    }),
    columnHelper.accessor((row) => row.unidade, {
      id: "unidade",
      cell: (info) => <p className="font-bold">{info.getValue()}</p>,
      header: () => <span>Unidade</span>,
    }),
    columnHelper.accessor((row) => row.situacao_licenca, {
      id: "situacao_licenca",
      cell: (info) => <p className="font-bold">{info.getValue()}</p>,
      header: () => <span>Situação Licença</span>,
    }),
    columnHelper.accessor((row) => row.dias_para_vencer, {
      id: "dias_para_vencer",
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Dias Para Vencer</span>,
      sortDescFirst: false,
    }),
    columnHelper.accessor((row) => row.observacoes, {
      id: "observacoes",
      cell: (info) => <p className="text-left">{info.getValue()}</p>,
      header: () => <span>Status</span>,
    }),
  ];
  return columns;
}
