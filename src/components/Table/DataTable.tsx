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
  type: string;
  rows: GridRowData[];
  columns: GridColDef[];
}

const DataGridComponent: React.FC<DataGridProps> = ({
  type,
  rows,
  columns,
}) => {
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
      // remove id field in editedRow
      const { id, ...editedRowWithoutId } = editedRow;
      console.log("Save Changes", editedRowWithoutId);
    }
    handleCloseModal();
  };

  const handleAddRow = () => {
    // open the modal
    setIsModalOpen(true);
    // set the edited row to null
    setEditedRow(null);
    // set the selected row to null
    setSelectedRow(null);
    // log the action
    console.log("Add new row");
  };

  // const handleCellEditCommit = (params: GridCellParams) => {
  //   console.log("params", params);
  //   const { id, field, value } = params;
  //   setEditedRow((prevRow) => {
  //     if (prevRow && prevRow.id === id) {
  //       return { ...prevRow, [field]: value };
  //     }
  //     return prevRow;
  //   });
  // };

  return (
    <Box height={400} width="100%">
      <Button
        variant="contained"
        onClick={handleAddRow}
        sx={{ mb: 2, bgcolor: "#46de99" }}
      >
        Add New
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
        // onCellEditCommit={handleCellEditCommit}
      />

      <ModalComponent
        type={type}
        columns={columns}
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
