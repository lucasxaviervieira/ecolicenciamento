import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import ModalFlowButton from "../Button/ModalFlow";
import LoadingDatatable from "../Loading/LoadingDatatable";
import { formatName } from "../../utils/functions";
import { LoadingIcon } from "../Icons";
const LoadingTasks = [
  {
    id: "without_information",
    texto: "Nenhuma informação...",
    checked: "0",
    username: "-",
  },
];
export default function Agenda() {
  const [tasks, setTasks] = useState(LoadingTasks);
  const [isIDLicense, setIsIDLicense] = useState(true);
  const [isLoadingHidden, setIsLoadingHidden] = useState(true);
  const [updateTable, setUpdateTable] = useState(0);
  const [text, setText] = useState("");
  const { user } = useAuth();
  const currentUrl = window.location.href;
  const lastIndex = currentUrl.lastIndexOf("/");
  const rowId = currentUrl.substring(lastIndex + 1);
  function loadingComponent() {
    setTimeout(() => {
      setIsLoadingHidden(false);
    }, 150);
    setTimeout(() => {
      setIsLoadingHidden(true);
    }, 750);
  }
  const addTask = (texto) => async (event) => {
    loadingComponent();
    event.preventDefault();
    const newTask = {
      texto,
      checked: "0",
      username: user.username,
      id_licenca: rowId,
    };
    await addTaskApi(newTask);
    setUpdateTable(updateTable + 1);
    setText("");
  };
  const handleChange = (task) => async () => {
    loadingComponent();
    const checkedState = task.checked == "0" ? "1" : "0";
    const jsonToUpdate = {
      id: task.id,
      texto: task.texto,
      checked: checkedState,
      username: task.username,
    };
    await checkedTaskApi(jsonToUpdate);
    setUpdateTable(updateTable + 1);
  };
  const deleteTask = (taskId) => async () => {
    loadingComponent();
    await deleteTaskApi(taskId);
    setUpdateTable(updateTable + 1);
  };
  function isUser(username) {
    return username != "-" ? nameToExpose(username) : "-";
  }
  function nameToExpose(username) {
    const [name] = formatName(username);
    return (<>
      <div className="flex p-3">
        <div>
          <p className="font-semibold text-justify"> {name} </p>
        </div>
      </div>
    </>);
  }
  function verifyIDLicense(currentURL) {
    return currentURL ? "" : <Navigate to="NOT_FOUND" />;
  }
  async function addTaskApi(jsonParam) {
    await api.post("/todo_list/insertTodo_list.php", jsonParam).catch((err) => {
      console.error("Catch Error:" + err);
    });
  }
  async function checkedTaskApi(jsonParam) {
    if (jsonParam.id != "without_information") {
      await api
        .put("/todo_list/updateTodo_list.php", jsonParam)
        .catch((err) => {
          console.error("Catch Error:" + err);
        });
    }
    else {
      // pass
    }
  }
  async function deleteTaskApi(taskId) {
    if (taskId != "without_information") {
      await api
        .delete(`/todo_list/deleteTodo_list.php?id_list=${taskId}`)
        .catch((err) => {
          console.error("Catch Error:" + err);
        });
    }
    else {
      // pass
    }
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
          .get(`/todo_list/getTodo_list.php?id_licenca=${idParam}`)
          .then((response) => {
            // Verifica se o retorno do endpoint, tem dados de de rotina, ou é uma licença, se não for, retorna uma mensagem
            const haveMessage = Object.keys(response.data)[0] == "mensagem";
            console.log(response.data);
            if (haveMessage) {
              // Verifica se é uma licença
              // se for uma licença sem rotinas, ele cria uma rotina para ser apresentada como: "Sem informação"
              const withoutTasks = response.data?.mensagem == "Nenhum registro encontrado";
              if (withoutTasks) {
                setTasks(LoadingTasks);
              }
              else {
                setIsIDLicense(false);
              }
            }
            else {
              setTasks(response.data);
            }
          })
          .catch((err) => {
            console.error("Catch Error:" + err);
          });
    }
    getData(rowId);
  }, [rowId, updateTable]);
  const hidden = isLoadingHidden ? "hidden" : "";
  const classNameText = `${hidden} transition delay-150 absolute top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-gray-50 opacity-75`;
  return (<>
    <div className={classNameText}>
      <span className="relative flex h-56 w-56">
        <span className="animate-ping transition delay-0 absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
      </span>
    </div>
    {verifyIDLicense(isIDLicense)}

    <LoadingDatatable delay={500} loadingProps={{
      text: "Carregando Rotinas...",
      color: "blue",
    }} loadingIcon={<LoadingIcon iconParams={{ color: "fill-blue-600", size: "lg" }} />} />

    <div className="text-center">
      <h1 className="pt-5 pb-3 text-3xl font-bold">Agenda:</h1>

      <h2 className="inline-flex p-5 gap-x-1 text-2xl font-medium leading-6 text-gray-700">
        ID Licença:
        <p className="text-gray-600">{rowId}</p>
      </h2>
    </div>

    <form className="px-5 flex flex-col justify-center items-center" onSubmit={addTask(text)}>
      <h2 className="w-[60%] text-left text-lg font-medium leading-6 text-gray-700">
        Adicionar Rotina
      </h2>
      <div className="w-[60%] flex items-center gap-3 py-2">
        <input className="block w-[100%] rounded-md border-0 py-1.5 pl-5 pr-25 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={text} placeholder="Ex.: Realizar algo (26/02)" onChange={(e) => setText(e.target.value)} required />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-sm font-semibold ring-1 ring-inset ring-gray-300" type="submit">
          Adicionar
        </button>
      </div>
    </form>

    <div className=" p-5 h-[60%] w-full flex justify-center">
      <div className="h-full w-[95%] xl:w-[80%] overflow-auto">
        <div className="relative w-full max-w-none h-auto text-sm">
          <div className="sticky top-0 z-10 bg-blue-800">
            <div className="px-8 py-4 text-white text-left">
              <div className="grid grid-cols-12 gap-x-4">
                <p className="col-span-1"></p>
                <p className="col-span-7 font-bold text-sm uppercase">
                  Rotina
                </p>
                <p className="col-span-3 text-center  font-bold text-sm uppercase">
                  usuário
                </p>
                <p className="col-span-1 "></p>
              </div>
            </div>
          </div>
          <div id="loading-datatable" className="hidden divide-y divide-gray-200 text-center">
            {tasks.map((task) => {
              const checkedState = task.checked == "0" ? false : true;
              const stroke = checkedState ? "line-through font-bold" : "";
              const classNameText = `truncate text-sm ${stroke}`;
              return (<>
                <div key={task.id} className="odd:bg-white even:bg-slate-50">
                  <div className=" px-8 py-4">
                    <div className="grid grid-cols-12 gap-x-4">
                      <div className="col-span-1 flex justify-center items-center">
                        <input type="checkbox" checked={checkedState} onChange={handleChange(task)} />
                      </div>

                      <div className="col-span-7 flex items-center">
                        <div className={classNameText}>{task.texto}</div>
                      </div>
                      <div className="col-span-3 flex justify-center items-center">
                        {isUser(task.username)}
                      </div>
                      <div className="col-span-1 flex justify-center items-center">
                        <ModalFlowButton onDeleteTask={deleteTask(task.id)} />
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
