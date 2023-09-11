import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
  addCategory,
  updateCategory,
  fetchCategory,
} from "../redux/categories/categoryActions";
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
  OutlinedInput,
  DialogActions,
} from "@mui/material";

import CategoryGridComponent from "../components/Grid/CategoryGridComponent";

interface CategoryPageProps {
  categories: [];
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
    description: "",
    image: "",
  });
  const { error } = useAppSelector<CategoryPageProps>(
    (state) => state.categories
  );

  const handleOpenDialog = (isUpdate?: boolean) => {
    if (!isUpdate) setIsUpdate(false);
    setOpen(true);
  };
  const handleCloseDialog = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();

      reader.addEventListener("load", async () => {
        const imageUrl = await uploadImage(reader.result); // Upload the Data URL
        setFormData((prev) => ({ ...prev, [name]: imageUrl })); // Update the form data with the image URL
      });

      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  };
  const uploadImage = async (imageDataUrl: any) => {
    const cloud_name = import.meta.env.VITE_APP_CLOUDINARY_CLOUD;

    const imageData = new FormData();
    imageData.append("file", imageDataUrl); // Pass the Data URL directly

    // Add your Cloudinary upload preset and cloud name
    imageData.append("upload_preset", "ikomaji-preset");
    imageData.append("cloud_name", `${cloud_name}`);

    // set a custom publicId to uniquely identify each image from its filename
    const filename = imageDataUrl.split("/").pop()?.slice(0, 6);
    imageData.append("public_id", `${formData.name}-${filename}` || "");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: imageData,
      }
    );

    const data = await res.json();
    return data.url;
  };

  const handleUpdate = (item: any) => {
    setFormData({
      id: item.id,
      name: item.name,
      description: item.description,
      image: item.image,
    });
    setIsUpdate(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const categoryData = {
      name: formData.name,
      description: formData.description,
      image: formData.image, // Assuming 'image' is the key for the image URL
    };
    if (isUpdate) {
      dispatch(updateCategory(formData)).then(() => {
        setIsUpdate(() => false);
        setOpen(false);
        dispatch(fetchCategory());
      });
    } else {
      dispatch(addCategory(categoryData)).then(() => {
        setIsUpdate(() => false);
        setOpen(false);
        dispatch(fetchCategory());
      });
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
          <CategoryGridComponent
            handleOpenDialog={handleOpenDialog}
            handleUpdate={handleUpdate}
          />
        </Grid>
        <Grid item sm={12}>
          <Dialog open={open} onClose={handleCloseDialog}>
            <DialogTitle>Add Category</DialogTitle>
            <form style={{}} onSubmit={handleSubmit}>
              <DialogContent sx={{ py: 0 }}>
                <DialogContentText>
                  Please enter the category details
                </DialogContentText>
                <Grid container spacing={1}>
                  <Grid item sm={6}>
                    <TextField
                      margin="normal"
                      id="product_name"
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
                    <OutlinedInput
                      label="Image"
                      className="product-image"
                      type="file"
                      name="image"
                      id="product-image"
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
