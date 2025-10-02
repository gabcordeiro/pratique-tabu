import React from "react";
import { User, getHistory } from "../utils/storage";

interface HistoryProps {
  user: User;
}

const History: React.FC<HistoryProps> = ({ user }) => {
  const history = getHistory(user.username);

  return (
    <div className="container my-4">
      <h3>Histórico detalhado</h3>
      {history.length === 0 && <p>Nenhuma prática registrada.</p>}
      {history.map((h, idx) => (
        <div key={idx} className="card mb-2 p-2">
          <h5 className="card-title">{h.date}</h5>
          <p>Tabuada: {h.number}</p>
          <p>
            Acertos: {h.correctAnswers} / {h.attempts} | {h.percentage}%
          </p>
          <div>
            {h.answers.map((a, i) => (
              <span
                key={i}
                className={`badge me-1 ${
                  a.correct ? "bg-success" : "bg-danger"
                }`}
              >
                {a.question}={a.answer}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
