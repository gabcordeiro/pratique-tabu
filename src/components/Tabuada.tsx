import React, { useState } from "react";
import {
  User,
  saveHistory,
  TabuadaRecord,
  TabuadaAnswer,
} from "../utils/storage";

interface TabuadaProps {
  user: User;
}

const Tabuada: React.FC<TabuadaProps> = ({ user }) => {
  const [number, setNumber] = useState(1);
  const [answers, setAnswers] = useState<TabuadaAnswer[]>([]);

  const handleGenerate = () => {
    const res: TabuadaAnswer[] = [];
    for (let i = 1; i <= 10; i++) {
      const result = i * number;
      res.push({
        question: `${number} x ${i}`,
        answer: result,
        correct: true, // como é apenas geração da tabuada, consideramos todas corretas
      });
    }
    setAnswers(res);

    const record: TabuadaRecord = {
      date: new Date().toLocaleDateString(),
      number,
      attempts: 10,
      correctAnswers: 10,
      percentage: 100,
      answers: res,
    };

    saveHistory(user.username, record);
  };

  return (
    <div className="container my-4">
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
        {answers.map((a, index) => (
          <li key={index} className="list-group-item">
            {a.question} = {a.answer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabuada;
