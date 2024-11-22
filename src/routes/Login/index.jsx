import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import authUser from "../../services/login";
import cajLogo from "../../assets/caj.png";
import cajSede from "../../assets/caj_sede.jpg";
/*
  A função `Login()` está definindo um componente funcional chamado `Login`.
  Este componente representa um formulário de login para uma aplicação web, permitindo que os usuários insiram seu nome de usuário e senha para autenticar com uma
  API. O componente inclui gerenciamento de estado usando o hook `useState`, manipulação de entrada de formulário,
  comunicação com a API para autenticar usuários, e elementos de interface do usuário para o formulário de login.
*/
export default function Login() {
  /*
    A linha `const { login }: any = useAuth();` está utilizando atribuição de desestruturação para extrair a função
    função `login` do objeto retornado pelo hook `useAuth()`. O hook `useAuth()` retorna um objeto com propriedades,
    e usando destruturação, nós estamos especificamente extraindo a função `login` desse objeto.
  */
  const { login } = useAuth();
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formValue;
  const [msg, setMsg] = useState();
  function showMsg(typeMsg) {
    const msgComponent = document.getElementById(typeMsg);
    msgComponent.classList.remove("hidden");
  }

  function verifyAuth(data) {
    const token = data.token;
    const user = data.user;
    if (token && user) {
      showMsg("success");
      const newData = { token, user };
      setTimeout(async () => {
        await login(newData);
      }, 500);
    }
    else {
      setMsg("Login incorreto");
      showMsg("error");
    }
  }
  /**
   * A função `postLogin` faz um pedido POST para um endpoint da API de autenticação
   * com os parâmetros username e password fornecidos.
   */

  const postLogin = async (loginInfo) => {
    try {
      const data = await authUser(loginInfo);
      verifyAuth(data);
    } catch (error) {
      console.error("Erro ao tentar requisitar a rota de login:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  /**
   * A função `handleSubmit` impede o comportamento padrão de envio de formulários e publica os dados do formulário com o
   * nome de usuário e senha fornecidos.
   * O parâmetro `event` na função `handleSubmit` é do tipo
   * `React.FormEvent<HTMLFormElement>`. Este parâmetro representa o evento de submissão de formulário em uma aplicação React.
   * Quando o formulário é submetido, este manipulador de eventos é acionado, permitindo que você evite
   * o comportamento padrão de submissão de formulários usando `event.preventDefault()`
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const loginInfo = {
      usuario: username,
      senha: password,
    };
    postLogin(loginInfo);
  };
  const hiddenMsg = (successOrError) => () => {
    const msgComponent = document.getElementById(successOrError);
    msgComponent.classList.add("hidden");
  };
  return (<>
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-[40%] h-screen hidden lg:block bg-sky-900 shadow-lg shadow-sky-900">
        <img className="object-scale-down w-full h-full" src={cajSede} alt="Companhia Águas de Joinville" />
      </div>
      <div className="flex  min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        <img className="w-28 " src={cajLogo} alt="CAJ LOGO" />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-5xl font-semi-bold leading-9 tracking-tight text-gray-800">
            Acesse sua conta:
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-md font-medium leading-6 text-gray-900">
                Usuário:
              </label>
              <div className="mt-2">
                <input value={username} onChange={handleChange} name="username" type="text" required className="block w-full rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-md font-medium leading-6 text-gray-900">
                  Senha
                </label>
              </div>
              <div className="mt-2">
                <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Login
              </button>
            </div>
          </form>

          <div id="error" className="w-full inline-flex justify-between my-3 py-2 bg-red-500  rounded text-white font-bold hidden msgComponent">
            <p className="px-5">{msg}</p>
            <button onClick={hiddenMsg("error")} className="px-5">
              x
            </button>
          </div>
          <div id="success" className="w-full inline-flex justify-center my-3 py-2 bg-green-500 rounded text-white font-bold hidden msgComponent ">
            <p className="px-5">login efetuado com sucesso...</p>
          </div>
        </div>
      </div>
    </div>
  </>);
}
