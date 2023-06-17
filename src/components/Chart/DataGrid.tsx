import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const columns: GridColDef[] = [
  {
    field: "trackingNo",
    headerName: "Tracking No.",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "productName",
    headerName: "Product Name",
    width: 200,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "totalOrder",
    headerName: "Total Order",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "totalAmount",
    headerName: "Total Amount",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
];

const rows = [
  {
    id: 1,
    trackingNo: "TRK123",
    productName: "Product A",
    totalOrder: 5,
    status: "Shipped",
    totalAmount: "$100",
  },
  {
    id: 2,
    trackingNo: "TRK456",
    productName: "Product B",
    totalOrder: 3,
    status: "Pending",
    totalAmount: "$75",
  },
  {
    id: 3,
    trackingNo: "TRK789",
    productName: "Product C",
    totalOrder: 2,
    status: "Delivered",
    totalAmount: "$50",
  },
  // Add more rows as needed
];

const RecentOrdersGrid: React.FC = () => {
  return (
    <Box
      sx={{
        height: 300,
        width: "100%",
        "& .super-app-theme--header": {
          backgroundColor: "#f4f5f7",
          // light green backgroundColor
        },
      }}
    >
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </Box>
  );
};

export default RecentOrdersGrid;
