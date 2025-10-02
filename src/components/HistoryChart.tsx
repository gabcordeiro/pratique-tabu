import React from "react";
import { TabuadaRecord } from "../utils/storage";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface HistoryChartProps {
  records: TabuadaRecord[];
}

const HistoryChart: React.FC<HistoryChartProps> = ({ records }) => {
  const data = records.map((r) => ({
    date: r.date,
    percentage: r.percentage,
    acertos: r.correctAnswers,
  }));

  return (
    <div style={{ width: "100%", height: 300 }} className="my-3">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="percentage" fill="#007bff" name="Porcentagem (%)" />
          <Bar dataKey="acertos" fill="#28a745" name="Acertos" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoryChart;
