import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import getFieldsModalEdit from "../../services/fields";
import createLicences from "../../services/licences/insert";
import { verifyNumber } from "../../utils/functions";
export default function LicenseRegister() {

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
  /*
    O trecho de código `const { user }: any = useAuth()` está desestruturarando o objeto `user` a partir do resultado do hook `useAuth()`.
    O código está usando a sintaxe TypeScript para especificar o tipo da variável `user` como `any`, o que significa que ela pode conter qualquer tipo de valor.
  */
  const { user, token } = useAuth();

  /*
    O trecho de código abaixo está usando o hook `useRef` do React para criar múltiplas referências para
    elementos diferentes em um componente React TypeScript. Cada hook `useRef` é atribuído a um elemento
    elemento específico ou referência de componente usando o atributo `ref`. Essas referências podem ser usadas para acessar e
    manipular os elementos correspondentes na lógica do componente.
  */
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
  const processSituationRef = useRef(null);
  const updatedSaRef = useRef(null);
  const observationsRef = useRef(null);
  const setorRef = useRef(null);

  async function isPosted(posted) {
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
  async function insertData(body) {
    try {
      const data = await createLicences(token, body);
      console.log("Dados recebidos:", data);
      isPosted(true)
    } catch (error) {
      console.error("Erro ao criar licença:", error);
      isPosted(false)
    }
  };

  /**
   * A função `handleSubmit` lida com o envio de formulários formatando os dados de entrada e enviando-os para um endpoint.
   * @param event - O parâmetro `event` na função `handleSubmit` é do tipo
   * `React.FormEvent<HTMLFormElement>`. Este parâmetro representa o evento de submissão de formulário em uma aplicação React.
   * Ao chamar `event.preventDefault()`, você impede o comportamento padrão de envio de formulários,
   * permitindo que você manipule os dados do formulário de forma personalizada.
   */

  const handleSubmit = (event) => {
    event.preventDefault();
    /*
      O objeto chamado `bodyInfo` está sendo preenchido com valores obtidos de várias referências (`areaRef`, `unitRef`, `subunitRef`,
      etc.) que estão referenciando elementos de entrada em um formulário. Uma vez que o objeto `bodyInfo` é
      preenchido, ele é então passado para uma função `postData` para processamento posterior.
    */
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
          id: verifyNumber(setorRef.current.value)
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
    insertData(bodyInfo);
  };
  /*
    O código abaixo é um hook `useEffect` do React que faz uma chamada assíncrona à API para obter dados de
    do endpoint "/campos/campos.php". Uma vez que os dados são obtidos com sucesso, ele está definindo os valores de estado
    para unidade, tipo, subunidade, orgão emissor e setor usando os dados de resposta. Este hook `useEffect` é executado apenas uma vez quando
    o componente é montado (matriz de dependências vazia []).
    Serve para alimentar os campos de seleção com muitas unidades
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
  return (<>
    <div className="max-h-[7%] text-center p-5 text-3xl font-bold">
      Nova Licença
    </div>
    <div className="p-3 max-h-[80%] w-full flex justify-center">
      <div className="w-[95%] overflow-auto">
        <form className="relative w-full max-w-none h-auto text-sm" onSubmit={handleSubmit}>
          <div className="px-12">
            <div className="grid grid-cols-6 gap-5">
              <div className="col-span-6 md:col-span-2">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  Área: <p className="text-red-500">*</p>
                </label>

                <select className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={areaRef} id="area" required>
                  <option value=""></option>
                  {areas.map((el) => {
                    return (<option key={el.id} value={el.id}>
                      {el.descricao}
                    </option>);
                  })}
                </select>
              </div>

              <div className="col-span-6 md:col-span-2">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  Unidade: <p className="text-red-500">*</p>
                </label>
                <select className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="unit" ref={unitRef} required>
                  <option value=""></option>
                  {units.map((el) => {
                    return (<option key={el.id} value={el.id}>
                      {el.descricao}
                    </option>);
                  })}
                </select>
              </div>

              <div className="col-span-6 md:col-span-2">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  Subunidade
                </label>

                <select className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="subunit" ref={subunitRef}>
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
                  Data de Requerimento:
                </label>
                <input className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={requirementDateRef} id="requirementDate" type="date" />
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  Controle: <p className="text-red-500">*</p>
                </label>
                <select className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={controlRef} id="control" required>
                  <option value=""></option>
                  {controllers.map((el) => {
                    return (<option key={el.id} value={el.id}>
                      {el.descricao}
                    </option>);
                  })}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  Orgão Emissor: <p className="text-red-500">*</p>
                </label>
                <select className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="emitter" ref={emitterRef} required>
                  <option value=""></option>
                  {emitters.map((el) => {
                    return (<option key={el.id} value={el.id}>
                      {el.descricao}
                    </option>);
                  })}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  Tipo: <p className="text-red-500">*</p>
                </label>
                <select className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" id="type" ref={typeRef} required>
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
                <select className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={specificationRef} id="specification">
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
                  Número da Licença: <p className="text-red-500">*</p>
                </label>
                <input className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={licenseNumberRef} id="licenseNumber" type="text" required />
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  FCEI/SINFAT:
                </label>
                <input className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={fceiRef} id="fcei" type="text" />
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  Processo SINFAT:
                </label>
                <input className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={sinfatRef} id="sinfat" type="text" />
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  SGPE:
                </label>
                <input className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={sgpeRef} id="sgpe" type="text" />
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  Processo SEI: <p className="text-red-500">*</p>
                </label>
                <input className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={seiRef} id="sei" type="text" required />
              </div>
              <div className="col-span-6 sm:col-span-2">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  Data de Emissão:
                </label>
                <input className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={emitterDateRef} id="emitterDate" type="date" />
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  Data de Vencimento: <p className="text-red-500">*</p>
                </label>
                <input className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={dueDateRef} id="dueDate" type="date" required />
              </div>
              <div className="col-span-6 sm:col-span-2">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  Previsão: <p className="text-red-500">*</p>
                </label>
                <select className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={previsionRef} id="prevision" required>
                  <option value=""></option>
                  {predictions.map((el) => {
                    return (<option key={el.id} value={el.id}>
                      {el.descricao}
                    </option>);
                  })}
                </select>
              </div>
              <div className="col-span-6 sm:col-span-2">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  Requerimento:
                </label>
                <select className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={requirementRef} id="requirement">
                  <option value=""></option>
                  <option value="3">SIM</option>
                  <option value="2">NÃO</option>
                </select>
              </div>
              <div className="col-span-6 sm:col-span-2">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  Data de Protocolo do Orgão:{" "}
                </label>
                <input className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={protocolDateRef} id="protocolDate" type="date" />
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  Emitida Nova Licença?: <p className="text-red-500">*</p>
                </label>
                <select className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={newLicenseIssuedRef} id="newLicenseIssued" required>
                  <option value=""></option>
                  <option value="3">SIM</option>
                  <option value="2">NÃO</option>
                </select>
              </div>
              <div className="col-span-6 sm:col-span-2">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  Situação do Processo: <p className="text-red-500">*</p>
                </label>
                <select className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={processSituationRef} id="processSituation" required>
                  <option value=""></option>
                  {situationProcesses.map((el) => {
                    return (<option key={el.id} value={el.id}>
                      {el.descricao}
                    </option>);
                  })}
                </select>
              </div>
              <div className="col-span-6 sm:col-span-1">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  Atualizada na SA?: <p className="text-red-500">*</p>
                </label>
                <select className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={updatedSaRef} id="updatedSa" required>
                  <option value=""></option>
                  <option value="3">SIM</option>
                  <option value="2">NÃO</option>
                </select>
              </div>
              <div className="col-span-6 sm:col-span-1">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  Setor Responsável: <p className="text-red-500">*</p>
                </label>
                <select className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={setorRef} id="setor" required>
                  <option value=""></option>
                  {sectors.map((el) => {
                    return (<option key={el.id} value={el.id}>
                      {el.descricao}
                    </option>);
                  })}
                </select>
              </div>
              <div className="col-span-6 sm:col-span-6">
                <label className="inline-flex items-center text-sm font-medium text-gray-700">
                  Observações: <p className="text-red-500">*</p>
                </label>
                <textarea className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={observationsRef} id="observations" required />
              </div>
            </div>
            <div className="py-6 text-right">
              <button type="submit" className="w-56 px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm close-modal hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </>);
}
