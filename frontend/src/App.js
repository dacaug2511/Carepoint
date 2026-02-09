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
import PatientAppointmentHistory from "./components/patient/PatientAppointmentHistory";
import AddDiagnosis from "./components/patient/medicalRecords/AddDiagnosis";
import MedicalHistory from "./components/patient/medicalRecords/MedicalHistory";
import PatientReport from "./components/patient/medicalRecords/PatientReport";
import ViewDiagnosis from "./components/patient/medicalRecords/ViewDiagnosis";
import DoctorFeedback from "./components/admin/DoctorFeedback";

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
         <Route path="/doctor-feedback" element={<DoctorFeedback/>} />
        {/* Protected Routes */}

        <Route
  path="/patient/appointments"
  element={
    <ProtectedRoute role="PATIENT">
      <PatientAppointmentHistory />
    </ProtectedRoute>
  }
/>

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

        {/* ===== MEDICAL RECORDS (PATIENT) ===== */}

<Route
  path="/patient/medical-history"
  element={
    <ProtectedRoute role="PATIENT">
      <MedicalHistory />
    </ProtectedRoute>
  }
/>

<Route
  path="/patient/reports"
  element={
    <ProtectedRoute role="PATIENT">
      <PatientReport />
    </ProtectedRoute>
  }
/>

<Route
  path="/patient/diagnosis"
  element={
    <ProtectedRoute role="PATIENT">
      <ViewDiagnosis />
    </ProtectedRoute>
  }
/>

      </Routes>
    </>
  );
}

export default App;
