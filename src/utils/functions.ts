/**
 * A função `classNames` em TypeScript filtra os valores falsos de um array de strings e junta os
 * os valores restantes com um espaço.
 * pois trabalha com componentes, que hora estão ativos, outrora inativos
 * @param {string[]} classes - A função `classNames` recebe um array de strings como parâmetro,
 * que representa as classes CSS que você quer combinar e retornar como uma única string.
 * @returns A função `classNames` está sendo retornada.
 */
export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
/**
 * A função `classNames` em TypeScript filtra os valores falsos de um array de strings e junta os
 * os valores restantes com um espaço.
 * pois trabalha com componentes, que hora estão ativos, outrora inativos
 * @param {string[]} classes - A função `classNames` recebe um array de strings como parâmetro,
 * que representa as classes CSS que você quer combinar e retornar como uma única string.
 * @returns A função `classNames` está sendo retornada.
 */
/**
 * A função handleClickReload no TypeScript recarrega a página ao ser acionada.
 */
export function handleClickReload() {
  window.location.reload();
}

/**
 * A função `getColumnName` devolve o nome da coluna correspondente com base na chave da cadeia de caracteres de entrada.
 * @param {string} string - A função `getColumnName` recebe um parâmetro string e retorna o nome da coluna
 * @returns A função `getColumnName` retorna o nome da coluna correspondente à string de entrada. Por
 * Por exemplo, se você passar "area" como a string de entrada, a função retornará "Área".
 */

export function getColumnName(string: string) {
  return {
    button: "#",
    id: "ID",
    area: "Área",
    unidade: "Unidade",
    sub_unidade: "Subunidade",
    data_requerimento: "Data de Requerimento",
    controle: "Controle",
    orgao_emissor: "Orgão Emissor",
    tipo: "Tipo",
    especificacao: "Especificação",
    numero_licenca: "Número da Licença",
    fcei_sinfat: "FCEI/SINFAT",
    num_processo_sinfat: "Processo do SINFAT",
    sgpe: "SGPE",
    num_processo_sei: "Processo SEI",
    data_emissao: "Data de emissão",
    data_vencimento: "Data de Vencimento",
    previsao: "Previsão",
    requerimento: "Requerimento",
    data_protocolo_orgao: "Data De Protocolo",
    emitida_nova_licenca: "Nova Licença Emitida?",
    situacao_processo: "Situação do Processo",
    atualizado_sa: "Atualizado na SA?",
    setor_responsavel: "Setor Responsável",
    dias_para_vencer: "Dias para vencer",
    observacoes: "Observações",
    providenciar_doc: "Providenciar Doc.",
    datalimite: "Data Limite",
    tempo_tramitacao: "Tempo de Tramitação",
    situacao_licenca: "Situação da Licença",
    agenda: "Agenda",
  }[string];
}
/**
 * A função `paintCell` recebe um string input representando um status e retorna um nome de classe CSS para
 * para estilizar com base no status.
 * @param {string} info - A função `paintCell` recebe uma string como parâmetro `info`
 * @returns A função `paintCell` recebe uma string de entrada `info` e com base no valor de `info`, ela
 * retorna um nome de classe CSS que corresponde a um esquema de cores específico.
 */
export function paintCell(info: string) {
  switch (info) {
    case "Vigente": {
      // GREEN
      return "text-white bg-green-400";
    }
    case "Vigente - Providenciar Documentos": {
      // YELLOW
      return "bg-yellow-200";
    }
    case "Processo Concluído": {
      // BLUE
      return "text-white bg-blue-500";
    }
    case "Inválida": {
      // ORANGE
      return "bg-orange-200";
    }
    case "Em renovação": {
      // GREEN
      return "text-gray-700 bg-green-200";
    }
    case "Aguardando análise": {
      // SKY
      return "text-gray-800 bg-sky-300";
    }
    case "Vencida": {
      // RED
      return "text-white bg-red-600";
    }
    default: {
      return "";
    }
  }
}

/**
 * A função `formatDateHour` recebe uma string de entrada no formato "YYYY-MM-DD HH:MM:SS" e retorna
 * um array com a data formatada como "YYYY/MM/DD" e a hora.
 * @param {string} input - A função `formatDateHour` recebe uma string no formato "YYYY-MM-DD
 * HH:MM:SS" e divide-a em duas partes - a data e a hora. A parte da data é então formatada por
 * substituindo os traços por barras e devolvida juntamente com a parte da hora.
 * @returns Um array contendo a data formatada e a hora que está sendo retornada.
 */
export function formatDateHour(input: string) {
  const [date, hour] = input.split(" ");
  const dateParts = date.split("-");
  const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

  return [formattedDate, hour];
}

/**
 * Converte uma string de data do formato "YYYY-MM-DD" para "DD/MM/YYYY".
 * @param {string} date - A string de data no formato "YYYY-MM-DD".
 * @returns {string} A string de data convertida para o formato "DD/MM/YYYY".
 */
function DateToBrDate(date: string): string {
  const dateParts = date.split("-");
  const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

  return formattedDate;
}

/**
 * Verifica se a entrada é uma string de data válida e a converte para o formato de data brasileiro.
 * @param {string} date - A string de data a ser verificada e convertida.
 * @returns A data no formato de data brasileira ou "-" se a entrada não for uma data válida.
 */
export function isDate(date: string) {
  return !date ? "-" : DateToBrDate(date);
}

/**
 * A função `formatName` recebe um nome no formato "first.last" e retorna um array com o
 * nome completo formatado e um endereço de correio eletrónico baseado no nome introduzido.
 * @param {string} name - A função `formatName` recebe um parâmetro `name` que deve ser uma
 * string no formato "firstName.lastName".
 * @retorno A função `formatName` retorna um array contendo o nome completo formatado (com a
 * (com a primeira letra de cada parte em maiúscula) e um endereço de e-mail baseado no nome de entrada.
 */
export function formatName(name: string) {
  const [firstName, lastName] = name.split(".");
  const formattedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const formattedLastName =
    lastName.charAt(0).toUpperCase() + lastName.slice(1);
  return [
    `${formattedFirstName} ${formattedLastName}`,
    `${name}@aguasdejoinville.com`,
  ];
}

/**
 * A função `formatObs` corta qualquer espaço em branco à esquerda ou à direita de uma determinada string.
 * @param {string} obs - A função `formatObs` recebe uma string de entrada `obs` e retorna a versão
 * A função `formatObs` recebe uma string de entrada `obs` e retorna a versão aparada da string removendo qualquer espaço em branco à frente e atrás.
 * @retorno A função `formatObs` retorna a versão cortada da string de entrada `obs`. Exemplo: parâmetro:` Observação  `, retorno:`Observação`
 */
export function formatObs(obs: string) {
  return obs.trim();
}

export function isValue(value: string) {
  return value ? value : "Nenhuma informação...";
}
