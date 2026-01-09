import React, { useContext, useState } from 'react';
import { Button, TextField, FormControlLabel, Link, Box, Grid2, Typography, useTheme, IconButton, Drawer } from "@mui/material";
// import AaseyaLogo from '../../../assets/logo_full.png';
import AaseyaLogo from '../../../assets/inspection_logo.png';
import CustomCheckbox from '../../global/CustomCheckbox';
import { SnackContext } from '../../global/SnackProvider';
import './login.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MobileLogin from '../../../assets/mobile-login.png';
import CryptoJS from "crypto-js";

const secretKey = "0123456789ABCDEF"; // 16-byte key
const iv = "1234567890ABCDEF"; // 16-byte IV

const LoginComponent = ({ setUser }) => {
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
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url(${MobileLogin})`,
                        position: "absolute",
                        backgroundRepeat: "no-repeat",
                        left: 0,
                        top: "-20%",
                        backgroundPosition: "center top",
                    }}
                />
                <Grid2
                    container
                    sx={{
                        top: 0,
                        position: "absolute",
                        height: "30vh",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {/* <img src={AaseyaLogo} alt="Aaseya Inspection Solution" width={160} height={80} /> */}
                </Grid2>
                <Drawer open={true} anchor="bottom" variant="persistent" className="loginDrawer">
                    <Grid2 container direction="column" sx={{ px: 4, height: "70vh", justifyContent: "center" }}>
                        <Grid2 container sx={{ pb: 6 }}>
                            <Typography variant="h4" fontWeight={700}>
                                Sign In
                            </Typography>
                        </Grid2>
                        <Grid2 sx={{ pb: 4 }}>
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
                                pb: 5,
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
                            <Link className="linkStyle" href="#">
                                Forgot Password?
                            </Link>
                        </Grid2>
                    </Grid2>
                </Drawer>
            </Box>
        </>
    );
};

export default LoginComponent;
