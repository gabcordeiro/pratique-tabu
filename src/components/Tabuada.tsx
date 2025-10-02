import React, { useState } from "react";
import { User, saveHistory, TabuadaRecord } from "../utils/storage";

interface TabuadaProps {
  user: User;
}

const Tabuada: React.FC<TabuadaProps> = ({ user }) => {
  const [number, setNumber] = useState(1);
  const [results, setResults] = useState<{ n: number; result: number }[]>([]);

  const handleGenerate = () => {
    const res = [];
    for (let i = 1; i <= 10; i++) {
      res.push({ n: i, result: i * number });
    }
    setResults(res);
    const record: TabuadaRecord = {
      date: new Date().toLocaleDateString(),
      number,
      results: res,
    };
    saveHistory(user.username, record);
  };

  return (
    <div className="container">
      <h2>Praticar Tabuada</h2>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          value={number}
          onChange={(e) => setNumber(parseInt(e.target.value))}
        />
      </div>
      <button className="btn btn-primary mb-3" onClick={handleGenerate}>
        Gerar Tabuada
      </button>
      <ul className="list-group">
        {results.map((r) => (
          <li key={r.n} className="list-group-item">
            {number} x {r.n} = {r.result}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabuada;
