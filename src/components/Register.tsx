import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUser, getUsers } from "../utils/storage";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (getUsers().some((u) => u.username === username)) {
      setError("Usuário já existe");
      return;
    }
    saveUser({ username, password });
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Cadastrar</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-success">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Register;
