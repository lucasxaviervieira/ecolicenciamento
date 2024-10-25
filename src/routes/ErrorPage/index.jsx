import { Link } from "react-router-dom";
import cajLogo from "../../assets/caj.png";
export default function ErrorPage() {
    return (<main className="w-full h-[100%] grid place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-16 w-auto" src={cajLogo} alt="Your Company"/>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Error 404
          </h2>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Página não encontrada...
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Desculpe, não pudemos achar aquilo que você procura.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link to="/inicio" className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            Volte para a tela inicial
          </Link>
        </div>
      </div>
    </main>);
}
