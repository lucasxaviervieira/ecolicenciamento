import { rankItem } from "@tanstack/match-sorter-utils";
/**
 * Aplica um filtro fuzzy ao valor da linha e da coluna fornecidos.
 * @param {any} row - O objeto de linha a ser filtrado.
 * @param {string} columnId - O ID da coluna a ser filtrada.
 * @param {string} value - O valor pelo qual filtrar.
 * @param {Function} addMeta - Uma função para adicionar metadados ao resultado do filtro.
 * @returns {boolean} - Se o filtro foi aprovado para a linha e o valor fornecidos.
 */
export const fuzzyFilter = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);
    // Store the itemRank info
    addMeta({
        itemRank,
    });
    // Return if the item should be filtered in/out
    return itemRank.passed;
};
