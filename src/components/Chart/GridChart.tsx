import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  SplineSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";

interface DataRow {
  id: number;
  title: string;
  value: number;
}

const data: { month: string; value: number }[] = [
  { month: "Jan", value: 100 },
  { month: "Feb", value: 150 },
  { month: "Mar", value: 200 },
  { month: "Apr", value: 120 },
  // ... add more data points
];

const columns: GridColDef[] = [
  { field: "id", headerName: "No.", width: 150 },
  { field: "title", headerName: "Category", width: 150 },
  { field: "value", headerName: "Value", width: 50 },
];

const rows: DataRow[] = [
  { id: 1, title: "Financial Growth", value: 300 },
  { id: 2, title: "Expenses", value: 200 },
  { id: 3, title: "Profits", value: 100 },
];

const SimpleGridWithChart: React.FC = () => {
  const Tick = (props: any) => {
    const { x, y, text } = props;
    return (
      <g transform={`translate(${x} ${y})`}>
        <text textAnchor="middle" dominantBaseline="middle">
          {text}
        </text>
      </g>
    );
  };
  return (
    <Box>
      <DataGrid rows={rows} columns={columns} autoHeight />
      <Chart data={data} height={230}>
        {" "}
        <ArgumentAxis />
        <ValueAxis tickComponent={Tick} showLine={false} />
        <SplineSeries
          color="#46df99"
          valueField="value"
          argumentField="month"
        />
        <Animation />
      </Chart>
    </Box>
  );
};

export default SimpleGridWithChart;
