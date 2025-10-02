import React, { useState, useEffect } from "react";
import { User, getHistory, TabuadaRecord } from "../utils/storage";
import TabuadaPractice from "./TabuadaPractice";
import HistoryChart from "./HistoryChart";
import History from "./History";

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [history, setHistory] = useState<TabuadaRecord[]>([]);

  const loadHistory = () => {
    setHistory(getHistory(user.username));
  };

  useEffect(() => {
    loadHistory();
  }, []);

  // Desafios diários simples
  const dailyChallenge = Math.floor(Math.random() * 10) + 1;

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Olá, {user.username}!</h1>
        <button className="btn btn-danger" onClick={onLogout}>
          Sair
        </button>
      </div>

      {/* Desafio diário */}
      <div className="card p-3 mb-4 bg-warning text-dark animate__animated animate__fadeIn">
        <h4>Desafio do dia 🎯</h4>
        <p>
          Pratique a tabuada do número <strong>{dailyChallenge}</strong> hoje!
        </p>
      </div>

      {/* Prática de tabuada */}
      <TabuadaPractice user={user} onFinish={loadHistory} />

      {/* Gráfico */}
      {history.length > 0 && (
        <>
          <h3 className="text-center mt-4">Gráfico de desempenho</h3>
          <HistoryChart records={history} />

          {/* Histórico detalhado */}
          <History user={user} />
        </>
      )}

      {/* Badges de gamificação */}
      {history.length > 0 && (
        <div className="my-4">
          <h3>Badges conquistadas 🏅</h3>
          <div>
            {history.some((h) => h.percentage >= 80) && (
              <span className="badge bg-success me-2">Excelente 80%+</span>
            )}
            {history.some((h) => h.percentage >= 50 && h.percentage < 80) && (
              <span className="badge bg-warning me-2">Bom 50-79%</span>
            )}
            {history.length >= 5 && (
              <span className="badge bg-primary me-2">
                Veterano 5+ práticas
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
