import React, { useContext, useState } from 'react';
import { Button, TextField, FormControlLabel, Link, Box, Grid2, Typography, useTheme, IconButton } from "@mui/material";
import loginTop from "../../assets/login-top.png";
import LoginBottom from "../../assets/login-bottom.png";
import AaseyaLogo from "../../assets/black_logo.png";
// import AaseyaLogo from "../../assets/inspection_logo.png";
import LoginImage from "../../assets/login-image.png";
import CustomCheckbox from "../global/CustomCheckbox";
import { SnackContext } from "../global/SnackProvider";
import "./login.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import CryptoJS from "crypto-js";

const secretKey = "0123456789ABCDEF"; // 16-byte key
const iv = "1234567890ABCDEF"; // 16-byte IV

const Login = ({ setUser }) => {
    const theme = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { snack, setSnack } = useContext(SnackContext);
    const [showPassword, setShowPassword] = useState(false);

    const toArrayBuffer = (text) => new TextEncoder().encode(text);

    const arrayBufferToBase64 = (buffer) => {
        let binary = "";
        const bytes = new Uint8Array(buffer);
        bytes.forEach((b) => (binary += String.fromCharCode(b)));
        return btoa(binary);
    };

    const encryptAES = async (plainText) => {
        try {
            if (crypto.subtle?.importKey) {
                const keyMaterial = toArrayBuffer(secretKey);
                const ivBuffer = toArrayBuffer(iv);

                const key = await crypto.subtle.importKey("raw", keyMaterial, { name: "AES-CBC" }, false, ["encrypt"]);

                const encryptedBuffer = await crypto.subtle.encrypt(
                    { name: "AES-CBC", iv: ivBuffer },
                    key,
                    toArrayBuffer(plainText)
                );

                return arrayBufferToBase64(encryptedBuffer);
            } else {
                const encrypted = CryptoJS.AES.encrypt(plainText, CryptoJS.enc.Utf8.parse(secretKey), {
                    iv: CryptoJS.enc.Utf8.parse(iv),
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7,
                });
                return encrypted.toString();
            }
        } catch (error) {
            console.error("Encryption error:", error);
            return null;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let encryptedPassword = await encryptAES(password);
            const response = await axios({
                method: "post",
                url: `${import.meta.env.VITE_BASE_URL}/login`,
                data: {
                    username: email,
                    password: encryptedPassword,
                },
            });
            setUser(response?.data);
            localStorage.setItem("userEmail", response?.data?.registrationID);
            localStorage.setItem("userName", response?.data?.userName);
            localStorage.setItem("userRole", response?.data?.role?.toUpperCase());
            localStorage.setItem("userID", response?.data?.userID);
        } catch (error) {
            console.log(error);
            setSnack({ open: true, message: "Invalid username or password", severity: "error" });
        }
    };

    return (
        <>
            <Box className="loginContainer">
                <Box
                    sx={{
                        width: "50%",
                        height: "100%",
                        backgroundImage: `url(${loginTop})`,
                        position: "absolute",
                        backgroundRepeat: "no-repeat",
                        left: 0,
                        top: 0,
                    }}
                />
                <Box
                    sx={{
                        width: "50%",
                        height: "100%",
                        backgroundImage: `url(${LoginBottom})`,
                        backgroundRepeat: "no-repeat",
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        backgroundPosition: "bottom right",
                    }}
                />
                <Grid2 container className="loginInnerContainer">
                    <Grid2 container size={{ xs: 12, md: 6 }}>
                        <img src={AaseyaLogo} alt="Aaseya Inspection Solution" width={120} height={40} />
                        <Grid2 container justifyContent="center">
                            <img src={LoginImage} alt="Login Image" width={380} height={260} />
                            <Grid2
                                sx={{
                                    "& .MuiTypography-root": {
                                        color: theme.palette.colors[11],
                                        fontWeight: 600,
                                    },
                                }}
                            >
                                <Typography align="center">Transform inspections with our cutting-edge solution-</Typography>
                                <Typography align="center">seamless, efficient, and precise.</Typography>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                    <Grid2 container size={{ xs: 12, md: 6 }} direction="column" className="loginRightContainer">
                        <Grid2 container sx={{ justifyContent: "center", pb: 5 }}>
                            <Typography variant="h4" fontWeight={600}>
                                Sign In
                            </Typography>
                        </Grid2>
                        <Grid2 sx={{ pb: 3 }}>
                            <Typography className="textStyle">Username</Typography>
                            <TextField
                                size="small"
                                fullWidth
                                className="inputField"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid2>
                        <Grid2 sx={{ pb: 1 }}>
                            <Typography className="textStyle">Password</Typography>
                            <TextField
                                size="small"
                                fullWidth
                                className="inputField"
                                type={!showPassword ? "password" : "text"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <>
                                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            </>
                                        ),
                                    },
                                }}
                            />
                        </Grid2>
                        <Grid2
                            sx={{
                                "& .MuiTypography-root": {
                                    fontWeight: 500,
                                },
                                pb: 4,
                            }}
                        >
                            <FormControlLabel control={<CustomCheckbox />} label="Remember me" />
                        </Grid2>
                        <Grid2 sx={{ pb: 1 }}>
                            <Button className="loginButton" onClick={handleSubmit}>
                                Login
                            </Button>
                        </Grid2>
                        <Grid2 container sx={{ justifyContent: "center" }}>
                            <Link className="linkStyle" sx={{ fontSize: "12px", color: "#4C8B92" }} href="#">
                                Forgot Password?
                            </Link>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Box>
        </>
    );
};

export default Login;