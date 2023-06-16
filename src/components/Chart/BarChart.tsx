import React from "react";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import { Typography, Box } from "@mui/material";

interface BarChartProps {
  data: Array<{ category: string; value: number }>;
  valueSum: number;
}

const BarChart: React.FC<BarChartProps> = ({ data, valueSum }) => {
  const TitleComponent = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <Typography
          align="left"
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        >
          This Week Statistics
        </Typography>
        <Typography variant="h5" align="left" color="text.primary" gutterBottom>
          Kes. {valueSum}
        </Typography>
      </Box>
    );
  };
  return (
    <Chart data={data}>
      <ArgumentAxis />
      <ValueAxis />

      <Title textComponent={TitleComponent} />
      <BarSeries color="#46df99" valueField="value" argumentField="category" />

      <Animation />
    </Chart>
  );
};

export default BarChart;
