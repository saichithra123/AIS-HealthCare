// import { createTheme } from "@mui/material";
// import { createTheme } from '@mui/material/styles';
import createTheme from '@mui/material/styles/createTheme';

export const theme = createTheme({
    palette: {
        primary: {
            main: "#ffffff",
        },
        secondary: {
            main: "#ffffff",
        },
        colors: {
            1: "#FFFFFF", // Primary color
            2: "#F2F6F6",
            3: "#00000029",
            4: "#EBEBEB",
            5: "#003346",
            6: "#00060A",
            7: "#E6EFF0",
            8: "#918F8F",
            9: "#0064003B",
            10: "#FFFFFF3B",
            11: "#4C8B92",
            12: "#183884",
            13: "#1838843B",
            14: "#8A0000",
            15: "#8A00003B",
            16: "#DC7C0B",
            17: "#DC7C0B3B",
            18: "#92C7CF",
            19: "#03911A",
            20: "#C5DBDE",
            21: "#6A6969", // Text color in create case page
            22: "#CCCCCC", // border color
        },
    },
    typography: {
        allVariants: {
            fontFamily: ["Poppins"],
        },
        fontFamily: ["Poppins"].join(","),
        fontSize: 12,
        color: `#00060A`,
        h1: {
            fontFamily: ["Poppins"].join(","),
            fontSize: 24,
            fontWeight: "bold",
            color: `#00060A`,
        },
        h2: {
            fontFamily: ["Poppins"].join(","),
            fontSize: 22,
            color: `#00060A`,
        },
        h3: {
            fontFamily: ["Poppins"].join(","),
            fontSize: 20,
            color: `#00060A`,
        },
        h4: {
            fontFamily: ["Poppins"].join(","),
            fontSize: 18,
            color: `#00060A`,
        },
        h5: {
            fontFamily: ["Poppins"].join(","),
            fontSize: 16,
            color: `#00060A`,
        },
        h6: {
            fontFamily: ["Poppins"].join(","),
            fontSize: 14,
            color: `#00060A`,
        },
    },
    components: {
        MuiBadge: {
            styleOverrides: {
                root: {
                    color: "blue",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    "& .MuiButtonBase-root": {
                        textTransform: "none",
                        fontSize: "18px",
                        fontWeight: 600,
                        border: "1px solid #CCCCCC",
                        borderRadius: "10px 10px 0px 0px",
                    },
                    "& .Mui-selected": {
                        backgroundColor: "#4C8B92",
                        color: "#030303",
                    },
                },
            },
        },
    },
});