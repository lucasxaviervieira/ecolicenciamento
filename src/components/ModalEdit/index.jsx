/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Modal from "../../utils/Modal";
import getFieldsModalEdit from "../../services/fields";
import updateLicences from "../../services/licences/update";
import { useAuth } from "../../hooks/useAuth";
import { verifyNumber } from "../../utils/functions";
export default function ModalEdit({ wasSubmited }) {

  const [areas, setAreas] = useState([]);
  const [controllers, setControllers] = useState([]);
  const [specifications, setSpecifications] = useState([]);
  const [emitters, setEmitters] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [situationProcesses, setSituationProcesses] = useState([]);
  const [subunits, setSubunits] = useState([]);
  const [types, setTypes] = useState([]);
  const [units, setUnits] = useState([]);


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
  const { user, token } = useAuth();

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
  const myIdRef = useRef(null);
  const areaRef = useRef(null);
  const unitRef = useRef(null);
  const subunitRef = useRef(null);
  const requirementDateRef = useRef(null);
  const controlRef = useRef(null);
  const emitterRef = useRef(null);
  const typeRef = useRef(null);
  const specificationRef = useRef(null);
  const licenseNumberRef = useRef(null);
  const fceiRef = useRef(null);
  const sinfatRef = useRef(null);
  const sgpeRef = useRef(null);
  const seiRef = useRef(null);
  const emitterDateRef = useRef(null);
  const dueDateRef = useRef(null);
  const previsionRef = useRef(null);
  const requirementRef = useRef(null);
  const protocolDateRef = useRef(null);
  const newLicenseIssuedRef = useRef(null);
  const responsibleSectorRef = useRef(null);
  const processSituationRef = useRef(null);
  const updatedSaRef = useRef(null);
  const observationsRef = useRef(null);


  /**
   * Atualiza os dados de forma assíncrona enviando uma solicitação PUT ao servidor com os dados JSON fornecidos.
   * @param {object} jsonParam - Os dados em JSON para serem enviados ao endpoint.
   */

  async function updateData(body) {
    try {
      const data = await updateLicences(token, myIdRef, body);
      console.log("Dados recebidos:", data);
    } catch (error) {
      console.error("Erro ao criar licença:", error);
    }
  };


  function getEditInfo() {
    const bodyInfo = {
      usuario: {
        usuario: user
      },
      licenca: {
        area: {
          ativo: "s",
          id: verifyNumber(areaRef.current.value)
        },
        unidade: {
          id: verifyNumber(unitRef.current.value)
        },
        subUnidade: {
          id: verifyNumber(subunitRef.current.value)
        },
        dataRequerimento: requirementDateRef.current.value,
        controle: {
          id: verifyNumber(controlRef.current.value)
        },
        orgao: {
          id: verifyNumber(emitterRef.current.value)
        },
        tipo: {
          ativo: "s",
          id: verifyNumber(typeRef.current.value)
        },
        especificacao: {
          ativo: "s",
          id: verifyNumber(specificationRef.current.value)
        },
        previsao: {
          ativo: "s",
          id: verifyNumber(previsionRef.current.value)
        },
        requerimento: {
          ativo: "s",
          id: verifyNumber(requirementRef.current.value)
        },
        emitidaNovaLicenca: {
          ativo: "s",
          id: verifyNumber(newLicenseIssuedRef.current.value)
        },
        situacaoProcesso: {
          ativo: "s",
          id: verifyNumber(processSituationRef.current.value)
        },
        atualizadoSa: {
          ativo: "s",
          id: verifyNumber(updatedSaRef.current.value)
        },
        setorResponsavel: {
          ativo: "s",
          id: verifyNumber(responsibleSectorRef.current.value)
        },
        numLicenca: licenseNumberRef.current.value,
        fceiSinfat: fceiRef.current.value,
        numProcessoSinfat: sinfatRef.current.value,
        sgpe: sgpeRef.current.value,
        processoSei: seiRef.current.value,
        dataEmissao: emitterDateRef.current.value,
        dataVencimento: dueDateRef.current.value,
        dataProcotoloOrgao: protocolDateRef.current.value,
        observacoes: observationsRef.current.value.trim(),
        ativo: "s"
      }
    }
    return bodyInfo;
  };

  const handleSubmit = async (event) => {
    setIsLoadingHidden(false);
    event.preventDefault();
    const editInfo = getEditInfo();
    await updateData(editInfo);

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
    const fetchFieldsModalEdit = async () => {
      try {
        const newData = await getFieldsModalEdit(token);

        setAreas(newData.areas)
        setControllers(newData.controles)
        setSpecifications(newData.especificacaos)
        setEmitters(newData.orgaoEmissors)
        setPredictions(newData.previsoes)
        setSectors(newData.setores)
        setSituationProcesses(newData.situcoesProcessos)
        setSubunits(newData.subUnidades)
        setTypes(newData.tipos)
        setUnits(newData.unidades)
      } catch (error) {
        console.error("Erro ao buscar campos:", error);
      }
    };
    fetchFieldsModalEdit();
  }, []);

  const hidden = isLoadingHidden ? "hidden" : "";
  const classNameText = `${hidden} transition delay-150 absolute top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-gray-50 opacity-75`;
  return (<>
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
                {/* <div className="mt-1 py-2 px-3 block w-full text-white font-bold sm:text-sm rounded-md rounded bg-slate-500 border border-slate-500 shadow-sm" id="myId"></div> */}
                <input
                  ref={myIdRef} name="myId" id="myId" disabled required
                  className="mt-1 py-2 px-3 block w-full text-white font-bold sm:text-sm rounded-md rounded bg-slate-500 border border-slate-500 shadow-sm"
                />
              </div>

              <div className="col-span-6 md:col-span-2">
                <label htmlFor="area" className="inline-flex items-center text-sm font-medium text-gray-700">
                  Área: <p className="text-red-500">*</p>
                </label>
                <select className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md rounded py-2" ref={areaRef} name="area" id="area" required>
                  <option value=""></option>
                  {areas.map((el) => {
                    return (<option key={el.id} value={el.id}>
                      {el.descricao}
                    </option>);
                  })}
                </select>
              </div>

              <div className="col-span-6 md:col-span-2">
                <label htmlFor="unit" className="inline-flex items-center text-sm font-medium text-gray-700">
                  Unidade: <p className="text-red-500">*</p>
                </label>
                <select className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" name="unit" id="unit" ref={unitRef} required>
                  <option value=""></option>
                  {units.map((el) => {
                    return (<option key={el.id} value={el.id}>
                      {el.descricao}
                    </option>);
                  })}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label htmlFor="subunit" className="inline-flex items-center text-sm font-medium text-gray-700">
                  Subunidade:
                </label>

                <select className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" name="subunit" id="subunit" ref={subunitRef}>
                  <option value=""></option>
                  {subunits.map((el) => {
                    return (<option key={el.id} value={el.id}>
                      {el.descricao}
                    </option>);
                  })}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  Data de Requerimento: <p className="text-red-500">*</p>
                </label>
                <input className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={requirementDateRef} id="requirementDate" type="date" required />
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label htmlFor="control" className="inline-flex items-center text-sm font-medium text-gray-700">
                  Controle: <p className="text-red-500">*</p>
                </label>
                <select className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={controlRef} name="control" id="control" required>
                  <option value=""></option>
                  {controllers.map((el) => {
                    return (<option key={el.id} value={el.id}>
                      {el.descricao}
                    </option>);
                  })}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label htmlFor="emitter" className="inline-flex items-center text-sm font-medium text-gray-700">
                  Orgão Emissor: <p className="text-red-500">*</p>
                </label>
                <select className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" name="emitter" id="emitter" ref={emitterRef} required>
                  <option value=""></option>
                  {emitters.map((el) => {
                    return (<option key={el.id} value={el.id}>
                      {el.descricao}
                    </option>);
                  })}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label htmlFor="type" className="inline-flex items-center text-sm font-medium text-gray-700">
                  Tipo: <p className="text-red-500">*</p>
                </label>
                <select className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" name="type" id="type" ref={typeRef} required>
                  <option value=""></option>
                  {types.map((el) => {
                    return (<option key={el.id} value={el.id}>
                      {el.descricao}
                    </option>);
                  })}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  Especificação:
                </label>
                <select className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={specificationRef} id="specification">
                  <option value=""></option>
                  {specifications.map((el) => {
                    return (<option key={el.id} value={el.id}>
                      {el.descricao}
                    </option>);
                  })}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  N° Licença: <p className="text-red-500">*</p>
                </label>
                <input className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={licenseNumberRef} id="licenseNumber" type="text" required />
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  FCEI/SINFAT:
                </label>
                <input className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={fceiRef} id="fcei" type="text" />
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  Processo do SINFAT:
                </label>
                <input className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={sinfatRef} id="sinfat" type="text" />
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  SGPE:
                </label>
                <input className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={sgpeRef} id="sgpe" type="text" />
              </div>
              <div className="col-span-6 sm:col-span-2">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  Processo SEI: <p className="text-red-500">*</p>
                </label>
                <input className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={seiRef} id="sei" type="text" required />
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label htmlFor="emitterDate" className="inline-flex items-center text-sm font-medium text-gray-700">
                  Data de Emissão:
                </label>
                <input className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={emitterDateRef} id="emitterDate" type="date" />
              </div>
              <div className="col-span-6 sm:col-span-2">
                <label htmlFor="dueDate" className="inline-flex items-center text-sm font-medium text-gray-700">
                  Data de Vencimento: <p className="text-red-500">*</p>
                </label>
                <input className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={dueDateRef} id="dueDate" type="date" required />
              </div>
              <div className="col-span-6 sm:col-span-2">
                <label htmlFor="prevision" className="inline-flex items-center text-sm font-medium text-gray-700">
                  Previsão: <p className="text-red-500">*</p>
                </label>
                <select className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={previsionRef} name="prevision" id="prevision" required>
                  {predictions.map((el) => {
                    return (<option key={el.id} value={el.id}>
                      {el.descricao}
                    </option>);
                  })}
                </select>
              </div>
              <div className="col-span-6 sm:col-span-1">
                <label htmlFor="requirement" className="inline-flex items-center text-sm font-medium text-gray-700">
                  Requerimento: <p className="text-red-500">*</p>
                </label>
                <select className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={requirementRef} name="requirement" id="requirement" required>
                  <option value=""></option>
                  <option value="3">SIM</option>
                  <option value="2">NÃO</option>
                </select>
              </div>
              <div className="col-span-6 sm:col-span-1">
                <label htmlFor="newLicenseIssued" className="truncate inline-flex items-center text-sm font-medium text-gray-700">
                  Emitida Nova Lic?: <p className="text-red-500">*</p>
                </label>
                <select className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={newLicenseIssuedRef} name="newLicenseIssued" id="newLicenseIssued" required>
                  <option value=""></option>
                  <option value="3">SIM</option>
                  <option value="2">NÃO</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  Data de Protocolo:
                </label>
                <input className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={protocolDateRef} id="protocolDate" type="date" />
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  Setor Responsável: <p className="text-red-500">*</p>
                </label>
                <select className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="responsibleSector" ref={responsibleSectorRef} required>
                  <option value=""></option>
                  {sectors.map((el) => {
                    return (<option key={el.id} value={el.id}>
                      {el.descricao}
                    </option>);
                  })}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-1">
                <label htmlFor="processSituation" className="truncate inline-flex items-center text-sm font-medium text-gray-700">
                  Sit. do Processo: <p className="text-red-500">*</p>
                </label>
                <select className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={processSituationRef} name="processSituation" id="processSituation" required>
                  <option value=""></option>
                  {situationProcesses.map((el) => {
                    return (<option key={el.id} value={el.id}>
                      {el.descricao}
                    </option>);
                  })}
                </select>
              </div>
              <div className="col-span-6 sm:col-span-1">
                <label htmlFor="updatedSa" className="truncate inline-flex items-center text-sm font-medium text-gray-700">
                  Atualizada na SA?: <p className="text-red-500">*</p>
                </label>
                <select className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={updatedSaRef} name="updatedSa" id="updatedSa" required>
                  <option value=""></option>
                  <option value="3">SIM</option>
                  <option value="2">NÃO</option>
                </select>
              </div>
              <div className="col-span-6 sm:col-span-6">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  Observações: <p className="text-red-500">*</p>
                </label>
                <textarea className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={observationsRef} id="observations" required />
              </div>
            </div>
            <div className="flex justify-end gap-x-4 mt-4">
              <button className="w-56 px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm close-modal hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm" type="submit">
                Salvar
              </button>
              <button onClick={closeModal} type="button" className="w-56 px-4 py-2 text-base font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm close-modal hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm">
                Cancelar Operação
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>);
}
