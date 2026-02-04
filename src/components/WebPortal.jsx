
// import { useNavigate } from "react-router-dom";
// import Facebook from "@mui/icons-material/Facebook";
// import Instagram from "@mui/icons-material/Instagram";
// import VerifiedUser from "@mui/icons-material/VerifiedUser";
// import YouTube from "@mui/icons-material/YouTube";
// import { Box, Button, IconButton, Stack, Typography } from "@mui/material";

// import webPortalImg from "../assets/webportal.svg";
// import aaseyaLogo from "../assets/Aaseyalogo.svg";

// const navigationLinks = [
//   { label: "Home", href: "#" },
//   { label: "Services", href: "#" },
//   { label: "Claims", href: "#" },
//   { label: "Contacts", href: "#" },
// ];

// export default function WebPortal() {
//       const navigate = useNavigate();
      
//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: "primary.main" }}>
//       {/* ================= HEADER ================= */}
//       <Box
//         sx={{
//           height: 72,
//           px: { xs: 3, md: 8 },
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <Box component="img" src={aaseyaLogo} alt="Aaseya" sx={{ height: 38 }} />

//         <Stack direction="row" spacing={4}>
//           {navigationLinks.map((link) => (
//             <Typography
//               key={link.label}
//               component="a"
//               href={link.href}
//               sx={{
//                 color: "#fff",
//                 fontSize: 15,
//                 fontWeight: 500,
//                 textDecoration: "none",
//                 display: { xs: "none", md: "block" },
//               }}
//             >
//               {link.label}
//             </Typography>
//           ))}
//         </Stack>
//       </Box>

//       {/* ================= HERO ================= */}
//       <Box
//         sx={{
//           px: { xs: 3, md: 8 },
//           py: { xs: 6, md: 8 }, // 🔥 FIXES BIG GAP
//         }}
//       >
//         <Box
//           sx={{
//             maxWidth: 1400,
//             mx: "auto",
//             display: "grid",
//             gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
//             alignItems: "center",
//             gap: { xs: 5, md: 4 }, // 🔥 CONTROLLED GAP
//           }}
//         >
//           {/* LEFT CONTENT */}
//           <Box>
//             <Stack direction="row" spacing={1} alignItems="center" mb={2}>
//               <VerifiedUser sx={{ fontSize: 18, color: "#fff" }} />
//               <Typography sx={{ fontSize: 14, color: "#fff" }}>
//                 Trusted by IM+ Policyholders
//               </Typography>
//             </Stack>

//             <Typography
//               sx={{
//                 fontSize: { xs: 38, sm: 46, md: 54 },
//                 fontWeight: 700,
//                 color: "#fff",
//                 lineHeight: 1.15,
//                 mb: 2,
//               }}
//             >
//               Manage Your Claims
//               <br />
//               Effortlessly Online.
//             </Typography>

//             <Typography
//               sx={{
//                 fontSize: 16,
//                 color: "#fff",
//                 maxWidth: 480,
//                 mb: 3,
//               }}
//             >
//               Access your policy details, track claims, and request
//               pre-authorizations from the comfort of your home.
//             </Typography>

//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <Button
//                 variant="outlined"
//                 sx={{
//                   color: "#fff",
//                   borderColor: "#fff",
//                   borderRadius: 24,
//                   px: 4,
//                   py: 1.1,
//                 }}
//               >
//                 VIEW POLICY DETAILS
//               </Button>

//          <Button
//   variant="contained"
//   onClick={() => navigate("/login")}   // 👈 ROUTE TO LOGIN
//   sx={{
//     bgcolor: "secondary.main",
//     color: "#fff",          // 👈 THIS fixes black text
//     borderRadius: 24,
//     px: 4,
//     py: 1.1,
//     fontWeight: 500,        // (optional – closer to XD)
//     "&:hover": {
//       bgcolor: "secondary.dark",
//     },
//   }}
// >
//   PRE-CLAIM AUTHORIZATION
// </Button>


//             </Stack>
//           </Box>

//           {/* RIGHT IMAGE */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//   <Box
//   sx={{
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     maxHeight: 420,        // ⬅ LIMIT IMAGE AREA
//   }}
// >
//   <Box
//     component="img"
//     src={webPortalImg}
//     alt="Healthcare Illustration"
//     sx={{
//       width: { xs: "80%", sm: "85%", md: "100%" },
//       maxWidth: 520,       // ⬅ FINAL SIZE (XD LIKE)
//       height: "auto",
//       objectFit: "contain",
//     }}
//   />
// </Box>


//           </Box>
//         </Box>
//       </Box>

//       {/* ================= FOOTER ================= */}
//       <Box
//         sx={{
//           bgcolor: "secondary.main",
//           px: { xs: 3, md: 8 },
//           py: 4,
//         }}
//       >
//         <Stack spacing={2} maxWidth={1400} mx="auto">
//           <Typography sx={{ color: "#fff", fontWeight: 600 }}>
//             aaseya
//           </Typography>

