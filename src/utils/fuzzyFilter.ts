/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterFn } from "@tanstack/react-table";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";

/**
 * Declaração de interfaces adicionais para o módulo "@tanstack/table-core".
 * FilterFns: Define a função de filtro fuzzy.
 * FilterMeta: Define a propriedade itemRank como um tipo RankingInfo.
 */
declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

/**
 * Aplica um filtro fuzzy ao valor da linha e da coluna fornecidos.
 * @param {any} row - O objeto de linha a ser filtrado.
 * @param {string} columnId - O ID da coluna a ser filtrada.
 * @param {string} value - O valor pelo qual filtrar.
 * @param {Function} addMeta - Uma função para adicionar metadados ao resultado do filtro.
 * @returns {boolean} - Se o filtro foi aprovado para a linha e o valor fornecidos.
 */
export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);
  // Store the itemRank info
  addMeta({
    itemRank,
  });
  // Return if the item should be filtered in/out
  return itemRank.passed;
};
