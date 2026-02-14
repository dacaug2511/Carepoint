import React from "react";
import DoctorApproval from "../../components/admin/DoctorApproval";
import PatientMonitor from "../../components/admin/PatientMonitor";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate=useNavigate();
  return (
    <>
    <div className="container mt-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      <DoctorApproval />
      <hr />
      <PatientMonitor />
      
    </div>
    <div className="container mt-5 text-center">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/doctor-feedback")}
        >
          Doctor feedback
        </button>
      </div>
    </>
  );
};

export default AdminDashboard;
