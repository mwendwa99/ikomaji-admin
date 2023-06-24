import React, { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowData,
  GridCellParams,
} from "@mui/x-data-grid";
import { IconButton, Modal, Box, Typography, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import ModalComponent from "../Modal/Modal";

type RowData = Record<string, any>;

interface DataGridProps {
  rows: GridRowData[];
  columns: GridColDef[];
}

const DataGridComponent: React.FC<DataGridProps> = ({ rows, columns }) => {
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedRow, setEditedRow] = useState<RowData | null>(null);

  const handleEditRow = (row: RowData) => {
    setSelectedRow(row);
    setEditedRow({ ...row });
    setIsModalOpen(true);
  };

  const handleDeleteRow = (row: RowData) => {
    // Perform delete operation for the row
    console.log("Delete row:", row);
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
    setEditedRow(null);
    setIsModalOpen(false);
  };

  const handleSaveChanges = () => {
    if (editedRow) {
      // Perform save operation for edited row
      console.log("Save changes:", editedRow);
    }
    handleCloseModal();
  };

  const handleAddRow = () => {
    // Perform add operation for new row
    console.log("Add new row");
  };

  const handleCellEditCommit = (params: GridCellParams) => {
    const { id, field, value } = params;
    setEditedRow((prevRow) => {
      if (prevRow && prevRow.id === id) {
        return { ...prevRow, [field]: value };
      }
      return prevRow;
    });
  };

  return (
    <Box height={400} width="100%">
      <Button variant="contained" onClick={handleAddRow} sx={{ mb: 2 }}>
        Add Row
      </Button>

      <DataGrid
        rows={rows}
        columns={[
          ...columns,
          {
            field: "actions",
            headerName: "Actions",
            width: 100,
            renderCell: (params) => (
              <>
                <IconButton
                  onClick={() => handleEditRow(params.row as RowData)}
                  aria-label="Edit"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteRow(params.row as RowData)}
                  aria-label="Delete"
                >
                  <DeleteIcon />
                </IconButton>
              </>
            ),
          },
        ]}
        autoHeight
        onCellEditCommit={handleCellEditCommit}
      />

      <ModalComponent
        isModalOpen={isModalOpen}
        setEditedRow={setEditedRow}
        handleCloseModal={handleCloseModal}
        selectedRow={selectedRow}
        editedRow={editedRow}
        handleSaveChanges={handleSaveChanges}
      />
    </Box>
  );
};

export default DataGridComponent;
