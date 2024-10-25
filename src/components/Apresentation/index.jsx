import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { AddLicense, DashGestor, DashMonitor, DashOps, TableIcon, } from "../Icons";
import cajLogo from "../../assets/caj.png";
import { formatName } from "../../utils/functions";
export default function Init() {
  const { user } = useAuth();
  return (<>
    <div className="flex flex-col gap-10 justify-center items-center w-full px-12 pb-6">
      <div className="flex flex-col gap-8 justify-center items-center border-cyan-700 border-b py-4 ">
        <img className="w-20 lg:w-28" src={cajLogo} alt="CAJ LOGO" />
        <h1 className="text-2xl lg:text-5xl text-cyan-700 text-center">
          Bem-vindo(a) ao sistema de Licenciamento CAJ!
        </h1>
        <p className="text-2xl lg:text-5xl text-white text-bold bg-cyan-600 rounded-lg px-3 py-1 xl:px-3 xl:py-2 hover:bg-cyan-700 hover:text-gray-50">
          {formatName(user.username)[0]}
        </p>{" "}
        {/* {formatName(user.username)[1]} */}
      </div>
      <div className="text-sm lg:text-base xl:text-lg">
        Esse é o sistema de gestão de Licenças Ambientais. Com ele é possivel
        acompanhar a situação de todas as licenças que envolvem a{" "}
        <Link to="#" className="text-blue-700 hover:text-blue-800">
          Companhia Águas de Joinville.
        </Link>
      </div>

      <div className="text-sm lg:text-base xl:text-lg">
        <Link to={"/licenciamento"} className="px-2">
          <p className="inline-flex items-center gap-1 text-cyan-600 text-bold underline underline-offset-1 hover:text-cyan-800">
            <TableIcon />
            Licenciamento:
          </p>
        </Link>
        Aqui é possível visualizar de forma tabular todos os registros assim
        como atualizar/editar.
      </div>
      <div className="text-sm lg:text-base xl:text-lg">
        <Link to={"/adicionar"} className="px-2">
          <p className="inline-flex items-center gap-1 text-cyan-600 text-bold underline underline-offset-1 hover:text-cyan-800">
            <AddLicense />
            Adicionar Licença:
          </p>
        </Link>
        Aqui é possível adicionar licenças ambientais monitoradas pela GQM. Os
        campos destacados em vermelho são campos obrigatórios.
      </div>
      <div className="text-sm lg:text-base xl:text-lg">
        <Link to={"/dashboard_gestao"} className="px-2">
          <p className="inline-flex items-center gap-1 text-cyan-600 text-bold underline underline-offset-1 hover:text-cyan-800">
            <DashGestor />
            Dashboard Gestão:
          </p>
        </Link>
        Aqui é possível acompanhar em tempo real as informações consolidadas
        para gestores
      </div>
      <div className="text-sm lg:text-base xl:text-lg">
        <Link to={"/dashboard_monitor"} className="px-2">
          <p className="inline-flex items-center gap-1 text-cyan-600 text-bold underline underline-offset-1 hover:text-cyan-800">
            <DashMonitor />
            Dashboard Monitor:
          </p>
        </Link>
        Aqui é possível acompanhar as informações das licenças e é direcionado
        para a equipe GQM.
      </div>
      <div className="text-sm lg:text-base xl:text-lg">
        <Link to={"/dashboard_monitor"} className="px-2">
          <p className="inline-flex items-center gap-1 text-cyan-600 text-bold underline underline-offset-1 hover:text-cyan-800">
            <DashOps />
            Dashboard Operação:
          </p>
        </Link>
        Aqui é possível acompanhar as informações das licenças
      </div>
    </div>
  </>);
}
