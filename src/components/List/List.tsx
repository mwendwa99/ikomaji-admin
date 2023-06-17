import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

interface Transaction {
  orderNumber: string;
  time: string;
  revenue: number;
  percentage: number;
}

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <List>
      {transactions.map((transaction, index) => (
        <Box key={index}>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ backgroundColor: "#46df99" }}>
                <IconButton>
                  <AttachMoneyIcon />
                </IconButton>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                sx: { fontWeight: "bold" },
              }}
              secondaryTypographyProps={{
                sx: { fontSize: 12 },
              }}
              primary={`Order #${transaction.orderNumber}`}
              secondary={transaction.time}
            />
            <ListItemText
              primaryTypographyProps={{
                sx: { fontWeight: "bold" },
              }}
              secondaryTypographyProps={{
                sx: { fontSize: 12 },
              }}
              primary={` Kes. ${transaction.revenue}`}
              secondary={`${transaction.percentage}%`}
              align="right"
            />
          </ListItem>
          {index < transactions.length - 1 && <Divider />}
        </Box>
      ))}
    </List>
  );
};

export default TransactionList;
