/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";
/**
 * O componente `ProtectedRoute` verifica se o estado global de usuário está autenticado e redireciona para a página inicial.
 * O componente `ProtectedRoute` recebe um `children` como parâmetro. O hook `useAuth`
 * é usado para recuperar o objeto `user` do contexto de autenticação. Se não houver nenhum usuário
 * logado, o componente irá redirecionar para a página inicial utilizando o componente `Navigate`.
 * @returns O componente `ProtectedRoute` retorna o componente `children` se o `user` estiver
 * autenticado. Se o `usuário` não for autenticado, ele retorna um componente `<Navigate>` que
 * redireciona para a página inicial ("/").
 */
export const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/" />;
    }
    return children;
};
/**
 * O componente RouteIsAuth redireciona para a rota "/inicio" se o utilizador estiver autenticado
 * O componente `RouteIsAuth` é um componente React customizado que recebe um `children`
 * como parâmetro. Ele verifica se há um usuário autenticado usando o hook `useAuth`. Se um usuário estiver
 * autenticado, ele redireciona para a rota "/inicio" usando o componente `Navigate` de
 * O componente `RouteIsAuth` retorna ou um redirecionamento para a rota "/inicio" se houver
 * um o objeto `user` do contexto de autenticação for autenticado, ou devolve os componentes filhos
 * se não houver nenhum utilizador autenticado, que no caso é usado apenas para a tela de `Login`.
 */
export const RouteIsAuth = ({ children }) => {
    const { user } = useAuth();
    if (user) {
        return <Navigate to="/inicio" />;
    }
    return children;
};
