import { Routes, Route, Navigate } from "react-router-dom";
import WebPortal from "./components/WebPortal";
import Login from "./components/Login";
import Registration from "./components/Registration";
import UploadDocuments from "./components/UploadDocuments";
import Workpool from "./components/workpool";

export default function App() {
  const isAuthenticated = !!localStorage.getItem("access_token");

  return (
    <Routes>
      <Route path="/" element={<WebPortal />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/registration"
        element={
          isAuthenticated ? <Registration /> : <Navigate to="/login" />
        }
      />
      
<Route path="/upload-documents" element={<UploadDocuments />} />
      <Route path="/workpool" element={<Workpool />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
