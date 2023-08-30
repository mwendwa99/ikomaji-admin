import { FC } from "react";

import {
  Modal,
  Box,
  Typography,
  Button,
  Divider,
  TextField,
  InputAdornment,
  Grid,
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
  return (
    <Box sx={{ height: "300px" }}>
      <Modal
        sx={{ height: "500px" }}
        open={isModalOpen}
        onClose={handleCloseModal}
      >
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
            // height: "500px",
          }}
        >
          {!selectedRow && (
            <>
              <Typography variant="h5" gutterBottom>
                New {type}
              </Typography>
              {/* add columns to input data */}
              <Grid container spacing={2}>
                {columns.map((column) => {
                  if (column.field !== `${type}_id`) {
                    const isImageField = column.field === `${type}_image`;
                    const label = isImageField ? "" : column.field;
                    const value = editedRow ? editedRow[column.field] : "";

                    return (
                      <Grid key={column.field} item md={6}>
                        <TextField
                          fullWidth
                          variant="outlined"
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
                      </Grid>
                    );
                  }

                  return null;
                })}

                <Grid item md={12}>
                  <Button
                    variant="contained"
                    onClick={handleSaveChanges}
                    sx={{ mr: 2, bgcolor: "#46de99" }}
                  >
                    Save Changes
                  </Button>
                  <Button variant="outlined" onClick={handleCloseModal}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </>
          )}

          {selectedRow && (
            <>
              <Typography gutterBottom variant="h5">
                Edit {type}
              </Typography>
              <Grid container spacing={2}>
                {Object.keys(selectedRow).map((field, index) => (
                  <Grid item key={index} md={6}>
                    {field !== `${type}_id` &&
                      field !== "id" &&
                      field !== "category_id" &&
                      field !== "category" &&
                      field !== "created_at" && (
                        <TextField
                          fullWidth
                          variant="outlined"
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
                                field === `${type}_image`
                                  ? "image/*"
                                  : undefined,
                            },
                          }}
                        />
                      )}
                  </Grid>
                ))}
                <Grid item md={12}>
                  <Button
                    variant="contained"
                    onClick={handleSaveChanges}
                    sx={{ mr: 2, bgcolor: "#46de99" }}
                  >
                    Save Changes
                  </Button>
                  <Button variant="outlined" onClick={handleCloseModal}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ModalComponent;
