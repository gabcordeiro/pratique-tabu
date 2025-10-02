# 🧮 Tabuada React - Projeto Educacional

![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?logo=typescript)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-purple?logo=bootstrap)
![License](https://img.shields.io/badge/license-MIT-green)

Um aplicativo web para **praticar tabuada**, com **login, registro, histórico, gráficos de evolução, desafios diários e badges de gamificação**, desenvolvido com **React, TypeScript e Bootstrap**.

---

## 🔹 Funcionalidades

- ✅ Registro e Login
  - Criar conta com **nome de usuário, email e senha**  
  - Confirmação de senha e validação de **mínimo 6 caracteres**  
  - Evita **usuário ou email duplicado**  
  - Login por **nome de usuário ou email**  

- ✅ Prática de Tabuada
  - Escolha do número da tabuada  
  - **30 perguntas por sessão**  
  - Feedback de acertos e erros  

- ✅ Histórico de Desempenho
  - Histórico diário de cada usuário  
  - Quantidade de acertos e tentativas  
  - Percentual de acertos  
  - Gráficos de evolução (Recharts)  

- ✅ Gamificação
  - Badges por desempenho (Excelente, Bom, Veterano, etc.)  
  - Desafios diários com tabuada aleatória  

- ✅ Dashboard
  - Visualização de histórico e gráficos  
  - Acesso rápido às práticas  
  - Logout seguro  

---

## 🔹 Tecnologias

- **React** (Functional Components + Hooks)  
- **TypeScript**  
- **Bootstrap 5**  
- **Recharts** (gráficos)  
- **LocalStorage** (persistência local)  
- **Animate.css** (animações)  

---

## 🔹 Estrutura do Projeto

- /src
- /components
- Dashboard.tsx
- History.tsx
- HistoryChart.tsx
- Login.tsx
- Register.tsx
- Tabuada.tsx
- /utils
- storage.ts
- App.tsx
- index.tsx
- App.css


---

## 🔹 Como Rodar

```bash

# Clonar o repositório
git clone https://github.com/seu-usuario/tabuada-react.git
cd tabuada-react

# Instalar dependências
npm install

# Rodar o servidor de desenvolvimento
npm start
Abra no navegador: http://localhost:3000

```

---

# Autor
Gabriel Cordeiro de Carvalho