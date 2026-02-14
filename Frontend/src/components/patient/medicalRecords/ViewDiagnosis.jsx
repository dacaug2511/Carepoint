import React, { useState } from "react";
import { viewDiagnosis } from "../../../services/reportService";

const ViewDiagnosis = () => {
  const [patientId, setPatientId] = useState("");
  const [reports, setReports] = useState([]);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearched(true);

    try {
      const res = await viewDiagnosis(patientId);

      const data = Array.isArray(res.data)
        ? res.data
        : res.data
          ? [res.data]
          : [];
      console.log(data);
      setReports(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to fetch reports");
      setReports([]);
    }
  };

  return (
    <div className="container mt-4">
      {/* Search */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-6 col-lg-4 d-flex gap-2">
          <input
            type="number"
            className="form-control"
            placeholder="Enter Patient ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>

      {/* Error */}
      {error && <p className="text-danger text-center">{error}</p>}

      {/* No Records */}
      {searched && !error && reports.length === 0 && (
        <p className="text-center text-muted">
          No reports found for this patient.
        </p>
      )}

      {/* Table */}
      {reports.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-striped shadow-sm">
            <thead className="table-dark">
              <tr>
                <th colSpan="3">
                  Patient Name:{" "}
                  <span className="fw-normal">{reports[0].patientName}</span>
                </th>
              </tr>
              <tr>
                
                <th>Symptoms</th>
                <th>Diagnosis</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r, i) => (
                <tr key={i}>
                  <td>{r.symptoms}</td>
                  <td>{r.diagnosis}</td>
                   <td>{r.reportDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewDiagnosis;
