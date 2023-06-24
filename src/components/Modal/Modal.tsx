import { FC } from "react";

import {
  Modal,
  Box,
  Typography,
  Button,
  Divider,
  TextField,
} from "@mui/material";

type RowData = Record<string, any>;

interface ModalComponentProps {
  isModalOpen: boolean;
  selectedRow: RowData | null;
  editedRow: RowData | null;
  setEditedRow: () => void;
  handleCloseModal: () => void;
  handleSaveChanges: () => void;
}

const ModalComponent: FC<ModalComponentProps> = ({
  isModalOpen,
  selectedRow,
  editedRow,
  setEditedRow,
  handleCloseModal,
  handleSaveChanges,
}) => {
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
          {selectedRow && (
            <>
              <Typography variant="h5">Edit Row</Typography>
              {Object.keys(selectedRow).map((field) => (
                <Box key={field} mb={2}>
                  <TextField
                    label={field}
                    value={editedRow ? editedRow[field] : ""}
                    onChange={(e) =>
                      setEditedRow((prevRow) => ({
                        ...prevRow,
                        [field]: e.target.value,
                      }))
                    }
                  />
                  {/* {field}: {editedRow ? editedRow[field] : ""} */}
                  {/* </TextField> */}
                  <Divider />
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
