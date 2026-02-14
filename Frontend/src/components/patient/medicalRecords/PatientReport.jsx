import React, { useState } from "react";
import { getReportByPatientId } from "../../../services/reportService";

const PatientReport = () => {
  const [patientId, setPatientId] = useState("");
  const [reports, setReports] = useState([]);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearched(true);

    try {
      const res = await getReportByPatientId(patientId);

      const data = Array.isArray(res.data) ? res.data : res.data ? [res.data] : [];
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
        <p className="text-center text-muted">No reports found for this patient.</p>
      )}

      {/* Table */}
      {reports.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-striped shadow-sm">
            <thead className="table-dark">
              <tr>
              
                <th>Report ID</th>
                <th>Appointment ID</th>
                <th>Symptoms</th>
                <th>Diagnosis</th>
                <th>Prescription</th>
                <th>Remarks</th>
                <th>Report Date</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r, i) => (
                <tr key={i}>
                  
                  <td>{r.reportId}</td>
                  <td>{r.appointmentId}</td>
                  <td>{r.symptoms}</td>
                  <td>{r.diagnosis}</td>
                  <td>{r.prescription}</td>
                  <td>{r.remarks}</td>
                  <td className="text-muted">{r.reportDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientReport;
