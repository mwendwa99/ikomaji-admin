import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRowData } from "@mui/x-data-grid";
import { Button, TextField, Box } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface InventoryGridProps {
  products: object[];
  loading: boolean;
}
const initialRows: InventoryItem[] = [
  { id: 1, name: "Item 1", quantity: 10, price: 10.99 },
  { id: 2, name: "Item 2", quantity: 5, price: 5.99 },
];

const columns: GridColDef[] = [
  { field: "product_id", headerName: "Product Id", width: 100 },
  { field: "product_name", headerName: "Product Name", width: 150 },
  { field: "quantity", headerName: "Stock", width: 100 },
  { field: "price", headerName: "Price", width: 100 },
  { field: "size", headerName: "Size", width: 100 },
  {
    field: "category_name",
    headerName: "Category",
    width: 100,
    valueGetter: (params) => params.row.category?.category_name || "",
  },
  { field: "product_image", headerName: "Image", width: 100 },
  { field: "description", headerName: "Description", width: 200 },
];

const InventoryGrid: React.FC<InventoryGridProps> = ({ products, loading }) => {
  const [rows, setRows] = useState<InventoryItem[]>(initialRows);
  const [newRow, setNewRow] = useState<Partial<InventoryItem>>({});
  const { categories, loading: isCategoryLoading } = useAppSelector(
    (state) => state.categories
  );

  console.log("products", products);
  console.log("categories", categories);

  const handleAddRow = () => {
    const newInventoryItem: InventoryItem = {
      id: rows.length + 1,
      name: newRow.name || "",
      quantity: newRow.quantity || 0,
      price: newRow.price || 0,
    };

    // Make POST request to backend to save the new inventory item
    // Replace the console.log statement with your actual API call
    console.log("POST request to save new inventory item:", newInventoryItem);

    setRows((prevRows) => [...prevRows, newInventoryItem]);
    setNewRow({});
  };

  const handleFieldChange = (field: string, value: any) => {
    setNewRow((prevRow) => ({ ...prevRow, [field]: value }));
  };

  return (
    <Box sx={{ height: 400 }}>
      <DataGrid
        columns={columns}
        rows={products}
        // disableSelectionOnClick
        autoHeight
      />
      <Box sx={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <TextField
          label="Name"
          value={newRow.name || ""}
          onChange={(e) => handleFieldChange("name", e.target.value)}
        />
        <TextField
          label="Quantity"
          type="number"
          value={newRow.quantity || ""}
          onChange={(e) =>
            handleFieldChange("quantity", e.target.valueAsNumber)
          }
        />
        <TextField
          label="Price"
          type="number"
          value={newRow.price || ""}
          onChange={(e) => handleFieldChange("price", e.target.valueAsNumber)}
        />
        <Button variant="contained" onClick={handleAddRow}>
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default InventoryGrid;
