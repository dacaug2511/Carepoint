import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PatientRegister from "./pages/PatientRegister";
import DoctorRegister from "./pages/DoctorRegister";
import RoleSelection from "./pages/RoleSelection";
import LandingPage from "./pages/LandingPage";
import PatientDashboard from "./pages/dashboard/PatientDashboard";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Header from "./components/common/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
  return (
    <>
          <ToastContainer position="top-center" />

      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/role" element={<RoleSelection />} />
        <Route path="/register/patient" element={<PatientRegister />} />
        <Route path="/register/doctor" element={<DoctorRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Protected Routes */}
        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute role="PATIENT">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute role="DOCTOR">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
