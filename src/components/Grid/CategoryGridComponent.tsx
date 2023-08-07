import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbar,
} from "@mui/x-data-grid";

import { IconButton, CircularProgress } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchCategory,
  deleteCategory,
  addCategory,
  updateCategory,
} from "../../redux/categories/categoryActions";

import DeleteIcon from "../../assets/icons/DeleteIcon";
import EditIcon from "../../assets/icons/EditIcon";
import AddIcon from "../../assets/icons/AddIcon";

interface CategoryProps {
  categories: object[];
  loading: boolean;
  error: string | null;
}

const CategoryGridComponent: React.FC = () => {
  const [categoryData, setCategoryData] = useState<object[]>([]);
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector<CategoryProps>(
    (state) => state.categories
  );

  console.log("categories", categories);
  console.log("error", error);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  useEffect(() => {
    if (categories) {
      setCategoryData(() => categories);
    }
  }, [categories]);

  const handleDelete = (id: string) => {
    // Handle delete logic here
    dispatch(deleteCategory(id));
    // console.log("delete", id);
  };

  const handleUpdate = (id: string) => {
    // Handle update logic here
    // dispatch(updateCategory(id));
    // open modal
  };

  const handleAdd = () => {
    // Handle add logic here
    // dispatch(addCategory());
    // open modal
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Product Name", width: 120 },
    { field: "description", headerName: "description", width: 150 },
    { field: "image", headerName: "Image", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      width: 150,
      renderCell: (params: GridValueGetterParams) => (
        <>
          <IconButton size="small" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton size="small" onClick={() => handleUpdate(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={() => handleAdd(params.row.id)}>
            <AddIcon />
          </IconButton>
        </>
      ),
    },
  ];

  if (loading) {
    // Show a loading indicator or message while fetching data
    return <CircularProgress />;
  }

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={categoryData}
          columns={columns}
          pagination
          autoPageSize
          disableRowSelectionOnClick
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </div>
    </>
  );
};

export default CategoryGridComponent;
