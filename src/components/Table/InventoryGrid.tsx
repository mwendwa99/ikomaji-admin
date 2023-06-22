import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRowData } from "@mui/x-data-grid";
import { Button, TextField, Box, Input } from "@mui/material";

interface InventoryItem {
  id: number;
  product_id: string;
  product_name: string;
  alcohol_percentage: string;
  quantity: number;
  price: string;
  size: string;
  category: {
    category_name: string;
    category_id: number;
  };
  product_image: string;
  description: string;
}

interface Buffer {
  data: string;
}

interface InventoryGridProps {
  products: object[];
  loading: boolean;
}
const initialRows: InventoryItem[] = [
  {
    id: 1,
    product_name: "Item 1",
    quantity: 10,
    alcohol_percentage: "10%",
    size: "Size 1",
    product_id: "Product 1",
    price: "$10",
    category: { category_name: "Category 1", category_id: 1 },
    product_image: "Image 1",
    description: "Description 1",
  },
];

const columns: GridColDef[] = [
  { field: "product_id", headerName: "Product Id", width: 100 },
  { field: "product_name", headerName: "Product Name", width: 150 },
  { field: "alcohol_percentage", headerName: "Alc%", width: 50 },
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
  const [imageData, setImageData] = useState(null);

  console.log("products", products);
  //   console.log("categories", categories);

  const handleAddRow = () => {
    const newInventoryItem: InventoryItem = {
      id: rows.length + 1,
      product_id: newRow.product_id || "",
      alcohol_percentage: newRow.alcohol_percentage || "",
      category: {
        category_name: newRow.category?.category_name || "",
        category_id: newRow.category?.category_id || 0,
      },
      product_image: newRow.product_image || "",
      product_name: newRow.product_name || "",
      quantity: newRow.quantity || 0,
      price: newRow.price || "",
      size: newRow.size || "",
      description: newRow.description || "",
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const binaryString = reader.result as ArrayBuffer | string;
        setImageData(binaryString);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  console.log("imageData", imageData);

  return (
    <Box sx={{ height: 400 }}>
      <DataGrid columns={columns} rows={rows} autoHeight />

      <Box sx={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <TextField
          label="Id"
          type="text"
          value={newRow.product_id || ""}
          onChange={(e) => handleFieldChange("product_id", e.target.value)}
        />
        <TextField
          label="Name"
          //   type="text"
          value={newRow.product_name || ""}
          onChange={(e) => handleFieldChange("product_name", e.target.value)}
        />
        <TextField
          label="Alc%"
          type="text"
          value={newRow.alcohol_percentage || ""}
          onChange={(e) =>
            handleFieldChange("alcohol_percentage", e.target.value)
          }
        />
        <TextField
          label="Stock"
          type="number"
          value={newRow.quantity || ""}
          onChange={(e) => handleFieldChange("quantity", e.target.value)}
        />
        <TextField
          label="Price"
          type="text"
          value={newRow.price || ""}
          onChange={(e) => handleFieldChange("price", e.target.value)}
        />
        <TextField
          label="Size"
          type="text"
          value={newRow.size || ""}
          onChange={(e) => handleFieldChange("size", e.target.value)}
        />

        <TextField
          label="Category"
          type="text"
          value={newRow.category?.category_name || ""}
          onChange={(e) =>
            handleFieldChange("category", { category_name: e.target.value })
          }
        />
        <Input type="file" accept="image/*" onChange={handleFileChange} />
        <TextField
          label="Description"
          type="text"
          value={newRow.description || ""}
          onChange={(e) => handleFieldChange("description", e.target.value)}
        />
        <Button variant="contained" onClick={handleAddRow}>
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default InventoryGrid;
