import { createContext, useState, ReactNode } from "react";

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
}

const initialState = {
  dashboard: [
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
  ],
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
