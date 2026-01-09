import React, { createContext, useContext, useState } from "react";

export const CategoryContext = createContext();

export const useCategory = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
  const [categoryIconClicked, setCategoryIconClicked] = useState(false);

  const handleCategoryIconClick = () => {
    setCategoryIconClicked((prev) => !prev);
  };
  const resetCategoryIconClicked = () => {
    setCategoryIconClicked(false);
  };

  return (
    <CategoryContext.Provider
      value={{
        categoryIconClicked,
        handleCategoryIconClick,
        resetCategoryIconClicked,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