//           <Typography sx={{ color: "#fff", maxWidth: 420 }}>
//             India's first unified online platform for pre-authorizations
//             and claims, connecting hospitals, insurers, and TPAs seamlessly.
//           </Typography>

//           <Stack direction="row" spacing={2}>
//             <IconButton sx={{ color: "#fff" }}><Instagram /></IconButton>
//             <IconButton sx={{ color: "#fff" }}><Facebook /></IconButton>
//             <IconButton sx={{ color: "#fff" }}><YouTube /></IconButton>
//           </Stack>

//           <Typography sx={{ fontSize: 12, color: "#fff", textAlign: "center" }}>
//             © 2023 — Copyright
//           </Typography>
//         </Stack>
//       </Box>
//     </Box>
//   );
// }
import { useNavigate } from "react-router-dom";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import YouTube from "@mui/icons-material/YouTube";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";

import webPortalImg from "../assets/webportal.svg";
import aaseyaLogo from "../assets/Aaseyalogo.svg";

const navigationLinks = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#" },
  { label: "Claims", href: "#" },
  { label: "Contacts", href: "#" },
];

export default function WebPortal() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "primary.main",

        /* ✅ HIDE SCROLLBAR (BUT SCROLL STILL WORKS) */
        overflowY: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {/* ================= HEADER ================= */}
      <Box
        sx={{
          height: 72,
          px: { xs: 3, md: 8 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box component="img" src={aaseyaLogo} alt="Aaseya" sx={{ height: 38 }} />

        <Stack direction="row" spacing={4}>
          {navigationLinks.map((link) => (
            <Typography
              key={link.label}
              component="a"
              href={link.href}
              sx={{
                color: "#fff",
                fontSize: 15,
                fontWeight: 500,
                textDecoration: "none",
                display: { xs: "none", md: "block" },
              }}
            >
              {link.label}
            </Typography>
          ))}
        </Stack>
      </Box>

      {/* ================= HERO ================= */}
      <Box
  sx={{
    px: { xs: 3, md: 8 },
    py: { xs: 6, md: 8 },
    minHeight: "calc(100vh - 72px)", // 👈 HEADER HEIGHT
    display: "flex",
    alignItems: "center",
  }}
>

        <Box
          sx={{
            maxWidth: 1400,
            mx: "auto",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            alignItems: "center",
            gap: { xs: 5, md: 4 },
          }}
        >
          {/* LEFT CONTENT */}
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <VerifiedUser sx={{ fontSize: 18, color: "#fff" }} />
              <Typography sx={{ fontSize: 14, color: "#fff" }}>
                Trusted by IM+ Policyholders
              </Typography>
            </Stack>

            <Typography
              sx={{
                fontSize: { xs: 38, sm: 46, md: 54 },
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.15,
                mb: 2,
              }}
            >
              Manage Your Claims
              <br />
              Effortlessly Online.
            </Typography>

            <Typography
              sx={{
                fontSize: 16,
                color: "#fff",
                maxWidth: 480,
                mb: 3,
              }}
            >
              Access your policy details, track claims, and request
              pre-authorizations from the comfort of your home.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="outlined"
                sx={{
                  color: "#fff",
                  borderColor: "#fff",
                  borderRadius: 24,
                  px: 4,
                  py: 1.1,
                }}
              >
                VIEW POLICY DETAILS
              </Button>

              <Button
                variant="contained"
                onClick={() => navigate("/login")}
                sx={{
                  bgcolor: "secondary.main",
                  color: "#fff",
                  borderRadius: 24,
                  px: 4,
                  py: 1.1,
                  fontWeight: 500,
                  "&:hover": {
                    bgcolor: "secondary.dark",
                  },
                }}
              >
                PRE-CLAIM AUTHORIZATION
              </Button>
            </Stack>
          </Box>

          {/* RIGHT IMAGE (BIGGER BUT CONTROLLED) */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={webPortalImg}
              alt="Healthcare Illustration"
              sx={{
                width: "100%",
                maxWidth: 600,          // ✅ IMAGE IS BIGGER
                height: "auto",
                // objectFit: "contain",
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* ================= FOOTER ================= */}
      <Box
        sx={{
          bgcolor: "secondary.main",
          px: { xs: 3, md: 8 },
          py: 4,
        }}
      >
        <Stack spacing={2} maxWidth={1400} mx="auto">
          <Typography sx={{ color: "#fff", fontWeight: 600 }}>
            aaseya
          </Typography>

          <Typography sx={{ color: "#fff", maxWidth: 420 }}>
            India's first unified online platform for pre-authorizations
            and claims, connecting hospitals, insurers, and TPAs seamlessly.
          </Typography>

          <Stack direction="row" spacing={2}>
            <IconButton sx={{ color: "#fff" }}><Instagram /></IconButton>
            <IconButton sx={{ color: "#fff" }}><Facebook /></IconButton>
            <IconButton sx={{ color: "#fff" }}><YouTube /></IconButton>
          </Stack>

          <Typography sx={{ fontSize: 12, color: "#fff", textAlign: "center" }}>
            © 2023 — Copyright
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
