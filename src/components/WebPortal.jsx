import { useNavigate } from "react-router-dom";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import YouTube from "@mui/icons-material/YouTube";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import webPortalImg from "../assets/webportal.svg";
import aaseyaLogo from "../assets/Aaseyalogo.svg";

export default function WebPortal() {
  const navigate = useNavigate();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        fontFamily: "Poppins, sans-serif",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          height: { xs: "64px", md: "8vh" },
          backgroundColor: "#7FA6A6",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, md: 10 },
          position: "relative",
        }}
      >
        <Box component="img" src={aaseyaLogo} alt="aaseya" sx={{ height: 36 }} />

        {!isMobile && (
          <Stack
            direction="row"
            spacing={6}
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {["Home", "Services", "Claims", "Contacts"].map((item) => (
              <Typography
                key={item}
                sx={{
                  fontSize: 15,
                  color: "black",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                {item}
              </Typography>
            ))}
          </Stack>
        )}
      </Box>

      {/* ================= HERO ================= */}
      <Box
        sx={{
          minHeight: { xs: "auto", md: "64vh" },
          backgroundColor: "#7FA6A6",
          px: { xs: 2, md: 12 },
          py: { xs: 6, md: 0 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* LEFT CONTENT */}
        <Box sx={{ width: { xs: "100%", md: "52%" }, zIndex: 2 }}>
          <Stack spacing={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <VerifiedUser sx={{ color: "white", fontSize: 18 }} />
              <Typography sx={{ color: "white", fontSize: 13 }}>
                Trusted by 1M+ Policyholders
              </Typography>
            </Stack>

            <Typography
              sx={{
                fontSize: { xs: 32, md: 56 },
                fontWeight: 600,
                lineHeight: 1.1,
                color: "white",
              }}
            >
              Manage Your Claims
              <br />
              Effortlessly Online.
            </Typography>

            <Typography
              sx={{
                fontSize: 15,
                color: "black",
                maxWidth: 520,
              }}
            >
              Access your policy details, track claims, and request
              pre-authorizations from the comfort of your home.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              pt={1}
            >
              <Button
                variant="outlined"
                onClick={() => navigate("/policy")}
                sx={{
                  borderColor: "#356166",
                  color: "#000",
                  borderRadius: "30px",
                  px: 4,
                  py: 1,
                  textTransform: "none",
                }}
              >
                View Policy Details
              </Button>

              <Button
                variant="contained"
                onClick={() => navigate("/login")}
                sx={{
                  backgroundColor: "#4F8787",
                  color: "#fff",
                  borderRadius: "30px",
                  px: 4,
                  py: 1,
                  textTransform: "none",
                  boxShadow: "0px 6px 12px rgba(0,0,0,0.15)",
                  "&:hover": {
                    backgroundColor: "#437777",
                  },
                }}
              >
                Pre-Claim Authorization
              </Button>
            </Stack>
          </Stack>
        </Box>

        {/* RIGHT IMAGE */}
        <Box
          component="img"
          src={webPortalImg}
          alt="Web Portal"
          sx={{

            width: {
              xs: "100%",
              sm: "90%",
              md: "80%",
            },

            height: {
              xs: 460,
              sm: 420,
              md: "auto",
            },

            objectFit: "contain",
            position: { xs: "static", md: "absolute" },
            right: { md: "2%" },
            bottom: { md: "-55%" },

            mt: { xs: 5, md: 0 },
            maxWidth: "none",
            zIndex: 1,
          }}
        />

      </Box>

      {/* ================= FOOTER ================= */}
      <Box
        sx={{
          backgroundColor: "#356166",
          py: { xs: 3, md: 4 },
          px: { xs: 4, md: 6 },
          position: "relative",
        }}
      >
        <Stack spacing={2} alignItems={{ xs: "center", md: "flex-start" }}>
          <Box component="img" src={aaseyaLogo} alt="aaseya" sx={{ height: 32 }} />

          <Typography
            sx={{
              fontSize: 12,
              color: "#fff",
              maxWidth: 320,
              lineHeight: 1.6,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            India's first unified online platform for pre-authorizations and
            claims, connecting hospitals, insurers, and TPAs seamlessly.
          </Typography>
        </Stack>

        {/* SOCIAL */}
        <Stack direction="row" spacing={1} justifyContent="center" mt={4}>
          <IconButton sx={{ color: "#fff" }}>
            <Instagram fontSize="small" />
          </IconButton>
          <IconButton sx={{ color: "#fff" }}>
            <Facebook fontSize="small" />
          </IconButton>
          <IconButton sx={{ color: "#fff" }}>
            <YouTube fontSize="small" />
          </IconButton>
        </Stack>

        <Typography
          sx={{
            fontSize: 11,
            color: "#fff",
            textAlign: "center",
            mt: 2,
          }}
        >
          © 2023 — Copyright
        </Typography>
      </Box>
    </Box>
  );
}
