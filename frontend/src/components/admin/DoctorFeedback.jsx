import React, { useState } from "react";
import { doctorFeedback } from "../../services/reportService";

const DoctorFeedback = () => {
  const [username, setUsername] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchFeedback = async (e) => {
    e.preventDefault();
    setSearched(true);
    setLoading(true);
    setError("");
    setFeedbacks([]);

    if (!username) {
      setError("Please enter username");
      setLoading(false);
      return;
    }

    try {
      const response = await doctorFeedback(username);
      setFeedbacks(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("Username not found");
      } else {
        setError("Something went wrong ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      {/* Username Search */}
      <div className="row justify-content-center mb-3">
        <div className="col-md-8 d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Enter doctor username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="btn btn-primary" onClick={fetchFeedback}>
            Search
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && <p className="text-center">Loading...</p>}

      {/* Error */}
      {error && <p className="text-danger text-center">{error}</p>}

      {/* No Records */}
      {searched && feedbacks.length === 0 && !error && (
        <p className="text-center text-muted">No feedback found</p>
      )}

      {/* Feedback Table */}
      {feedbacks.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-striped shadow-sm">
            <thead className="table-dark">
              <tr>
                <th colSpan="5">
                  Doctor Name:{" "}
                  <span className="fw-normal">{feedbacks[0].doctorName}</span>
                </th>
              </tr>
              <tr>
                <th>Feedback ID</th>
                <th>Appointment ID</th>
                <th>Rating</th>
                <th>Comments</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((f) => (
                <tr key={f.feedbackId}>
                  <td>{f.feedbackId}</td>
                  <td>{f.appointmentId}</td>
                  <td>{f.rating}</td>
                  <td>{f.comments}</td>
                  <td>{f.feedbackDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DoctorFeedback;
