import { createContext, useState, ReactNode } from "react";

interface Card {
  id: number;
  title: string;
  description: string;
  status: string;
}

interface Graph {
  // Define the properties for the graph object
  // Add the appropriate types
  id: number;
  title: string;
  description: string;
  status: string;
}

interface HistoryList {
  // Define the properties for the historyList object
  // Add the appropriate types
  id: number;
  title: string;
  description: string;
  status: string;
}

interface DefaultAppData {
  dashboard: Card[];
  graph: Graph;
  historyList: HistoryList;
}

interface DefaultAppContextProps {
  defaultData: DefaultAppData;
}

export const DefaultAppContext = createContext(initialState);

interface DefaultAppProviderProps {
  children: ReactNode;
}

const initialState: DefaultAppData = {
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
  graph: {
    id: 2,
    title: "Card 3",
    description: "Card 3 description",
    status: "zaza",
  },
  historyList: {
    id: 2,
    title: "Card 3",
    description: "Card 3 description",
    status: "zaza",
  },
};
const DefaultAppProvider = ({ children }: DefaultAppProviderProps) => {
  const [defaultData] = useState<DefaultAppData>(initialState);

  return (
    <DefaultAppContext.Provider value={{ defaultData }}>
      {children}
    </DefaultAppContext.Provider>
  );
};

export default DefaultAppProvider;

// import { createContext, useState } from "react";

// const initialState = {
//   dashboard: [
//     {
//       id: 1,
//       title: "Card 1",
//       description: "Card 1 description",
//       status: "todo",
//     },
//     {
//       id: 2,
//       title: "Card 2",
//       description: "Card 2 description",
//       status: "todo",
//     },
//     {
//       id: 2,
//       title: "Card 3",
//       description: "Card 3 description",
//       status: "zaza",
//     },
//   ],
//   graph: {},
//   historyList: {},
// };

// const DefaultAppContext = createContext();

// export const DefaultAppProvider = ({ children }) => {
//   const [defaultData] = useState(initialState);

//   return (
//     <DefaultAppContext.Provider value={defaultData}>
//       {children}
//     </DefaultAppContext.Provider>
//   );
// };
// export default DefaultAppContext;
