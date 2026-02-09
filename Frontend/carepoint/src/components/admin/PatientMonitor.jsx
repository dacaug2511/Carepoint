import React, { useEffect, useState } from "react";
import { fetchAllPatients } from "../../services/api";

const PatientMonitor = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchAllPatients().then((res) => setPatients(res.data));
  }, []);

  return (
    <>
      <h4>Registered Patients</h4>

      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Blood Group</th>
            <th>Emergency Contact</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((p) => (
            <tr key={p.patientId}>
              <td>
                {p.user.firstName} {p.user.lastName}
              </td>
              <td>{p.gender}</td>
              <td>{p.dob}</td>
              <td>{p.bloodGroup}</td>
              <td>{p.emergencyContact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PatientMonitor;
