import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import loginImg from "../assets/loginimg.svg";
import aaseyaLogo from "../assets/Aaseyalogo.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const CLIENT_ID = import.meta.env.VITE_KEYCLOAK_CLIENT_ID;

  // ---------------- LOGIN ----------------
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter username and password");
      return;
    }

    setLoading(true);

    const params = new URLSearchParams();
    params.append("grant_type", "password");
    params.append("client_id", CLIENT_ID);
    params.append("username", email.trim());
    params.append("password", password);

    const TOKEN_URL = `${import.meta.env.VITE_KEYCLOAK_BASE_URL}/realms/${import.meta.env.VITE_KEYCLOAK_REALM}/protocol/openid-connect/token`;

    try {
      const response = await fetch(TOKEN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error_description || "Login failed");
      }

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("username", email);

      navigate("/registration");
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Please check credentials");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- LOGOUT ----------------
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");

    navigate("/ais/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        bgcolor: "#F6F9F8",
      }}
    >
      {/* LEFT IMAGE */}
      <Box
        sx={{
          width: { xs: "100%", md: "45%" },
          bgcolor: "#5A9BA5",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          component="img"
          src={loginImg}
          alt="Healthcare"
          sx={{
            width: "100%",
            height: { xs: 260, md: "100%" },
            objectFit: "cover",
          }}
        />

        <Box sx={{ px: { xs: 2, md: 5 }, py: 3, color: "#fff" }}>
          <Typography fontSize={{ xs: 16, md: 22 }} fontWeight={600} mb={1}>
            Reliable health coverage for you and your family
          </Typography>
          <Typography fontSize={{ xs: 12, md: 14 }}>
            Our digital-first approach ensures that your health and claims are
            prioritized with professional care and minimal friction
          </Typography>
        </Box>
      </Box>

      {/* RIGHT LOGIN */}
      <Box
        sx={{
          width: { xs: "100%", md: "55%" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 420 }}>
          <Box textAlign="center" mb={4}>
            <Box component="img" src={aaseyaLogo} alt="aaseya" sx={{ height: 36 }} />
          </Box>

          <Typography fontSize={22} fontWeight={600} mb={1}>
            Welcome Back
          </Typography>

          <Typography fontSize={14} color="text.secondary" mb={4}>
            Please enter your credentials to access your secure portal
          </Typography>

          <Typography fontSize={13} mb={1}>Username</Typography>
          <TextField
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                height: 52,
                borderRadius: "999px",
                backgroundColor: "#EEF5FF",
              },
            }}
          />

          <Typography fontSize={13} mb={1}>Password</Typography>
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                height: 52,
                borderRadius: "999px",
                backgroundColor: "#EEF5FF",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            }
            label="Remember me"
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth
            variant="contained"
            disabled={loading}
            onClick={handleLogin}
            sx={{
              bgcolor: "#5A9BA5",
              borderRadius: 12,
              py: 1.4,
              mb: 2,
              "&:hover": { bgcolor: "#4A8A94" },
            }}
          >
            {loading ? "Logging in..." : "LOGIN"}
          </Button>

          {/* FORGOT PASSWORD */}
          <Box textAlign="center">
            <Link sx={{ fontSize: 13, color: "#5A9BA5" }}>
              Forgot Password?
            </Link>
          </Box>

          {/* LOGOUT BUTTON BELOW FORGOT PASSWORD */}
          <Box textAlign="center" mt={1}>
            <Button
              size="small"
              onClick={handleLogout}
              sx={{ color: "#5A9BA5", textTransform: "none" }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;