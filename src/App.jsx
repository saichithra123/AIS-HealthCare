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


function RoleProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("userRole");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    if (role === "CUSTOMER") {
      return <Navigate to="/registration" replace />;
    }
    return <Navigate to="/workpool" replace />;
  }

  return children;
}


export default function App() {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("userRole");

  return (
    <Routes>


      <Route
        path="/"
        element={
          token
            ? role === "CUSTOMER"
              ? <Navigate to="/registration" />
              : <Navigate to="/workpool" />
            : <WebPortal />
        }
      />

      <Route
        path="/login"
        element={
          token
            ? role === "CUSTOMER"
              ? <Navigate to="/registration" />
              : <Navigate to="/workpool" />
            : <Login />
        }
      />

      <Route path="/chatbot" element={<Chatbot />} />


      <Route
        path="/registration"
        element={
          <RoleProtectedRoute allowedRoles={["CUSTOMER"]}>
            <Registration />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/upload-documents"
        element={
          <RoleProtectedRoute allowedRoles={["CUSTOMER"]}>
            <UploadDocuments />
          </RoleProtectedRoute>
        }
      />


      <Route
        path="/workpool"
        element={
          <RoleProtectedRoute allowedRoles={["ASSESSOR", "MANAGER", "FINANCE"]}>
            <Workpool />
          </RoleProtectedRoute>
        }
      />


      <Route
        path="/claim-review/:claimId"
        element={
          <RoleProtectedRoute allowedRoles={["ASSESSOR"]}>
            <ClaimReview />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/claim-checklist/:claimId"
        element={
          <RoleProtectedRoute allowedRoles={["ASSESSOR"]}>
            <ClaimChecklist />
          </RoleProtectedRoute>
        }
      />


      <Route
        path="/claim-summary/:claimId"
        element={
          <RoleProtectedRoute allowedRoles={["MANAGER"]}>
            <ClaimSummary />
          </RoleProtectedRoute>
        }
      />


      <Route
        path="/finance-review/:claimId"
        element={
          <RoleProtectedRoute allowedRoles={["FINANCE"]}>
            <FinanceReview />
          </RoleProtectedRoute>
        }
      />

    

      <Route
        path="*"
        element={
          token
            ? role === "CUSTOMER"
              ? <Navigate to="/registration" />
              : <Navigate to="/workpool" />
            : <Navigate to="/" />
        }
      />

    </Routes>
  );
}