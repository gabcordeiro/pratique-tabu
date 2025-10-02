import React from "react";
import { User, getHistory } from "../utils/storage";

interface HistoryProps {
  user: User;
}

const History: React.FC<HistoryProps> = ({ user }) => {
  const history = getHistory(user.username);

  return (
    <div className="container">
      <h2>Histórico</h2>
      {history.length === 0 && <p>Nenhuma prática registrada.</p>}
      {history.map((h, idx) => (
        <div key={idx} className="card mb-2">
          <div className="card-body">
            <h5 className="card-title">{h.date}</h5>
            {h.results.map((r) => (
              <p key={r.n}>
                {h.number} x {r.n} = {r.result}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
