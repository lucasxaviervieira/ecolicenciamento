/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";

import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

export default function RemoveLicense() {
  const removeRef: any = useRef(null);
  const { user }: any = useAuth();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const licenseId = parseInt(removeRef.current.value);
    const username = user.username;
    const jsonParam = { id: licenseId, username: username };
    removeData(jsonParam);
  };

  async function removeData(jsonParam: object) {
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

  return (
    <>
      <div className="p-3 h-[75%] w-full flex flex-col justify-center items-center">
        <div className="w-[50%]">
          <div className="bg-red-500">
            <div className="px-8 py-4 font-bold text-white text-center">
              Remover Licença
            </div>
          </div>
          <form className="bg-gray-50" onSubmit={handleSubmit}>
            <div className="px-8 pt-4 text-gray text-center">
              <div className="col-span-6 md:col-span-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  ID da licença:
                </label>

                <input
                  className="p-3 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  id="area"
                  type="number"
                  ref={removeRef}
                  required
                />
                <div className="py-6 text-center">
                  <button
                    type="submit"
                    className="w-56 px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm close-modal hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
