import { useState, useEffect } from "react";
import { IconButton, CircularProgress } from "@mui/material";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import { tableTheme } from "../../theme";

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
  error: object | null;
}

const CategoryGridComponent = () => {
  const dispatch = useAppDispatch();
  const [categoryData, setCategoryData] = useState<object[]>([]);
  const { categories, loading, error } = useAppSelector<CategoryProps>(
    (state) => state.categories
  );

  console.log("categories", categories);
  console.log("categoryData", categoryData);
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

  const data = { nodes: categoryData, links: [] };

  const theme = useTheme(tableTheme);

  if (loading) {
    // Show a loading indicator or message while fetching data
    return <CircularProgress />;
  }

  return (
    <>
      <Table data={data} theme={theme}>
        {(tableList: any) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Category</HeaderCell>
                <HeaderCell>Description</HeaderCell>
                <HeaderCell>Image</HeaderCell>
                <HeaderCell>Actions</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item: any) => (
                <Row key={item.id} item={item}>
                  <Cell>{item.name}</Cell>
                  <Cell>{item.description}</Cell>
                  <Cell>{item.image}</Cell>
                  <Cell>
                    <>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleUpdate(item.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleAdd()}>
                        <AddIcon />
                      </IconButton>
                    </>
                  </Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    </>
  );
};

export default CategoryGridComponent;
