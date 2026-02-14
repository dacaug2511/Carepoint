import React, { useState } from "react";
import axios from "axios";

const AddDiagnosis = () => {
  const [formData, setFormData] = useState({
    appointmentId: "",
    symptoms: "",
    diagnosis: "",
    prescription: "",
    remarks: "",
    reportDate: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    const payload = {
      appointmentId: Number(formData.appointmentId),
      symptoms: formData.symptoms,
      diagnosis: formData.diagnosis,
      prescription: formData.prescription,
      remarks: formData.remarks,
      reportDate: formData.reportDate,
    };

    try {
      await axios.post(
        "https://localhost:7201/api/Report/add-diagnosis",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setSuccess("Diagnosis added successfully ✅");
      setFormData({
        appointmentId: "",
        symptoms: "",
        diagnosis: "",
        prescription: "",
        remarks: "",
        reportDate: "",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to add diagnosis ❌");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-header text-center bg-primary text-white py-2">
              <h6 className="mb-0">Add Diagnosis</h6>
            </div>

            <form onSubmit={handleSubmit} className="card-body p-3">
              {success && <p className="text-success small">{success}</p>}
              {error && <p className="text-danger small">{error}</p>}

              <div className="mb-2">
                <label className="form-label small">Appointment ID</label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  name="appointmentId"
                  value={formData.appointmentId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label small">Symptoms</label>
                <textarea
                  className="form-control form-control-sm"
                  rows="2"
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label small">Diagnosis</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="diagnosis"
                  value={formData.diagnosis}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label small">Prescription</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="prescription"
                  value={formData.prescription}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label small">Remarks</label>
                <textarea
                  className="form-control form-control-sm"
                  rows="2"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small">Report Date</label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  name="reportDate"
                  value={formData.reportDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-sm w-100">
                Add Diagnosis
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDiagnosis;
