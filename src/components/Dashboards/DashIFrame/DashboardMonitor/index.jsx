import { useState } from "react";
import { LoadingIcon } from "../../../Icons";
export default function DashboardMonitor() {
    const [isIframeLoaded, setIsIframeLoaded] = useState(false);
    const handleIframeLoad = () => {
        setIsIframeLoaded(true);
    };
    return (<>
      <div className="hidden fixed w-full h-[88%] pt-3" id="loading-datatable">
        <iframe title="Dashboard Novo" onLoad={handleIframeLoad} src="https://app.powerbi.com/view?r=eyJrIjoiM2NkZjFmMjEtYmZlZi00NDI5LWFjM2ItMzVmYjdmMWUxZGFmIiwidCI6IjFjMDMzNzc4LTU4MWItNDAwYy05NDM3LWM5MjI1Y2VmZWQ3MCJ9" className="w-full h-full"></iframe>
      </div>
      {isIframeLoaded ? (<>
          {document
                .getElementById("loading-datatable")
                ?.classList.remove("hidden")}
        </>) : (<>
          <div className="w-full h-[87%] flex flex-col gap-y-2 justify-center items-center font-bold text-red-600 z-60">
            Carregando Dashboard (Monitor)...
            <LoadingIcon iconParams={{ color: "fill-red-600", size: "lg" }}/>
          </div>
        </>)}
    </>);
}
