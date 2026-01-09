import { Grid2, Skeleton } from "@mui/material";
import React from "react";

const SkeletonLoader = () => {
    return (
        <>
            <Grid2 container spacing={2.5} sx={{ p: 2.5 }}>
                <Grid2 size={1}>
                    {/* Sidebar */}
                    <Skeleton
                        animation="wave"
                        sx={{ bgcolor: "#F2F6F6", borderRadius: "20px" }}
                        variant="rounded"
                        height="100vh"
                        width="100%"
                    />
                </Grid2>
                <Grid2 size={11} container spacing={2.5}>
                    {/* Topbar */}
                    <Skeleton
                        animation="wave"
                        sx={{ bgcolor: "#F2F6F6", borderRadius: "20px" }}
                        variant="rounded"
                        height="15vh"
                        width="100%"
                    />
                    {/* Main content */}
                    <Skeleton
                        animation="wave"
                        sx={{ bgcolor: "#F2F6F6", borderRadius: "20px" }}
                        variant="rounded"
                        height="80vh"
                        width="100%"
                    />
                </Grid2>
            </Grid2>
        </>
    );
};

export default SkeletonLoader;
