/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { isDate, formatObs } from "../../utils/functions";

export default function LicenseRegister() {
  const [unit, setUnit] = useState<[]>([]);
  const [type, setType] = useState<[]>([]);
  const [subunit, setSubunit] = useState<[]>([]);
  const [emitter, setEmitter] = useState<[]>([]);
  const [sector, setSector] = useState<[]>([]);

  /* 
    O trecho de código `const { user }: any = useAuth()` está desestruturarando o objeto `user` a partir do resultado do hook `useAuth()`.
    O código está usando a sintaxe TypeScript para especificar o tipo da variável `user` como `any`, o que significa que ela pode conter qualquer tipo de valor. 
  */
  const { user }: any = useAuth();

  /* 
    O trecho de código abaixo está usando o hook `useRef` do React para criar múltiplas referências para
    elementos diferentes em um componente React TypeScript. Cada hook `useRef` é atribuído a um elemento
    elemento específico ou referência de componente usando o atributo `ref`. Essas referências podem ser usadas para acessar e
    manipular os elementos correspondentes na lógica do componente. 
  */
  const areaRef: any = useRef(null);
  const unitRef: any = useRef(null);
  const subunitRef: any = useRef(null);
  const requirementDateRef: any = useRef(null);
  const controlRef: any = useRef(null);
  const emitterRef: any = useRef(null);
  const typeRef: any = useRef(null);
  const specificationRef: any = useRef(null);
  const licenseNumberRef: any = useRef(null);
  const fceiRef: any = useRef(null);
  const sinfatRef: any = useRef(null);
  const sgpeRef: any = useRef(null);
  const seiRef: any = useRef(null);
  const emitterDateRef: any = useRef(null);
  const dueDateRef: any = useRef(null);
  const previsionRef: any = useRef(null);
  const requirementRef: any = useRef(null);
  const protocolDateRef: any = useRef(null);
  const newLicenseIssuedRef: any = useRef(null);
  const processSituationRef: any = useRef(null);
  const updatedSaRef: any = useRef(null);
  const observationsRef: any = useRef(null);
  const setorRef: any = useRef(null);

  async function isPosted(posted: object) {
    return posted
      ? alert("Nova Licença não Adicionada...")
      : alert("Nova Licença Adicionada...");
  }

  /**
   * A função `postData` envia um pedido POST para um endpoint API especificado com um parâmetro JSON e
   * e trata a resposta de acordo.
   * @param {object} jsonParam - O parâmetro `jsonParam` é um objeto que contém os dados a serem enviados
   * no pedido POST para o servidor. Ele é usado como o payload para a requisição POST para o
   * "/insertDados.php".
   */
  async function postData(jsonParam: object) {
    await api
      .post("licencas/insertDados.php", jsonParam)
      .then((response) => {
        isPosted(response.data.posted);
      })
      .catch((err) => {
        console.error("Catch Error:" + err);
      });
  }

  /**
   * A função `handleSubmit` lida com o envio de formulários formatando os dados de entrada e enviando-os para um endpoint.
   * @param event - O parâmetro `event` na função `handleSubmit` é do tipo
   * `React.FormEvent<HTMLFormElement>`. Este parâmetro representa o evento de submissão de formulário em uma aplicação React.
   * Ao chamar `event.preventDefault()`, você impede o comportamento padrão de envio de formulários,
   * permitindo que você manipule os dados do formulário de forma personalizada.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requerimentDate = isDate(requirementDateRef.current.value);
    const emitterDate = isDate(emitterDateRef.current.value);
    const dueDate = isDate(dueDateRef.current.value);
    const protocolDate = isDate(protocolDateRef.current.value);

    const observation = formatObs(observationsRef.current.value);

    /* 
      O objeto chamado `jsonData` está sendo preenchido com valores obtidos de várias referências (`areaRef`, `unitRef`, `subunitRef`,
      etc.) que estão referenciando elementos de entrada em um formulário. Uma vez que o objeto `jsonData` é
      preenchido, ele é então passado para uma função `postData` para processamento posterior.
    */
    const jsonData = {
      area: areaRef.current.value,
      unidade: unitRef.current.value,
      subunidade: subunitRef.current.value,
      data_requerimento: requerimentDate,
      controle: controlRef.current.value,
      orgao_emissor: emitterRef.current.value,
      tipo: typeRef.current.value,
      especificacao: specificationRef.current.value,
      numero_licenca: licenseNumberRef.current.value,
      fcei_sinfat: fceiRef.current.value,
      num_processo_sinfat: sinfatRef.current.value,
      sgpe: sgpeRef.current.value,
      num_processo_sei: seiRef.current.value,
      data_emissao: emitterDate,
      data_vencimento: dueDate,
      previsao: previsionRef.current.value,
      requerimento: requirementRef.current.value,
      data_protocolo_orgao: protocolDate,
      emitida_nova_licenca: newLicenseIssuedRef.current.value,
      situacao_processo: processSituationRef.current.value,
      atualizado_sa: updatedSaRef.current.value,
      observacoes: observation,
      setor: setorRef.current.value,
      username: user.username,
    };
    postData(jsonData);
  };

  /* 
    O código abaixo é um hook `useEffect` do React que faz uma chamada assíncrona à API para obter dados de
    do endpoint "/campos/campos.php". Uma vez que os dados são obtidos com sucesso, ele está definindo os valores de estado
    para unidade, tipo, subunidade, orgão emissor e setor usando os dados de resposta. Este hook `useEffect` é executado apenas uma vez quando
    o componente é montado (matriz de dependências vazia []). 
    Serve para alimentar os campos de seleção com muitas unidades
  */

  useEffect(() => {
    async function getData() {
      await api
        .get("/campos/campos.php")
        .then((response) => {
          setUnit(response.data.unidade);
          setType(response.data.tipo);
          setSubunit(response.data.subunidade);
          setEmitter(response.data.orgao_emissor);
          setSector(response.data.setor);
        })
        .catch((err) => {
          console.error("Catch Error:" + err);
        });
    }
    getData();
  }, []);

  return (
    <>
      <div className="max-h-[7%] text-center p-5 text-3xl font-bold">
        Nova Licença
      </div>
      <div className="p-3 max-h-[80%] w-full flex justify-center">
        <div className="w-[95%] overflow-auto">
          <form
            className="relative w-full max-w-none h-auto text-sm"
            onSubmit={handleSubmit}
          >
            <div className="px-12">
              <div className="grid grid-cols-6 gap-5">
                <div className="col-span-6 md:col-span-2">
                  <label className="inline-flex items-center text-sm font-medium text-gray-700">
                    Área: <p className="text-red-500">*</p>
                  </label>

                  <select
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={areaRef}
                    id="area"
                    required
                  >
                    <option value=""></option>
                    <option value="Água">Água</option>
                    <option value="Esgoto">Esgoto</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                <div className="col-span-6 md:col-span-2">
                  <label className="inline-flex items-center text-sm font-medium text-gray-700">
                    Unidade: <p className="text-red-500">*</p>
                  </label>
                  <select
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    id="unit"
                    ref={unitRef}
                    required
                  >
                    <option value=""></option>
                    {unit.map((el) => {
                      return (
                        <option key={el} value={el}>
                          {el}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="col-span-6 md:col-span-2">
                  <label className="inline-flex items-center text-sm font-medium text-gray-700">
                    Subunidade
                  </label>

                  <select
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    id="subunit"
                    ref={subunitRef}
                  >
                    <option value=""></option>
                    {subunit.map((el) => {
                      return (
                        <option key={el} value={el}>
                          {el}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label className="inline-flex items-center text-sm font-medium text-gray-700">
                    Data de Requerimento:
                  </label>
                  <input
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={requirementDateRef}
                    id="requirementDate"
                    type="date"
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label className="inline-flex items-center text-sm font-medium text-gray-700">
                    Controle: <p className="text-red-500">*</p>
                  </label>
                  <select
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={controlRef}
                    id="control"
                    required
                  >
                    <option value=""></option>
                    <option value="Autorização">Autorização</option>
                    <option value="Licenciamento">Licenciamento</option>
                    <option value="Protocolo">Protocolo</option>
                    <option value="Info_Complementar">
                      Informação Complementar
                    </option>
                  </select>
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label className="inline-flex items-center text-sm font-medium text-gray-700">
                    Orgão Emissor: <p className="text-red-500">*</p>
                  </label>
                  <select
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    id="emitter"
                    ref={emitterRef}
                    required
                  >
                    <option value=""></option>
                    {emitter.map((el) => {
                      return (
                        <option key={el} value={el}>
                          {el}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label className="inline-flex items-center text-sm font-medium text-gray-700">
                    Tipo: <p className="text-red-500">*</p>
                  </label>
                  <select
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    id="type"
                    ref={typeRef}
                    required
                  >
                    <option value=""></option>
                    {type.map((el) => {
                      return (
                        <option key={el} value={el}>
                          {el}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label className="inline-flex items-center text-sm font-medium text-gray-700">
                    Especificação:
                  </label>
                  <select
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={specificationRef}
                    id="specification"
                  >
                    <option value=""></option>
                    <option value="1ª">1ª</option>
                    <option value="2ª">2ª</option>
                    <option value="3ª">3ª</option>
                    <option value="4ª">4ª</option>
                    <option value="5ª">5ª</option>
                    <option value="6ª">6ª</option>
                    <option value="7ª">7ª</option>
                    <option value="Ampliação">Ampliação</option>
                    <option value="Corretiva">Corretiva</option>
                  </select>
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label className="inline-flex items-center text-sm font-medium text-gray-700">
                    Número da Licença: <p className="text-red-500">*</p>
                  </label>
                  <input
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={licenseNumberRef}
                    id="licenseNumber"
                    type="text"
                    required
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label className="inline-flex items-center text-sm font-medium text-gray-700">
                    FCEI/SINFAT:
                  </label>
                  <input
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={fceiRef}
                    id="fcei"
                    type="text"
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label className="inline-flex items-center text-sm font-medium text-gray-700">
                    Processo SINFAT:
                  </label>
                  <input
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={sinfatRef}
                    id="sinfat"
                    type="text"
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label className="inline-flex items-center text-sm font-medium text-gray-700">
                    SGPE:
                  </label>
                  <input
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={sgpeRef}
                    id="sgpe"
                    type="text"
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label className="inline-flex items-center text-sm font-medium text-gray-700">
                    Processo SEI: <p className="text-red-500">*</p>
                  </label>
                  <input
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={seiRef}
                    id="sei"
                    type="text"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <label className="inline-flex items-center text-sm font-medium text-gray-700">
                    Data de Emissão:
                  </label>
                  <input
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={emitterDateRef}
                    id="emitterDate"
                    type="date"
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label className="inline-flex items-center text-sm font-medium text-gray-700">
                    Data de Vencimento: <p className="text-red-500">*</p>
                  </label>
                  <input
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={dueDateRef}
                    id="dueDate"
                    type="date"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <label className="inline-flex items-center text-sm font-medium text-gray-700">
                    Previsão: <p className="text-red-500">*</p>
                  </label>
                  <select
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={previsionRef}
                    id="prevision"
                    required
                  >
                    <option value=""></option>
                    <option value="Prorrogar">Prorrogar</option>
                    <option value="Não Prorrogar">Não Prorrogar</option>
                    <option value="Renovar">Renovar</option>
                    <option value="Não Renovar">Não Renovar</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <label className="inline-flex items-center text-sm font-medium text-gray-700">
                    Requerimento:
                  </label>
                  <select
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={requirementRef}
                    id="requirement"
                  >
                    <option value=""></option>
                    <option value="SIM">SIM</option>
                    <option value="NÃO">NÃO</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <label className="inline-flex items-center text-sm font-medium text-gray-700">
                    Data de Protocolo do Orgão:{" "}
                  </label>
                  <input
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={protocolDateRef}
                    id="protocolDate"
                    type="date"
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label className="inline-flex items-center text-sm font-medium text-gray-700">
                    Emitida Nova Licença?: <p className="text-red-500">*</p>
                  </label>
                  <select
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={newLicenseIssuedRef}
                    id="newLicenseIssued"
                    required
                  >
                    <option value=""></option>
                    <option value="SIM">SIM</option>
                    <option value="NÃO">NÃO</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <label className="inline-flex items-center text-sm font-medium text-gray-700">
                    Situação do Processo: <p className="text-red-500">*</p>
                  </label>
                  <select
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={processSituationRef}
                    id="processSituation"
                    required
                  >
                    <option value=""></option>
                    <option value="Em Andamento">Em Andamento</option>
                    <option value="Concluído">Concluído</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-1">
                  <label className="inline-flex items-center text-sm font-medium text-gray-700">
                    Atualizada na SA?: <p className="text-red-500">*</p>
                  </label>
                  <select
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={updatedSaRef}
                    id="updatedSa"
                    required
                  >
                    <option value=""></option>
                    <option value="SIM">SIM</option>
                    <option value="NÃO">NÃO</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-1">
                  <label className="inline-flex items-center text-sm font-medium text-gray-700">
                    Setor Responsável: <p className="text-red-500">*</p>
                  </label>
                  <select
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={setorRef}
                    id="setor"
                    required
                  >
                    <option value=""></option>
                    {sector.map((el) => {
                      return (
                        <option key={el} value={el}>
                          {el}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <label className="inline-flex items-center text-sm font-medium text-gray-700">
                    Observações: <p className="text-red-500">*</p>
                  </label>
                  <textarea
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={observationsRef}
                    id="observations"
                    required
                  />
                </div>
              </div>
              <div className="py-6 text-right">
                <button
                  type="submit"
                  className="w-56 px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm close-modal hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                >
                  Salvar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
