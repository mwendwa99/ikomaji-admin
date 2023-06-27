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
  type: string;
  columns: GridColDef[];
  isModalOpen: boolean;
  selectedRow: RowData | null;
  editedRow: RowData | null;
  setEditedRow: () => void;
  handleCloseModal: () => void;
  handleSaveChanges: () => void;
}

const ModalComponent: FC<ModalComponentProps> = ({
  type,
  columns,
  isModalOpen,
  selectedRow,
  editedRow,
  setEditedRow,
  handleCloseModal,
  handleSaveChanges,
}) => {
  console.log("selectedRow", selectedRow);
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
            borderRadius: 5,
          }}
        >
          {!selectedRow && (
            <>
              <Typography variant="h5">New {type}</Typography>
              {/* add columns to input data */}
              {columns.map((column) => {
                if (column.field !== `${type}_id`) {
                  const isImageField = column.field === `${type}_image`;
                  const label = isImageField ? "" : column.field;
                  const value = editedRow ? editedRow[column.field] : "";

                  return (
                    <Box key={column.field} mb={2}>
                      <TextField
                        fullWidth
                        variant="filled"
                        label={label}
                        value={value}
                        onChange={(e) =>
                          setEditedRow((prevRow) => ({
                            ...prevRow,
                            [column.field]: e.target.value,
                          }))
                        }
                        required
                        type={isImageField ? "file" : "text"}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          inputProps: {
                            accept: isImageField ? "image/*" : undefined,
                          },
                        }}
                      />
                    </Box>
                  );
                }

                return null;
              })}

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
              <Typography variant="h5">Edit {type}</Typography>
              {Object.keys(selectedRow).map((field) => (
                <>
                  <Box key={field} mb={2}>
                    {field !== `${type}_id` && field !== "id" && (
                      <TextField
                        fullWidth
                        variant="filled"
                        label={field === `${type}_image` ? "" : field}
                        value={editedRow?.[field] || ""}
                        onChange={(e) =>
                          setEditedRow((prevRow) => ({
                            ...prevRow,
                            [field]: e.target.value,
                          }))
                        }
                        type={field === `${type}_image` ? "file" : "text"}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          inputProps: {
                            accept:
                              field === `${type}_image` ? "image/*" : undefined,
                          },
                        }}
                      />
                    )}
                  </Box>
                </>
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
