import { useState } from "react";
import { LoadingIcon } from "../../../Icons";
export default function DashboardMonitor() {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const handleIframeLoad = () => {
    setIsIframeLoaded(true);
  };
  return (<>
    <div className="hidden fixed w-full h-[88%] pt-3" id="loading-datatable">
      <iframe title="Dashboard Novo" onLoad={handleIframeLoad} src="https://app.powerbi.com/view?r=eyJrIjoiNjI5ODk2YjUtN2M0OS00MWZlLTgzNjctNmQ1NmU0MmVhYzllIiwidCI6IjFjMDMzNzc4LTU4MWItNDAwYy05NDM3LWM5MjI1Y2VmZWQ3MCJ9" className="w-full h-full"></iframe>
    </div>
    {isIframeLoaded ? (<>
      {document
        .getElementById("loading-datatable")
        ?.classList.remove("hidden")}
    </>) : (<>
      <div className="w-full h-[87%] flex flex-col gap-y-2 justify-center items-center font-bold text-green-600 z-60">
        Carregando Dashboard (Operação)...
        <LoadingIcon iconParams={{ color: "fill-green-600", size: "lg" }} />
      </div>
    </>)}
  </>);
}
