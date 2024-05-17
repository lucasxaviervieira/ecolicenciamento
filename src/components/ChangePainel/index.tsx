import { useEffect, useState } from "react";
import api from "../../services/api";
import { formatDateHour, formatName } from "../../utils/functions";
import LoadingDatatable from "../Loading/LoadingDatatable";
import { LoadingIcon } from "../Icons";

type Alterations = {
  responsavel: string;
  id_licenca: string;
  dt_alteracao: string;
};
const LoadingAlterations = [
  {
    responsavel: "carregando...",
    id_licenca: "carregando...",
    dt_alteracao: "carregando... carregando...",
  },
];

export default function Painel() {
  const [data, setData] = useState<Alterations[]>(LoadingAlterations);

  function nameToExpose(username: string) {
    const [name, user] = formatName(username);

    return (
      <>
        <div className="flex p-3 text-xs lg:text-sm">
          <div>
            <p className="font-semibold text-justify"> {name} </p>
            <p className="select-all text-blue-700  font-semibold tracking-wide ">
              {user}
            </p>
          </div>
        </div>
      </>
    );
  }

  function dateToExpose(date: string) {
    const [dateExpose, hourExpose] = formatDateHour(date);

    return (
      <>
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
      </>
    );
  }

  /**
   * Obtém dados de forma assíncrona da endpoint `/getHistoricoAlteracoes.php`.
   * Define os dados usando a função `setData`.
   * Essa função é chamada apenas uma vez quando o componente é inicializado.
   */
  async function getData() {
    await api
      .get("historicos/getHistoricoAlteracoes.php")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.error("Catch Error:" + err);
      });
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <LoadingDatatable
        delay={500}
        loadingProps={{
          text: "Carregando Painel de Alterações...",
          color: "blue",
        }}
        loadingIcon={
          <LoadingIcon iconParams={{ color: "fill-blue-600", size: "lg" }} />
        }
      />

      <div className="text-center p-5 text-3xl font-bold">
        Painel de Alterações
      </div>
      <div className="p-3 h-[75%] w-full flex justify-center">
        <div className="h-full w-[70%] overflow-y-scroll">
          <div className="relative w-full max-w-none h-auto text-sm">
            <div className="sticky top-0 z-10 bg-blue-800">
              <div className="px-8 py-4 text-white text-left">
                <div className="grid grid-cols-12 gap-x-4">
                  <p className="col-span-2 text-center font-bold text-sm uppercase truncate">
                    ID licença
                  </p>
                  <p className="col-span-7 text-left font-bold text-sm uppercase">
                    Usuário
                  </p>
                  <p className="col-span-3 text-center font-bold text-sm uppercase">
                    data
                  </p>
                </div>
              </div>
            </div>
            <div
              id="loading-datatable"
              className="hidden divide-y divide-gray-200 text-center"
            >
              {data.map((row) => {
                return (
                  <>
                    <div
                      key={data.indexOf(row)}
                      className="odd:bg-white even:bg-slate-50"
                    >
                      <div className="px-8 py-4">
                        <div className="grid grid-cols-12 gap-x-4">
                          <div className="col-span-2 w-full flex items-center justify-center font-semibold">
                            {row.id_licenca}
                          </div>

                          <div className="col-span-7 flex text-start items-center">
                            {nameToExpose(row.responsavel)}
                          </div>

                          <div className="col-span-3 flex justify-center items-center">
                            {dateToExpose(row.dt_alteracao)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
