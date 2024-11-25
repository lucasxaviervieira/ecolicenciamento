/* eslint-disable react/prop-types */
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

import { Modal as ModalFlow } from "flowbite-react";

import { InfoIcon } from "../../Icons";
import api from "../../../services/api";

export default function DeleteLicense({ licenceId }) {
  const [openModal, setOpenModal] = useState(false);

  const { user } = useAuth();

  const deleteTask = () => {
    const jsonParam = { id: licenceId, username: user.username };
    removeData(jsonParam);
    setOpenModal(false);
  };

  async function removeData(jsonParam) {
    console.log(jsonParam);
    await api
      .put("/licencas/deleteDados.php", jsonParam)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.error("Catch Error:" + err);
      });
  }
  return (<>
    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md text-sm font-semibold ring-1 ring-inset ring-red-300" onClick={() => setOpenModal(true)}>
      Apagar
    </button>

    <ModalFlow show={openModal} size="sm" onClose={() => setOpenModal(false)} popup>
      <ModalFlow.Header />
      <ModalFlow.Body>
        <div className="text-center">
          <div className="flex justify-center items-center pb-5">
            <InfoIcon />
          </div>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Deseja deletar essa licença?
          </h3>
          <div className="flex justify-center gap-4">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md text-sm font-semibold ring-1 ring-inset ring-red-300" onClick={() => deleteTask()}>
              {"Sim, eu quero"}
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-sm font-semibold ring-1 ring-inset ring-blue-300" onClick={() => setOpenModal(false)}>
              Não, cancele
            </button>
          </div>
        </div>
      </ModalFlow.Body>
    </ModalFlow>
  </>);
}