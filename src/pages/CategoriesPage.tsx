import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchCategory } from "../redux/categories/categoryActions";

import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
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

  const rows = categories.map((item) => ({
    ...item,
    id: item.category_id,
  }));

  const columns = [
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
  ];

  // console.log("categories", categories);

  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid item sm={12}>
        <Typography variant="body1" sx={{ fontWeight: "bold", marginLeft: 1 }}>
          Categories
        </Typography>
        <Paper elevation={0} sx={chartStyle}>
          <DataGridComponent type="category" rows={rows} columns={columns} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CategoryPage;

const chartStyle = {
  m: 1,
  p: 1,
  border: "1px solid #E5E5E5",
};
