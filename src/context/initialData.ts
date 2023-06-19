/*
@param {object} initialData - Initial data for the application
@param {array} initialData.users - Array of users
@param {array} initialData.products - Array of products
@param {array} initialData.orders - Array of orders
@param {array} initialData.income - Array of income
*/

interface Order {
  id: number;
  productName: string;
  orderNumber: string;
  totalOrder: number;
  status: string;
  totalAmount: string;
}
interface Income {
  category: string;
  value: number;
}
interface Transaction {
  id: number;
  orderNumber: string;
  time: string;
  revenue: number;
  percentage: number;
}
interface Dashboard {
  id: number;
  title: string;
  value: number;
  percentage: string;
}

export const ordersData: Order[] = [
  {
    id: 1,
    orderNumber: "TRK123",
    productName: "Product A",
    totalOrder: 5,
    status: "Shipped",
    totalAmount: "$100",
  },
  {
    id: 2,
    orderNumber: "TRK456",
    productName: "Product B",
    totalOrder: 3,
    status: "Pending",
    totalAmount: "$75",
  },
  {
    id: 3,
    orderNumber: "TRK789",
    productName: "Product C",
    totalOrder: 2,
    status: "Delivered",
    totalAmount: "$50",
  },
];

export const incomeData: Income[] = [
  { category: "Monday", value: 10 },
  { category: "Tuesday", value: 20 },
  { category: "Wednesday", value: 15 },
  { category: "Thursday", value: 5 },
  { category: "Friday", value: 8 },
];

export const transactionsData: Transaction[] = [
  {
    id: 1,
    orderNumber: "TRK123",
    time: "10:00 AM",
    revenue: 100,
    percentage: 10,
  },
  {
    id: 2,
    orderNumber: "TRK456",
    time: "11:00 AM",
    revenue: 75,
    percentage: 5,
  },
  {
    id: 3,
    orderNumber: "TRK789",
    time: "12:00 PM",
    revenue: 50,
    percentage: 2,
  },
];

export const dashboardData: Dashboard[] = [
  {
    id: 1,
    title: "Total Page Views",
    value: 999,
    percentage: "30%",
  },
  {
    id: 2,
    title: "Total Users",
    value: 999,
    percentage: "30%",
  },
  {
    id: 3,
    title: "Total Orders",
    value: 999,
    percentage: "40%",
  },
  {
    id: 4,
    title: "Total Sales",
    value: 999,
    percentage: "40%",
  },
];
