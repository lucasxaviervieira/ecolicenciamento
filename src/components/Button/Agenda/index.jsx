import { Link } from "react-router-dom";

export default function ButtonAgenda({ row }) {
  return (
    <Link to={`/agenda/${row}`} target="_blank">
      <button className="bg-cyan-500 hover:bg-cyan-700 text-white py-2 px-4 rounded-md text-sm font-semibold ring-1 ring-inset ring-cyan-300">
        Agenda
      </button>
    </Link>
    );
}