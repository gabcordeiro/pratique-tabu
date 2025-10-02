import React from "react";
import { TabuadaRecord } from "../utils/storage";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface HistoryChartProps {
  records: TabuadaRecord[];
}

const HistoryChart: React.FC<HistoryChartProps> = ({ records }) => {
  const data = records.map((r) => ({
    date: r.date,
    percentage: r.percentage,
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="percentage" fill="#007bff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoryChart;
