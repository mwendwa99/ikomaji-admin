import { createContext, useState, ReactNode } from "react";
import {
  ordersData,
  incomeData,
  transactionsData,
  dashboardData,
} from "./initialData.js";

interface ChildrenType {
  children: ReactNode;
}

interface ContextType {
  dashboard: {
    id: number;
    title: string;
    value: number;
    percentage: string;
  }[];
  transactions: {
    orderNumber: string;
    time: string;
    revenue: number;
    percentage: number;
  }[];
  income: {
    category: string;
    value: number;
  }[];
  orders: {
    id: number;
    orderNumber: string;
    productName: string;
    totalOrder: number;
    status: string;
    totalAmount: string;
  }[];
}

const initialState = {
  dashboard: dashboardData,
  transactions: transactionsData,
  income: incomeData,
  orders: ordersData,
};

export const DefaultAppContext = createContext<ContextType>(initialState);

export const DefaultAppProvider = ({ children }: ChildrenType) => {
  const [defaultData] = useState(initialState);

  return (
    <DefaultAppContext.Provider value={defaultData}>
      {children}
    </DefaultAppContext.Provider>
  );
};
export default DefaultAppProvider;
