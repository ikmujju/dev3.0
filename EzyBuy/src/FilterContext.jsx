import { createContext, useState } from "react";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [subCategory, setSubCategory] = useState(null);

  return (
    <FilterContext.Provider value={{ subCategory, setSubCategory }}>
      {children}
    </FilterContext.Provider>
  );
};