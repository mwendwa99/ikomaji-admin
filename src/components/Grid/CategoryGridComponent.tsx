import React, { useState, useEffect } from "react";
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
} from "../../redux/categories/categoryActions";

import DeleteIcon from "../../assets/icons/DeleteIcon";
import EditIcon from "../../assets/icons/EditIcon";

interface CategoryProps {
  categories: object[];
  loading: boolean;
  error: object | null;
}

interface ItemProps {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface CategoryGridComponentProps {
  handleOpenDialog: () => void;
  handleUpdate: (item: ItemProps) => void;
}

const CategoryGridComponent: React.FC<CategoryGridComponentProps> = ({
  handleOpenDialog,
  handleUpdate,
}) => {
  const dispatch = useAppDispatch();
  const [categoryData, setCategoryData] = useState<object[]>([]);
  const { categories, loading } = useAppSelector<CategoryProps>(
    (state) => state.categories
  );

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

  const handleUpdateItem = (item: ItemProps) => {
    handleOpenDialog();
    handleUpdate(item);
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
                  <Cell>
                    <div style={{ objectFit: "contain" }}>
                      {item.image && (
                        <img
                          width="50px"
                          height="50px"
                          src={item.image}
                          alt={item.image}
                        />
                      )}
                    </div>
                  </Cell>
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
                        onClick={() => handleUpdateItem(item)}
                      >
                        <EditIcon />
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
