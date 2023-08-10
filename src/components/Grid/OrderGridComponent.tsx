import { useState, useEffect, Fragment } from "react";
import { IconButton, CircularProgress, Container } from "@mui/material";
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
//import the moment library
import moment from "moment";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchOrders,
  deleteOrder,
  // addProduct,
  // updateProduct,
} from "../../redux/orders/orderActions";

import DeleteIcon from "../../assets/icons/DeleteIcon";
import EditIcon from "../../assets/icons/EditIcon";
import AddIcon from "../../assets/icons/AddIcon";

interface OrderProps {
  orders: object[];
  loading: boolean;
  error: string | null;
}

const NestedTable = ({ products }: any) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>
            Quantity
            <br /> Ordered
          </th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product: any) => (
          <tr key={product.id}>
            <td>{product.product.name}</td>
            <td>{product.quantity}</td>
            <td>{product.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const OrderGridComponent = () => {
  const dispatch = useAppDispatch();
  const [orderData, setOrderData] = useState<object[]>([]);
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const { orders, loading, error } = useAppSelector<OrderProps>(
    (state) => state.orders
  );

  console.log("orders", orders);
  console.log("isExpand", isExpand);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    if (orders) {
      setOrderData(() => orders);
    }
  }, [orders]);

  const handleDelete = (id: string) => {
    // Handle delete logic here
    dispatch(deleteOrder(id));
    // console.log("delete", id);
  };

  const handleUpdate = (id: string) => {
    // Handle update logic here
    // dispatch(updateProdu(id));
    // open modal
  };

  const handleAdd = () => {
    // Handle add logic here
    // dispatch(addProduct());
    // open modal
  };

  const data = { nodes: orderData, links: [] };

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
              <HeaderCell>OrderNumber</HeaderCell>
              <HeaderCell>Date</HeaderCell>
              <HeaderCell>Total</HeaderCell>
              <HeaderCell>Items</HeaderCell>
              <HeaderCell>Status</HeaderCell>
              <HeaderCell>Delivery</HeaderCell>
              <HeaderCell>Actions</HeaderCell>
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item: any) => (
              <Fragment key={item.id}>
                <Row item={item}>
                  <Cell>{item.orderNumber}</Cell>
                  <Cell>{moment(item.orderDate).format("MMMM DD YYYY")}</Cell>
                  <Cell>{item.totalAmount}</Cell>
                  <Cell>{item.products.length}</Cell>
                  <Cell>{item.status}</Cell>
                  <Cell>
                    {moment(item.deliveryDate).format("MMMM DD YYYY")}
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
                        onClick={() => handleUpdate(item.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => setIsExpand((prev) => !prev)}
                      >
                        <AddIcon />
                      </IconButton>
                    </>
                  </Cell>
                </Row>
                <Row item={item.products}>
                  <Cell>
                    {isExpand && <NestedTable products={item.products} />}
                  </Cell>
                </Row>
              </Fragment>
            ))}
          </Body>
        </>
      )}
    </Table>
  );
};

export default OrderGridComponent;
