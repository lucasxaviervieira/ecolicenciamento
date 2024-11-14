import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "../../services/api";
import { formatDateHour, formatName, isValue } from "../../utils/functions";
import LoadingDatatable from "../Loading/LoadingDatatable";
import { LoadingIcon } from "../Icons";
const LoadingObservations = [
    {
        dt_alteracao: "",
        id_licencas: "without_information",
        observacoes: "Nenhuma Informação...",
        responsavel: "",
    },
];
export default function Observation() {
    const [data, setData] = useState(LoadingObservations);
    const [isIDLicense, setIsIDLicense] = useState(true);
    const currentUrl = window.location.href;
    const lastIndex = currentUrl.lastIndexOf("/");
    const rowId = currentUrl.substring(lastIndex + 1);
    function nameToExpose(username) {
        const [name, user] = formatName(username);
        return (<>
        <div className="flex p-3">
          <div>
            <p className="font-semibold text-justify"> {name} </p>
            <p className="hidden 2xl:block select-all text-blue-700 text-xs lg:text-sm font-semibold tracking-wide ">
              {user}
            </p>
          </div>
        </div>
      </>);
    }
    function dateToExpose(date) {
        const [dateExpose, hourExpose] = formatDateHour(date);
        return (<>
        <div className="flex flex-col gap-3 xl:gap-5">
          <div>
            Dia:{" "}
            <span className=" text-white text-sm pb-1 bg-blue-600 font-semibold px-2 rounded-full">
              {dateExpose}
            </span>{" "}
          </div>
          <div>
            Hora:{" "}
            <span className=" text-white text-sm pb-1 bg-cyan-500 font-semibold px-2 rounded-full">
              {hourExpose}
            </span>{" "}
          </div>
        </div>
      </>);
    }
    /**
     * A função `isName` recebe um nome como entrada e retorna o nome formatado se não for nulo ou
     * "-" se for nulo.
     * @param {string} username - O parâmetro `name` é uma string que representa o nome de uma pessoa.
     * @retorno A função `isName` retorna o resultado da chamada da função `formatName` com o parâmetro
     * parâmetro `name` se `name` for verdadeiro, caso contrário retorna um traço ("-").
     */
    function isUser(username) {
        return username ? (nameToExpose(username)) : (<>
        <div className="text-center">-</div>
      </>);
    }
    /**
     * A função `isDate` recebe uma string de data como entrada e retorna uma data e hora formatadas ou
     * espaços reservados se a data for nula.
     * @param {string} date - A função `isDate` recebe um parâmetro `date` do tipo string.
     * @returns A função `isDate` recebe um parâmetro `date` do tipo string e verifica.
     * Se a `date` for verdadeira, ela chama a função `formatDateHour` na `date`. Se a
     * `date` for falsa, retorna um array `["-", "-"]`.
     */
    function isDate(date) {
        return date ? dateToExpose(date) : "-";
    }
    function isData(myData) {
        return myData ? "" : <Navigate to="NOT_FOUND"/>;
    }
    /*
    O hook `useEffect` no trecho de código abaixo é responsável por buscar dados com base no
    `rowId` sempre que o `rowId` for alterado.
    */
    useEffect(() => {
        async function getData(idParam) {
            !idParam
                ? setIsIDLicense(false)
                : await api
                    .get(`historicos/getHistoricoObs.php?id=${idParam}`)
                    .then((response) => {
                    // Verifica se o retorno do endpoint, tem dados de de rotina, ou é uma licença, se não for, retorna uma mensagem
                    const haveMessage = Object.keys(response.data)[0] == "mensagem";
                    console.log(response.data);
                    if (haveMessage) {
                        // Verifica se é uma licença
                        // se for uma licença sem rotinas, ele cria uma rotina para ser apresentada como: "Sem informação"
                        const withoutTasks = response.data?.mensagem ==
                            "Registro não possui historico de observações";
                        if (withoutTasks) {
                            setData(LoadingObservations);
                        }
                        else {
                            setIsIDLicense(false);
                        }
                    }
                    else {
                        setData(response.data);
                    }
                })
                    .catch((err) => {
                    console.error("Catch Error:" + err);
                });
        }
        getData(rowId);
    }, [rowId]);
    return (<>
      {isData(isIDLicense)}

      <LoadingDatatable delay={500} loadingProps={{
            text: "Carregando Histórico de Observações...",
            color: "blue",
        }} loadingIcon={<LoadingIcon iconParams={{ color: "fill-blue-600", size: "lg" }}/>}/>
      <div className="text-center">
        <h1 className="pt-5 pb-3 text-3xl font-bold">
          Histórico de Observações:
        </h1>
        <h2 className="inline-flex p-5 gap-x-1 text-2xl font-medium leading-6 text-gray-700">
          ID Licença:
          <p className="text-gray-600">{rowId}</p>
        </h2>
      </div>
      <div className="p-5 h-[60%] w-full flex justify-center">
        <div className="h-full w-[95%] overflow-auto">
          <div className="relative w-full max-w-none h-auto text-sm">
            <div className="sticky top-0 z-10 bg-blue-800">
              <div className="px-8 py-4 text-white text-left">
                <div className="grid grid-cols-12 gap-x-4">
                  <p className="col-span-8 text-left font-bold text-sm uppercase">
                    observação
                  </p>
                  <p className="col-span-2 text-center font-bold text-sm uppercase">
                    usuário
                  </p>
                  <p className="col-span-2 text-center font-bold text-sm uppercase">
                    data
                  </p>
                </div>
              </div>
            </div>

            <div id="loading-datatable" className="hidden divide-y divide-gray-200">
              {data.map((row) => {
            return (<>
                    <div key={data.indexOf(row)} className="odd:bg-white even:bg-slate-50">
                      <div className="px-8 py-4">
                        <div className="grid grid-cols-12 gap-x-4">
                          <div className="col-span-8 w-full flex items-center justify-start">
                            <span className="text-base pb-1 font-semibold px-2">
                              {isValue(row.observacoes)}
                            </span>
                          </div>

                          <div className="col-span-2 flex items-center justify-center">
                            {isUser(row.responsavel)}
                          </div>

                          <div className="col-span-2 flex justify-center items-center">
                            {isDate(row.dt_alteracao)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>);
        })}
            </div>
          </div>
        </div>
      </div>
    </>);
}
