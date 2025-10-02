import React from "react";
import { Link } from "react-router-dom";
import { User } from "../utils/storage";

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Pratique Tabu
        </Link>
        <div>
          {user ? (
            <>
              <span className="navbar-text me-3">Olá, {user.username}</span>
              <button
                className="btn btn-outline-light btn-sm"
                onClick={onLogout}
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-light btn-sm me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline-light btn-sm" to="/register">
                Cadastrar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
