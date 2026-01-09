import { CircularProgress, Grid2 } from "@mui/material";
import React from "react";

const Loader = () => {
    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 50,
                zIndex: 9999,
            }}
        >
            <Grid2
                container
                justifyContent="center"
                alignItems="center"
                sx={{
                    "& .MuiCircularProgress-root": {
                        color: "#00000029",
                    },
                }}
            >
                <CircularProgress size={140} thickness={2} color="grey" />
            </Grid2>
        </div>
    );
};

export default Loader;
