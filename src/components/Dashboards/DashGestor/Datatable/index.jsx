import { useEffect, useState } from "react";
import { genColumns } from "../Columns";
import api from "../../../../services/api";
import { LoadingLicense } from "../../../../utils/licenseType";
import { paintCell } from "../../../../utils/functions";
import { fuzzyFilter } from "../../../../utils/fuzzyFilter";
import { useReactTable, getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFacetedMinMaxValues, getSortedRowModel, flexRender, } from "@tanstack/react-table";
import LoadingDatatable from "../../../Loading/LoadingDatatable";
import { LoadingIcon, SortingDownIcon, SortingUpIcon } from "../../../Icons";
/**
 * Componente do DashboardGestor que exibe dados de licença em um formato de tabela.
 * Ele obtém dados do endpoint `/getDados.php` e filtra os dados com base em critérios específicos.
 * @returns o elemento JSX que contém o layout do painel com a tabela de dados de licença.
 */
export default function DashboardGestor() {
    const [data, setData] = useState(LoadingLicense);
    const columns = genColumns();
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        initialState: {
            sorting: [{ id: "dias_para_vencer", desc: false }],
        },
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        globalFilterFn: fuzzyFilter,
        debugTable: true,
    });
    /**
     * Filtra a matriz de dados de licença fornecida com base em status de licença específicos e define os dados filtrados como o novo estado.
     * @param {any[]} responseData - Uma matriz de dados de licença a ser filtrada.
     */
    function filterRequisition(responseData) {
        const dataFormatted = [];
        responseData.forEach((element) => {
            if (element.situacao_licenca == "Aguardando análise" ||
                element.situacao_licenca == "Em renovação" ||
                element.situacao_licenca == "Vigente - Providenciar Documentos" ||
                element.situacao_licenca == "Vencida" ||
                element.situacao_licenca == "Prazo extrapolado" ||
                element.situacao_licenca == "Adotar Providências") {
                dataFormatted.push(element);
            }
        });
        setData(dataFormatted);
    }
    /*
    O código abaixo é um hook `useEffect` do React que faz uma chamada assíncrona à API para obter dados de
    do endpoint "/getDados.php". Uma vez que os dados são obtidos com sucesso, ele chama a função `filterRequisition()`
    para que a requisição seja filtrada, de acordo com o pedido do cliente.
    */
    useEffect(() => {
        async function getData() {
            await api
                .get("licencas/getDados.php")
                .then((response) => {
                    filterRequisition(response.data);
                })
                .catch((err) => {
                    console.error("Catch Error:" + err);
                });
        }
        getData();
        const intervalId = setInterval(() => {
            getData();
        }, 5000);
        return () => clearInterval(intervalId);
    }, []);
    return (<>
        <LoadingDatatable delay={500} loadingProps={{
            text: "Carregando Dashboard de Gestão...",
            color: "red",
        }} loadingIcon={<LoadingIcon iconParams={{ color: "fill-red-600", size: "lg" }} />} />
        <div className="hidden p-5 h-[87%] flex flex-col justify-center items-center" id="loading-datatable">
            <div className="w-full h-full overflow-auto">
                <table className="relative max-w-none h-auto text-sm">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (<tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (<th className="sticky top-0 px-2 py-3 z-10 bg-red-900 text-white text-xs lg:text-sm xl:text-lg font-bold" key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder ? null : (<>
                                        <div {...{
                                            className: header.column.getCanSort()
                                                ? "inline-flex items-center gap-x-2 cursor-pointer select-none"
                                                : "",
                                            onClick: header.column.getToggleSortingHandler(),
                                        }}>
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {{
                                                asc: <SortingUpIcon />,
                                                desc: <SortingDownIcon />,
                                            }[header.column.getIsSorted()] ?? null}
                                        </div>
                                    </>)}
                                </th>);
                            })}
                        </tr>))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => {
                            return (<tr key={row.id} className="odd:bg-white even:bg-slate-50 max-w-56 max-h-20 text-xs lg:text-sm xl:text-base ">
                                {row.getVisibleCells().map((cell) => {
                                    const idContext = cell.getContext().column.id;
                                    const columnsToPaint = ["situacao_licenca", "unidade"];
                                    const isPaintable = columnsToPaint.indexOf(idContext) >= 0 ? true : false;
                                    const formatCellColor = isPaintable
                                        ? paintCell(row.original.situacao_licenca)
                                        : "";
                                    const classNameText = `lg:px-3 xl:p-2 border-slate-300 border-b text-center font-semibold ${formatCellColor} `;
                                    return (<td className={classNameText} key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>);
                                })}
                            </tr>);
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </>);
}
