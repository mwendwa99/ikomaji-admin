import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchCategory } from "../redux/categorySlice";

import {
  Box,
  Grid,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";

import DataGridComponent from "../components/Table/DataTable";

interface Category {
  category_id: number;
  category_name: string;
  category_image: string;
  description: string;
}
[];

interface CategoryProps {
  categories: Category[];
  loading: boolean;
}

const CategoryPage = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector<CategoryProps>(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  console.log(categories);

  return (
    <Box id="categoryPage" sx={boxStyle}>
      <Grid container>
        <Grid item sm={12}>
          <Typography variant="h4" component="h4" sx={titleStyle}>
            Categories
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <DataGridComponent
            rows={[
              {
                id: 1,
                category_id: 1,
                category_name: "Vodka",
                category_image: "vodka.jpg",
                description: "Vodka is a clear distilled alcoholic beverage",
              },
            ]}
            columns={[
              {
                field: "category_id",
                headerName: "ID",
                width: 100,
              },
              {
                field: "category_name",
                headerName: "Category Name",
                width: 200,
              },
              {
                field: "category_image",
                headerName: "Category Image",
                width: 200,
              },
              {
                field: "description",
                headerName: "Description",
                width: 200,
              },
            ]}
          />
          {/* <FormControl sx={formControlStyle}>
            <InputLabel id="demo-simple-select-label">
              select category
            </InputLabel>
            <Select defaultValue={"Vodka"} label={"select category"}>
              {categories.map((item) => (
                <MenuItem key={item.category_id} value={item.category_id}>
                  {item.category_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryPage;

const boxStyle = {
  width: "100%",
  height: "100%",
  padding: "1rem",
  backgroundColor: "#fff",
  borderRadius: "0.5rem",
  border: "1px solid #ddd",
};

const titleStyle = {
  fontWeight: "bold",
  marginBottom: "1rem",
};

const formControlStyle = {
  minWidth: "100%",
  marginBottom: "1rem",
  "& select": {
    width: "100%",
    padding: "0.5rem",
    border: "1px solid #ddd",
    borderRadius: "0.5rem",
    outline: "none",
    "&:focus": {
      border: "1px solid #000",
    },
  },
};
