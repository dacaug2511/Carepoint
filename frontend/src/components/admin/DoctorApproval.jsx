import React, { useEffect, useState } from "react";
import { fetchAllDoctors, approveDoctor } from "../../services/api";

const DoctorApproval = () => {
  const [doctors, setDoctors] = useState([]);

  const loadDoctors = async () => {
    const res = await fetchAllDoctors();
    setDoctors(res.data);
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveDoctor(id);
      alert("Doctor approved successfully");
      loadDoctors();
    } catch {
      alert("Approval failed");
    }
  };

  return (
    <>
      <h4>Doctor Approvals</h4>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Experience</th>
            <th>Fee</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map((d) => (
            <tr key={d.doctorId}>
              <td>
                {d.firstName} {d.lastName}
              </td>
              <td>{d.specializationName}</td>
              <td>{d.experience} yrs</td>
              <td>₹{d.consultationFee}</td>
              <td>
                <span
                  className={`badge ${
                    d.status === "ACTIVE" ? "bg-success" : "bg-warning"
                  }`}
                >
                  {d.status}
                </span>
              </td>
              <td>
                {d.status === "INACTIVE" && (
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleApprove(d.doctorId)}
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DoctorApproval;
