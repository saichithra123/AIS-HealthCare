import { Box, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../sidebar/SideBar";
import TopBar from "../topbar/TopBar";
import HeaderComponent from "../mobile/header/Header";

const Layout = ({ user, setUser }) => {
    const [ isSidebarCollapsed, setIsSidebarCollapsed ] = useState(true)
    const isNonMobile = useMediaQuery('(min-width:600px)');

    return (
        <Box display="flex">
            {isNonMobile && (
                <Box
                    sx={{
                        height: "100vh",
                        position: "fixed",
                        width: isSidebarCollapsed ? "90px" : "230px",
                        overflow: "auto",
                        scrollbarWidth: "none",
                        pt: "40px",
                    }}
                >
                    <SideBar setIsSidebarCollapsed={setIsSidebarCollapsed} setUser={setUser} />
                </Box>
            )}
            <Box
                sx={{
                    ml: !isNonMobile ? "0px" : isSidebarCollapsed ? "90px" : "230px",
                    width: !isNonMobile ? "100vw" : isSidebarCollapsed ? "93vw" : "82vw",
                }}
            >
                {isNonMobile ? <TopBar /> : <HeaderComponent />}
                <Outlet />
            </Box>
        </Box>
    );
}

export default Layout;