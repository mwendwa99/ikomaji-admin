import React, { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarExport,
  GridCellParams,
} from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  InputLabel,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "../../assets/icons/EditIcon";
import DeleteIcon from "../../assets/icons/DeleteIcon";

// Sample data for the dropdown table
const sampleDropdownData = [
  {
    id: 1,
    name: "Item 1",
    category: "Category A",
    quantity: 10,
    netValue: 100,
    grossValue: 120,
  },
  {
    id: 2,
    name: "Item 2",
    category: "Category B",
    quantity: 15,
    netValue: 150,
    grossValue: 180,
  },
  // Add more data here
];

// Sample data for the main DataGrid
const sampleData = [
  {
    id: 1,
    status: "Pending",
    orderDate: "2023-07-20",
    deliveryDate: "2023-07-25",
    orderNumber: "ORD123",
    documentNumber: "DOC456",
    paymentDate: "2023-07-30",
    totalAmount: 500,
  },
  // Add more data here
];

const DataGridComponent: React.FC = () => {
  const [openRow, setOpenRow] = useState<number | null>(null);
  const [dropDownTitle, setDropDownTitle] = useState<string>("");

  const handleRowClick = (params: GridValueGetterParams) => {
    setOpenRow((prev) => (prev === params.row.id ? null : params.row.id));
    setDropDownTitle(params.row.orderNumber);
  };

  const handleDownload = (id: number) => {
    // Handle download logic here
    console.log("Download", id);
  };

  const handleEdit = (id: number) => {
    // Handle edit logic here
    console.log("Edit", id);
  };

  const handleDelete = (id: number) => {
    // Handle delete logic here
    console.log("Delete", id);
  };

  const columns: GridColDef[] = [
    { field: "status", headerName: "Status", width: 100 },
    { field: "orderDate", headerName: "Order Date", width: 100 },
    { field: "deliveryDate", headerName: "Delivered", width: 100 },
    { field: "orderNumber", headerName: "Order", width: 100 },
    { field: "documentNumber", headerName: "Document", width: 100 },
    { field: "paymentDate", headerName: "Paid", width: 100 },
    { field: "totalAmount", headerName: "Total", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params: GridValueGetterParams) => (
        <>
          <IconButton size="small" onClick={() => handleEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const expandedColumns = [
    { field: "id", headerName: "No", width: 100 },
    { field: "name", headerName: "Name", width: 100 },
    { field: "category", headerName: "Category", width: 100 },
    { field: "quantity", headerName: "Quantity", width: 100 },
    { field: "netValue", headerName: "Net Value", width: 100 },
    { field: "grossValue", headerName: "Gross Value", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params: GridValueGetterParams) => (
        <>
          <IconButton size="small" onClick={() => handleEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={sampleData}
          columns={columns}
          pageSize={5}
          slots={{
            toolbar: GridToolbar,
          }}
          onCellClick={(params: GridCellParams) => {
            if (params.field === "actions") {
              return false;
            }
            handleRowClick(params);
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
          <DialogTitle>{dropDownTitle}</DialogTitle>
          <DialogContent>
            {openRow && (
              <DataGrid rows={sampleDropdownData} columns={expandedColumns} />
            )}
          </DialogContent>
        </Dialog>
      </FormControl>
    </>
  );
};

export default DataGridComponent;
