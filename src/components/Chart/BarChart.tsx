import React from "react";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";

interface BarChartProps {
  data: Array<{ category: string; value: number }>;
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  return (
    <Chart data={data}>
      <ArgumentAxis />
      <ValueAxis />

      <BarSeries valueField="value" argumentField="category" />
      <Title text="Bar Chart" />

      <Animation />
    </Chart>
  );
};

export default BarChart;
