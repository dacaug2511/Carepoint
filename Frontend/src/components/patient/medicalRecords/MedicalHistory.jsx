import React, { useEffect, useState } from "react";
import { getMedicalHistory } from "../../../services/reportService";

const MedicalHistory = () => {
  const [data, setData] = useState([]);
  const [patientId, setPatientId] = useState(0); // ✅ default 0
  const [inputId, setInputId] = useState(""); // input field state
  

  const fetchData = (id) => {
    if (id === 0) return; // don't fetch for default 0
    getMedicalHistory(id)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.log(err);
        setData([]); // clear data on error
      });
  };

  // fetch when patientId changes
  useEffect(() => {
    fetchData(patientId);
  }, [patientId]);

  return (
    <div className="container mt-4">

      {/* ✅ INPUT FOR PATIENT ID */}
      <div className="mb-4">
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            placeholder="Enter Patient ID"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={() => {
              if (inputId) setPatientId(Number(inputId));
            }}
          >
            Fetch History
          </button>
        </div>
      </div>

      {/* Show message if no data */}
      {data.length === 0 && patientId !== 0 && (
        <div className="text-center mt-5">No data for this patient</div>
      )}

      {data.length > 0 && (
        <>
          {/* ✅ PATIENT INFO CARD */}
          <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white">
              <h4>Patient Information</h4>
            </div>

            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Name:</strong> {data[0].patientFirstName} {data[0].patientLastName}</p>
                  <p><strong>Gender:</strong> {data[0].gender}</p>
                  <p><strong>DOB:</strong> {data[0].dob}</p>
                </div>

                <div className="col-md-6">
                  <p><strong>Blood Group:</strong> 
                    <span className="badge bg-danger ms-2">{data[0].bloodGroup}</span>
                  </p>
                  <p><strong>Allergy:</strong> {data[0].allergy}</p>
                  <p><strong>Contact:</strong> {data[0].emergencyContact}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ DISEASE HISTORY */}
          <div className="card shadow mb-4">
            <div className="card-header bg-warning">
              <h4>Disease History</h4>
            </div>
            <div className="card-body">
              <h5 className="text-danger">{data[0].diseaseName}</h5>
              <p>Since: {data[0].diseaseStartDate}</p>
            </div>
          </div>

          {/* ✅ REPORTS TABLE */}
          <div className="card shadow mb-4">
            <div className="card-header bg-success text-white">
              <h4>Medical Reports</h4>
            </div>

            <div className="card-body table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Doctor</th>
                    <th>Specialization</th>
                    <th>Date</th>
                    <th>Symptoms</th>
                    <th>Diagnosis</th>
                    <th>Prescription</th>
                    <th>Remarks</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.doctorFirstName} {item.doctorLastName}</td>
                      <td>{item.specialization}</td>
                      <td>{item.appointmentDate}</td>
                      <td>{item.symptoms}</td>
                      <td>{item.diagnosis}</td>
                      <td>{item.prescription}</td>
                      <td>{item.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ✅ BILLING CARD */}
          <div className="card shadow mb-4">
            <div className="card-header bg-info text-white">
              <h4>Billing Details</h4>
            </div>

            <div className="card-body">
              <p><strong>Consultation Fee:</strong> ₹{data[0].consultationFee}</p>
              <p><strong>Total Amount:</strong> ₹{data[0].totalAmount}</p>
              <p><strong>Payment Mode:</strong> 
                <span className="badge bg-success ms-2">{data[0].paymentMode}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MedicalHistory;
