/* eslint-disable react/jsx-key */
import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Filter } from "../Filter";
import genColumns, { clientColumnOrder } from "../Columns";
import { FilterColumnIcon, LoadingIcon, SortingDownIcon, SortingUpIcon, } from "../../Icons";
import ModalEdit from "../../ModalEdit";
import api from "../../../services/api";
import { classNames, getColumnName, paintCell } from "../../../utils/functions";
import { LoadingLicense } from "../../../utils/licenseType";
import { fuzzyFilter } from "../../../utils/fuzzyFilter";
import {
  useReactTable, getCoreRowModel, getFilteredRowModel, getFacetedRowModel, getFacetedUniqueValues, getFacetedMinMaxValues, getSortedRowModel, flexRender,
  /* ACTIVE PAGINATION (start)*/
  // PaginationState,
  // getPaginationRowModel,
  /* ACTIVE PAGINATION (end)*/
} from "@tanstack/react-table";
import LoadingDatatable from "../../Loading/LoadingDatatable";
import LoadingItem from "../../Loading/LoadingItem";
/**
 * Componente `Datatable` que exibe uma tabela de dados de licença com várias funcionalidades.
 * Usa hooks do React, como `useState` e `useEffect`, para gerenciar o estado e os efeitos colaterais.
 * Define colunas para a tabela usando a função `genColumns()`.
 * Utiliza o hook "useReactTable" para criar uma tabela personalizável com recursos de filtragem e classificação.
 * Implementa a funcionalidade "modal" para exibir informações detalhadas de uma linha selecionada.
 * Inclui funções para formatação de datas e corte de observações.
 * Obtém dados de um ponto de extremidade da API usando async/await no hook useEffect.
 * @returns Um elemento JSX que representa o componente `Datatable`.
 */
