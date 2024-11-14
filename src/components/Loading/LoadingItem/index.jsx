/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
export default function LoadingItem({ delay, loadingIcon }) {
    const [isItemLoaded, setIsItemLoaded] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setIsItemLoaded(true);
        }, delay);
    });
    return (<>
        {isItemLoaded ? (<>
            {document.getElementById("loading-total")?.classList.remove("hidden")}
        </>) : (<>{loadingIcon}</>)}
    </>);
}
