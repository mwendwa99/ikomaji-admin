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
  fetchProducts,
  deleteProduct,
} from "../../redux/products/productActions";

import DeleteIcon from "../../assets/icons/DeleteIcon";
import EditIcon from "../../assets/icons/EditIcon";

interface ProductProps {
  products: object[];
  loading: boolean;
  error: object | null;
}

interface InventoryGridComponentProps {
  handleOpenDialog: () => void;
  handleUpdate: (item: ItemProps) => void;
}

interface ItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  description: string;
  categoryId: string;
  image: string;
}

const InventoryGridComponent: React.FC<InventoryGridComponentProps> = ({
  handleOpenDialog,
  handleUpdate,
}) => {
  const dispatch = useAppDispatch();
  const [productData, setProductData] = useState<object[]>([]);
  const { products, loading } = useAppSelector<ProductProps>(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(products)) {
      setProductData(products); // Only update if products is an array
    }
  }, [products]);

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id));
  };

  const handleUpdateItem = (item: ItemProps) => {
    handleOpenDialog();
    handleUpdate(item);
  };

  const data = { nodes: productData, links: [] };
  const theme = useTheme(tableTheme);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Table data={data} theme={theme} layout={{ fixedHeader: true }}>
      {(tableList: any) => (
        <>
          <Header width={10}>
            <HeaderRow>
              <HeaderCell>No.</HeaderCell>
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
            {tableList.map((item: any, index: any) => (
              <Row key={item.id} item={item}>
                <Cell>{++index}</Cell>
                <Cell>{item.name}</Cell>
                <Cell>{item.category?.name}</Cell>
                <Cell>{item.price}</Cell>
                <Cell>{item.quantity}</Cell>
                <Cell style={{ wordWrap: "break-word" }}>
                  {item.description}
                </Cell>
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
  );
};

export default InventoryGridComponent;