export default function Datatable() {
  const [data, setData] = useState(LoadingLicense);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  /* ACTIVE PAGINATION (start)*/
  // const [pagination, setPagination] = useState<PaginationState>({
  //   pageIndex: 0,
  //   pageSize: 10,
  // });
  /* ACTIVE PAGINATION (end)*/
  const [submited, setSubmited] = useState(0);
  const wasSubmited = (submitedTimes) => {
    setSubmited(submitedTimes);
  };
  const columns = genColumns();
  const table = useReactTable({
    data,
    columns,
    initialState: {
      columnOrder: clientColumnOrder,
    },
    state: {
      columnFilters,
      columnVisibility,
      /* ACTIVE PAGINATION (start)*/
      // pagination,
      /* ACTIVE PAGINATION (end)*/
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    /* ACTIVE PAGINATION (start)*/
    // getPaginationRowModel: getPaginationRowModel(),
    // onPaginationChange: setPagination,
    /* ACTIVE PAGINATION (end)*/
  });
  const delayToLoadPage = 750;
  /*
    O código abaixo é um hook `useEffect` do React que faz uma chamada assíncrona à API para obter dados de
    do endpoint "/getDados.php". Uma vez que os dados são obtidos com sucesso, ele define os dados que serão
    apresentados na tabela, usando os dados de resposta.
    Este hook `useEffect` é executado toda vez que um Modal é submetido, atrabvés desse hook em específico, é possivel
    a tabela seja atualizada em tempo real, sem necessitar que a aba seja recarregada, para que possam ser vistos novas informações.
  */
  useEffect(() => {
    async function getData() {
      await api
        .get("licencas/getDados.php")
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          console.error("Catch Error:" + err);
        });
    }
    getData();
  }, [submited]);
  return (<>
    <div className="max-h-[7%] flex flex-row gap-x-3 items-center px-8 py-5 bg-slate-100 border-slate-200 border-b">
      <div className="grow inline-flex gap-x-3 items-center">
        <h1 className="text-xs md:text-base 2xl:text-2xl font-medium">
          Sistema de Licenças:
        </h1>

        <div>
          <p className="inline-flex gap-x-1.5 justify-center rounded-md bg-white px-3 py-2 text-xs md:text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Total de Licenças:{" "}
            <LoadingItem delay={delayToLoadPage} loadingIcon={<LoadingIcon iconParams={{ color: "fill-blue-500", size: "sm" }} />} />
            <p id="loading-total" className="hidden">
              {table.getPrePaginationRowModel().rows.length}
            </p>
          </p>
        </div>
      </div>

      <div>
        <button
          onClick={() => { window.location.reload(); }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md gap-x-1.5 text-sm font-semibold ring-1 ring-inset ring-gray-300">
          Limpar Filtros
        </button>
      </div>

      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Filtrar Colunas
            <FilterColumnIcon />
          </Menu.Button>
        </div>

        <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
          <Menu.Items className="overflow-auto h-96 absolute right-0 z-40 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (<label className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block w-full px-4 py-2 text-left text-sm")}>
                <input {...{
                  type: "checkbox",
                  checked: table.getIsAllColumnsVisible(),
                  onChange: table.getToggleAllColumnsVisibilityHandler(),
                }} />{" "}
                Selecionar todos
              </label>)}
            </Menu.Item>
            <hr />

            {table.getAllLeafColumns().map((column) => {
              return (<Menu.Item>
                {({ active }) => (<div key={column.id} className={classNames(active
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700", "block w-full px-4 py-2 text-left text-sm")}>
                  <label>
                    <input {...{
                      type: "checkbox",
                      checked: column.getIsVisible(),
                      onChange: column.getToggleVisibilityHandler(),
                    }} />{" "}
                    {getColumnName(column.id)}
                  </label>
                </div>)}
              </Menu.Item>);
            })}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>

    <LoadingDatatable delay={delayToLoadPage} loadingProps={{
      text: "Carregando Tabela de Licenciamento...",
      color: "blue",
    }} loadingIcon={<LoadingIcon iconParams={{ color: "fill-blue-600", size: "lg" }} />} />
    <div className="hidden p-5 max-h-[80%] flex flex-col justify-center items-center" id="loading-datatable">
      <div className="w-full h-full overflow-auto">
        <table className="relative max-w-none h-auto text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (<tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sorted = (<>
                  {{
                    asc: <SortingUpIcon />,
                    desc: <SortingDownIcon />,
                  }[header.column.getIsSorted()] ?? null}
                </>);
                const elementWithoutFilter = (<>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </>);
                const elementWithFilter = (<>
                  {header.isPlaceholder ? null : (<>
                    <div {...{
                      className: header.column.getCanSort()
                        ? "inline-flex items-center gap-x-2 cursor-pointer select-none "
                        : "",
                      onClick: header.column.getToggleSortingHandler(),
                    }}>
                      {elementWithoutFilter}
                      {sorted}
                    </div>
                    {header.column.getCanFilter() ? (<div className="p-2">
                      <Filter column={header.column} table={table} />
                    </div>) : null}
                  </>)}
                </>);
                const element = header.id == "button" || header.id == "agenda"
                  ? elementWithoutFilter
                  : elementWithFilter;
                const buttonClassName = "sticky left-0 top-0 z-20 bg-white";
                const className = "sticky top-0 p-3 z-10 bg-white";
                const classNameText = header.id == "button" ? buttonClassName : className;
                return (<th className={classNameText} key={header.id} colSpan={header.colSpan}>
                  {element}
                </th>);
              })}
            </tr>))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (<tr key={row.id} className="odd:bg-white even:bg-slate-50">
                {row.getVisibleCells().map((cell) => {
                  const idContext = cell.getContext().column.id;
                  const columnsToPaint = ["situacao_licenca"];
                  const isPaintable = columnsToPaint.indexOf(idContext) >= 0 ? true : false;
                  const formatCellColor = isPaintable
                    ? paintCell(row.original.situacao_licenca)
                    : "";
                  const cellPosition = idContext == "button"
                    ? "sticky left-0 text-center bg-white p-3"
                    : "";
                  const classNameText = `border-slate-300 border-b py-2 px-3 text-center ${formatCellColor} ${cellPosition}`;
                  return (<td className={classNameText} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>);
                })}
              </tr>);
            })}
          </tbody>
        </table>
      </div>

      {/* ACTIVE PAGINATION (start)*/}
      {/*
        <div className="flex items-center gap-2">
          <button
            className="border rounded p-1"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        */}
      {/* ACTIVE PAGINATION (end)*/}
    </div>
    <ModalEdit wasSubmited={wasSubmited} />
  </>);
}
