import React, { useState } from "react";
import { getMedicalHistory, updateReport } from "../Services/reportService";

const UpdateReport = () => {
  const [patientId, setPatientId] = useState("");
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  // FETCH REPORTS
  const fetchReports = async () => {
    if (!patientId) return alert("Enter Patient ID");

    try {
      setLoading(true);
      const res = await getMedicalHistory(patientId);

      console.log("API DATA:", res.data); // 👈 ADD THIS

      setReports(res.data);
      setSelectedReport(null);
    } catch (err) {
      alert("No reports found");
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedReport({ ...selectedReport, [name]: value });
  };

  // SUBMIT UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedReport) return;

    try {
      setUpdating(true);

      await updateReport(patientId, {
        appointmentId: selectedReport.appointmentId,
        symptoms: selectedReport.symptoms,
        diagnosis: selectedReport.diagnosis,
        prescription: selectedReport.prescription,
        remarks: selectedReport.remarks,
      });

      alert("✅ Report Updated Successfully");

      fetchReports();
      setSelectedReport(null);
    } catch (err) {
      console.log(err.response?.data);
      alert("❌ Update failed");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="container mt-4">
      {/* PATIENT ID INPUT */}
      <div className="card shadow p-3 mb-4">
        <h5>Search Patient Reports</h5>

        <div className="input-group">
          <input
            type="number"
            className="form-control"
            placeholder="Enter Patient ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />
          <button className="btn btn-primary" onClick={fetchReports}>
            Fetch Reports
          </button>
        </div>
      </div>

      {loading && <p>Loading...</p>}

      {/* DROPDOWN */}
      {reports.length > 0 && (
        <div className="card shadow p-3 mb-4">
          <label className="fw-bold">Select Appointment</label>

          <select
            className="form-select"
            defaultValue=""
            onChange={(e) => setSelectedReport(reports[Number(e.target.value)])}
          >
            <option value="" disabled>
              -- Select Appointment --
            </option>

            {reports.map((r, index) => (
              <option
                key={`report-${index}`}
                value={index} // Use index instead of transactionId
              >
                {new Date(r.appointmentDate).toLocaleDateString()} - Dr.{" "}
                {r.doctorFirstName} {r.doctorLastName}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* UPDATE FORM */}
      {selectedReport && (
        <div className="card shadow">
          <div className="card-header bg-success text-white">
            <h5>Update Medical Report</h5>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Symptoms */}
              <div className="mb-3">
                <label className="form-label fw-bold">Symptoms</label>
                <input
                  className="form-control"
                  name="symptoms"
                  value={selectedReport.symptoms || ""}
                  onChange={handleChange}
                  placeholder="Enter symptoms"
                  required
                />
              </div>

              {/* Diagnosis */}
              <div className="mb-3">
                <label className="form-label fw-bold">Diagnosis</label>
                <input
                  className="form-control"
                  name="diagnosis"
                  value={selectedReport.diagnosis || ""}
                  onChange={handleChange}
                  placeholder="Enter diagnosis"
                  required
                />
              </div>

              {/* Prescription */}
              <div className="mb-3">
                <label className="form-label fw-bold">Prescription</label>
                <input
                  className="form-control"
                  name="prescription"
                  value={selectedReport.prescription || ""}
                  onChange={handleChange}
                  placeholder="Enter prescription"
                />
              </div>

              {/* Remarks */}
              <div className="mb-3">
                <label className="form-label fw-bold">Remarks</label>
                <textarea
                  className="form-control"
                  name="remarks"
                  value={selectedReport.remarks || ""}
                  onChange={handleChange}
                  placeholder="Enter remarks"
                />
              </div>

              <button className="btn btn-success w-100" disabled={updating}>
                {updating ? "Updating..." : "Update Report"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateReport;
