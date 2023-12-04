import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import moment from "moment";
import {
  addDiscount,
  updateDiscount,
  fetchDiscounts,
} from "../redux/discounts/discountActions";
import {
  Grid,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  InputAdornment,
} from "@mui/material";

import DiscountGridComponent from "../components/Grid/DiscountGridComponent";
import { uploadImage } from "../utils/functions";

interface DiscountProps {
  discounts: [];
  loading: boolean;
  error: {
    message: string;
    code: string;
    origin: string;
  };
}
//******************FIX UPDATE ISSUE */
export default function CategoriesPage() {
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    percentage: 0,
    expiresAt: "",
    description: "",
    image: "",
  });
  const { error } = useAppSelector<DiscountProps>((state) => state.discounts);

  const handleOpenDialog = (isUpdate?: boolean) => {
    if (!isUpdate) setIsUpdate(false);
    setOpen(true);
  };
  const handleCloseDialog = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // If the input type is "date," use moment to format the date
    const updatedValue =
      e.target.type === "date" ? moment(value).format("YYYY-MM-DD") : value;

    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();

      reader.addEventListener("load", async () => {
        const imageString = reader.result as string;
        const imageUrl = await uploadImage(imageString, formData.name); // Upload the Data URL
        setFormData((prev) => ({ ...prev, [name]: imageUrl })); // Update the form data with the image URL
      });

      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  };

  const handleUpdate = (item: any) => {
    setFormData({
      id: item.id,
      name: item.name,
      description: item.description,
      expiresAt: item.expiresAt,
      percentage: parseInt(item.percentage),
      image: item.image,
    });
    setIsUpdate(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const discountData = {
      name: formData.name,
      percentage: formData.percentage / 100,
      expiresAt: formData.expiresAt,
      description: formData.description,
      image: formData.image, // Assuming 'image' is the key for the image URL
    };
    if (isUpdate) {
      dispatch(updateDiscount(formData)).then(() => {
        setIsUpdate(() => false);
        setOpen(false);
        dispatch(fetchDiscounts());
      });
    } else {
      console.log(discountData);
      // dispatch(addDiscount(discountData)).then(() => {
      //   setIsUpdate(() => false);
      //   setOpen(false);
      //   dispatch(fetchDiscounts());
      // });
    }
  };

  return (
    <Box>
      {error && (
        <Typography variant="body1" color="tomato">
          {error.message}
        </Typography>
      )}
      <Grid container sx={{ flex: 1, height: "100%" }}>
        <Grid item sm={12} sx={{ my: 2 }}>
          <Button
            variant="contained"
            onClick={() => handleOpenDialog(!isUpdate)}
          >
            <Typography variant="body1">Add</Typography>
          </Button>
        </Grid>
        <Grid item sm={12}>
          <DiscountGridComponent
            handleOpenDialog={handleOpenDialog}
            handleUpdate={handleUpdate}
          />
        </Grid>
        <Grid item sm={12}>
          <Dialog open={open} onClose={handleCloseDialog}>
            <DialogTitle>Add Discount</DialogTitle>
            <form style={{}} onSubmit={handleSubmit}>
              <DialogContent sx={{ py: 0 }}>
                <DialogContentText>
                  Please enter the discount details
                </DialogContentText>
                <Grid container spacing={1}>
                  <Grid item sm={6}>
                    <TextField
                      margin="normal"
                      id="discount_name"
                      onChange={handleChange}
                      name="name"
                      label="Name"
                      type="text"
                      value={formData.name}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid
                    item
                    sm={6}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="Image"
                      className="discount-image"
                      type="file"
                      name="image"
                      id="discount-image"
                      placeholder="Upload Image"
                      fullWidth
                      inputProps={{
                        accept: "image/*",
                        multiple: false,
                        content: "image/png",
                      }}
                      onChange={handleImageInputChange}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item sm={6}>
                    <TextField
                      margin="normal"
                      id="discount_percentage"
                      onChange={handleChange}
                      name="percentage"
                      label="Percentage"
                      type="number"
                      value={formData.percentage}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <TextField
                      margin="normal"
                      id="expiresAt"
                      onChange={handleChange}
                      name="expiresAt"
                      label="Expiry Date"
                      type="date"
                      value={formData.expiresAt || ""}
                      fullWidth
                      required
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                        required: true,
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            style={{ color: "black" }}
                          >
                            &#128197;{" "}
                            {/* Unicode character for the calendar icon */}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <TextField
                  margin="normal"
                  id="product_description"
                  onChange={handleChange}
                  name="description"
                  label="Description"
                  type="text"
                  value={formData.description}
                  fullWidth
                  required
                  multiline
                  rows={4}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} variant="text">
                  <Typography variant="button">cancel</Typography>
                </Button>
                <Button type="submit" variant="outlined">
                  <Typography variant="button">
                    {isUpdate ? "Update" : "Add"}
                  </Typography>
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </Grid>
      </Grid>
    </Box>
  );
}
