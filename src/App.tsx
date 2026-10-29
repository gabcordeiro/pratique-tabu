import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import {
  User,
  createAnonymousUser,
  clearAnonymousHistory,
} from "./utils/storage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isRegister, setIsRegister] = useState(false);

  const handleLogout = () => {
    if (user?.anonymous) clearAnonymousHistory();
    setUser(null);
  };

  if (!user) {
    return isRegister ? (
      <Register
        onRegister={setUser}
        onBackToLogin={() => setIsRegister(false)}
      />
    ) : (
      <div className="container mt-5">
        <Login onLogin={setUser} />
        <p className="text-center mt-2">
          Não tem conta?{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => setIsRegister(true)}
          >
            Criar conta
          </span>
        </p>
        <div className="text-center">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setUser(createAnonymousUser())}
          >
            Entrar sem login (modo anônimo)
          </button>
          <p className="text-muted small mt-1">
            No modo anônimo o histórico não é salvo depois que você sair.
          </p>
        </div>
      </div>
    );
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
};

export default App;
