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
  deleteDiscount,
  fetchDiscounts,
} from "../../redux/discounts/discountActions";

import DeleteIcon from "../../assets/icons/DeleteIcon";
import EditIcon from "../../assets/icons/EditIcon";

interface DiscountProps {
  discounts: object[];
  loading: boolean;
  error: object | null;
}

interface ItemProps {
  id: string;
  name: string;
  description: string;
  image: string;
  expiresAt: string;
  percentage: number;
}

interface DiscountGridComponentProps {
  handleOpenDialog: () => void;
  handleUpdate: (item: ItemProps) => void;
}

const CategoryGridComponent: React.FC<DiscountGridComponentProps> = ({
  handleOpenDialog,
  handleUpdate,
}) => {
  const dispatch = useAppDispatch();
  const [discountData, setDiscountData] = useState<object[]>([]);
  const { discounts, loading } = useAppSelector<DiscountProps>(
    (state) => state.discounts
  );

  useEffect(() => {
    dispatch(fetchDiscounts());
  }, [dispatch]);

  useEffect(() => {
    if (discounts) {
      setDiscountData(() => discounts);
    }
  }, [discounts]);

  const handleDelete = (id: string) => {
    // Handle delete logic here
    dispatch(deleteDiscount(id));
  };

  const handleUpdateItem = (item: ItemProps) => {
    handleOpenDialog();
    // console.log(item);
    handleUpdate(item);
  };

  const data = { nodes: discountData, links: [] };

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
                <HeaderCell>Discount</HeaderCell>
                <HeaderCell>Percentage</HeaderCell>
                <HeaderCell>Description</HeaderCell>
                <HeaderCell>Expiry</HeaderCell>
                <HeaderCell>Image</HeaderCell>
                <HeaderCell>Actions</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item: any, index: number) => (
                <Row key={item.id} item={item}>
                  <Cell>{++index}</Cell>
                  <Cell>{item.name}</Cell>
                  <Cell>{item.percentage}%</Cell>
                  <Cell>{item.description}</Cell>
                  <Cell>{item.expiresAt}</Cell>
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
