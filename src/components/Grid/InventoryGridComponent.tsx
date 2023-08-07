import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbar,
} from "@mui/x-data-grid";

import { IconButton, CircularProgress } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchProducts,
  deleteProduct,
} from "../../redux/products/productActions";

import DeleteIcon from "../../assets/icons/DeleteIcon";

interface ProductProps {
  products: object[];
  loading: boolean;
  error: string | null;
}

const InventoryGridComponent: React.FC = () => {
  const [inventoryData, setInventoryData] = useState<object[]>([]);
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector<ProductProps>(
    (state) => state.products
  );

  console.log("products", products);
  console.log("error", error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products) {
      setInventoryData(() => products);
    }
  }, [products]);

  const handleDelete = (id: string) => {
    // Handle delete logic here
    dispatch(deleteProduct(id));

    // console.log("delete", id);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Product Name", width: 120 },
    { field: "quantity", headerName: "Quantity", width: 100 },
    { field: "price", headerName: "Price", width: 120 },
    { field: "image", headerName: "Image", width: 120 },
    {
      field: "category",
      headerName: "Category",
      width: 100,
      renderCell: (params: GridValueGetterParams) => {
        // Map over the products array and create a list of product names and categories
        const name = params.row.category.name;
        return <div>{name}</div>;
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
      renderCell: (params: GridValueGetterParams) => {
        // Map over the products array and create a list of product names and categories
        const description = params.row.description;
        return <div style={{ whiteSpace: "pre-wrap" }}>{description}</div>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      width: 100,
      renderCell: (params: GridValueGetterParams) => (
        <>
          <IconButton size="small" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
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
          rows={inventoryData}
          columns={columns}
          pagination
          autoPageSize
          disableRowSelectionOnClick
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </div>
    </>
  );
};

export default InventoryGridComponent;
