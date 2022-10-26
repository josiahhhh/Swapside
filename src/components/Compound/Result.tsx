import formatMoney from "@/utils/formatMoney";
import { Paper } from "@mantine/core";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Result } from "typings/typings";

interface Props {
  data: Result;
  initialDeposit: number;
}

const ResultChart: React.FC<Props> = ({ data, initialDeposit }) => {
  console.log(data);
  // Guard

  return (
    <Paper mt={"lg"}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="monthNumber" />
          <YAxis tickFormatter={(value) => formatMoney(value)} />
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
          <Bar
            name="Starting Balance"
            dataKey="startingBalance"
            stackId="a"
            fill="#1c4d78"
          />
          <Bar
            name="Regular deposits"
            dataKey="cumulativeRegularDeposits"
            stackId="a"
            fill="#3c83c2"
          />
          <Bar
            name="Interest"
            dataKey="cumulativeInterest"
            stackId="a"
            fill="#82ca9d"
          />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default ResultChart;
