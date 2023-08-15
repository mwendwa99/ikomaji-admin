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
  fetchProducts,
  deleteProduct,
  addProduct,
} from "../../redux/products/productActions";

import DeleteIcon from "../../assets/icons/DeleteIcon";
import EditIcon from "../../assets/icons/EditIcon";

interface ProductProps {
  products: object[];
  loading: boolean;
  error: object | null;
}

const InventoryGridComponent = () => {
  const dispatch = useAppDispatch();
  const [productData, setProductData] = useState<object[]>([]);
  const { products, loading, error } = useAppSelector<ProductProps>(
    (state) => state.products
  );

  console.log("products", products);
  console.log("productData", productData);
  console.log("error", error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products) {
      setProductData(() => products);
    }
  }, [products]);

  const handleDelete = (id: string) => {
    // Handle delete logic here
    dispatch(deleteProduct(id));
    // console.log("delete", id);
  };

  const handleUpdate = (id: string) => {
    // Handle update logic here
    // dispatch(updateProdu(id));
    // open modal
  };

  const data = { nodes: productData, links: [] };

  const theme = useTheme(tableTheme);

  if (loading) {
    // Show a loading indicator or message while fetching data
    return <CircularProgress />;
  }

  return (
    <Table data={data} theme={theme}>
      {(tableList: any) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell>Product</HeaderCell>
              <HeaderCell>Category</HeaderCell>
              <HeaderCell>Price</HeaderCell>
              <HeaderCell>Quantity</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Image</HeaderCell>
              <HeaderCell>Actions</HeaderCell>
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item: any) => (
              <Row key={item.id} item={item}>
                <Cell>{item.name}</Cell>
                <Cell>{item.category?.name}</Cell>
                <Cell>{item.price}</Cell>
                <Cell>{item.quantity}</Cell>
                <Cell style={{ wordWrap: "break-word" }}>
                  {item.description}
                </Cell>
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
                  </>
                </Cell>
              </Row>
            ))}
          </Body>
        </>
      )}
    </Table>
  );
};

export default InventoryGridComponent;
