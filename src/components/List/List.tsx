import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
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
        <ListItem key={index}>
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
      ))}
    </List>
  );
};

export default TransactionList;
