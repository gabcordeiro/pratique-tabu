import React, { useEffect, useRef, useState } from "react";
import {
  User,
  TabuadaAnswer,
  TabuadaRecord,
  saveHistory,
} from "../utils/storage";

interface TabuadaPracticeProps {
  user: User;
  onFinish?: () => void;
}

interface Question {
  n1: number;
  n2: number;
}

const TOTAL_QUESTIONS = 30;

// Multiplicações por 1 e por 10 são fáceis demais, então usamos só de 2 a 9
const randomFactor = () => Math.floor(Math.random() * 8) + 2;

const randomTabuada = randomFactor;

const TabuadaPractice: React.FC<TabuadaPracticeProps> = ({
  user,
  onFinish,
}) => {
  const [number, setNumber] = useState(1);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [answers, setAnswers] = useState<TabuadaAnswer[]>([]);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const answerInputRef = useRef<HTMLInputElement>(null);

  // Mantém o cursor no campo de resposta durante a prática
  useEffect(() => {
    if (questions.length > 0 && !finished) {
      answerInputRef.current?.focus();
    }
  }, [questions, currentIndex, finished]);

  const generateQuestions = (tabuada: number = number) => {
    const qs: Question[] = [];
    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
      qs.push({ n1: randomFactor(), n2: tabuada });
    }
    setNumber(tabuada);
    setQuestions(qs);
    setCurrentIndex(0);
    setAnswers([]);
    setFinished(false);
    setFeedback(null);
  };

  const startRandomPractice = () => {
    generateQuestions(randomTabuada());
  };

  const handleAnswer = (e?: React.FormEvent) => {
    e?.preventDefault();
    answerInputRef.current?.focus();
    // Ignora Enter enquanto o feedback da questão anterior ainda está na tela
    if (userAnswer === "" || feedback !== null) return;

    const q = questions[currentIndex];
    const ansNum = parseInt(userAnswer);
    const correct = ansNum === q.n1 * q.n2;

    setFeedback(correct ? "correct" : "wrong");

    const updatedAnswers = [
      ...answers,
      { question: `${q.n1} x ${q.n2}`, answer: ansNum, correct },
    ];
    setAnswers(updatedAnswers);
    setUserAnswer("");

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex + 1 < TOTAL_QUESTIONS) {
        setCurrentIndex(currentIndex + 1);
      } else {
        finishPractice(updatedAnswers);
      }
    }, 500);
  };

  const finishPractice = (finalAnswers: TabuadaAnswer[]) => {
    const correctCount = finalAnswers.filter((a) => a.correct).length;
    const record: TabuadaRecord = {
      date: new Date().toLocaleDateString(),
      number,
      attempts: TOTAL_QUESTIONS,
      correctAnswers: correctCount,
      percentage: Math.round((correctCount / TOTAL_QUESTIONS) * 100),
      answers: finalAnswers,
    };
    saveHistory(user.username, record);
    setFinished(true);
    onFinish?.();
  };

  return (
    <div className="container">
      {!questions.length && (
        <div className="practice-start card p-4 my-3 animate__animated animate__fadeIn">
          <h2 className="text-center mb-3">Escolha a tabuada para praticar</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              generateQuestions();
            }}
          >
            <input
              type="number"
              inputMode="numeric"
              className="form-control mb-3"
              value={number}
              onChange={(e) => setNumber(parseInt(e.target.value))}
              autoFocus
            />
            <button type="submit" className="btn btn-primary w-100 mb-2">
              Iniciar Prática
            </button>
          </form>
          <button
            className="btn btn-outline-primary w-100"
            onClick={startRandomPractice}
          >
            🎲 Sortear tabuada aleatória
          </button>
        </div>
      )}

      {questions.length > 0 && !finished && (
        <div className="practice-card card p-4 my-3 text-center animate__animated animate__fadeIn">
          <h4>
            Questão {currentIndex + 1} / {TOTAL_QUESTIONS}
          </h4>
          <p className="question">
            {questions[currentIndex].n1} x {questions[currentIndex].n2} = ?
          </p>
          <form onSubmit={handleAnswer}>
            <input
              ref={answerInputRef}
              type="number"
              inputMode="numeric"
              autoFocus
              className={`form-control mb-2 ${
                feedback === "correct"
                  ? "is-valid"
                  : feedback === "wrong"
                  ? "is-invalid"
                  : ""
              }`}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
            <button type="submit" className="btn btn-success mt-2 w-50">
              Responder
            </button>
          </form>

          {/* Indicador de acertos e erros */}
          <div className="mt-3">
            <span className="badge bg-success me-2">
              Acertos: {answers.filter((a) => a.correct).length}
            </span>
            <span className="badge bg-danger">
              Erros: {answers.filter((a) => !a.correct).length}
            </span>
          </div>
        </div>
      )}

      {finished && (
        <div className="practice-result card p-4 my-3 text-center animate__animated animate__bounceIn">
          <h2>Prática finalizada!</h2>
          <p>Tabuada: {number}</p>
          <p>
            Acertos: {answers.filter((a) => a.correct).length} /{" "}
            {TOTAL_QUESTIONS}
          </p>
          <p>
            Porcentagem:{" "}
            {Math.round(
              (answers.filter((a) => a.correct).length / TOTAL_QUESTIONS) * 100
            )}
            %
          </p>

          {/* Badge de performance */}
          {answers.filter((a) => a.correct).length / TOTAL_QUESTIONS >= 0.8 ? (
            <span className="badge bg-success fs-5">Excelente!</span>
          ) : answers.filter((a) => a.correct).length / TOTAL_QUESTIONS >=
            0.5 ? (
            <span className="badge bg-warning fs-5">Bom!</span>
          ) : (
            <span className="badge bg-danger fs-5">Precisa praticar mais!</span>
          )}

          <div className="d-flex flex-column align-items-center gap-2 mt-3">
            <button
              className="btn btn-primary w-50"
              onClick={() => generateQuestions()}
              autoFocus
            >
              Praticar novamente
            </button>
            <button
              className="btn btn-outline-primary w-50"
              onClick={startRandomPractice}
            >
              🎲 Sortear outra tabuada
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabuadaPractice;
