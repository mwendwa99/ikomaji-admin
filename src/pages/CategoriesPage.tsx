import { useAppSelector } from "../redux/hooks";

import { Grid, Box, Typography, Button } from "@mui/material";

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

export default function CategoriesPage() {
  const { error } = useAppSelector<CategoryPageProps>(
    (state) => state.categories
  );
  return (
    <Box>
      {error && (
        <Typography variant="body1" color="tomato">
          {error.message}
        </Typography>
      )}
      <Grid container sx={{ flex: 1, height: "100%" }}>
        <Grid item sm={12} sx={{ my: 2 }}>
          <Button variant="contained">Add Category</Button>
        </Grid>
        <Grid item sm={12}>
          <CategoryGridComponent />
        </Grid>
      </Grid>
    </Box>
  );
}
