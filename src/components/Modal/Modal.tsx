import { FC } from "react";

import {
  Modal,
  Box,
  Typography,
  Button,
  Divider,
  TextField,
  InputAdornment,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";

type RowData = Record<string, any>;

interface ModalComponentProps {
  columns: GridColDef[];
  isModalOpen: boolean;
  selectedRow: RowData | null;
  editedRow: RowData | null;
  setEditedRow: () => void;
  handleCloseModal: () => void;
  handleSaveChanges: () => void;
}

const ModalComponent: FC<ModalComponentProps> = ({
  columns,
  isModalOpen,
  selectedRow,
  editedRow,
  setEditedRow,
  handleCloseModal,
  handleSaveChanges,
}) => {
  // console.log("selectedRow", selectedRow);
  // console.log("editedRow", editedRow);

  return (
    <>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          {!selectedRow && (
            <>
              <Typography variant="h5">New category</Typography>
              {/* add columns to input data */}
              {columns.map(
                (column) =>
                  column.field !== "category_id" && (
                    <Box key={column.field} mb={2}>
                      <TextField
                        variant="filled"
                        label={
                          column.field === "category_image"
                            ? "Image"
                            : column.field
                        }
                        // label={column.headerName}
                        value={editedRow ? editedRow[column.field] : ""}
                        onChange={(e) =>
                          setEditedRow((prevRow) => ({
                            ...prevRow,
                            [column.field]: e.target.value,
                          }))
                        }
                        // style={{
                        //   display:
                        //     column.field === "category_image"
                        //       ? "none"
                        //       : undefined,
                        // }}
                        required
                        type={
                          column.field === "category_image" ? "file" : "text"
                        }
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          inputProps: {
                            accept:
                              column.field === "category_image"
                                ? "image/*"
                                : undefined,
                            "aria-label":
                              column.field === "category_image"
                                ? "Upload image"
                                : undefined,
                          },
                          startAdornment:
                            column.field === "category_image" ? (
                              <InputAdornment position="start">
                                <CloudUpload />
                              </InputAdornment>
                            ) : undefined,
                          endAdornment:
                            column.field === "category_image" ? (
                              <InputAdornment position="end">
                                <Button color="primary" component="label">
                                  Upload Image
                                  <input
                                    type="file"
                                    style={{ display: "none" }}
                                  />
                                </Button>
                              </InputAdornment>
                            ) : undefined,
                        }}
                      />
                    </Box>
                  )
              )}

              <Button
                variant="contained"
                onClick={handleSaveChanges}
                sx={{ mr: 2 }}
              >
                Save Changes
              </Button>
              <Button variant="outlined" onClick={handleCloseModal}>
                Cancel
              </Button>
            </>
          )}

          {selectedRow && (
            <>
              <Typography variant="h5">Edit Row</Typography>
              {Object.keys(selectedRow).map((field) => (
                <Box key={field} mb={2}>
                  {/* if field is category_id or id dont show */}
                  {field !== "category_id" && field !== "id" && (
                    <TextField
                      variant="filled"
                      label={field === "category_image" ? "Image" : field}
                      value={editedRow?.[field] || ""}
                      onChange={(e) =>
                        setEditedRow((prevRow) => ({
                          ...prevRow,
                          [field]: e.target.value,
                        }))
                      }
                      type={field === "category_image" ? "file" : "text"}
                    />
                  )}
                </Box>
              ))}
              <Button
                variant="contained"
                onClick={handleSaveChanges}
                sx={{ mr: 2 }}
              >
                Save Changes
              </Button>
              <Button variant="outlined" onClick={handleCloseModal}>
                Cancel
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ModalComponent;
