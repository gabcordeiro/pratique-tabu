import React, { useState } from "react";
import { User, saveUser, getUsers, ANONYMOUS_USERNAME } from "../utils/storage";

interface RegisterProps {
  onRegister: (user: User) => void;
  onBackToLogin: () => void; // para voltar ao login
}

const Register: React.FC<RegisterProps> = ({ onRegister, onBackToLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Preencha todos os campos");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    const users = getUsers();
    if (
      username === ANONYMOUS_USERNAME ||
      users.some((u) => u.username === username)
    ) {
      setError("Nome de usuário já existe");
      return;
    }

    if (users.some((u) => u.email === email)) {
      setError("Email já registrado");
      return;
    }

    const newUser: User = { username, email, password, points: 0 };
    saveUser(newUser);
    onRegister(newUser);
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-link mb-3" onClick={onBackToLogin}>
        ← Voltar para Login
      </button>
      <h2 className="text-center mb-3">Registrar Conta</h2>

      <input
        type="text"
        className="form-control mb-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Nome de usuário"
      />
      <input
        type="email"
        className="form-control mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        className="form-control mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha (mínimo 6 caracteres)"
      />
      <input
        type="password"
        className="form-control mb-2"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirmar senha"
      />

      {error && <p className="text-danger">{error}</p>}

      <button className="btn btn-success w-100" onClick={handleRegister}>
        Criar Conta
      </button>
    </div>
  );
};

export default Register;
