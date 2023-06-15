import { createContext, useState, ReactNode } from "react";

interface ChildrenType {
  children: ReactNode;
}

interface ContextType {
  dashboard: {
    id: number;
    title: string;
    description: string;
    status: string;
  }[];
}

const initialState = {
  dashboard: [
    {
      id: 1,
      title: "Card 1",
      description: "Card 1 description",
      status: "todo",
    },
    {
      id: 2,
      title: "Card 2",
      description: "Card 2 description",
      status: "todo",
    },
    {
      id: 2,
      title: "Card 3",
      description: "Card 3 description",
      status: "zaza",
    },
  ],
  graph: {},
  historyList: {},
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
