import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addProduct } from "../redux/products/productActions";
import { fetchCategory } from "../redux/categories/categoryActions";

import {
  Box,
  Grid,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  OutlinedInput,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import InventoryGridComponent from "../components/Grid/InventoryGridComponent";

interface ProductProps {
  error: {
    message: string;
    code: string;
    origin: string;
  };
}

interface CategoryProps {
  categories: object[];
}

interface FormDataProps {
  name: string;
  price: number;
  quantity: number;
  size: string;
  description: string;
  categoryId: string;
  image: string;
}

const cloud_name: string = import.meta.env.VITE_APP_CLOUDINARY_CLOUD;
const preset: string = import.meta.env.VITE_APP_CLOUDINARY_PRESET;

// console.log(cloud_name, preset);

export default function InventoryPage() {
  const [open, setOpen] = useState(false);
  const [categoryList, setCategoryList] = useState<object[]>([]); // [{id: 1, name: "category1"}, {id: 2, name: "category2"}
  const [formData, setFormData] = useState<FormDataProps>({
    name: "",
    price: 0,
    quantity: 0,
    size: "",
    description: "",
    categoryId: "",
    image: "",
  });
  const dispatch = useAppDispatch();
  const { error } = useAppSelector<ProductProps>((state) => state.products);
  const { categories } = useAppSelector<CategoryProps>(
    (state) => state.categories
  );
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  useEffect(() => {
    if (categories) {
      setCategoryList(categories);
    }
  }, [categories]);

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
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
    const imageData = new FormData();
    imageData.append("file", imageDataUrl); // Pass the Data URL directly

    // Add your Cloudinary upload preset and cloud name
    imageData.append("upload_preset", preset);
    imageData.append("cloud_name", cloud_name);

    // set a custom publicId to uniquely identify each image from its filename
    const filename = imageDataUrl.split("/").pop()?.slice(0, 6);
    console.log(`${formData.name}-${filename}`);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      size: formData.size,
      description: formData.description,
      categoryId: formData.categoryId,
      image: formData.image, // Assuming 'image' is the key for the image URL
    };
    // dispatch(addProduct(productData));
    console.log(productData);
  };

  return (
    <Box>
      {error && (
        <Typography variant="body1" color="tomato">
          {error?.message}
        </Typography>
      )}
      <Grid container sx={{ flex: 1, height: "100%" }}>
        <Grid item sm={12} sx={{ my: 2 }}>
          <Button variant="contained" onClick={handleOpenDialog}>
            <Typography variant="body1">Add</Typography>
          </Button>
        </Grid>
        <Grid item sm={12}>
          <InventoryGridComponent />
        </Grid>
        <Grid item sm={12}>
          <Dialog open={open} onClose={handleCloseDialog}>
            <DialogTitle>Add product</DialogTitle>
            <form style={{}} onSubmit={handleSubmit}>
              <DialogContent sx={{ py: 0 }}>
                <DialogContentText>
                  Please enter the product details
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
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <TextField
                      margin="normal"
                      id="product_price"
                      onChange={handleChange}
                      name="price"
                      label="Price"
                      type="number"
                      fullWidth
                      required
                      inputProps={{ min: 0 }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item sm={6}>
                    <TextField
                      margin="normal"
                      id="product_quantity"
                      onChange={handleChange}
                      name="quantity"
                      label="Quantity"
                      type="number"
                      fullWidth
                      required
                      inputProps={{ min: 0 }}
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <TextField
                      margin="normal"
                      id="product_size"
                      onChange={handleChange}
                      name="size"
                      label="Size"
                      type="size"
                      fullWidth
                      required
                      inputProps={{ min: 0 }}
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
                      // required
                      inputProps={{
                        accept: "image/*",
                        multiple: false,
                        content: "image/png",
                      }}
                      onChange={handleImageInputChange}
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <InputLabel id="select-category-label">Category</InputLabel>
                    <Select
                      labelId="select-category-label"
                      id="select-category"
                      name="categoryId"
                      label="Category"
                      value={formData.categoryId}
                      fullWidth
                      required
                      onChange={handleSelectChange}
                    >
                      {categoryList.map((category: any) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
                <TextField
                  margin="normal"
                  id="product_description"
                  onChange={handleChange}
                  name="description"
                  label="Description"
                  type="text"
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
                  <Typography variant="button">add</Typography>
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </Grid>
      </Grid>
    </Box>
  );
}
