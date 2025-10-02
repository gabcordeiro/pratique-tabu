import React, { useState } from "react";
import { findUser, User } from "../utils/storage";

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const user = findUser(username, password);
    if (!user) {
      setError("Usuário ou senha incorretos");
      return;
    }
    onLogin(user);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-3">Login</h2>
      <input
        type="text"
        className="form-control mb-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Nome de usuário"
      />
      <input
        type="password"
        className="form-control mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
      />
      {error && <p className="text-danger">{error}</p>}
      <button className="btn btn-primary w-100" onClick={handleLogin}>
        Entrar
      </button>
    </div>
  );
};

export default Login;
