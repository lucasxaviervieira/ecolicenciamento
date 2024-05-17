/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import Modal from "../../utils/Modal";
import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { isDate, formatObs } from "../../utils/functions";

export default function ModalEdit({ wasSubmited }: any) {
  const [unit, setUnit] = useState<[]>([]);
  const [type, setType] = useState<[]>([]);
  const [subunit, setSubunit] = useState<[]>([]);
  const [emitter, setEmitter] = useState<[]>([]);
  const [sector, setSector] = useState<[]>([]);

  const [isLoadingHidden, setIsLoadingHidden] = useState(true);

  /* 
    O trecho de código abaixo está usando o hook `useState` do React para criar uma variável de estado chamada
    `submited` com um valor inicial de `1`. A função `setSubmited` pode ser usada para atualizar o valor
    da variável de estado `submited`. 
  */
  const [submited, setSubmited] = useState(1);

  /* 
    O trecho de código `const { user }: any = useAuth()` está desestruturarando o objeto `user` a partir do resultado do hook `useAuth()`.
    O código está usando a sintaxe TypeScript para especificar o tipo da variável `user` como `any`, o que significa que ela pode conter qualquer tipo de valor. 
  */
  const { user }: any = useAuth();

  const modal = new Modal();

  const closeModal = () => {
    modal.closeMe();
    setIsLoadingHidden(false);
    setTimeout(() => {
      setIsLoadingHidden(true);
    }, 500);
  };

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
  const responsibleSectorRef: any = useRef(null);
  const processSituationRef: any = useRef(null);
  const updatedSaRef: any = useRef(null);
  const observationsRef: any = useRef(null);

  /**
   * Atualiza os dados de forma assíncrona enviando uma solicitação PUT ao servidor com os dados JSON fornecidos.
   * @param {object} jsonParam - Os dados em JSON para serem enviados ao endpoint.
   */
  async function updatedData(jsonParam: object) {
    await api
      .put("licencas/updateDados.php", jsonParam)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.error("Catch Error:" + err);
      });
  }

  function getJsonData() {
    const requerimentDate = isDate(requirementDateRef.current.value);
    const emitterDate = isDate(emitterDateRef.current.value);
    const dueDate = isDate(dueDateRef.current.value);
    const protocolDate = isDate(protocolDateRef.current.value);

    const observation = formatObs(observationsRef.current.value);

    /* 
      O objeto chamado `jsonData` está sendo preenchido com valores obtidos de várias referências (`areaRef`, `unitRef`, `subunitRef`,
      etc.) que estão referenciando elementos de entrada em um formulário. Uma vez que o objeto `jsonData` é
      preenchido, ele é então passado para uma função `updatedData` para processamento posterior.
    */
    return {
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
      setor: responsibleSectorRef.current.value,
      id: document.getElementById("myId")?.textContent,
      username: user.username,
    };
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoadingHidden(false);

    event.preventDefault();

    const jsonData = getJsonData();

    await updatedData(jsonData);

    /*
    O código `wasSubmited` refere-se ao componente `ModalEdit`, pois o mesmo é utilizado no componente Pai, Datatable, 
    por isso é necessário que a const `submited` seja passada a ele, pois somente assim o seu componente Pai, 
    tem ciência de que o componente Filho, teve algum evento ativado, nesse caso, quando o formulário é submetido. 
    */
    wasSubmited(submited);

    /* 
    Esse trecho de código abaixo, aumenta o valor de `submited` toda vez que sua função é chamada, 
    como se fosse um contador.
    */
    setSubmited(submited + 1);

    closeModal();

    setTimeout(() => {
      setIsLoadingHidden(true);
    }, 500);
  };

  /* 
    O código abaixo é um hook `useEffect` do React que faz uma chamada assíncrona à API para obter dados de
    do endpoint "/campos/campos.php". Uma vez que os dados são obtidos com sucesso, ele está definindo os valores de estado
    para unidade, tipo, subunidade, orgão emissor e setor usando os dados de resposta. Este hook `useEffect` é executado apenas uma vez quando
    o componente é montado (matriz de dependências vazia []). 
    Serve para alimentar os campos de seleção que têm muitas unidades
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

  const hidden = isLoadingHidden ? "hidden" : "";

  const classNameText = `${hidden} transition delay-150 absolute top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-gray-50 opacity-75`;

  return (
    <>
      <div className={classNameText}>
        <span className="relative flex h-56 w-56">
          <span className="animate-ping transition delay-0 absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        </span>
      </div>

      <div className="fixed inset-0 z-30 hidden overflow-y-auto modal">
        <div className="flex items-center justify-center min-h-screen pt-4 pb-20 text-center">
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>

          <div className="inline-block pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl w-[95%] sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 text-center">
              Licença:
            </h3>
            <h4 className="text-md text-gray-500 text-center">
              Editar Licença
            </h4>
            <form onSubmit={handleSubmit} className="content mt-3">
              <div className="grid grid-cols-6 gap-5">
                <div className="col-span-6 md:col-span-2">
                  <label className="inline-flex items-center text-sm font-medium text-gray-700">
                    ID:
                  </label>
                  <div
                    className="mt-1 py-2 px-3 block w-full text-white font-bold sm:text-sm rounded-md rounded bg-slate-500 border border-slate-500 shadow-sm"
                    id="myId"
                  ></div>
                </div>

                <div className="col-span-6 md:col-span-2">
                  <label
                    htmlFor="area"
                    className="inline-flex items-center text-sm font-medium text-gray-700"
                  >
                    Área: <p className="text-red-500">*</p>
                  </label>
                  <select
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md rounded py-2"
                    ref={areaRef}
                    name="area"
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
                  <label
                    htmlFor="unit"
                    className="inline-flex items-center text-sm font-medium text-gray-700"
                  >
                    Unidade: <p className="text-red-500">*</p>
                  </label>
                  <select
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    name="unit"
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

                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="subunit"
                    className="inline-flex items-center text-sm font-medium text-gray-700"
                  >
                    Subunidade:
                  </label>

                  <select
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    name="subunit"
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
                    Data de Requerimento: <p className="text-red-500">*</p>
                  </label>
                  <input
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={requirementDateRef}
                    id="requirementDate"
                    type="date"
                    required
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="control"
                    className="inline-flex items-center text-sm font-medium text-gray-700"
                  >
                    Controle: <p className="text-red-500">*</p>
                  </label>
                  <select
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={controlRef}
                    name="control"
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
                  <label
                    htmlFor="emitter"
                    className="inline-flex items-center text-sm font-medium text-gray-700"
                  >
                    Orgão Emissor: <p className="text-red-500">*</p>
                  </label>
                  <select
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    name="emitter"
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
                  <label
                    htmlFor="type"
                    className="inline-flex items-center text-sm font-medium text-gray-700"
                  >
                    Tipo: <p className="text-red-500">*</p>
                  </label>
                  <select
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    name="type"
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
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                    N° Licença: <p className="text-red-500">*</p>
                  </label>
                  <input
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={fceiRef}
                    id="fcei"
                    type="text"
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label className="inline-flex items-center text-sm font-medium text-gray-700">
                    Processo do SINFAT:
                  </label>
                  <input
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={seiRef}
                    id="sei"
                    type="text"
                    required
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="emitterDate"
                    className="inline-flex items-center text-sm font-medium text-gray-700"
                  >
                    Data de Emissão: <p className="text-red-500">*</p>
                  </label>
                  <input
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={emitterDateRef}
                    id="emitterDate"
                    type="date"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="dueDate"
                    className="inline-flex items-center text-sm font-medium text-gray-700"
                  >
                    Data de Vencimento: <p className="text-red-500">*</p>
                  </label>
                  <input
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={dueDateRef}
                    id="dueDate"
                    type="date"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="prevision"
                    className="inline-flex items-center text-sm font-medium text-gray-700"
                  >
                    Previsão: <p className="text-red-500">*</p>
                  </label>
                  <select
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={previsionRef}
                    name="prevision"
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
                <div className="col-span-6 sm:col-span-1">
                  <label
                    htmlFor="requirement"
                    className="inline-flex items-center text-sm font-medium text-gray-700"
                  >
                    Requerimento: <p className="text-red-500">*</p>
                  </label>
                  <select
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={requirementRef}
                    name="requirement"
                    id="requirement"
                    required
                  >
                    <option value=""></option>
                    <option value="SIM">SIM</option>
                    <option value="NÃO">NÃO</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-1">
                  <label
                    htmlFor="newLicenseIssued"
                    className="truncate inline-flex items-center text-sm font-medium text-gray-700"
                  >
                    Emitida Nova Lic?: <p className="text-red-500">*</p>
                  </label>
                  <select
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={newLicenseIssuedRef}
                    name="newLicenseIssued"
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
                    Data de Protocolo: <p className="text-red-500">*</p>
                  </label>
                  <input
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={protocolDateRef}
                    id="protocolDate"
                    type="date"
                    required
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label className="inline-flex items-center text-sm font-medium text-gray-700">
                    Setor Responsável: <p className="text-red-500">*</p>
                  </label>
                  <select
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    id="responsibleSector"
                    ref={responsibleSectorRef}
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

                <div className="col-span-6 sm:col-span-1">
                  <label
                    htmlFor="processSituation"
                    className="truncate inline-flex items-center text-sm font-medium text-gray-700"
                  >
                    Sit. do Processo: <p className="text-red-500">*</p>
                  </label>
                  <select
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={processSituationRef}
                    name="processSituation"
                    id="processSituation"
                    required
                  >
                    <option value=""></option>
                    <option value="Em Andamento">Em Andamento</option>
                    <option value="Concluído">Concluído</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-1">
                  <label
                    htmlFor="updatedSa"
                    className="truncate inline-flex items-center text-sm font-medium text-gray-700"
                  >
                    Atualizada na SA?: <p className="text-red-500">*</p>
                  </label>
                  <select
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={updatedSaRef}
                    name="updatedSa"
                    id="updatedSa"
                    required
                  >
                    <option value=""></option>
                    <option value="SIM">SIM</option>
                    <option value="NÃO">NÃO</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <label className="inline-flex items-center text-sm font-medium text-gray-700">
                    Observações: <p className="text-red-500">*</p>
                  </label>
                  <textarea
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ref={observationsRef}
                    id="observations"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-x-4 mt-4">
                <button
                  className="w-56 px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm close-modal hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                  type="submit"
                >
                  Salvar
                </button>
                <button
                  onClick={closeModal}
                  type="button"
                  className="w-56 px-4 py-2 text-base font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm close-modal hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                >
                  Cancelar Operação
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
