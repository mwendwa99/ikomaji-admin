import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbar,
} from "@mui/x-data-grid";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  IconButton,
  CircularProgress,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchOrders, deleteOrder } from "../../redux/orders/orderActions";

import DeleteIcon from "../../assets/icons/DeleteIcon";
import ExpandIcon from "../../assets/icons/ExpandIcon";

interface OrdersProps {
  orders: object[];
  loading: boolean;
}

const OrderGridComponent: React.FC = () => {
  const [openRow, setOpenRow] = useState<number | null>(null);
  const [dropDownTitle, setDropDownTitle] = useState<string>("");
  const [ordersData, setOrdersData] = useState<object[]>([]);
  const [dropdownData, setDropdownData] = useState<object[]>([]);
  const dispatch = useAppDispatch();
  const { orders, loading } = useAppSelector<OrdersProps>(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    if (orders) {
      setOrdersData([
        ...orders.map((order: any) => {
          return {
            ...order,
            orderDate: order.orderDate
              .slice(0, 10)
              .split("-")
              .reverse()
              .join("/"),
            deliveryDate: order.deliveryDate
              .slice(0, 10)
              .split("-")
              .reverse()
              .join("/"),
            products: order.products,
          };
        }),
      ]);
    }
  }, [orders]);

  useEffect(() => {
    if (ordersData.length > 0) {
      const updatedDropdownData = ordersData.flatMap((order) => order.products);
      setDropdownData(updatedDropdownData);
    }
  }, [ordersData]);

  const handleExpand = (params: GridValueGetterParams) => {
    //check whether products exist
    if (params.row.products.length > 0) {
      setOpenRow((prev) => (prev === params.row.id ? null : params.row.id));
      setDropDownTitle(params.row.orderNumber);
    } else {
      alert("No products in this order");
    }
  };

  const handleDelete = (id: number) => {
    // Handle delete logic here
    dispatch(deleteOrder(id));
  };

  const columns: GridColDef[] = [
    { field: "status", headerName: "Status", width: 100 },
    { field: "orderDate", headerName: "Order Date", width: 120 },
    { field: "orderNumber", headerName: "Order Number", width: 100 },
    { field: "documentNumber", headerName: "Document", width: 120 },
    { field: "paymentDate", headerName: "Payment Date", width: 120 },
    { field: "deliveryDate", headerName: "Deliver Date", width: 120 },
    { field: "totalAmount", headerName: "Total", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      width: 100,
      renderCell: (params: GridValueGetterParams) => (
        <>
          <IconButton size="small" onClick={() => handleExpand(params)}>
            <ExpandIcon />
          </IconButton>
          <IconButton size="small" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const dropDownColumns = [
    {
      field: "name",
      headerName: "Name",
      width: 100,
      renderCell: (params: GridValueGetterParams) => {
        // Map over the products array and create a list of product names and categories
        const name = params.row.product.name;
        return <div>{name}</div>;
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 100,
      renderCell: (params: GridValueGetterParams) => {
        // Map over the products array and create a list of product names and categories
        const name = params.row.product.category.name;
        return <div>{name}</div>;
      },
    },
    { field: "quantity", headerName: "Quantity", width: 100 },
    {
      field: "netValue",
      headerName: "Unit Value",
      width: 100,
      renderCell: (params: GridValueGetterParams) => {
        // Map over the products array and create a list of product names and categories
        const name = params.row.product.price;
        return <div>{name}</div>;
      },
    },
    {
      field: "grossValue",
      headerName: "Total Value",
      width: 100,
      renderCell: (params: GridValueGetterParams) => {
        // Map over the products array and create a list of product names and categories
        const name = params.row.product.price * params.row.quantity;
        return <div>{name}</div>;
      },
    },
  ];

  if (loading) {
    // Show a loading indicator or message while fetching data
    return <CircularProgress />;
  }

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={ordersData}
          columns={columns}
          pagination
          autoPageSize
          disableRowSelectionOnClick
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </div>
      <FormControl>
        <Dialog
          open={!!openRow}
          onClose={() => setOpenRow(null)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Order {dropDownTitle}</DialogTitle>
          <DialogContent>
            {openRow && (
              <DataGrid rows={dropdownData} columns={dropDownColumns} />
            )}
          </DialogContent>
        </Dialog>
      </FormControl>
    </>
  );
};

export default OrderGridComponent;
