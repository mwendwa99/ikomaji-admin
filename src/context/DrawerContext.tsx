import { createContext, useState, ReactNode } from "react";

interface ChildrenType {
  children: ReactNode;
}
interface DrawerContextType {
  selectedPage: string;
  handleSelectedPage: (page: string) => void;
}

const initialState: DrawerContextType = {
  selectedPage: "Dashboard",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleSelectedPage: () => {},
};

// a context state to listen to the selected page in drawer
export const DrawerContext = createContext(initialState);

const DrawerContextProvider = ({ children }: ChildrenType) => {
  const [selectedPage, setSelectedPage] = useState<string>("Dashboard");

  const handleSelectedPage = (page: string) => {
    setSelectedPage(page);
  };

  return (
    <DrawerContext.Provider value={{ selectedPage, handleSelectedPage }}>
      {children}
    </DrawerContext.Provider>
  );
};

export default DrawerContextProvider;
