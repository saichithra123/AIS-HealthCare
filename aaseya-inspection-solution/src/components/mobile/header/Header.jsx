import { Grid2, IconButton, Typography } from "@mui/material";
import React, { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../../../assets/logo.png";
import "./header.css";
import { HeaderContext } from "../HeaderContext";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const HeaderComponent = () => {
    const { header, setHeader } = useContext(HeaderContext);
    const { isShowCategoryView, setIsShowCategoryView } = useContext(HeaderContext);
    const navigate = useNavigate();
    const pathnameParts = location.pathname.split("/");

    return (
        <>
            <Grid2 container size={12} className="mobileTopbar" sx={{ width: "100%" }}>
                {location.pathname.split("/")[1] === "dashboard" && (
                    <Grid2>
                        <img src={Logo} alt="Aaseya Inspection Solution" width="35px" height="40px" />
                    </Grid2>
                )}
                <Grid2 container>
                    <Grid2 container sx={{ alignItems: "center" }}>
                        {pathnameParts[pathnameParts?.length - 1] !== "dashboard" &&
                            pathnameParts[pathnameParts?.length - 1] !== "cases" && (
                                <Grid2>
                                    <IconButton onClick={() => navigate(-1)}>
                                        <KeyboardArrowLeftIcon sx={{ fontSize: "25px" }} />
                                    </IconButton>
                                </Grid2>
                            )}
                        <Typography className="headerText" variant="h4">
                            {pathnameParts[pathnameParts?.length - 1] !== "dashboard" &&
                            pathnameParts[pathnameParts?.length - 1] !== "cases" &&
                            header?.length > 15
                                ? `${header?.slice(0, 15)}...`
                                : header}
                        </Typography>
                    </Grid2>
                </Grid2>
                <Grid2>
                    <IconButton>
                        <SearchIcon sx={{ fontSize: "25px" }} />
                    </IconButton>
                    {location.pathname.split("/")[2] === "inspection" && (
                        <>
                            <IconButton>
                                <InfoOutlinedIcon sx={{ fontSize: "25px" }} />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    setIsShowCategoryView(true);
                                }}
                            >
                                <CategoryOutlinedIcon sx={{ fontSize: "25px" }} />
                            </IconButton>
                        </>
                    )}
                </Grid2>
            </Grid2>
        </>
    );
};

export default HeaderComponent;
