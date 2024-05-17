# Licenças Ambientais Águas de Joinville

O propósito do sistema reside em facilitar a administração e análise das licenças ambientais vinculadas aos setores correspondentes.

Este sistema opera por meio de páginas web utilizando React que se conectam a um endpoint, oferecendo funcionalidades completas de Criação, Leitura e Atualização, este feito com PHP, utilizando uma API Restful.

Todas as informações geradas são posteriormente encaminhadas para dois painéis de controle elaborados em Business Intelligence (BI).

O primeiro painel é direcionado à gestão, enquanto o segundo é destinado à análise dos dados.

Este modelo permite uma abordagem abrangente e eficiente na gestão das licenças ambientais, oferecendo insights valiosos para aprimorar a tomada de decisões e otimizar processos relacionados.

# \[Licenciamento GQM - CAJ\]

Aplicação Front End

## Tecnologias Usadas

- [React](https://reactjs.org/) Framework Web JS.
- [Vite](https://reactjs.org/) Pacote que serve os ambientes de desenvolvimento.
- [Axios](https://axios-http.com/docs/intro) Pacote para realizar requisições.
- [React Router](https://reactrouter.com/en/main) Pacote que gere as rotas da aplicação.
- [Tanstack Table](https://tanstack.com/table/latest/docs/introduction) Pacote de criação de tabelas com diversas funções.
- [JSEncrypt](https://github.com/travist/jsencrypt) Pacote de criptografia
- [tailwindcss](https://tailwindcss.com/docs/) Framework CSS
- [Flowbite React](https://flowbite-react.com/) Pacote de componentes que utilizam TailwindCSS

## Setup

1. Clone esse repositório e instale as dependências

```bash
npm install
```

2. Inicie a aplicação localmente em um ambiente de desenvolvimento

```bash
npm run dev
```

## Comandos Disponíveis

- `npm lint`: Roda o `linter`.
- `npm build`: Roda o `build` do projeto para ser que ele seja usado em produção.
- `npm preview`: Roda a aplicação que recebeu o comando `npm build` localmente.

Esse `app` foi inicializado baseado no `template` providenciado pelo[`create-vite`](https://github.com/vitejs/vite/tree/main/packages/create-vite)
