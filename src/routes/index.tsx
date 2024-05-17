import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "../hooks/useAuth";
import { ProtectedRoute, RouteIsAuth } from "../hooks/AnalisysRoutes";

import Login from "./Login";
import ErrorPage from "./ErrorPage";

import {
  Navbar,
  Init,
  Datatable,
  LicenseRegister,
  Observation,
  Painel,
  DashboardGestor,
  DashboardMonitor,
  DashboardOperacao,
  Agenda,
  PageTitle,
} from "./components";

export default function App() {
  return (
    /*
    `<AuthProvider>` é um componente que envolve toda a aplicação e fornece contexto de autenticação
    para todos os seus componentes filhos. Ele é responsável por gerenciar o estado de autenticação do usuário,
    armazenar informações do usuário e fornecer funções e dados relacionados à autenticação para o resto da aplicação.
    Isto permite que os componentes da aplicação interagir facilmente com dados e funcionalidades relacionados com a autenticação. 
    */

    <AuthProvider>
      <Routes>
        {/*
        O `<Route path="*" element={<ErrorPage />} />` está configurando uma rota de captura geral na aplicação
        aplicação React. Esta rota será correspondida se nenhuma outra rota for correspondida antes dela. Neste
        Neste caso, ele está renderizando o componente `ErrorPage` quando o caminho da URL não corresponde a nenhuma das
        rotas definidas na aplicação. 
        */}
        <Route path="*" element={<ErrorPage />} />
        <Route
          path="/"
          element={
            <RouteIsAuth>
              <PageTitle title="GQM - Login" />
              <Login />
            </RouteIsAuth>
          }
        />
        <Route
          path="/inicio"
          element={
            <ProtectedRoute>
              <PageTitle title="GQM - Home" />
              <Navbar />
              <Init />
            </ProtectedRoute>
          }
        />
        <Route
          path="/licenciamento"
          element={
            <ProtectedRoute>
              <PageTitle title="GQM - Licenciamento" />
              <Navbar />
              <Datatable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adicionar"
          element={
            <ProtectedRoute>
              <PageTitle title="GQM - Adicionar" />
              <Navbar />
              <LicenseRegister />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard_gestao"
          element={
            <ProtectedRoute>
              <PageTitle title="GQM - Dashboard Gestão" />
              <Navbar />
              <DashboardGestor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard_monitor"
          element={
            <ProtectedRoute>
              <PageTitle title="GQM - Dashboard Monitor" />
              <Navbar />
              <DashboardMonitor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard_operacao"
          element={
            <ProtectedRoute>
              <PageTitle title="GQM - Dashboard Operação" />
              <Navbar />
              <DashboardOperacao />
            </ProtectedRoute>
          }
        />
        <Route
          path="/painel"
          element={
            <ProtectedRoute>
              <PageTitle title="GQM - Painel" />
              <Navbar />
              <Painel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/observacoes/:observacoesId"
          element={
            <ProtectedRoute>
              <PageTitle title="GQM - Observação" />
              <Navbar />
              <Observation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agenda/:agendaId"
          element={
            <ProtectedRoute>
              <PageTitle title="GQM - Agenda" />
              <Navbar />
              <Agenda />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
