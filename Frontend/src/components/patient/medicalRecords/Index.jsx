import React from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className="container mt-5 text-center">
      <button
        className="btn btn-primary"
        onClick={() => navigate("/patient-report")}
      >
        Get Report By Patient ID
      </button>
    </div>
    <div className="container mt-5 text-center">
      <button
        className="btn btn-primary"
        onClick={() => navigate("/add-diagnosis")}
      >
        Add Diagnosis
      </button>
    </div>
    <div className="container mt-5 text-center">
      <button
        className="btn btn-primary"
        onClick={() => navigate("/view-diagnosis")}
      >
        View Diagnosis
      </button>
    </div>
    <div className="container mt-5 text-center">
      <button
        className="btn btn-primary"
        onClick={() => navigate("/get-report")}
      >
        Get Report
      </button>
    </div>
     <div className="container mt-5 text-center">
      <button
        className="btn btn-primary"
        onClick={() => navigate("/medical-history")}
      >
        Medical History
      </button>
    </div>
    <div className="container mt-5 text-center">
      <button
        className="btn btn-primary"
        onClick={() => navigate("/update-report")}
      >
        Update Report
      </button>
    </div>
    </>
  );
};

export default Index;
