import React from "react";
import { User, getHistory } from "../utils/storage";
import TabuadaPractice from "./TabuadaPractice";
import HistoryChart from "./HistoryChart";

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const history = getHistory(user.username);

  return (
    <div className="container">
      <TabuadaPractice user={user} />
      {history.length > 0 && (
        <div className="mt-4">
          <h3>Gráfico de Desempenho</h3>
          <HistoryChart records={history} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
