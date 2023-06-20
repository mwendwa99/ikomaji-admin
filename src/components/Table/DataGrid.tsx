import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

interface Props {
  orders: object[];
  loading: boolean;
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
    width: 150,
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
  {
    field: "orderDate",
    headerName: "Order Date",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
];

const RecentOrdersGrid: React.FC<Props> = (props) => {
  const rowData = props.orders
    ? props.orders.map((order: any) => {
        return {
          id: order.order_number,
          orderNumber: order.order_number,
          productName: order.product_name,
          totalOrder: order.total_order,
          status: order.order_status,
          totalAmount: order.order_total,
          orderDate: order.order_date,
        };
      })
    : [];

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
      {props.loading ? (
        <div>Loading...</div>
      ) : (
        <DataGrid rows={rowData} columns={columns} autoPageSize />
      )}
    </Box>
  );
};

export default RecentOrdersGrid;
