import axios from "axios";

/* O trecho de código está criando uma instância do Axios utilizando o método `axios.create()`. Esta instância
é armazenada na variável constante `api`. O método `axios.create()` permite criar uma nova instância do
instância do Axios com opções de configuração personalizadas. Neste caso, as opções de configuração incluem
definir o `baseURL` como "http://ecolicencascaj/api_ecoLic". Isso significa que qualquer requisição HTTP feita
usando esta instância `api` terá esta URL base anexada às suas URLs relativas. 
*/
const api = axios.create({
  baseURL: "http://ecolicencascaj/api_ecoLic",
});

export default api;
