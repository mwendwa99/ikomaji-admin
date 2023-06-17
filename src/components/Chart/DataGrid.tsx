import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

interface Orders {
  id: number;
  orderNumber: string;
  productName: string;
  totalOrder: number;
  status: string;
  totalAmount: string;
}

interface Props {
  orders: Orders[];
}

const columns: GridColDef[] = [
  {
    field: "orderNumber",
    headerName: "Order No.",
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

const RecentOrdersGrid: React.FC = (props: Props) => {
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
      <DataGrid rows={props.orders} columns={columns} pageSize={5} />
    </Box>
  );
};

export default RecentOrdersGrid;
