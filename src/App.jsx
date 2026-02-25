// import { Routes, Route, Navigate } from "react-router-dom";
// import WebPortal from "./components/WebPortal";
// import Login from "./components/Login";
// import Registration from "./components/Registration";
// import UploadDocuments from "./components/UploadDocuments";
// import Workpool from "./components/workpool";
// import Chatbot from "./components/Chatbot";
// import ClaimSummary from "./components/ClaimSummary";
// import ClaimReview from "./components/ClaimReview";
// import ClaimChecklist from "./components/ClaimChecklist";
// import FinanceReview from "./components/FinanceReview";

// export default function App() {
//   const isAuthenticated = !!localStorage.getItem("access_token");

//   return (
//     <Routes>
//       {/* ================= PUBLIC ROUTES ================= */}
//       <Route path="/" element={<WebPortal />} />
//       <Route path="/ais/login" element={<Login />} />
//       <Route path="/ais/chatbot" element={<Chatbot />} />

//       {/* ================= PROTECTED ROUTES ================= */}
//       <Route
//         path="/ais/registration"
//         element={
//           isAuthenticated ? <Registration /> : <Navigate to="/ais/login" />
//         }
//       />

//       <Route
//         path="/ais/upload-documents"
//         element={
//           isAuthenticated ? <UploadDocuments /> : <Navigate to="/ais/login" />
//         }
//       />

//       <Route
//         path="/ais/workpool"
//         element={
//           isAuthenticated ? <Workpool /> : <Navigate to="/ais/login" />
//         }
//       />

//       <Route
//         path="/ais/claim-review/:claimId"
//         element={
//           isAuthenticated ? <ClaimReview /> : <Navigate to="/ais/login" />
//         }
//       />

//       <Route
//         path="/ais/claim-checklist/:claimId"
//         element={
//           isAuthenticated ? <ClaimChecklist /> : <Navigate to="/ais/login" />
//         }
//       />

//       <Route
//         path="/ais/claim-summary/:claimId"
//         element={
//           isAuthenticated ? <ClaimSummary /> : <Navigate to="/ais/login" />
//         }
//       />

//       <Route
//         path="/ais/finance-review/:claimId"
//         element={
//           isAuthenticated ? <FinanceReview /> : <Navigate to="/ais/login" />
//         }
//       />

//       {/* ================= FALLBACK ================= */}
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// }
import { Routes, Route, Navigate } from "react-router-dom";
import WebPortal from "./components/WebPortal";
import Login from "./components/Login";
import Registration from "./components/Registration";
import UploadDocuments from "./components/UploadDocuments";
import Workpool from "./components/workpool";
import Chatbot from "./components/Chatbot";
import ClaimSummary from "./components/ClaimSummary";
import ClaimReview from "./components/ClaimReview";
import ClaimChecklist from "./components/ClaimChecklist";
import FinanceReview from "./components/FinanceReview";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("access_token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<WebPortal />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chatbot" element={<Chatbot />} />

      {/* PROTECTED ROUTES */}
      <Route
        path="/registration"
        element={
          <ProtectedRoute>
            <Registration />
          </ProtectedRoute>
        }
      />

      <Route
        path="/upload-documents"
        element={
          <ProtectedRoute>
            <UploadDocuments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/workpool"
        element={
          <ProtectedRoute>
            <Workpool />
          </ProtectedRoute>
        }
      />

      <Route
        path="/claim-review/:claimId"
        element={
          <ProtectedRoute>
            <ClaimReview />
          </ProtectedRoute>
        }
      />

      <Route
        path="/claim-checklist/:claimId"
        element={
          <ProtectedRoute>
            <ClaimChecklist />
          </ProtectedRoute>
        }
      />

      <Route
        path="/claim-summary/:claimId"
        element={
          <ProtectedRoute>
            <ClaimSummary />
          </ProtectedRoute>
        }
      />

      <Route
        path="/finance-review/:claimId"
        element={
          <ProtectedRoute>
            <FinanceReview />
          </ProtectedRoute>
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}