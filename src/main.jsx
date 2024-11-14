import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./routes";
import "./index.css";
/*
  Este trecho de código está tentando localizar o elemento HTML com o id "root" no documento.
  Esta é uma verificação de segurança para garantir que o elemento raiz exista antes tentando renderizar o aplicativo React nele.
*/
const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("Failed to find the root element");
}
/*
  Este trecho de código está usando ReactDOM's `createRoot` para renderizar a aplicação React.
*/
ReactDOM.createRoot(rootElement).render(<React.StrictMode>
    {/*
        O componente `<BrowserRouter>` é fornecido pela biblioteca React Router. Ele é
        usado para habilitar o roteamento em um aplicativo React.
    */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>);
