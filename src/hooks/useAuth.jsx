/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
/*
  A linha `const AuthContext = React.createContext<AuthContextType | undefined>(undefined);` está
  criando um objeto de contexto em React com um tipo específico que é a interface `AuthContextType`
*/
const AuthContext = React.createContext(undefined);
/**
 * O componente AuthProvider em React TypeScript gere a autenticação do utilizador armazenando os dados do utilizador em
 * armazenamento local e fornecendo funções para login e logout.
 * O código fornecido é um componente funcional React chamado `AuthProvider` que serve como
 * um provedor para autenticação em sua aplicação. Aqui está um detalhamento dos parâmetros e
 * funcionalidade:
 */
export const AuthProvider = ({ children, }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  /**
   * A função `login` configura de forma assíncrona os dados do usuário e redireciona para a página "/inicio".
   * O parâmetro `data` na função `login` é do tipo `User`, que contém informações
   * sobre o usuário que está tentando fazer o login, como seu nome de usuário, senha
   */
  const login = async (data) => {
    setUser(data);
    navigate("/inicio");
  };
  /**
   * A função `logout` define o `user` como `null` e redireciona para a página inicial.
   */
  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };
  /*
    A declaração `const value = React.useMemo(...)` está usando o hook `useMemo` do React para memorizar
    o objeto valor que será fornecido ao contexto.
  */
  const value = React.useMemo(() => ({
    user,
    login,
    logout,
  }),
    /*
      O `[user]` dentro do hook `React.useMemo` está especificando as dependências para a memorização.
      No React, o `useMemo` é usado para memorizar um valor e recomputá-lo apenas quando uma das dependências mudar.
    */
    [user]);
  /*
    A linha `return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;` está
    retornando um elemento JSX que representa o componente do provedor para o `AuthContext`. Este componente
    componente provedor é responsável por fornecer os valores relacionados à autenticação (user, login,
    logout) para seus descendentes através do contexto.
  */
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
/**
 * A função useAuth é um hook personalizado no React que recupera o contexto de autenticação.
 * @returns O hook personalizado `useAuth` está sendo retornado, que é uma função que retorna o
 * `AuthContextType `.
 */
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
