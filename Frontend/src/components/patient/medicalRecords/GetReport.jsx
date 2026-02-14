import React, { useState } from "react";
import { getReport } from "../Services/reportService";

const GetReport = () => {
  const [patientId, setPatientId] = useState("");
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearched(true);
    setError("");
    setSelectedDate("");

    try {
      const res = await getReport(patientId);
      const data = Array.isArray(res.data) ? res.data : [];

      setReports(data);
      setFilteredReports(data); // initially show all
    } catch (err) {
      console.error(err);
      setError("Failed to fetch reports ❌");
      setReports([]);
      setFilteredReports([]);
    }
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);

    const filtered = reports.filter((r) => r.reportDate === date);
    setFilteredReports(filtered);
  };

  return (
    <div className="container mt-4">
      {/* Patient ID Search */}
      <div className="row justify-content-center mb-3">
        <div className="col-md-8 d-flex gap-2">
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
      {searched && reports.length === 0 && !error && (
        <p className="text-center text-muted">No reports found</p>
      )}

      {/* Date Dropdown */}
      {reports.length > 0 && (
        <div className="row justify-content-center mb-3">
          <div className="col-md-4">
            <select
              className="form-select"
              value={selectedDate}
              onChange={handleDateChange}
            >
              <option value="">Select Report Date</option>
              {[...new Set(reports.map((r) => r.reportDate))].map((date, i) => (
                <option key={i} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Report Table */}
      {filteredReports.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-striped shadow-sm">
            <thead className="table-dark">
              <tr>
                <th colSpan="12">
                  Patient Name:{" "}
                  <span className="fw-normal">
                    {filteredReports[0].patientName}
                  </span>
                </th>
              </tr>
              <tr>
                <th>Report ID</th>
                <th>Report Date</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Blood Group</th>
                <th>Appointment Date</th>
                <th>Slot Time</th>
                <th>Status</th>
                <th>Symptoms</th>
                <th>Diagnosis</th>
                <th>Prescription</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((r, i) => (
                <tr key={i}>
                  <td>{r.reportId}</td>
                  <td>{r.reportDate}</td>
                  <td>{r.gender}</td>
                  <td>{r.dob}</td>
                  <td>{r.bloodGroup}</td>
                  <td>{r.appointmentDate}</td>
                  <td>{r.slotTime}</td>
                  <td>{r.status}</td>
                  <td>{r.symptoms}</td>
                  <td>{r.diagnosis}</td>
                  <td>{r.prescription}</td>
                  <td>{r.remarks}</td>
                  <td>
                    <button onClick={() => handleGenerate(r)}>

                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GetReport;
