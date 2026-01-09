import React, { createContext, useState } from "react";

export const HeaderContext = createContext()

export const HeaderProvider = ({ children }) => {
    const [ header, setHeader ] = useState('');
    const [ isShowCategoryView, setIsShowCategoryView ] = useState(false)

    return (
        <HeaderContext.Provider value={{ header, setHeader, isShowCategoryView, setIsShowCategoryView }}>
            {children}
        </HeaderContext.Provider>
    );
};