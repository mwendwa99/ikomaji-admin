import { useState, useEffect, Fragment, useMemo } from "react";
import { IconButton, CircularProgress, Box } from "@mui/material";
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
  error: object | null;
}

const NestedTable = ({ products, customer }: any) => {
  // memoized function to calculate total price
  const totalPrice = useMemo(() => {
    return (products: any) => {
      return Math.ceil(
        products.reduce(
          (acc: any, product: any) =>
            acc + product.product.price * product.quantity,
          0
        )
      );
    };
  }, []);

  return (
    <tr style={{ display: "flex", flexDirection: "row", gridColumn: "1 / -1" }}>
      <td style={{ display: "flex", flexDirection: "column" }}>
        <h5>Customer Details</h5>
        <p>name: {customer.name}</p>
        <p>email: {customer.email}</p>
        <p>city: {customer.city}</p>
      </td>
      <td style={{ display: "flex", flexDirection: "column" }}>
        <h5>Orders</h5>
        <ul>
          {products?.map((product: any) => (
            <li key={product.id}>
              <p style={{ flex: "1" }}>
                {product?.quantity} bottles of {product?.product.name} @{" "}
                {product?.product.price}
              </p>
            </li>
          ))}
        </ul>
        <h5>TOTAL: {totalPrice(products)} </h5>
      </td>
    </tr>
  );
};

const OrderGridComponent = () => {
  const dispatch = useAppDispatch();
  const [orderData, setOrderData] = useState<object[]>([]);
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const { orders, loading } = useAppSelector<OrderProps>(
    (state) => state.orders
  );

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
    <>
      <Table data={data} theme={theme}>
        {(tableList: any) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>No.</HeaderCell>
                <HeaderCell>Order Number</HeaderCell>
                <HeaderCell>email</HeaderCell>
                <HeaderCell>Date</HeaderCell>
                <HeaderCell>Total</HeaderCell>
                <HeaderCell>Items</HeaderCell>
                <HeaderCell>Status</HeaderCell>
                <HeaderCell>Delivery</HeaderCell>
                <HeaderCell>Actions</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item: any, index: number) => (
                <Fragment key={item.id}>
                  <Row item={item}>
                    <Cell>{++index}</Cell>
                    <Cell>{item.orderNumber}</Cell>
                    <Cell>{item.customer.email}</Cell>
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
                  {isExpand && (
                    <NestedTable
                      products={item.products}
                      customer={item.customer}
                    />
                  )}
                </Fragment>
              ))}
            </Body>
          </>
        )}
      </Table>
      {/* {isExpand && <NestedTable products={orderData} />} */}
    </>
  );
};

export default OrderGridComponent;
