/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
export default function LoadingDatatable({ delay, loadingProps, loadingIcon, }) {
  const [isDatatableLoaded, setIsDatatableLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsDatatableLoaded(true);
    }, delay);
  });
  const classNameText = `absolute top-0 left-0 w-full h-[60%] flex flex-col gap-y-2 justify-end items-center font-bold z-60 text-${loadingProps.color}-700`;
  return (<>
    {isDatatableLoaded ? (<>
      {document
        .getElementById("loading-datatable")
        ?.classList.remove("hidden")}
    </>) : (<>
      <div className={classNameText}>
        {loadingProps.text}
        {loadingIcon}
      </div>
    </>)}
  </>);
}
