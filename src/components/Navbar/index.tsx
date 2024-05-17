/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { NavLink, Link } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

import {
  ProfileIcons,
  ProfileIcon,
  CheckListIcon,
  LogoutIcon,
  TableIcon,
  AddLicense,
  DashGestor,
  DashMonitor,
  DashOps,
} from "../Icons";

import cajLogo from "../../assets/caj.png";

export default function Navbar() {
  /*
    A linha `const { logout }: any = useAuth();` está utilizando desestruturação de objetos para extrair a função `logout`
    a partir do valor de retorno do hook `useAuth()`. A sintaxe `: any` é utilizada para especificar 
    o tipo da função `logout` extraída como `any`, o que significa que o tipo de `logout` não é
    explicitamente definido e pode ser de qualquer tipo. 
  */
  const { logout }: any = useAuth();
  /* 
    A linha `const { login }: any = useAuth();` está utilizando atribuição de desestruturação para extrair a função
    função `login` do objeto retornado pelo hook `useAuth()`. O hook `useAuth()` retorna um objeto com propriedades, 
    e usando destruturação, nós estamos especificamente extraindo a função `login` desse objeto. 
  */
  const { user }: any = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <nav className="bg-gray-100 border-slate-200 border-b p-5 h-[12%] flex items-center">
        <div className="w-full flex justify-between items-center ">
          <div className="flex items-center">
            <Link to={"/inicio"}>
              <img src={cajLogo} className="logo w-10 lg:w-12" alt="CAJ logo" />
            </Link>
            <div className="px-3">
              <h1 className="text-xs lg:text-sm 2xl:text-3xl font-bold ">
                <Link to={"/inicio"}>Águas de Joinville - GQM</Link>
              </h1>
              <h2 className="text-xs lg:text-sm 2xl:text-2xl max-w-40">
                <Link to={"/inicio"}>Licenciamento</Link>
              </h2>
            </div>
          </div>
          <div className="hidden md:ml-6 md:block">
            <div className="flex items-center sm:space-x-1 2xl:space-x-4">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "inline-flex gap-x-1 items-center bg-blue-100 text-black rounded-md lg:px-2 lg:py-1 2xl:px-3 xl:py-2 text-center text-sm text-blue-700 font-medium"
                    : "inline-flex gap-x-1 items-center hover:bg-gray-200 text-black rounded-md lg:px-2 lg:py-1 2xl:px-3 xl:py-2 text-sm text-center font-medium"
                }
                to="/licenciamento"
              >
                Licenciamento
                <div className="hidden xl:block">
                  <TableIcon />
                </div>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "inline-flex gap-x-1 items-center bg-cyan-100 text-black rounded-md lg:px-2 lg:py-1 2xl:px-3 xl:py-2 text-center text-sm text-cyan-700 font-medium"
                    : "inline-flex gap-x-1 items-center hover:bg-gray-200 text-black rounded-md lg:px-2 lg:py-1 2xl:px-3 xl:py-2 text-sm text-center font-medium"
                }
                to="/adicionar"
              >
                Adicionar Licença
                <div className="hidden xl:block">
                  <AddLicense />
                </div>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "inline-flex gap-x-1 items-center bg-red-100 text-black rounded-md lg:px-2 lg:py-1 2xl:px-3 xl:py-2 text-center text-sm text-red-600 font-medium"
                    : "inline-flex gap-x-1 items-center hover:bg-gray-200 text-black rounded-md lg:px-2 lg:py-1 2xl:px-3 xl:py-2 text-sm text-center font-medium"
                }
                to="/dashboard_gestao"
              >
                Dashboard (Gestão)
                <div className="hidden xl:block">
                  <DashGestor />
                </div>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "inline-flex gap-x-1 items-center bg-red-100 text-black rounded-md lg:px-2 lg:py-1 2xl:px-3 xl:py-2 text-center text-sm text-red-800 font-medium"
                    : "inline-flex gap-x-1 items-center hover:bg-gray-200 text-black rounded-md lg:px-2 lg:py-1 2xl:px-3 xl:py-2 text-sm text-center font-medium"
                }
                to="/dashboard_monitor"
              >
                Dashboard (Monitor)
                <div className="hidden xl:block">
                  <DashMonitor />
                </div>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "inline-flex gap-x-1 items-center bg-green-100 text-black rounded-md lg:px-2 lg:py-1 2xl:px-3 xl:py-2 text-center text-sm text-green-700 font-medium"
                    : "inline-flex gap-x-1 items-center hover:bg-gray-200 text-black rounded-md lg:px-2 lg:py-1 2xl:px-3 xl:py-2 text-sm text-center font-medium"
                }
                to="/dashboard_operacao"
              >
                Dashboard (Operação)
                <div className="hidden xl:block">
                  <DashOps />
                </div>
              </NavLink>
              <Menu
                as="div"
                className="relative inline-block text-left px-3 py-0.5"
              >
                <div>
                  <Menu.Button className="inline-flex justify-center items-center gap-x-1.5 rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {" "}
                    <ProfileIcons />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="overflow-auto absolute right-0 z-40 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      <label className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-200">
                        <div className="inline-flex justify-center items-center gap-x-2">
                          <ProfileIcon />
                          <p className="text-blue-500">{user.username}</p>
                        </div>
                      </label>
                    </Menu.Item>
                    <hr />

                    <Menu.Item>
                      <Link
                        to="/painel"
                        className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                      >
                        <div className="inline-flex justify-center items-center gap-x-2">
                          <CheckListIcon />
                          {"Painel de Alterações"}
                        </div>
                      </Link>
                    </Menu.Item>
                    <hr />

                    <Menu.Item>
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                      >
                        <div className="inline-flex justify-center items-center gap-x-2">
                          <LogoutIcon />
                          <p className="text-red-500">Sair</p>
                        </div>
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
